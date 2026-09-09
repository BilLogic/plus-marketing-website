import { NextRequest, NextResponse } from "next/server"

import { isLeadDestinationConfigured, recordLead } from "@/lib/notion/leads"

type ContactPayload = { name: string; email: string; message: string }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Handle contact form submissions.
 *
 * As with the newsletter route, this previously accepted a payload and
 * delivered it nowhere. It now persists to Notion and fails loudly if it
 * cannot, so no one is told their message was received when it was not.
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

  const { name, email, message } = data as Partial<ContactPayload>

  if (!name || !email || !message) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing required fields",
        missing: { name: !name, email: !email, message: !message },
      },
      { status: 400 },
    )
  }

  if (!EMAIL.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email address is required" },
      { status: 400 },
    )
  }

  if (!isLeadDestinationConfigured("contact")) {
    return NextResponse.json(
      { ok: false, error: "The contact form is not currently available" },
      { status: 503 },
    )
  }

  try {
    const { id } = await recordLead({ kind: "contact", name, email, message })
    return NextResponse.json({ ok: true, id }, { status: 200 })
  } catch (error) {
    console.error("[contact] failed to record submission", error)
    return NextResponse.json(
      { ok: false, error: "Could not send your message" },
      { status: 502 },
    )
  }
}
