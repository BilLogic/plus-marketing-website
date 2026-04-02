import { NextResponse } from "next/server"

import { getNotionClient } from "@/lib/notion/client"
import { getTeamMemberPictureUrl } from "@/lib/notion/utils/parse-properties"

/**
 * Fresh redirect to a team member's headshot (see `getTeamMemberPictureUrl` for property names).
 * Notion-hosted file URLs expire (~1h); embedding stale URLs from build/cache breaks images.
 * The browser loads this route, then follows the redirect to S3 with a valid signature.
 */
export const dynamic = "force-dynamic"

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
    }
    const url = getTeamMemberPictureUrl(
      (page.properties ?? {}) as Record<string, any>
    )
    if (!url) {
      return new NextResponse(null, { status: 404 })
    }
    return NextResponse.redirect(url, 302)
  } catch (error) {
    console.error("[team-photo]", pageId, error)
    return new NextResponse(null, { status: 502 })
  }
}
