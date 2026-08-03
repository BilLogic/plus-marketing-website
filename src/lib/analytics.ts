/**
 * Single choke point for analytics calls.
 *
 * All GA4 events go through `trackEvent` — fixed snake_case names only, never
 * dynamic names (GA4 caps distinct event names at 500). `click`, `error`, and
 * `scroll` are GA4-reserved names; do not use them.
 *
 * Both wrappers no-op when the underlying tag is absent (dev, deploy previews —
 * scripts are gated to Netlify `CONTEXT === "production"` in the root layout).
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

export function trackEvent(name: string, params?: GtagParams) {
  if (typeof window === "undefined") return
  window.gtag?.("event", name, {
    ...params,
    ...(isInternalTraffic() ? { traffic_type: "internal" } : {}),
  })
}

/** Clarity's install snippet queues early calls; this guard covers gated-off environments. */
export function clarityCall(...args: unknown[]) {
  if (typeof window === "undefined") return
  window.clarity?.(...args)
}
