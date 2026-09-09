import { render } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { OutboundClickTracker } from "./outbound-click-tracker"

/**
 * The seam for every analytics feature is `window.gtag`: mount the tracker,
 * dispatch a genuine DOM click, assert the resulting calls. Nothing here
 * reaches into the module's own helpers — a test that still passed after the
 * tag stopped firing in a browser would be testing the wrong thing.
 */

const TUTOR_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfnLoEbL_irrlGeoW6toMctQ8rstewQ1-PB4h7XwUKZAeXmVg/viewform"
const CONTACT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc0TFyKzbPu5WGHWc13SDQ5aOrUQZgAAC_MMp0hK467OAzjeQ/viewform"

/** jsdom has no navigation; without this every click logs a "not implemented". */
function swallowNavigation(event: MouseEvent) {
  event.preventDefault()
}

/**
 * Builds the anchor as real page markup rather than via RTL's container, so
 * `closest("header")` / `closest("footer")` resolve the way they do in the app.
 */
function clickLink(
  href: string,
  options: { wrapper?: "header" | "footer"; ctaLocation?: string } = {},
) {
  const anchor = document.createElement("a")
  anchor.href = href
  anchor.textContent = "cta"
  if (options.ctaLocation) anchor.dataset.ctaLocation = options.ctaLocation

  const host = options.wrapper
    ? document.createElement(options.wrapper)
    : document.body
  if (options.wrapper) {
    host.appendChild(anchor)
    document.body.appendChild(host)
  } else {
    document.body.appendChild(anchor)
  }

  anchor.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true }),
  )
  return anchor
}

/** The single call we assert on, or undefined when nothing was tracked. */
function trackedEvent() {
  const gtag = vi.mocked(window.gtag!)
  const call = gtag.mock.calls.find((args) => args[0] === "event")
  if (!call) return undefined
  return { name: call[1], params: call[2] }
}

beforeEach(() => {
  document.addEventListener("click", swallowNavigation)
  window.gtag = vi.fn()
  window.clarity = vi.fn()
})

afterEach(() => {
  document.removeEventListener("click", swallowNavigation)
  delete (window as { gtag?: unknown }).gtag
  delete (window as { clarity?: unknown }).clarity
})

describe("CTA matching", () => {
  it("tracks the tutor application form", () => {
    render(<OutboundClickTracker />)
    clickLink(TUTOR_FORM_URL)

    expect(trackedEvent()).toEqual({
      name: "tutor_apply_click",
      params: { link_domain: "tutor_application_form", cta_location: "inline" },
    })
  })

  it("tracks the contact form", () => {
    render(<OutboundClickTracker />)
    clickLink(CONTACT_FORM_URL)

    expect(trackedEvent()).toEqual({
      name: "contact_form_click",
      params: { link_domain: "contact_form", cta_location: "inline" },
    })
  })

  it("tracks the demo link", () => {
    render(<OutboundClickTracker />)
    clickLink("https://app.tutors.plus/demo")

    expect(trackedEvent()).toEqual({
      name: "demo_click",
      params: { link_domain: "app.tutors.plus", cta_location: "inline" },
    })
  })

  it("tracks a bare app link as a login, not a demo", () => {
    render(<OutboundClickTracker />)
    clickLink("https://app.tutors.plus/")

    expect(trackedEvent()).toEqual({
      name: "login_click",
      params: { link_domain: "app.tutors.plus", cta_location: "inline" },
    })
  })

  it("ignores links that match no CTA", () => {
    render(<OutboundClickTracker />)
    clickLink("https://example.com/somewhere")

    expect(trackedEvent()).toBeUndefined()
  })

  it("ignores internal navigation", () => {
    render(<OutboundClickTracker />)
    clickLink("/for-schools")

    expect(trackedEvent()).toBeUndefined()
  })
})

