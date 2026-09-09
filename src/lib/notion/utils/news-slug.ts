/**
 * URL slugs for Notion-backed news articles.
 *
 * Articles were addressed by raw Notion UUID — `/about/news/18cb7cca-4982-8069-
 * 9a0b-f14feb94282f`. Google reported every one of them as "Discovered —
 * currently not indexed": there is nothing in that URL to judge relevance from,
 * so the pages were never worth crawling. A title slug is the fix.
 *
 * Uniqueness is resolved across the whole set rather than per item, because a
 * UUID prefix is not unique in practice — three of the live articles share
 * `3aeb7cca`. Two articles with the same title get the shorter one first and a
 * disambiguating id suffix on the rest, so an existing slug never changes
 * because a new article happened to collide with it later.
 */

import type { NewsItem } from "@/lib/notion/types"

/** A Notion page id, with or without dashes. */
const UUID_PATTERN =
  /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i

export function isNotionId(value: string): boolean {
  return UUID_PATTERN.test(value)
}

export function slugify(title: string): string {
  const slug = (
    title
      .toLowerCase()
      .normalize("NFKD")
      // Strip combining marks so "café" becomes "cafe" rather than "caf".
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  )

  return truncateAtWord(slug)
}

/**
 * Caps slug length without cutting mid-word.
 *
 * A blind `slice` produces tails like `...how-plus-uses-ai-to-enhance-lear`,
 * which reads as broken rather than shortened — and the URL is the whole point
 * of having a slug. Cuts back to the last word boundary instead, falling back
 * to a hard cut for a single word longer than the cap.
 */
function truncateAtWord(slug: string, max = 80): string {
  if (slug.length <= max) return slug

  const cut = slug.slice(0, max + 1)
  const lastDash = cut.lastIndexOf("-")
  const truncated = lastDash > 0 ? cut.slice(0, lastDash) : cut.slice(0, max)
  return truncated.replace(/-+$/g, "")
}

/** The id fragment appended to a colliding slug. Long enough to be unique. */
function idSuffix(id: string): string {
  return id.replace(/-/g, "").slice(-12)
}

/**
 * Assigns a slug to every item.
 *
 * Order matters and is deliberate: items are processed as given (the queries
 * sort newest first), and the first claimant of a slug keeps the clean form.
 * A title that produces an empty slug — punctuation only, or a missing title —
 * falls back to the id so the route still resolves.
 */
export function assignNewsSlugs(items: NewsItem[]): Map<string, string> {
  const claimed = new Set<string>()
  const byId = new Map<string, string>()

  for (const item of items) {
    const base = slugify(item.title)
    if (!base) {
      byId.set(item.id, idSuffix(item.id))
      claimed.add(idSuffix(item.id))
      continue
    }

    const slug = claimed.has(base) ? `${base}-${idSuffix(item.id)}` : base
    claimed.add(slug)
    byId.set(item.id, slug)
  }

  return byId
}

/** The slug for one item, given the whole set it belongs to. */
export function newsSlugFor(items: NewsItem[], id: string): string | null {
  return assignNewsSlugs(items).get(id) ?? null
}

/** Resolves a slug back to its item. Also accepts a raw Notion id. */
export function newsItemForSlug(
  items: NewsItem[],
  slug: string,
): NewsItem | null {
  if (isNotionId(slug)) {
    const normalized = slug.replace(/-/g, "").toLowerCase()
    return (
      items.find((item) => item.id.replace(/-/g, "").toLowerCase() === normalized) ??
      null
    )
  }

  const slugs = assignNewsSlugs(items)
  for (const item of items) {
    if (slugs.get(item.id) === slug) return item
  }
  return null
}
