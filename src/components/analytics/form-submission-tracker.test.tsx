import { render } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { FormSubmissionTracker } from "./form-submission-tracker"

function submitted() {
  const gtag = vi.mocked(window.gtag!)
  return gtag.mock.calls
    .filter((args) => args[0] === "event" && args[1] === "form_submit")
    .map((args) => (args[2] as { form: string }).form)
}

beforeEach(() => {
  window.gtag = vi.fn()
  window.clarity = vi.fn()
  window.history.pushState({}, "", "/thanks")
  window.sessionStorage.clear()
})

afterEach(() => {
  delete (window as { gtag?: unknown }).gtag
  delete (window as { clarity?: unknown }).clarity
  window.sessionStorage.clear()
})

describe("form submission conversion", () => {
  it.each(["contact", "tutor", "demo", "school"])(
    "records a %s submission",
    (form) => {
      render(<FormSubmissionTracker form={form} />)
      expect(submitted()).toEqual([form])
    },
  )

  it("records an unrecognised form rather than dropping it", () => {
    render(<FormSubmissionTracker form="something-new" />)
    expect(submitted()).toEqual(["other"])
  })

  it("records a submission with no form parameter", () => {
    render(<FormSubmissionTracker form={undefined} />)
    expect(submitted()).toEqual(["other"])
  })

  it("is case- and whitespace-insensitive", () => {
    render(<FormSubmissionTracker form="  Contact " />)
    expect(submitted()).toEqual(["contact"])
  })

  it("fires once per mount, not once per render", () => {
    const { rerender } = render(<FormSubmissionTracker form="contact" />)
    rerender(<FormSubmissionTracker form="contact" />)
    rerender(<FormSubmissionTracker form="contact" />)

    expect(submitted()).toEqual(["contact"])
  })

  it("mirrors to Clarity and upgrades the session", () => {
    render(<FormSubmissionTracker form="demo" />)

    expect(window.clarity).toHaveBeenCalledWith("event", "form_submit_demo")
    expect(window.clarity).toHaveBeenCalledWith("upgrade", "form_submit")
  })

  /**
   * The conversion has to be attributable to the door the visitor came in
   * through, otherwise it cannot feed the audience funnels in #19.
   */
  it("carries the audience the visitor entered through", () => {
    window.sessionStorage.setItem("plus:first-audience", "funders")
    render(<FormSubmissionTracker form="contact" />)

    const gtag = vi.mocked(window.gtag!)
    expect(gtag).toHaveBeenCalledWith("event", "form_submit", {
      form: "contact",
      // /thanks is not audience-mapped, so the event-scoped value is general;
      // first_audience is what carries the attribution.
      audience: "general",
    })
  })

  it("stays silent when the tag never loaded", () => {
    delete (window as { gtag?: unknown }).gtag
    delete (window as { clarity?: unknown }).clarity

    expect(() => render(<FormSubmissionTracker form="contact" />)).not.toThrow()
  })
})
