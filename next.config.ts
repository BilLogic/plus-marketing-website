import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ["**/.next/**", "**/src/data/cache/**"],
      }
    }
    return config
  },
  async redirects() {
    /**
     * Legacy URLs from the Framer site (tutors.plus cutover, Aug 2026), plus a
     * second pass in Sep 2026 for paths the first map missed — those were still
     * taking ~100 sessions per 90 days into a 404, about a quarter of all
     * non-homepage entries. They surfaced in GA4 landing-page data once #9
     * restored the tag on dynamically rendered 404s.
     *
     * Framer served everything under an `/en` locale prefix as well as bare, so
     * each entry is emitted in both forms below. Generating the prefixed form
     * rather than writing it by hand is what keeps every redirect a single hop:
     * a blanket `/en/:path*` rule would send `/en/about/story` to
     * `/about/story`, which is itself a redirect, and chaining is what this map
     * has always avoided.
     *
     * `/hidden/*` intentionally 404s. Paths with no destination — Terms,
     * Privacy, FAQ, release notes — are deliberately absent and tracked in #20;
     * redirecting them somewhere arbitrary would be worse than a clean 404.
     */
    const legacy: ReadonlyArray<readonly [source: string, destination: string]> =
      [
        ["/research", "/publications"],
        ["/impact/research", "/publications"],
        ["/pubs/:file*", "/publications"],

        ["/about/story", "/about"],
        ["/team", "/about/team"],
        ["/about/advisors", "/about/team"],

        ["/in-the-news/:slug*", "/about/news"],
        ["/impact/in-news", "/about/news"],

        ["/get-involved/become-a-tutor", "/for-tutors"],
        ["/solution/training", "/for-tutors"],
        ["/tutor", "/for-tutors"],

        ["/get-involved/contact-us", "/get-involved"],
        ["/get-involved/contact", "/get-involved"],
        ["/get-involved/careers", "/get-involved"],
        ["/contact", "/get-involved"],

        ["/solution/tutoring", "/for-schools"],
        ["/solution/toolkit", "/for-schools"],
      ]

    return [
      // The locale root has no unprefixed equivalent to derive.
      { source: "/en", destination: "/", permanent: true },
      ...legacy.flatMap(([source, destination]) => [
        { source, destination, permanent: true },
        { source: `/en${source}`, destination, permanent: true },
      ]),
    ]
  },
  /**
   * Pin Turbopack root so a parent `~/package-lock.json` is not treated as the monorepo root.
   * Run `npm run dev` from this repo root (so `process.cwd()` is correct).
   */
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  images: {
    remotePatterns: [
      { hostname: "*.amazonaws.com" },
      { hostname: "*.notion.so" },
      { hostname: "www.figma.com" },
      { hostname: "framerusercontent.com" },
      { hostname: "i.ytimg.com" },
    ],
  },
}

export default nextConfig
