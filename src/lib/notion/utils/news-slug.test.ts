import { describe, expect, it } from "vitest"

import type { NewsItem } from "@/lib/notion/types"
import {
  assignNewsSlugs,
  isNotionId,
  newsItemForSlug,
  slugify,
} from "@/lib/notion/utils/news-slug"

const item = (id: string, title: string): NewsItem =>
  ({
    id,
    title,
    marketingBlurb: null,
    summary: null,
    category: "Media Coverage",
    publicationDate: "2026-01-01",
    author: null,
    featuredImage: null,
    externalLink: null,
    featured: false,
  }) as NewsItem

// Real ids from the live database. The first three share the `3aeb7cca`
// prefix, which is why a short prefix cannot be used to disambiguate.
const A = "3aeb7cca-4982-8183-ad65-e4df2a522173"
const B = "3aeb7cca-4982-81d1-87df-e27ba9c7517a"
const C = "3aeb7cca-4982-81e0-8569-f3a5d87e22d0"
const D = "18cb7cca-4982-8069-9a0b-f14feb94282f"

describe("slugify", () => {
  it("turns a headline into a readable slug", () => {
    expect(slugify("AI Tutoring Outperforms In-Class Active Learning")).toBe(
      "ai-tutoring-outperforms-in-class-active-learning",
    )
  })

  it("strips accents rather than dropping the letters", () => {
    expect(slugify("Café partnership")).toBe("cafe-partnership")
  })

  it("drops apostrophes without leaving a gap", () => {
    expect(slugify("PLUS's new partner")).toBe("pluss-new-partner")
    expect(slugify("PLUS’s new partner")).toBe("pluss-new-partner")
  })

  it("never leaves a leading or trailing dash", () => {
    expect(slugify("  --Hello, World!--  ")).toBe("hello-world")
  })

  it("truncates without leaving a trailing dash", () => {
    // 79 letters then a word break puts the dash at index 79, so the 80-char
    // cut lands exactly on it. This is the case that needs cleaning up after
    // the cut, not before it.
    const slug = slugify("a".repeat(79) + " b")
    expect(slug).toBe("a".repeat(79))
    expect(slug.endsWith("-")).toBe(false)
  })

  it("keeps a long slug within the length cap", () => {
    const slug = slugify("word ".repeat(40))
    expect(slug.length).toBeLessThanOrEqual(80)
    expect(slug.endsWith("-")).toBe(false)
  })

  it("cuts at a word boundary rather than mid-word", () => {
    // The real headline that exposed this: a blind slice ended "...enhance-lear".
    const slug = slugify(
      "Learning With and About AI Seminar Series: Four Ways PLUS Uses AI to Enhance Learning",
    )
    expect(slug.length).toBeLessThanOrEqual(80)
    expect(slug).toBe(
      "learning-with-and-about-ai-seminar-series-four-ways-plus-uses-ai-to-enhance",
    )
    expect(slug.endsWith("-lear")).toBe(false)
  })

  it("hard-cuts a single word longer than the cap", () => {
    const slug = slugify("x".repeat(120))
    expect(slug).toBe("x".repeat(80))
  })

  it("returns empty for a title with nothing sluggable", () => {
    expect(slugify("!!!")).toBe("")
  })
})

describe("assignNewsSlugs", () => {
  it("gives each article a distinct slug", () => {
    const items = [item(A, "First story"), item(B, "Second story")]
    const slugs = assignNewsSlugs(items)
    expect(slugs.get(A)).toBe("first-story")
    expect(slugs.get(B)).toBe("second-story")
  })

  it("keeps the clean slug for the first claimant and disambiguates the rest", () => {
    const items = [item(A, "Same title"), item(B, "Same title")]
    const slugs = assignNewsSlugs(items)
    expect(slugs.get(A)).toBe("same-title")
    expect(slugs.get(B)).not.toBe("same-title")
    expect(slugs.get(B)).toContain("same-title-")
  })

  it("disambiguates ids that share a prefix", () => {
    const items = [item(A, "Same"), item(B, "Same"), item(C, "Same")]
    const slugs = new Set(assignNewsSlugs(items).values())
    expect(slugs.size).toBe(3)
  })

  it("falls back to the id when the title yields no slug", () => {
    const slugs = assignNewsSlugs([item(D, "!!!")])
    expect(slugs.get(D)).toBeTruthy()
    expect(slugs.get(D)).not.toBe("")
  })

  it("does not change an existing slug when a later article collides", () => {
    const before = assignNewsSlugs([item(A, "Shared")])
    const after = assignNewsSlugs([item(A, "Shared"), item(B, "Shared")])
    expect(after.get(A)).toBe(before.get(A))
  })
})

describe("newsItemForSlug", () => {
  const items = [item(A, "First story"), item(D, "Second story")]

  it("resolves a slug to its article", () => {
    expect(newsItemForSlug(items, "first-story")?.id).toBe(A)
  })

  it("still resolves a raw Notion id, so old URLs keep working", () => {
    expect(newsItemForSlug(items, A)?.id).toBe(A)
  })

  it("resolves an id written without dashes", () => {
    expect(newsItemForSlug(items, A.replace(/-/g, ""))?.id).toBe(A)
  })

  it("returns null for an unknown slug", () => {
    expect(newsItemForSlug(items, "no-such-story")).toBeNull()
  })
})

describe("isNotionId", () => {
  it.each([A, D, A.replace(/-/g, "")])("recognises %s", (id) => {
    expect(isNotionId(id)).toBe(true)
  })

  it.each(["first-story", "", "ai-tutoring-2026"])(
    "rejects %s",
    (value) => {
      expect(isNotionId(value)).toBe(false)
    },
  )
})
