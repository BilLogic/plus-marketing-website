import { format } from "date-fns"

/**
 * Formats a Notion-style calendar date (`YYYY-MM-DD` or ISO) for marketing copy,
 * e.g. `March 1, 2025` — uses local calendar fields to avoid UTC off-by-one.
 */
export function formatMarketingLongDate(isoDate: string | null | undefined): string | null {
  if (!isoDate?.trim()) return null
  const day = isoDate.slice(0, 10)
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day)
  if (!m) return null
  const y = Number(m[1])
  const mo = Number(m[2])
  const d = Number(m[3])
  if (!y || mo < 1 || mo > 12 || d < 1 || d > 31) return null
  const date = new Date(y, mo - 1, d)
  if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) return null
  return format(date, "MMMM d, yyyy")
}
