import { beforeEach, describe, expect, it, vi } from "vitest"

const query = vi.fn()
vi.mock("@/lib/notion/client", () => ({
  getNotionClient: () => ({ databases: { query } }),
}))

import { loadResearchPapersFromNotion } from "./research"

const page = (id: string, extra: Record<string, unknown> = {}) => ({
  id,
  properties: {
    Title: { type: "title", title: [{ plain_text: `Paper ${id}` }] },
    Authors: { type: "multi_select", multi_select: [{ name: "Ada" }] },
    "Date Published": { type: "date", date: { start: "2026-07-01" } },
    Type: { type: "select", select: { name: "workshop" } },
    Topics: { type: "multi_select", multi_select: [{ name: "Gen AI" }] },
    ...extra,
  },
})

beforeEach(() => {
  query.mockReset()
})

describe("loadResearchPapersFromNotion", () => {
  it("keeps the publication type and topics the site filters on", async () => {
    query.mockResolvedValueOnce({ results: [page("a")], has_more: false })

    const [paper] = await loadResearchPapersFromNotion("research_db")

    expect(paper.type).toBe("workshop")
    expect(paper.topics).toEqual(["Gen AI"])
    expect(paper.authors).toEqual(["Ada"])
  })

  it("pages through every result past Notion's 100-row cap", async () => {
    query
      .mockResolvedValueOnce({ results: [page("a")], has_more: true, next_cursor: "c1" })
      .mockResolvedValueOnce({ results: [page("b")], has_more: false })

    const papers = await loadResearchPapersFromNotion("research_db")

    expect(papers.map((p) => p.id)).toEqual(["a", "b"])
    expect(query.mock.calls[1][0].start_cursor).toBe("c1")
  })

  it("throws on a Notion error instead of falling back to the cache", async () => {
    query.mockRejectedValueOnce(new Error("unauthorized"))

    await expect(loadResearchPapersFromNotion("research_db")).rejects.toThrow(
      "unauthorized"
    )
  })
})
