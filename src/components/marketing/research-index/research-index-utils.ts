import type { ResearchPaper } from "@/lib/notion/types"

export function riParseDate(dateStr: string): Date {
  const parts = dateStr.split("/")
  if (parts.length === 3) return new Date(+parts[2], +parts[0] - 1, +parts[1])
  return new Date(dateStr)
}

export function riParseYear(publishDate: string): string {
  const y = riParseDate(publishDate).getFullYear()
  return Number.isNaN(y) ? "" : String(y)
}

/**
 * Sort key for `publishDate`. Rows with a missing or unparseable date (e.g. a paper
 * accepted but not yet published) return 0 so they sink to the bottom deterministically —
 * comparing raw `getTime()` yields NaN, which leaves their position undefined.
 */
export function riDateSortKey(publishDate: string): number {
  const t = riParseDate(publishDate).getTime()
  return Number.isNaN(t) ? 0 : t
}

export function riFormatAuthorsLine(authors: string[]): string {
  if (authors.length === 0) return ""
  if (authors.length === 1) return authors[0]
  if (authors.length === 2) return `${authors[0]}, ${authors[1]}`
  return `${authors[0]}, ${authors[1]} et al.`
}

/** Notion **Website Summary** only — do not fall back to Abstract on marketing surfaces. */
export function riPublicationDescription(paper: ResearchPaper): string | null {
  const raw = paper.shortDescription?.trim() || ""
  return raw || null
}
