import { afterEach, beforeEach, describe, expect, it } from "vitest"

import { gtagSet, gtagSetUserProperties } from "@/lib/analytics"

/**
 * Seam: the `dataLayer` entries themselves, checked against what gtag.js will
 * execute. gtag.js replays `Arguments` objects only — a plain array is skipped
 * without an error, which is how every `set` on the site went missing in
 * production while the old tests passed.
 */

type W = { dataLayer?: unknown[] }

const isArguments = (v: unknown) =>
  Object.prototype.toString.call(v) === "[object Arguments]"

beforeEach(() => {
  ;(window as W).dataLayer = []
})

afterEach(() => {
  delete (window as W).dataLayer
})

describe("gtag command queue", () => {
  it("queues set as an Arguments object, the only shape gtag.js replays", () => {
    gtagSet({ traffic_type: "internal" })
    const [entry] = (window as W).dataLayer!

    expect(isArguments(entry)).toBe(true)
    expect(Array.from(entry as ArrayLike<unknown>)).toEqual([
      "set",
      { traffic_type: "internal" },
    ])
  })

  it("sends user properties through set user_properties", () => {
    gtagSetUserProperties({ first_audience: "schools" })
    const [entry] = (window as W).dataLayer!

    expect(isArguments(entry)).toBe(true)
    expect(Array.from(entry as ArrayLike<unknown>)).toEqual([
      "set",
      "user_properties",
      { first_audience: "schools" },
    ])
  })

  it("creates the queue when gtag.js has not defined it yet", () => {
    delete (window as W).dataLayer
    gtagSet({ ignore_referrer: true })

    expect((window as W).dataLayer).toHaveLength(1)
  })

  it("appends in call order so seeded values precede the config command", () => {
    ;(window as W).dataLayer!.push("existing")
    gtagSet({ a: "1" })
    gtagSetUserProperties({ b: "2" })

    const q = (window as W).dataLayer!
    expect(q[0]).toBe("existing")
    expect(Array.from(q[1] as ArrayLike<unknown>)[1]).toEqual({ a: "1" })
    expect(Array.from(q[2] as ArrayLike<unknown>)[1]).toBe("user_properties")
  })
})
