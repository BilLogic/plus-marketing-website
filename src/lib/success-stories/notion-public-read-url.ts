import type { SuccessStory } from "@/lib/notion/types"
import { successStorySlug } from "@/lib/success-stories/success-story-path"

/**
 * Default matches published Notion Site URLs like:
 * `https://plus-tutors.notion.site/Reinvigorating-Math-Software-Engagement-at-Warm-Springs-Academy-334b7cca4982811db04fc593c698cd25`
 */
const DEFAULT_PUBLIC_SITE_BASE = "https://plus-tutors.notion.site"

/**
 * Public “read full story” URL — optional explicit Notion column, else derived title slug + page id.
 */
export function notionSuccessStoryPublicReadUrl(story: SuccessStory): string {
  const explicit = story.publicReadUrl?.trim()
  if (explicit) return explicit
  const base = (
    process.env.NEXT_PUBLIC_NOTION_SUCCESS_STORIES_SITE ?? DEFAULT_PUBLIC_SITE_BASE
  ).replace(/\/$/, "")
  const slug = successStorySlug(story.title)
  const compactId = story.id.replace(/-/g, "")
  return `${base}/${slug}-${compactId}`
}

/**
 * Split a long quote for display: text before last “. ” stays normal; remainder is emphasized (Figma pattern).
 */
export function splitSuccessStoryQuote(quote: string): {
  before: string
  highlight: string
  after: string
} | null {
  const trimmed = quote.trim()
  const idx = trimmed.lastIndexOf(". ")
  if (idx <= 0 || idx >= trimmed.length - 3) {
    return null
  }
  const before = trimmed.slice(0, idx + 1).trim()
  const highlight = trimmed.slice(idx + 2).trim()
  if (highlight.length < 12) return null
  return { before, highlight, after: "" }
}
