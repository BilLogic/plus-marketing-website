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

export const fetchNews = async (
  options?: { featured?: boolean }
): Promise<NewsItem[]> => {
  if (!process.env.NOTION_API_KEY) {
    const cached = await readCache<NewsItem[]>(CACHE_KEY)
    return cached ?? []
  }

  try {
    const notion = getNotionClient()

    const filter = options?.featured !== undefined
      ? {
          property: "Priority / Featured?",
          checkbox: { equals: options.featured },
        }
      : undefined

    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter,
      sorts: [
        { property: "Date Published", direction: "descending" as const },
      ],
    })

    const items = response.results.map(parseNewsItem)
    await writeCache(CACHE_KEY, items)
    return items
  } catch (error) {
    console.error("Failed to fetch news from Notion:", error)
    const cached = await readCache<NewsItem[]>(CACHE_KEY)
    return cached ?? []
  }
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
