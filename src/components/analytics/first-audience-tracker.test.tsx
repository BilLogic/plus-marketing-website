import { render } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { FirstAudienceTracker } from "./first-audience-tracker"

/**
 * Seam: the `dataLayer` queue, which is what gtag.js actually replays. Asserting
 * there rather than on a `gtag()` spy covers the pre-hydration path too, where
 * gtag.js has not loaded yet.
 */

vi.mock("next/navigation", () => ({
  usePathname: () => window.location.pathname,
}))

function goTo(pathname: string) {
  window.history.pushState({}, "", pathname)
}

function firstAudienceSets(): string[] {
  const queue = (window as { dataLayer?: unknown[] }).dataLayer ?? []
  return queue.flatMap((entry) => {
    if (!Array.isArray(entry) || entry[0] !== "set") return []
    const params = entry[1] as Record<string, unknown>
    return typeof params?.first_audience === "string"
      ? [params.first_audience]
      : []
  })
}

beforeEach(() => {
  ;(window as { dataLayer?: unknown[] }).dataLayer = []
  window.sessionStorage.clear()
  goTo("/")
})

afterEach(() => {
  delete (window as { dataLayer?: unknown[] }).dataLayer
  window.sessionStorage.clear()
})

describe("first_audience", () => {
  it("claims the audience of the landing page", () => {
    goTo("/for-researchers")
    render(<FirstAudienceTracker />)

    expect(firstAudienceSets()).toEqual(["funders"])
  })

  it("reports general for a session that never touches an audience page", () => {
    goTo("/about")
    render(<FirstAudienceTracker />)

    expect(firstAudienceSets()).toEqual(["general"])
  })

  it("does not let a later audience overwrite the first", () => {
    goTo("/for-schools")
    const { rerender } = render(<FirstAudienceTracker />)

    goTo("/for-tutors")
    rerender(<FirstAudienceTracker />)

    expect(firstAudienceSets()).toEqual(["schools", "schools"])
  })

  it("lets a general landing page be claimed by a later audience page", () => {
    goTo("/")
    const { rerender } = render(<FirstAudienceTracker />)
    expect(firstAudienceSets()).toEqual(["general"])

    goTo("/for-schools")
    rerender(<FirstAudienceTracker />)

    expect(firstAudienceSets()).toEqual(["general", "schools"])
  })

  it("survives a reload within the session", () => {
    goTo("/publications")
    const { unmount } = render(<FirstAudienceTracker />)
    unmount()

    goTo("/about")
    render(<FirstAudienceTracker />)

    expect(firstAudienceSets()).toEqual(["funders", "funders"])
  })

  it("falls back to general when sessionStorage throws", () => {
    const getItem = vi
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => {
        throw new Error("blocked")
      })
    const setItem = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("blocked")
      })

    goTo("/for-schools")
    expect(() => render(<FirstAudienceTracker />)).not.toThrow()
    // Unwritable storage still reports this page view honestly.
    expect(firstAudienceSets()).toEqual(["schools"])

    getItem.mockRestore()
    setItem.mockRestore()
  })
})
