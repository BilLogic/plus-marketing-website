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

export function trackEvent(name: string, params?: GtagParams) {
  if (typeof window === "undefined") return
  window.gtag?.("event", name, params)
}

/** Clarity's install snippet queues early calls; this guard covers gated-off environments. */
export function clarityCall(...args: unknown[]) {
  if (typeof window === "undefined") return
  window.clarity?.(...args)
}
