import { NextRequest, NextResponse } from "next/server"

import { isLeadDestinationConfigured, recordLead } from "@/lib/notion/leads"

type NewsletterPayload = { email: string }

/** Deliberately permissive — enough to reject obvious noise, not to police addresses. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Handle newsletter subscriptions.
 *
 * This route previously validated the payload, returned an id, and discarded
 * the address. It now persists to Notion and fails loudly if it cannot — a
 * subscriber must never be told they were added to a list that did not
 * receive them.
 */
export const POST = async (request: NextRequest) => {
  let data: unknown

  try {
    data = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    )
  }

  const { email } = data as Partial<NewsletterPayload>

  if (!email || !EMAIL.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email address is required" },
      { status: 400 },
    )
  }

  if (!isLeadDestinationConfigured("newsletter")) {
    // 503 rather than 500: the request was fine, the server is not ready.
    return NextResponse.json(
      { ok: false, error: "Newsletter signups are not currently available" },
      { status: 503 },
    )
  }

  try {
    const { id } = await recordLead({ kind: "newsletter", email })
    return NextResponse.json({ ok: true, id }, { status: 200 })
  } catch (error) {
    console.error("[newsletter] failed to record signup", error)
    return NextResponse.json(
      { ok: false, error: "Could not record your signup" },
      { status: 502 },
    )
  }
}
