import { getNotionClient } from "@/lib/notion/client"
import type { SuccessStory } from "@/lib/notion/types"
import {
  getTitle,
  getRichText,
  getSelect,
  getDate,
  getFiles,
} from "@/lib/notion/utils/parse-properties"
import { readCache, writeCache } from "@/lib/notion/utils/cache"
import { blocksToMarkdown } from "@/lib/notion/utils/blocks-to-markdown"

const CACHE_KEY = "success-stories"

const parseSuccessStory = (page: any): Omit<SuccessStory, "content"> => {
  const props = page.properties
  return {
    id: page.id,
    title: getTitle(props.Title),
    category: getSelect(props.Category) as SuccessStory["category"],
    summary: getRichText(props.Summary) ?? "",
    image: getFiles(props.Image),
    coverImage: getFiles(props["Cover Image"]),
    author: getRichText(props.Author),
    clientPartner: getRichText(props["Client / Partner"]),
    quote: getRichText(props.Quote),
    quoteAttribution: getRichText(props["Quote Attribution"]),
    publishedDate: getDate(props["Published Date"]) ?? "",
  }
}

export const fetchSuccessStories = async (): Promise<SuccessStory[]> => {
  const databaseId = process.env.NOTION_SUCCESS_STORIES_DB_ID
  if (!databaseId) {
    const cached = await readCache<SuccessStory[]>(CACHE_KEY)
    return cached ?? []
  }

  if (!process.env.NOTION_API_KEY) {
    const cached = await readCache<SuccessStory[]>(CACHE_KEY)
    return cached ?? []
  }

  try {
    const notion = getNotionClient()
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        { property: "Published Date", direction: "descending" as const },
      ],
    })

    const stories: SuccessStory[] = []
    for (const page of response.results) {
      const base = parseSuccessStory(page)
      const content = await fetchPageContent(notion, page.id)
      stories.push({ ...base, content })
    }

    await writeCache(CACHE_KEY, stories)
    return stories
  } catch (error) {
    console.error("Failed to fetch success stories from Notion:", error)
    const cached = await readCache<SuccessStory[]>(CACHE_KEY)
    return cached ?? []
  }
}

export const fetchSuccessStoryById = async (
  id: string
): Promise<SuccessStory | null> => {
  if (!process.env.NOTION_API_KEY) {
    const cached = await readCache<SuccessStory[]>(CACHE_KEY)
    return cached?.find((s) => s.id === id) ?? null
  }

  try {
    const notion = getNotionClient()
    const page = await notion.pages.retrieve({ page_id: id })
    const base = parseSuccessStory(page)
    const content = await fetchPageContent(notion, id)
    return { ...base, content }
  } catch (error) {
    console.error(`Failed to fetch success story ${id}:`, error)
    const cached = await readCache<SuccessStory[]>(CACHE_KEY)
    return cached?.find((s) => s.id === id) ?? null
  }
}

async function fetchPageContent(
  notion: ReturnType<typeof getNotionClient>,
  pageId: string
): Promise<string | null> {
  try {
    const blocks: any[] = []
    let cursor: string | undefined

    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
      })
      blocks.push(...response.results)
      cursor = response.has_more ? response.next_cursor! : undefined
    } while (cursor)

    if (blocks.length === 0) return null
    return blocksToMarkdown(blocks)
  } catch {
    return null
  }
}
