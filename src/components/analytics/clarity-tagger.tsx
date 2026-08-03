"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { clarityCall } from "@/lib/analytics"

function pageType(pathname: string): string {
  const segment = pathname.split("/").filter(Boolean)[0]
  return segment ?? "home"
}

/**
 * Clarity custom tags are page-scoped and don't carry across SPA route changes —
 * re-set on every pathname change so heatmaps/recordings filter by page type.
 */
export function ClarityTagger() {
  const pathname = usePathname()
  useEffect(() => {
    clarityCall("set", "page_type", pageType(pathname))
  }, [pathname])
  return null
}
