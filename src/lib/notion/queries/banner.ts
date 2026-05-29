import { getNotionClient } from "@/lib/notion/client"
import type { SiteBanner } from "@/lib/notion/types"
import {
  getTitle,
  getRichText,
  getUrl,
  getCheckbox,
} from "@/lib/notion/utils/parse-properties"
import { readCache, writeCache } from "@/lib/notion/utils/cache"

const DATABASE_ID =
  process.env.NOTION_BANNER_DB_ID ?? "36eb7cca498281f4ad99e53e62d9506a"
const CACHE_KEY = "banner"

/* eslint-disable @typescript-eslint/no-explicit-any */
const parseBanner = (page: any): SiteBanner => {
  const props = page.properties
  return {
    id: page.id,
    message: getTitle(props.Message),
    badge: getRichText(props.Badge),
    linkText: getRichText(props["Link Text"]),
    linkHref: getUrl(props["Link URL"]),
  }
}

/** Returns the active banner, or null when none is toggled on. */
export const fetchBanner = async (): Promise<SiteBanner | null> => {
  if (!process.env.NOTION_API_KEY) {
    const cached = await readCache<SiteBanner | null>(CACHE_KEY)
    return cached ?? null
  }

  try {
    const notion = getNotionClient()

    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: { property: "Active", checkbox: { equals: true } },
      page_size: 1,
    })

    const page = response.results[0]
    const banner = page ? parseBanner(page) : null
    await writeCache(CACHE_KEY, banner)
    return banner
  } catch (error) {
    console.error("Failed to fetch banner from Notion:", error)
    const cached = await readCache<SiteBanner | null>(CACHE_KEY)
    return cached ?? null
  }
}
