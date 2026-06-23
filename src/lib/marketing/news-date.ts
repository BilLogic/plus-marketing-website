/** Shared formatter for Notion news "Date Published" values (`publicationDate`). */
const NEWS_DATE_FMT = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
})

/** "2025-02-12" -> "February 12, 2025". UTC-formatted so the day never shifts; null when empty/invalid. */
export function formatNewsDate(iso: string): string | null {
  if (!iso) return null
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? null : NEWS_DATE_FMT.format(d)
}
