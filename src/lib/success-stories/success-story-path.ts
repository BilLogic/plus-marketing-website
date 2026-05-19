import type { SuccessStory } from "@/lib/notion/types"

const NOTION_PAGE_ID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/** URL-safe slug from story title — e.g. `reinvigorating-math-software-engagement-at-warm-springs-academy`. */
export function successStorySlug(title: string): string {
  const slug = title
    .trim()
    .replace(/[''`]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
  return slug || "story"
}

export function isNotionPageId(value: string): boolean {
  return NOTION_PAGE_ID_RE.test(value.trim())
}

/** On-site article path when body content exists; otherwise optional external Notion URL. */
export function successStoryPagePath(story: SuccessStory): string | null {
  if (story.content) {
    return `/success-stories/${successStorySlug(story.title)}`
  }
  const external = story.publicReadUrl?.trim()
  return external || null
}
