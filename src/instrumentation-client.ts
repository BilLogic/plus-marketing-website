/**
 * Runs before hydration (Next.js instrumentation-client convention).
 *
 * Two jobs:
 *  1. Seed gtag defaults that must be in place before the GA config command
 *     fires — `traffic_type` for team traffic, `ignore_referrer` for returns
 *     from our outbound Google Forms.
 *  2. Capture JS errors that React error boundaries never see: event handlers,
 *     async code, unhandled promise rejections.
 */

import { syncInternalTrafficFlag } from "@/lib/analytics"

// --- gtag defaults ---------------------------------------------------------

/**
 * `dataLayer` accumulates commands before gtag.js loads and replays them in
 * order, so pushing here guarantees these land ahead of the `config` command
 * that @next/third-parties emits.
 */
function gtagSet(params: Record<string, string | boolean>) {
  const w = window as typeof window & { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push(["set", params])
}

if (syncInternalTrafficFlag()) {
  gtagSet({ traffic_type: "internal" })
}

/**
 * Our conversion CTAs are outbound links to Google Forms. When someone submits
 * one and comes back, GA4 would otherwise open a new session attributed to
 * docs.google.com — burying the real acquisition source. GA4's own "unwanted
 * referrals" list sets exactly this flag; it lives behind Admin → Data streams
 * → Configure tag settings, so we set it directly instead.
 */
const IGNORED_REFERRER_HOSTS = [
  "docs.google.com",
  "accounts.google.com",
  "forms.gle",
]

try {
  const referrer = document.referrer
  if (referrer) {
    const host = new URL(referrer).hostname
    if (IGNORED_REFERRER_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))) {
      gtagSet({ ignore_referrer: true })
    }
  }
} catch {
  // Malformed referrer — nothing to ignore.
}

// --- JS error capture ------------------------------------------------------

/**
 * `js_error` because `error` is a GA4-reserved event name. Flood control is
 * mandatory: one broken third-party script can otherwise emit thousands of
 * events per pageload. Always a fixed event name with params, never a dynamic
 * name (GA4 caps distinct event names at 500).
 */
const seen = new Set<string>()
let sent = 0
const MAX_PER_PAGELOAD = 5

function report(message: string, source: string) {
  if (!message || message === "Script error.") return
  const key = `${message}|${source}`.slice(0, 150)
  if (seen.has(key) || sent >= MAX_PER_PAGELOAD) return
  seen.add(key)
  sent += 1
  window.gtag?.("event", "js_error", {
    error_message: message.slice(0, 100),
    error_source: source.slice(0, 100),
    non_interaction: true,
  })
}

window.addEventListener("error", (event) => {
  report(
    String(event.message ?? ""),
    `${event.filename ?? "unknown"}:${event.lineno ?? 0}`
  )
})

window.addEventListener("unhandledrejection", (event) => {
  const reason: unknown = event.reason
  report(
    String(reason instanceof Error ? reason.message : (reason ?? "unhandled rejection")),
    "unhandledrejection"
  )
})
