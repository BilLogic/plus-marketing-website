"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"

/**
 * URL query state that does not opt the page out of server rendering.
 *
 * Next's `useSearchParams()` cannot know the query string while prerendering,
 * so on a statically rendered route it forces client-only rendering for
 * everything down to the nearest Suspense boundary. `/publications` sat behind
 * an empty boundary, so the whole archive — 60+ papers — was absent from the
 * HTML and painted in by JavaScript after load. The page shipped 672 characters
 * of markup, and Search Console recorded 5,682 impressions a quarter against
 * 2 clicks at positions 28-60.
 *
 * This reads the query string after mount instead. The first render — server
 * and client — sees no parameters, so the page prerenders with its full,
 * unfiltered content as real markup. Filters then apply on hydration.
 *
 * The trade-off is deliberate: someone opening a *filtered* link sees the full
 * list for one frame before it narrows. That affects shared filter URLs only,
 * and it buys back server rendering for every visitor and every crawler.
 */
export function useUrlSearchParams(): {
  params: URLSearchParams
  replace: (next: URLSearchParams) => void
} {
  const router = useRouter()

  // Empty on the server and on the first client render, so the two agree and
  // hydration does not mismatch.
  const [search, setSearch] = useState("")

  useEffect(() => {
    const sync = () => setSearch(window.location.search.replace(/^\?/, ""))
    sync()
    // Back/forward changes the query without remounting.
    window.addEventListener("popstate", sync)
    return () => window.removeEventListener("popstate", sync)
  }, [])

  const params = useMemo(() => new URLSearchParams(search), [search])

  const replace = useCallback(
    (next: URLSearchParams) => {
      const qs = next.toString()
      // Set state before navigating so the UI does not wait on the router.
      setSearch(qs)
      router.replace(qs ? `?${qs}` : "?", { scroll: false })
    },
    [router]
  )

  return { params, replace }
}

/**
 * Mirrors one query parameter into a piece of local state.
 *
 * Needed because a text input holds its own value while the URL updates on a
 * debounce. Syncs only when the *parameter* changes, so typing is never
 * interrupted by an echo of what the user just typed.
 */
export function useParamSyncedState(
  params: URLSearchParams,
  key: string,
  setValue: (next: string) => void
): void {
  const lastParam = useRef<string | null>(null)

  useEffect(() => {
    const current = params.get(key) ?? ""
    if (lastParam.current === current) return
    lastParam.current = current
    setValue(current)
  }, [params, key, setValue])
}
