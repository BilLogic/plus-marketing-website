import type { MetadataRoute } from "next"
import { fetchNews } from "@/lib/notion/queries/news"
import { fetchSuccessStories } from "@/lib/notion/queries/success-stories"
import { successStoryPagePath } from "@/lib/success-stories/success-story-path"

const BASE = "https://tutors.plus"

/**
 * Regenerate hourly so Notion-backed entries (news, success stories) appear
 * without waiting for the next deploy. Matches the detail pages' own ISR window.
 */
export const revalidate = 3600

const STATIC_ROUTES = [
  "",
  "/about",
  "/about/news",
  "/about/team",
  "/for-researchers",
  "/for-schools",
  "/for-tutors",
  "/get-involved",
  "/publications",
  "/success-stories",
]

/**
 * Built at deploy time. Dynamic entries come through the existing Notion query
 * layer, which falls back to git-cached JSON when `NOTION_API_KEY` is absent —
 * the build never hard-fails on Notion. New Notion entries appear in the
 * sitemap on the next deploy (accepted staleness).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [news, stories] = await Promise.all([
    fetchNews(),
    fetchSuccessStories(),
  ])

  const newsEntries: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${BASE}/about/news/${item.id}`,
    lastModified: item.publicationDate || undefined,
  }))

  // Only stories with on-site pages; external-only stories return a non-local path.
  const storyEntries: MetadataRoute.Sitemap = stories.flatMap((story) => {
    const path = successStoryPagePath(story)
    return path?.startsWith("/") ? [{ url: `${BASE}${path}` }] : []
  })

  return [
    ...STATIC_ROUTES.map((route) => ({ url: `${BASE}${route}` })),
    ...newsEntries,
    ...storyEntries,
  ]
}