describe("cta_location", () => {
  it("reads 'nav' from a header ancestor", () => {
    render(<OutboundClickTracker />)
    clickLink("https://app.tutors.plus/demo", { wrapper: "header" })

    expect(trackedEvent()?.params).toMatchObject({ cta_location: "nav" })
  })

  it("reads 'footer' from a footer ancestor", () => {
    render(<OutboundClickTracker />)
    clickLink("https://app.tutors.plus/demo", { wrapper: "footer" })

    expect(trackedEvent()?.params).toMatchObject({ cta_location: "footer" })
  })

  it("falls back to 'inline' outside both landmarks", () => {
    render(<OutboundClickTracker />)
    clickLink("https://app.tutors.plus/demo")

    expect(trackedEvent()?.params).toMatchObject({ cta_location: "inline" })
  })

  it("lets an explicit data-cta-location win over the landmark", () => {
    render(<OutboundClickTracker />)
    clickLink(TUTOR_FORM_URL, { wrapper: "header", ctaLocation: "hero" })

    expect(trackedEvent()?.params).toMatchObject({ cta_location: "hero" })
  })

  it("inherits data-cta-location from an ancestor", () => {
    render(<OutboundClickTracker />)

    const card = document.createElement("div")
    card.dataset.ctaLocation = "card"
    const anchor = document.createElement("a")
    anchor.href = TUTOR_FORM_URL
    card.appendChild(anchor)
    document.body.appendChild(card)

    anchor.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    )

    expect(trackedEvent()?.params).toMatchObject({ cta_location: "card" })
  })

  it("tracks a click on an element nested inside the anchor", () => {
    render(<OutboundClickTracker />)

    const anchor = document.createElement("a")
    anchor.href = "https://app.tutors.plus/demo"
    const label = document.createElement("span")
    anchor.appendChild(label)
    document.body.appendChild(anchor)

    label.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    )

    expect(trackedEvent()?.name).toBe("demo_click")
  })
})

describe("portaled markup", () => {
  /**
   * The mobile nav renders its links inside a portaled Sheet, outside every
   * layout subtree, so the listener has to sit on `document` rather than on
   * the tracker's own subtree.
   */
  it("tracks a link rendered outside the tracker's own subtree", () => {
    const { container } = render(<OutboundClickTracker />)
    expect(container.innerHTML).toBe("")

    const portal = document.createElement("div")
    document.body.appendChild(portal)
    const anchor = document.createElement("a")
    anchor.href = TUTOR_FORM_URL
    portal.appendChild(anchor)

    anchor.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    )

    expect(trackedEvent()?.name).toBe("tutor_apply_click")
  })

  /**
   * Capture phase, specifically: a component between the anchor and `document`
   * that stops propagation would silently swallow the conversion if this
   * listener ran on the way back up.
   */
  it("tracks even when an ancestor stops propagation", () => {
    render(<OutboundClickTracker />)

    const menu = document.createElement("div")
    menu.addEventListener("click", (event) => event.stopPropagation())
    const anchor = document.createElement("a")
    anchor.href = TUTOR_FORM_URL
    menu.appendChild(anchor)
    document.body.appendChild(menu)

    anchor.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    )

    expect(trackedEvent()?.name).toBe("tutor_apply_click")
  })
})

describe("Clarity", () => {
  it("mirrors the CTA and upgrades the session for recording retention", () => {
    render(<OutboundClickTracker />)
    clickLink("https://app.tutors.plus/demo")

    expect(window.clarity).toHaveBeenCalledWith("event", "cta_demo")
    expect(window.clarity).toHaveBeenCalledWith("upgrade", "cta_click")
  })

  it("stays silent for a link that matches no CTA", () => {
    render(<OutboundClickTracker />)
    clickLink("https://example.com/somewhere")

    expect(window.clarity).not.toHaveBeenCalled()
  })
})

describe("when the tag never loaded", () => {
  /**
   * Deploy previews and local dev are gated off, so `window.gtag` is absent.
   * The tracker must stay inert rather than throwing into the page.
   */
  it("does not throw when gtag and clarity are missing", () => {
    delete (window as { gtag?: unknown }).gtag
    delete (window as { clarity?: unknown }).clarity

    render(<OutboundClickTracker />)

    expect(() => clickLink(TUTOR_FORM_URL)).not.toThrow()
  })
})

describe("lifecycle", () => {
  it("stops tracking once unmounted", () => {
    const { unmount } = render(<OutboundClickTracker />)
    unmount()

    clickLink(TUTOR_FORM_URL)

    expect(trackedEvent()).toBeUndefined()
  })

  it("tracks each click once when mounted", () => {
    render(<OutboundClickTracker />)
    clickLink(TUTOR_FORM_URL)
    clickLink(TUTOR_FORM_URL)

    const gtag = vi.mocked(window.gtag!)
    const events = gtag.mock.calls.filter((args) => args[0] === "event")
    expect(events).toHaveLength(2)
  })
})
