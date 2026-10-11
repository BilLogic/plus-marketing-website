import { getNotionClient } from "@/lib/notion/client"
import type { NewsItem } from "@/lib/notion/types"
import {
  getTitle,
  getRichText,
  getSelect,
  getDate,
  getCheckbox,
  getUrl,
  getFiles,
} from "@/lib/notion/utils/parse-properties"
import { readCache, writeCache } from "@/lib/notion/utils/cache"
import { queryAllPages } from "@/lib/notion/utils/query-all-pages"

const DATABASE_ID = "18ab7cca498280b79168db5c5ab201e9"
const CACHE_KEY = "news"

const parseNewsItem = (page: any): NewsItem => {
  const props = page.properties
  return {
    id: page.id,
    title: getTitle(props.Title),
    marketingBlurb: getRichText(props["One-Line Teaser"]),
    summary: getRichText(props.Summary),
    category: getSelect(props.Category) as NewsItem["category"],
    publicationDate: getDate(props["Date Published"]) ?? "",
    author: getRichText(props.Author),
    featuredImage: getFiles(props["Cover Image"]),
    externalLink: getUrl(props["Link to Article or Source"]),
    featured: getCheckbox(props["Priority / Featured?"]),
  }
}

/**
 * Every news row straight from Notion, newest first. Throws on failure — the
 * site's fetcher falls back to the cache, the scheduled sync must not.
 */
export const loadNewsFromNotion = async (): Promise<NewsItem[]> => {
  const pages = await queryAllPages(getNotionClient(), {
    database_id: DATABASE_ID,
    sorts: [{ property: "Date Published", direction: "descending" }],
  })

  return pages.map(parseNewsItem)
}

const fetchAllNews = async (): Promise<NewsItem[]> => {
  if (!process.env.NOTION_API_KEY) {
    const cached = await readCache<NewsItem[]>(CACHE_KEY)
    return cached ?? []
  }

  try {
    const items = await loadNewsFromNotion()
    await writeCache(CACHE_KEY, items)
    return items
  } catch (error) {
    console.error("Failed to fetch news from Notion:", error)
    const cached = await readCache<NewsItem[]>(CACHE_KEY)
    return cached ?? []
  }
}

/**
 * News, newest first. `featured` filters after loading so the cache always
 * holds the full list, and the filter applies to cached news too.
 */
export const fetchNews = async (
  options?: { featured?: boolean }
): Promise<NewsItem[]> => {
  const items = await fetchAllNews()
  if (options?.featured === undefined) return items
  return items.filter((item) => item.featured === options.featured)
}

export const fetchNewsById = async (id: string): Promise<NewsItem | null> => {
  if (!process.env.NOTION_API_KEY) {
    const cached = await readCache<NewsItem[]>(CACHE_KEY)
    return cached?.find((item) => item.id === id) ?? null
  }

  try {
    const notion = getNotionClient()
    const page = await notion.pages.retrieve({ page_id: id })
    return parseNewsItem(page)
  } catch (error) {
    console.error(`Failed to fetch news item ${id} from Notion:`, error)
    const cached = await readCache<NewsItem[]>(CACHE_KEY)
    return cached?.find((item) => item.id === id) ?? null
  }
}
