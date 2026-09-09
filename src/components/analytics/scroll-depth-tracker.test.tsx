import { render } from "@testing-library/react"
import { act } from "react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { ScrollDepthTracker } from "./scroll-depth-tracker"

vi.mock("next/navigation", () => ({
  usePathname: () => window.location.pathname,
}))

/**
 * jsdom does not lay out, so page geometry is stubbed directly. The seam stays
 * `window.gtag`: set up a page of a given height, scroll it, assert the events.
 */
function setPage({ height, viewport = 800 }: { height: number; viewport?: number }) {
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: height,
    configurable: true,
  })
  Object.defineProperty(window, "innerHeight", {
    value: viewport,
    configurable: true,
  })
  window.scrollY = 0
}

function scrollTo(y: number) {
  window.scrollY = y
  act(() => {
    window.dispatchEvent(new Event("scroll"))
  })
}

/** The thresholds reported so far, in order. */
function depths(): number[] {
  const gtag = vi.mocked(window.gtag!)
  return gtag.mock.calls
    .filter((args) => args[0] === "event" && args[1] === "scroll_depth")
    .map((args) => (args[2] as { percent_scrolled: number }).percent_scrolled)
}

beforeEach(() => {
  window.gtag = vi.fn()
  window.history.pushState({}, "", "/")
  // Run rAF callbacks synchronously so a scroll settles within the act() above.
  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
    cb(0)
    return 0
  })
})

afterEach(() => {
  vi.unstubAllGlobals()
  delete (window as { gtag?: unknown }).gtag
})

describe("scroll depth", () => {
  it("reports nothing on arrival at the top of a long page", () => {
    setPage({ height: 8000 })
    render(<ScrollDepthTracker />)

    expect(depths()).toEqual([])
  })

  it("reports each threshold as it is crossed", () => {
    setPage({ height: 8000 })
    render(<ScrollDepthTracker />)

    scrollTo(1200) // (1200 + 800) / 8000 = 25%
    expect(depths()).toEqual([25])

    scrollTo(3200) // 50%
    expect(depths()).toEqual([25, 50])

    scrollTo(5200) // 75%
    expect(depths()).toEqual([25, 50, 75])

    scrollTo(6400) // 90%
    expect(depths()).toEqual([25, 50, 75, 90])
  })

  it("reports every threshold passed in one large jump", () => {
    setPage({ height: 8000 })
    render(<ScrollDepthTracker />)

    scrollTo(7200)

    expect(depths()).toEqual([25, 50, 75, 90])
  })

  it("does not repeat a threshold when scrolling back up and down", () => {
    setPage({ height: 8000 })
    render(<ScrollDepthTracker />)

    scrollTo(3200)
    scrollTo(0)
    scrollTo(3200)

    expect(depths()).toEqual([25, 50])
  })

  it("reports nothing for a page that fits on screen", () => {
    setPage({ height: 700, viewport: 800 })
    render(<ScrollDepthTracker />)

    scrollTo(0)

    expect(depths()).toEqual([])
  })

  it("re-arms on a client-side navigation", () => {
    setPage({ height: 8000 })
    const { rerender } = render(<ScrollDepthTracker />)

    scrollTo(3200)
    expect(depths()).toEqual([25, 50])

    window.history.pushState({}, "", "/for-schools")
    window.scrollY = 0
    rerender(<ScrollDepthTracker />)

    scrollTo(3200)
    expect(depths()).toEqual([25, 50, 25, 50])
  })

  it("carries the audience of the page", () => {
    window.history.pushState({}, "", "/for-tutors")
    setPage({ height: 8000 })
    render(<ScrollDepthTracker />)

    scrollTo(1200)

    const gtag = vi.mocked(window.gtag!)
    expect(gtag).toHaveBeenCalledWith("event", "scroll_depth", {
      percent_scrolled: 25,
      audience: "tutors",
    })
  })

  it("reports a deep link that opens already past a threshold", () => {
    setPage({ height: 8000 })
    window.scrollY = 3200
    render(<ScrollDepthTracker />)

    expect(depths()).toEqual([25, 50])
  })

  it("stops reporting once unmounted", () => {
    setPage({ height: 8000 })
    const { unmount } = render(<ScrollDepthTracker />)
    unmount()

    scrollTo(7200)

    expect(depths()).toEqual([])
  })

  it("does not use the GA4-reserved `scroll` event name", () => {
    setPage({ height: 8000 })
    render(<ScrollDepthTracker />)
    scrollTo(7200)

    const gtag = vi.mocked(window.gtag!)
    const names = gtag.mock.calls.map((args) => args[1])
    expect(names).not.toContain("scroll")
  })
})
