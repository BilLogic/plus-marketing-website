import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { audienceForPath, currentAudience, trackEvent } from "./analytics"

/** jsdom keeps one document per file; navigate rather than rebuild it. */
function goTo(pathname: string) {
  window.history.pushState({}, "", pathname)
}

beforeEach(() => {
  window.gtag = vi.fn()
  goTo("/")
})

afterEach(() => {
  delete (window as { gtag?: unknown }).gtag
  window.localStorage.clear()
})

describe("audienceForPath", () => {
  it.each([
    ["/for-schools", "schools"],
    ["/for-researchers", "funders"],
    ["/publications", "funders"],
    ["/for-tutors", "tutors"],
    ["/get-involved", "tutors"],
  ])("maps %s to %s", (path, expected) => {
    expect(audienceForPath(path)).toBe(expected)
  })

  it.each(["/", "/about", "/about/team", "/success-stories", "/assistant"])(
    "falls back to general for %s",
    (path) => {
      expect(audienceForPath(path)).toBe("general")
    },
  )

  it("gives a nested route its parent's audience", () => {
    expect(audienceForPath("/publications/some-paper")).toBe("funders")
    expect(audienceForPath("/for-schools/pricing")).toBe("schools")
  })

  it("ignores a trailing slash", () => {
    expect(audienceForPath("/for-tutors/")).toBe("tutors")
  })

  it("is case-insensitive", () => {
    expect(audienceForPath("/For-Schools")).toBe("schools")
  })

  it("does not match a path that merely starts with the same letters", () => {
    expect(audienceForPath("/for-schools-and-districts")).toBe("general")
    expect(audienceForPath("/publications-archive")).toBe("general")
  })

  it("treats the root as general", () => {
    expect(audienceForPath("/")).toBe("general")
  })
})

describe("currentAudience", () => {
  it("reads the audience from the current location", () => {
    goTo("/for-researchers")
    expect(currentAudience()).toBe("funders")
  })

  it("follows a client-side navigation", () => {
    goTo("/for-schools")
    expect(currentAudience()).toBe("schools")
    goTo("/about")
    expect(currentAudience()).toBe("general")
  })
})

describe("trackEvent", () => {
  /** The point of the choke point: no call site has to remember this. */
  it("stamps the audience on an event that never mentions it", () => {
    goTo("/for-schools")
    trackEvent("some_future_event")

    expect(window.gtag).toHaveBeenCalledWith("event", "some_future_event", {
      audience: "schools",
    })
  })

  it("stamps the audience alongside a caller's own params", () => {
    goTo("/publications")
    trackEvent("demo_click", { link_domain: "app.tutors.plus" })

    expect(window.gtag).toHaveBeenCalledWith("event", "demo_click", {
      link_domain: "app.tutors.plus",
      audience: "funders",
    })
  })

  it("keeps the audience authoritative over a caller trying to set it", () => {
    goTo("/for-tutors")
    trackEvent("demo_click", { audience: "schools" })

    expect(window.gtag).toHaveBeenCalledWith("event", "demo_click", {
      audience: "tutors",
    })
  })

  it("carries traffic_type alongside the audience for internal traffic", () => {
    window.localStorage.setItem("plus:internal-traffic", "1")
    goTo("/for-tutors")
    trackEvent("tutor_apply_click")

    expect(window.gtag).toHaveBeenCalledWith("event", "tutor_apply_click", {
      audience: "tutors",
      traffic_type: "internal",
    })
  })

  it("stays silent when the tag never loaded", () => {
    delete (window as { gtag?: unknown }).gtag
    expect(() => trackEvent("demo_click")).not.toThrow()
  })
})
