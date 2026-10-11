import type { Client } from "@notionhq/client"

type QueryParams = Parameters<Client["databases"]["query"]>[0]
type QueryResults = Awaited<ReturnType<Client["databases"]["query"]>>["results"]

/**
 * Every row of a database query. Notion caps one response at 100 rows, so this
 * follows `next_cursor` until it runs out — a single call silently truncates
 * once the CMS passes 100. Throws on any failed page.
 */
export async function queryAllPages(
  notion: Client,
  params: Omit<QueryParams, "start_cursor" | "page_size">
): Promise<QueryResults> {
  const pages: QueryResults = []
  let cursor: string | undefined

  do {
    const response = await notion.databases.query({
      ...params,
      start_cursor: cursor,
      page_size: 100,
    })
    pages.push(...response.results)
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  return pages
}
