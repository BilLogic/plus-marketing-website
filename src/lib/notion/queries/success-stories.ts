import { getNotionClient } from "@/lib/notion/client"
import type { SuccessStory } from "@/lib/notion/types"
import {
  getTitle,
  getRichText,
  getSelect,
  getDate,
  getFiles,
  getUrl,
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
    coverImage: getFiles(props["Cover Image"]),
    author: getRichText(props["Written By"]),
    clientPartner: getRichText(props["Organization Name"]),
    quote: getRichText(props.Quote),
    quoteAttribution: getRichText(props["Who Said It?"]),
    publishedDate: getDate(props["Date Published"]) ?? "",
    publicReadUrl:
      getUrl(props["Public URL"]) ??
      getUrl(props["Public page URL"]) ??
      getUrl(props["Notion public URL"]) ??
      null,
  }
}

const byPublishedDesc = (a: SuccessStory, b: SuccessStory) =>
  b.publishedDate.localeCompare(a.publishedDate)

/** Stories for `/for-schools` — category Schools, up to 3, sorted newest first. */
export function selectSuccessStoriesForSchoolsPage(
  stories: SuccessStory[]
): SuccessStory[] {
  return stories
    .filter((s) => s.category === "Schools")
    .sort(byPublishedDesc)
    .slice(0, 3)
}

/**
 * Stories for `/for-researchers` — Category = Researchers only (newest first, up to 2).
 * School or tutor stories are not mixed into this block; add Researchers-tagged rows in Notion to surface them here.
 */
export function selectSuccessStoriesForResearchersPage(
  stories: SuccessStory[]
): SuccessStory[] {
  return stories
    .filter((s) => s.category === "Researchers")
    .sort(byPublishedDesc)
    .slice(0, 2)
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
        { property: "Date Published", direction: "descending" as const },
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

/** Returns only success stories tagged as Tutors — used on /for-tutors. */
export async function fetchTutorTestimonials(): Promise<SuccessStory[]> {
  const all = await fetchSuccessStories()
  return all.filter((s) => s.category === "Tutors")
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
