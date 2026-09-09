import { describe, expect, it } from "vitest"

import nextConfig from "../../next.config"

/**
 * The legacy redirect map is generated rather than hand-written, so these
 * assert the properties that generation is supposed to guarantee — above all
 * that no redirect chains, which a blanket `/en/:path*` rule would break.
 */

type Redirect = { source: string; destination: string; permanent: boolean }

async function redirects(): Promise<Redirect[]> {
  const result = await nextConfig.redirects!()
  return result as Redirect[]
}

/** Applies the map once, the way Next does: first match wins. */
function resolveOnce(path: string, rules: Redirect[]): string | null {
  for (const rule of rules) {
    if (rule.source === path) return rule.destination
    const splat = rule.source.match(/^(.*)\/:[A-Za-z]+\*$/)
    if (splat && (path === splat[1] || path.startsWith(`${splat[1]}/`))) {
      return rule.destination
    }
  }
  return null
}

describe("legacy redirect map", () => {
  it("never chains: no destination is itself a source", async () => {
    const rules = await redirects()
    const chained = rules
      .map((rule) => ({ ...rule, next: resolveOnce(rule.destination, rules) }))
      .filter((rule) => rule.next !== null)

    expect(chained).toEqual([])
  })

  it("emits both the bare and /en-prefixed form of every entry", async () => {
    const rules = await redirects()
    const sources = new Set(rules.map((r) => r.source))

    for (const { source } of rules) {
      if (source === "/en") continue
      const bare = source.startsWith("/en/") ? source.slice(3) : source
      expect(sources.has(bare)).toBe(true)
      expect(sources.has(`/en${bare}`)).toBe(true)
    }
  })

  it("is free of duplicate sources", async () => {
    const rules = await redirects()
    const sources = rules.map((r) => r.source)
    expect(sources.length).toBe(new Set(sources).size)
  })

  it("uses permanent (301) redirects throughout", async () => {
    const rules = await redirects()
    expect(rules.every((r) => r.permanent)).toBe(true)
  })

  /** Every path GA4 recorded landing on a 404, with its intended destination. */
  it.each([
    ["/en", "/"],
    ["/team", "/about/team"],
    ["/about/advisors", "/about/team"],
    ["/contact", "/get-involved"],
    ["/get-involved/contact", "/get-involved"],
    ["/impact/in-news", "/about/news"],
    ["/in-the-news/proof-points-the-myth-of-the-quick-learner", "/about/news"],
    ["/en/in-the-news/new-tutoring-program-using-ai-to-help-kids-learn", "/about/news"],
    ["/en/about/story", "/about"],
    ["/tutor", "/for-tutors"],
    ["/pubs/7-Using_Large_Language_Models_to_Provide_Explanatory.pdf", "/publications"],
  ])("sends %s to %s in one hop", async (from, to) => {
    const rules = await redirects()
    expect(resolveOnce(from, rules)).toBe(to)
  })

  /**
   * Deliberately unmapped: no destination exists, and #20 is where that
   * product decision lives. A clean 404 beats an arbitrary redirect.
   */
  it.each(["/terms", "/privacy", "/faq.html", "/release-notes/4-2", "/hidden/page"])(
    "leaves %s unmapped pending a decision",
    async (path) => {
      const rules = await redirects()
      expect(resolveOnce(path, rules)).toBeNull()
    },
  )
})
