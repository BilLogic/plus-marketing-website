import { describe, expect, it, vi } from "vitest"

import type { Client } from "@notionhq/client"

import { queryAllPages } from "./query-all-pages"

const clientWith = (query: ReturnType<typeof vi.fn>) =>
  ({ databases: { query } }) as unknown as Client

describe("queryAllPages", () => {
  it("follows next_cursor until Notion reports no more pages", async () => {
    const query = vi
      .fn()
      .mockResolvedValueOnce({ results: [{ id: "a" }], has_more: true, next_cursor: "c1" })
      .mockResolvedValueOnce({ results: [{ id: "b" }], has_more: true, next_cursor: "c2" })
      .mockResolvedValueOnce({ results: [{ id: "c" }], has_more: false, next_cursor: null })

    const pages = await queryAllPages(clientWith(query), { database_id: "db" })

    expect(pages.map((p) => p.id)).toEqual(["a", "b", "c"])
    expect(query.mock.calls.map(([params]) => params.start_cursor)).toEqual([
      undefined,
      "c1",
      "c2",
    ])
  })

  it("passes the caller's sort and filter on every request", async () => {
    const query = vi
      .fn()
      .mockResolvedValueOnce({ results: [], has_more: true, next_cursor: "c1" })
      .mockResolvedValueOnce({ results: [], has_more: false, next_cursor: null })
    const sorts = [{ property: "Date Published", direction: "descending" as const }]
    const filter = { property: "Published", checkbox: { equals: true } }

    await queryAllPages(clientWith(query), { database_id: "db", sorts, filter })

    for (const [params] of query.mock.calls) {
      expect(params).toMatchObject({ database_id: "db", sorts, filter, page_size: 100 })
    }
  })

  it("throws when Notion rejects a page", async () => {
    const query = vi
      .fn()
      .mockResolvedValueOnce({ results: [{ id: "a" }], has_more: true, next_cursor: "c1" })
      .mockRejectedValueOnce(new Error("rate_limited"))

    await expect(queryAllPages(clientWith(query), { database_id: "db" })).rejects.toThrow(
      "rate_limited"
    )
  })
})
