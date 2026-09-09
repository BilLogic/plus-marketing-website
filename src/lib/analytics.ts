/**
 * Single choke point for analytics calls.
 *
 * All GA4 events go through `trackEvent` — fixed snake_case names only, never
 * dynamic names (GA4 caps distinct event names at 500). `click`, `error`, and
 * `scroll` are GA4-reserved names; do not use them.
 *
 * Both wrappers no-op when the underlying tag is absent (dev, deploy previews —
 * scripts are gated to `NEXT_PUBLIC_DEPLOY_CONTEXT === "production"` in the root layout).
 */

type GtagParams = Record<string, string | number | boolean>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
  }
}

/**
 * Marks a browser as team traffic. GA4's own "internal traffic" definition is
 * IP-based and lives behind Admin → Data streams → Configure tag settings; we
 * stamp the same `traffic_type=internal` parameter ourselves instead, which the
 * built-in Internal Traffic data filter excludes on. A per-browser flag also
 * beats IP matching in practice — it follows each teammate across office, home,
 * and mobile networks rather than breaking whenever the network changes.
 *
 * Opt in:  https://tutors.plus/?internal=1
 * Opt out: https://tutors.plus/?internal=0
 */
const INTERNAL_TRAFFIC_KEY = "plus:internal-traffic"

export function isInternalTraffic(): boolean {
  if (typeof window === "undefined") return false
  try {
    return window.localStorage.getItem(INTERNAL_TRAFFIC_KEY) === "1"
  } catch {
    // Safari private mode and blocked-storage contexts throw on access.
    return false
  }
}

/** Reads `?internal=1|0` and persists it. Returns the resulting flag. */
export function syncInternalTrafficFlag(): boolean {
  if (typeof window === "undefined") return false
  try {
    const param = new URLSearchParams(window.location.search).get("internal")
    if (param === "1") window.localStorage.setItem(INTERNAL_TRAFFIC_KEY, "1")
    else if (param === "0") window.localStorage.removeItem(INTERNAL_TRAFFIC_KEY)
  } catch {
    return false
  }
  return isInternalTraffic()
}

/**
 * The three audiences the site exists to serve, plus a fallback.
 *
 * PLUS treats funders, schools and tutors as equal priorities, but nothing in
 * GA4 recorded which one an event belonged to — so "does the site serve all
 * three equally?" could only be answered by reading paths by hand. Stamping
 * this on every event turns that into an ordinary report breakdown.
 *
 * Deliberately coarser than, and separate from, Clarity's `page_type` (the raw
 * first path segment, set in `clarity-tagger.tsx`). `page_type` is left alone
 * for continuity with the funnels rebuilt in August; this groups those pages by
 * who they are written for.
 */
export const AUDIENCES = ["schools", "funders", "tutors", "general"] as const

export type Audience = (typeof AUDIENCES)[number]

/**
 * Longest-prefix-free by construction: no entry here is a prefix of another, so
 * ordering does not affect the result.
 */
const AUDIENCE_BY_PATH_PREFIX: ReadonlyArray<readonly [string, Audience]> = [
  ["/for-schools", "schools"],
  ["/for-researchers", "funders"],
  ["/publications", "funders"],
  ["/for-tutors", "tutors"],
  ["/get-involved", "tutors"],
]

/** Maps a pathname to its audience. Nested routes inherit their parent's. */
export function audienceForPath(pathname: string): Audience {
  const path = pathname.toLowerCase().replace(/\/+$/, "") || "/"
  for (const [prefix, audience] of AUDIENCE_BY_PATH_PREFIX) {
    if (path === prefix || path.startsWith(`${prefix}/`)) return audience
  }
  return "general"
}

/** The audience of the page the visitor is on right now. */
export function currentAudience(): Audience {
  if (typeof window === "undefined") return "general"
  return audienceForPath(window.location.pathname)
}

/**
 * Pushes a gtag `set` command. Goes through `dataLayer` rather than `gtag()`
 * so it works identically before and after gtag.js loads — the queue is
 * replayed in order, which is what lets `instrumentation-client.ts` seed
 * values ahead of the GA config command.
 */
export function gtagSet(params: Record<string, string | boolean>) {
  if (typeof window === "undefined") return
  const w = window as typeof window & { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push(["set", params])
}

/**
 * The door a visitor came in through, as opposed to the page they happen to be
 * on. A funder who lands on `/for-researchers`, reads `/about`, then converts
 * would otherwise be recorded against `general` — attribution needs the door.
 *
 * Session-scoped and write-once: only the first audience-mapped page counts, so
 * a later navigation to a different audience does not overwrite it. Landing on
 * a `general` page does not claim the slot; the next audience page still can.
 */
const FIRST_AUDIENCE_KEY = "plus:first-audience"

function readFirstAudience(): Audience | null {
  try {
    const stored = window.sessionStorage.getItem(FIRST_AUDIENCE_KEY)
    return (AUDIENCES as readonly string[]).includes(stored ?? "")
      ? (stored as Audience)
      : null
  } catch {
    // Safari private mode and blocked-storage contexts throw on access.
    return null
  }
}

/**
 * Claims the slot for the current page when it is audience-mapped and unclaimed.
 * Returns the visitor's first audience, defaulting to `general` for a session
 * that never touches one.
 */
export function syncFirstAudience(): Audience {
  if (typeof window === "undefined") return "general"

  const existing = readFirstAudience()
  if (existing) return existing

  const current = currentAudience()
  if (current === "general") return "general"

  try {
    window.sessionStorage.setItem(FIRST_AUDIENCE_KEY, current)
  } catch {
    // Unwritable storage: report the audience for this page view and accept
    // that the next one re-derives it rather than failing the page.
  }
  return current
}

export function trackEvent(name: string, params?: GtagParams) {
  if (typeof window === "undefined") return
  window.gtag?.("event", name, {
    ...params,
    // Stamped after `params` so a caller cannot accidentally drop them. Every
    // event, current and future, inherits these by passing through here.
    audience: currentAudience(),
    ...(isInternalTraffic() ? { traffic_type: "internal" } : {}),
  })
}

/** Clarity's install snippet queues early calls; this guard covers gated-off environments. */
export function clarityCall(...args: unknown[]) {
  if (typeof window === "undefined") return
  window.clarity?.(...args)
}
