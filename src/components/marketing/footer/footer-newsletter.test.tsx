import { render, screen, waitFor } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { FooterNewsletter } from "./footer-newsletter"

/**
 * The bug this replaces: the form fired `newsletter_signup` on submit, cleared
 * the field so it looked successful, and posted to a route that discarded the
 * address. `newsletter_signup` is a GA4 key event, so it was counting
 * conversions that never happened.
 *
 * The rule these lock in: the event fires only when a signup actually
 * succeeded.
 */

function signupEvents() {
  const gtag = vi.mocked(window.gtag!)
  return gtag.mock.calls.filter(
    (args) => args[0] === "event" && args[1] === "newsletter_signup",
  )
}

async function submit(email = "someone@example.com") {
  const input = screen.getByPlaceholderText("Enter email") as HTMLInputElement
  const form = input.closest("form")!
  input.value = email
  form.requestSubmit()
}

beforeEach(() => {
  window.gtag = vi.fn()
  window.clarity = vi.fn()
})

afterEach(() => {
  delete (window as { gtag?: unknown }).gtag
  delete (window as { clarity?: unknown }).clarity
  vi.unstubAllGlobals()
})

describe("newsletter signup", () => {
  it("records the conversion only after the server confirms it", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }))
    render(<FooterNewsletter />)

    await submit()

    await waitFor(() => expect(signupEvents()).toHaveLength(1))
    expect(window.clarity).toHaveBeenCalledWith("event", "cta_newsletter")
    expect(await screen.findByText(/you're on the list/i)).toBeTruthy()
  })

  it("does not record a conversion when the server rejects it", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 503 }))
    render(<FooterNewsletter />)

    await submit()

    expect(await screen.findByText(/were not subscribed/i)).toBeTruthy()
    expect(signupEvents()).toHaveLength(0)
    expect(window.clarity).not.toHaveBeenCalled()
  })

  it("does not record a conversion when the request fails outright", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")))
    render(<FooterNewsletter />)

    await submit()

    expect(await screen.findByText(/were not subscribed/i)).toBeTruthy()
    expect(signupEvents()).toHaveLength(0)
  })

  it("tells the visitor what to do instead when it fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 502 }))
    render(<FooterNewsletter />)

    await submit()

    const message = await screen.findByText(/were not subscribed/i)
    expect(message.textContent).toContain("tutors@tutors.plus")
  })

  /**
   * Two submits in the same tick, before React can re-render and disable the
   * controls. This is what a fast double-click or a stuck Enter key produces,
   * and it is why the in-flight guard is a ref rather than state — batched
   * state would still read "idle" on the second pass.
   */
  it("does not double-count two submits in the same tick", async () => {
    let resolve: (value: unknown) => void = () => {}
    const pending = new Promise((r) => {
      resolve = r
    })
    const fetchMock = vi.fn().mockReturnValue(pending)
    vi.stubGlobal("fetch", fetchMock)
    render(<FooterNewsletter />)

    const input = screen.getByPlaceholderText("Enter email") as HTMLInputElement
    const form = input.closest("form")!
    input.value = "someone@example.com"

    // No await between them: React has not re-rendered, so nothing is disabled
    // yet and both submits reach the handler.
    form.requestSubmit()
    form.requestSubmit()

    resolve({ ok: true })

    await waitFor(() => expect(signupEvents()).toHaveLength(1))
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it("sends the address as JSON to the newsletter route", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal("fetch", fetchMock)
    render(<FooterNewsletter />)

    await submit("funder@example.org")

    await waitFor(() => expect(fetchMock).toHaveBeenCalled())
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe("/api/newsletter")
    expect(JSON.parse(init.body)).toEqual({ email: "funder@example.org" })
  })
})
