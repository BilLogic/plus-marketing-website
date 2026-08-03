"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { trackEvent } from "@/lib/analytics"

/**
 * The 404 page is statically prerendered — only client hydration knows the
 * real missing URL, so the path is captured here rather than server-side.
 * Post-cutover this doubles as redirect-map QA: legacy URLs we missed show up
 * as `page_not_found` events.
 */
export function NotFoundTracker() {
  const pathname = usePathname()
  useEffect(() => {
    trackEvent("page_not_found", {
      page_path: pathname,
      referrer: document.referrer || "(direct)",
    })
  }, [pathname])
  return null
}
