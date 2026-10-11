import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const query = vi.fn()
vi.mock("@/lib/notion/client", () => ({
  getNotionClient: () => ({ databases: { query } }),
}))

const readCache = vi.fn()
const writeCache = vi.fn()
// Wrapped so the hoisted factory reads the mocks at call time, not before they exist.
vi.mock("@/lib/notion/utils/cache", () => ({
  readCache: (key: string) => readCache(key),
  writeCache: (key: string, data: unknown) => writeCache(key, data),
}))

import {
  fetchResearchTeamMembers,
  fetchTeamMembers,
  loadTeamMembersFromNotion,
} from "./team"

const ORIGINAL = { ...process.env }

const memberPage = (
  name: string,
  {
    affiliation,
    group = "Researcher",
    joined = "2024-01-01",
    linkedIn = null,
    website = null,
  }: {
    affiliation?: string
    group?: string
    joined?: string
    linkedIn?: string | null
    website?: string | null
  } = {}
) => ({
  id: name.toLowerCase(),
  properties: {
    Name: { type: "title", title: [{ plain_text: name }] },
    Affiliation: { type: "select", select: affiliation ? { name: affiliation } : null },
    Group: { type: "select", select: { name: group } },
    "Date Joined PLUS": { type: "date", date: { start: joined } },
    LinkedIn: { type: "url", url: linkedIn },
    "Personal Website": { type: "url", url: website },
  },
})

const notionReturns = (...pages: unknown[]) =>
  query.mockResolvedValue({ results: pages, has_more: false, next_cursor: null })

beforeEach(() => {
  process.env.NOTION_API_KEY = "test-key"
  query.mockReset()
  readCache.mockReset().mockResolvedValue(null)
  writeCache.mockReset().mockResolvedValue(undefined)
  vi.spyOn(console, "error").mockImplementation(() => {})
})

afterEach(() => {
  process.env = { ...ORIGINAL }
})

describe("loadTeamMembersFromNotion", () => {
  it("orders by affiliation, then by name", async () => {
    notionReturns(
      memberPage("Zoe", { affiliation: "PLUS Staff" }),
      memberPage("Nia"),
      memberPage("Ben", { affiliation: "Past Collaborators" }),
      memberPage("Ada", { affiliation: "PLUS Staff" }),
      memberPage("Kim", { affiliation: "Leadership" })
    )

    const members = await loadTeamMembersFromNotion()

    expect(members.map((m) => m.name)).toEqual(["Kim", "Ada", "Zoe", "Ben", "Nia"])
  })

  it("repairs profile links and drops a LinkedIn field that is not LinkedIn", async () => {
    notionReturns(
      memberPage("Ada", { linkedIn: "linkedin.com/in/ada", website: "http://ada.dev" }),
      memberPage("Ben", { linkedIn: "https://example.com/ben" })
    )

    const [ada, ben] = await loadTeamMembersFromNotion()

    expect(ada.linkedIn).toBe("https://linkedin.com/in/ada")
    expect(ada.personalWebsite).toBe("https://ada.dev")
    expect(ben.linkedIn).toBeNull()
  })

  it("throws on a Notion error instead of falling back to the cache", async () => {
    query.mockRejectedValueOnce(new Error("unauthorized"))

    await expect(loadTeamMembersFromNotion()).rejects.toThrow("unauthorized")
  })
})

describe("fetchTeamMembers", () => {
  it("writes the fresh list to the cache", async () => {
    notionReturns(memberPage("Ada", { affiliation: "Leadership" }))

    await fetchTeamMembers()

    expect(writeCache).toHaveBeenCalledWith("team", [
      expect.objectContaining({ name: "Ada" }),
    ])
  })

  it("serves the cache with repaired links, without rewriting it, when Notion fails", async () => {
    query.mockRejectedValueOnce(new Error("unavailable"))
    readCache.mockResolvedValueOnce([
      { name: "Ada", linkedIn: "http://www.linkedin.com/in/ada", googleScholar: null, personalWebsite: "ada.dev" },
    ])

    const [ada] = await fetchTeamMembers()

    expect(ada.linkedIn).toBe("https://www.linkedin.com/in/ada")
    expect(ada.personalWebsite).toBe("https://ada.dev")
    expect(writeCache).not.toHaveBeenCalled()
  })
})

describe("fetchResearchTeamMembers", () => {
  it("keeps leadership and staff researchers, leadership first, then by join date", async () => {
    notionReturns(
      memberPage("Ada", { affiliation: "PLUS Staff", joined: "2023-05-01" }),
      memberPage("Ben", { affiliation: "PLUS Staff", joined: "2022-01-01" }),
      memberPage("Kim", { affiliation: "Leadership", joined: "2024-01-01" }),
      memberPage("Lee", { affiliation: "Student Intern" }),
      memberPage("Max", { affiliation: "PLUS Staff", group: "Product Designer" })
    )

    const researchers = await fetchResearchTeamMembers()

    expect(researchers.map((m) => m.name)).toEqual(["Kim", "Ben", "Ada"])
  })
})
