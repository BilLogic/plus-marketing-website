"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { trackEvent } from "@/lib/analytics"

/**
 * GA4 enhanced measurement fires `scroll` exactly once, at 90%. That
 * resolution cannot see the homepage drop-off the audit found — "at only 15%
 * of total page depth, we lose 50% of viewers" — so this records the curve.
 *
 * Named `scroll_depth`: `scroll` is a GA4-reserved event name, alongside
 * `click` and `error`.
 */
const THRESHOLDS = [25, 50, 75, 90] as const

/**
 * How far down the page the viewport bottom has reached, 0-100.
 *
 * Uses the viewport bottom rather than the scroll offset so a page barely
 * taller than the viewport can still reach its lower thresholds. A page that
 * fits entirely on screen is 100% read on arrival, but reports nothing —
 * `fired` is seeded past every threshold in that case, since a depth event for
 * a page with no scrolling carries no information.
 */
function depthPercent(): number {
  const doc = document.documentElement
  const scrollable = doc.scrollHeight - window.innerHeight
  if (scrollable <= 0) return 0
  const scrolled = window.scrollY + window.innerHeight
  return Math.min(100, (scrolled / doc.scrollHeight) * 100)
}

export function ScrollDepthTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // A soft navigation is a new page view: re-arm every threshold.
    const fired = new Set<number>()
    let queued = false

    const measure = () => {
      queued = false
      const depth = depthPercent()
      if (depth <= 0) return
      for (const threshold of THRESHOLDS) {
        if (depth >= threshold && !fired.has(threshold)) {
          fired.add(threshold)
          // `audience` is stamped by trackEvent; no need to pass it.
          trackEvent("scroll_depth", { percent_scrolled: threshold })
        }
      }
    }

    /**
     * rAF-throttled: scroll fires far more often than we need, and coalescing
     * to one measurement per frame keeps this off the scrolling critical path.
     */
    const onScroll = () => {
      if (queued) return
      queued = true
      window.requestAnimationFrame(measure)
    }

    // A deep link or a restored scroll position can start below a threshold.
    measure()

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [pathname])

  return null
}
