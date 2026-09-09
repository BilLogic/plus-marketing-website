"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { gtagSet, syncFirstAudience } from "@/lib/analytics"

/**
 * Claims `first_audience` on the first audience-mapped page of the session.
 *
 * `instrumentation-client.ts` seeds this for the landing page, but a visitor
 * who lands on `/` and then navigates to `/for-schools` has no audience at
 * seed time — this catches that soft navigation. `syncFirstAudience` is
 * write-once, so re-running it on every route change is safe.
 */
export function FirstAudienceTracker() {
  const pathname = usePathname()
  useEffect(() => {
    gtagSet({ first_audience: syncFirstAudience() })
  }, [pathname])
  return null
}
