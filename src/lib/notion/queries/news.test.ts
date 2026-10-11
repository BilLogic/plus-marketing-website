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

import { fetchNews } from "./news"

const ORIGINAL = { ...process.env }

const newsPage = (id: string, featured: boolean) => ({
  id,
  properties: {
    Title: { type: "title", title: [{ plain_text: `News ${id}` }] },
    "Priority / Featured?": { type: "checkbox", checkbox: featured },
  },
})

const cachedItem = (id: string, featured: boolean) => ({ id, title: `News ${id}`, featured })

beforeEach(() => {
  process.env.NOTION_API_KEY = "test-key"
  query.mockReset().mockResolvedValue({
    results: [newsPage("a", true), newsPage("b", false)],
    has_more: false,
  })
  readCache.mockReset().mockResolvedValue(null)
  writeCache.mockReset().mockResolvedValue(undefined)
  vi.spyOn(console, "error").mockImplementation(() => {})
})

afterEach(() => {
  process.env = { ...ORIGINAL }
})

describe("fetchNews", () => {
  it("caches every item even when asked for featured news only", async () => {
    const items = await fetchNews({ featured: true })

    expect(items.map((i) => i.id)).toEqual(["a"])
    expect(writeCache).toHaveBeenCalledWith("news", [
      expect.objectContaining({ id: "a" }),
      expect.objectContaining({ id: "b" }),
    ])
  })

  it("applies the featured filter to cached news when Notion is down", async () => {
    query.mockRejectedValueOnce(new Error("unavailable"))
    readCache.mockResolvedValueOnce([cachedItem("a", true), cachedItem("b", false)])

    const items = await fetchNews({ featured: false })

    expect(items.map((i) => i.id)).toEqual(["b"])
    expect(writeCache).not.toHaveBeenCalled()
  })

  it("applies the featured filter to cached news without an API key", async () => {
    delete process.env.NOTION_API_KEY
    readCache.mockResolvedValueOnce([cachedItem("a", true), cachedItem("b", false)])

    const items = await fetchNews({ featured: true })

    expect(items.map((i) => i.id)).toEqual(["a"])
    expect(writeCache).not.toHaveBeenCalled()
  })

  it("returns everything when no filter is given", async () => {
    const items = await fetchNews()

    expect(items.map((i) => i.id)).toEqual(["a", "b"])
  })
})
