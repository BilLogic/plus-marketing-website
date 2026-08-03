/**
 * Global JS-error capture → GA4 `js_error` events (`error` is a reserved name).
 * Runs before hydration (Next.js instrumentation-client convention), so it
 * catches errors that React error boundaries never see: event handlers, async
 * code, unhandled promise rejections.
 *
 * Flood control is mandatory — one broken third-party script can otherwise
 * emit thousands of events per pageload: dedupe identical errors, hard-cap 5
 * per pageload, drop cross-origin "Script error." noise. Always a fixed event
 * name with params, never a dynamic name (GA4 500-event-name limit).
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
