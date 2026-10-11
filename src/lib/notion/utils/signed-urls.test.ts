import { describe, expect, it } from "vitest"

import { sameIgnoringSignedUrls } from "./signed-urls"

const signed = (path: string, sig: string) =>
  `https://prod-files-secure.s3.us-west-2.amazonaws.com/ws/${path}?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=2026101${sig}T000000Z&X-Amz-Signature=${sig}abc&x-id=GetObject`

describe("sameIgnoringSignedUrls", () => {
  it("treats a re-signed link to the same file as unchanged", () => {
    expect(
      sameIgnoringSignedUrls(
        [{ picture: signed("a/emma.jpg", "1") }],
        [{ picture: signed("a/emma.jpg", "2") }]
      )
    ).toBe(true)
  })

  it("ignores re-signed links embedded in markdown", () => {
    const body = (sig: string) => `Intro\n![Team](${signed("b/photo.png", sig)})\nMore`
    expect(
      sameIgnoringSignedUrls([{ content: body("1") }], [{ content: body("2") }])
    ).toBe(true)
  })

  it("sees a swapped image as a change", () => {
    expect(
      sameIgnoringSignedUrls(
        [{ picture: signed("a/emma.jpg", "1") }],
        [{ picture: signed("c/new.jpg", "1") }]
      )
    ).toBe(false)
  })

  it("sees an edited field as a change", () => {
    expect(
      sameIgnoringSignedUrls(
        [{ title1: "Design Lead", picture: signed("a/x.jpg", "1") }],
        [{ title1: "Head of Design", picture: signed("a/x.jpg", "2") }]
      )
    ).toBe(false)
  })

  it.each([
    ["an angle bracket", (u: string, t: string) => `<${u}>${t}`],
    ["a closing bracket", (u: string, t: string) => `[${u}] ${t}`],
    ["a comma", (u: string, t: string) => `${u},${t}`],
  ])("still sees an edit right after a signed link followed by %s", (_, wrap) => {
    expect(
      sameIgnoringSignedUrls(
        [{ content: wrap(signed("a/x.jpg", "1"), "https://example.com/z?q=1") }],
        [{ content: wrap(signed("a/x.jpg", "2"), "https://example.com/z?q=2") }]
      )
    ).toBe(false)
  })

  it("keeps ordinary query strings significant", () => {
    expect(
      sameIgnoringSignedUrls(
        [{ picture: "https://framerusercontent.com/images/a.png?scale-down-to=512" }],
        [{ picture: "https://framerusercontent.com/images/a.png?scale-down-to=256" }]
      )
    ).toBe(false)
  })
})
