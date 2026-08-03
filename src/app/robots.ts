import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // `/assistant` is an app surface, not marketing content.
      disallow: ["/api/", "/assistant"],
    },
    sitemap: "https://tutors.plus/sitemap.xml",
  }
}
