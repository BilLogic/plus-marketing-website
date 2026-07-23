/**
 * URL normalization for externally-sourced social/profile links (e.g. Notion team data).
 *
 * Notion authors frequently paste links without a scheme ("www.linkedin.com/in/x"),
 * with a bare domain ("linkedin.com/in/x"), or over http. Those produce broken
 * relative redirects when dropped straight into an `href`. These helpers repair them.
 */

/** Ensure an external URL is absolute + https. Returns null for empty/blank input. */
export function normalizeExternalUrl(raw: string | null | undefined): string | null {
  if (!raw) return null
  const trimmed = raw.trim()
  if (!trimmed) return null

  // Already absolute — force https for http.
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed.replace(/^http:\/\//i, "https://")
  }
  // Protocol-relative ("//host/path").
  if (trimmed.startsWith("//")) return `https:${trimmed}`
  // Bare domain or path ("www.linkedin.com/in/x", "linkedin.com/in/x").
  return `https://${trimmed.replace(/^\/+/, "")}`
}

/**
 * Normalize a LinkedIn URL. Returns null when the value is empty OR does not point at
 * linkedin.com, so we never render a "LinkedIn" link that redirects somewhere else.
 */
export function normalizeLinkedInUrl(raw: string | null | undefined): string | null {
  const url = normalizeExternalUrl(raw)
  if (!url) return null
  try {
    const host = new URL(url).hostname.toLowerCase()
    return host === "linkedin.com" || host.endsWith(".linkedin.com") ? url : null
  } catch {
    return null
  }
}
