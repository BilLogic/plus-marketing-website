import { NextResponse } from "next/server"

import { getNotionClient } from "@/lib/notion/client"
import { getNotionCoverUrl } from "@/lib/notion/utils/parse-properties"

/**
 * Proxies a Notion page's cover image (success stories, news) through our origin
 * so the CDN can cache the image *bytes*. Mirrors `/api/team-photo` — see that
 * route for the full rationale.
 *
 * Notion-hosted file URLs are signed and expire (~1h), so we cannot bake them
 * into static HTML. Streaming the bytes back with cache headers lets Vercel's
 * CDN serve the image directly: only a cache miss reaches Notion, and expiry of
 * the underlying S3 URL no longer matters once cached.
 */
const BROWSER_MAX_AGE = 60 * 60 // 1h
const CDN_MAX_AGE = 60 * 60 * 24 // 1 day fresh at the edge
const STALE_WHILE_REVALIDATE = 60 * 60 * 24 * 7 // serve stale up to a week while refetching

const NOTION_ID =
  /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i

function normalizeNotionPageId(raw: string): string | null {
  const trimmed = raw.trim()
  if (!NOTION_ID.test(trimmed)) return null
  return trimmed
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ pageId: string }> }
) {
  const { pageId: raw } = await context.params
  const pageId = normalizeNotionPageId(raw)
  if (!pageId) {
    return new NextResponse(null, { status: 400 })
  }

  if (!process.env.NOTION_API_KEY) {
    return new NextResponse(null, { status: 503 })
  }

  try {
    const notion = getNotionClient()
    const page = (await notion.pages.retrieve({ page_id: pageId })) as {
      properties?: Record<string, unknown>
      cover?: unknown
    }
    const url = getNotionCoverUrl(page)
    if (!url) {
      return new NextResponse(null, { status: 404 })
    }

    // `no-store` keeps Next's data cache out of it (the bytes live in the CDN
    // via the response headers below, not the framework fetch cache).
    const upstream = await fetch(url, { cache: "no-store" })
    if (!upstream.ok || !upstream.body) {
      return new NextResponse(null, { status: 502 })
    }

    const headers = new Headers({
      "Content-Type": upstream.headers.get("content-type") ?? "image/jpeg",
      "Cache-Control": `public, max-age=${BROWSER_MAX_AGE}, s-maxage=${CDN_MAX_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`,
    })
    const contentLength = upstream.headers.get("content-length")
    if (contentLength) headers.set("Content-Length", contentLength)
    const etag = upstream.headers.get("etag")
    if (etag) headers.set("ETag", etag)

    return new NextResponse(upstream.body, { status: 200, headers })
  } catch (error) {
    console.error("[notion-cover]", pageId, error)
    return new NextResponse(null, { status: 502 })
  }
}
