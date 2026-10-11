import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const query = vi.fn()
const retrievePage = vi.fn()
const listBlocks = vi.fn()
vi.mock("@/lib/notion/client", () => ({
  getNotionClient: () => ({
    databases: { query },
    pages: { retrieve: retrievePage },
    blocks: { children: { list: listBlocks } },
  }),
}))

const readCache = vi.fn()
const writeCache = vi.fn()
// Wrapped so the hoisted factory reads the mocks at call time, not before they exist.
vi.mock("@/lib/notion/utils/cache", () => ({
  readCache: (key: string) => readCache(key),
  writeCache: (key: string, data: unknown) => writeCache(key, data),
}))

import {
  fetchSuccessStories,
  fetchSuccessStoryById,
  loadSuccessStoriesFromNotion,
} from "./success-stories"

const ORIGINAL = { ...process.env }

const storyPage = {
  id: "story-1",
  properties: {
    Title: { type: "title", title: [{ plain_text: "Warm Springs" }] },
  },
}

const paragraph = (text: string) => ({
  type: "paragraph",
  paragraph: { rich_text: [{ plain_text: text }] },
})

beforeEach(() => {
  process.env.NOTION_API_KEY = "test-key"
  query.mockReset().mockResolvedValue({ results: [storyPage], has_more: false })
  retrievePage.mockReset().mockResolvedValue(storyPage)
  listBlocks.mockReset()
  readCache.mockReset().mockResolvedValue(null)
  writeCache.mockReset().mockResolvedValue(undefined)
  vi.spyOn(console, "error").mockImplementation(() => {})
})

afterEach(() => {
  process.env = { ...ORIGINAL }
})

describe("loadSuccessStoriesFromNotion", () => {
  it("includes each story's page body", async () => {
    listBlocks.mockResolvedValueOnce({
      results: [paragraph("How it went.")],
      has_more: false,
    })

    const [story] = await loadSuccessStoriesFromNotion()

    expect(story.content).toBe("How it went.")
  })

  it("leaves content empty for a story page with no body", async () => {
    listBlocks.mockResolvedValueOnce({ results: [], has_more: false })

    const [story] = await loadSuccessStoriesFromNotion()

    expect(story.content).toBeNull()
  })

  it("throws when a story body cannot be read", async () => {
    listBlocks.mockRejectedValueOnce(new Error("rate_limited"))

    await expect(loadSuccessStoriesFromNotion()).rejects.toThrow("rate_limited")
  })
})

describe("fetchSuccessStories", () => {
  it("serves the cached stories, bodies intact, when a body cannot be read", async () => {
    const cached = [{ id: "story-1", title: "Warm Springs", content: "Cached body." }]
    readCache.mockResolvedValueOnce(cached)
    listBlocks.mockRejectedValueOnce(new Error("rate_limited"))

    const stories = await fetchSuccessStories()

    expect(stories).toEqual(cached)
    expect(writeCache).not.toHaveBeenCalled()
  })
})

describe("fetchSuccessStoryById", () => {
  it("serves the cached story, body intact, when its body cannot be read", async () => {
    const cached = [{ id: "story-1", title: "Warm Springs", content: "Cached body." }]
    readCache.mockResolvedValueOnce(cached)
    listBlocks.mockRejectedValueOnce(new Error("rate_limited"))

    const story = await fetchSuccessStoryById("story-1")

    expect(story).toEqual(cached[0])
  })
})
