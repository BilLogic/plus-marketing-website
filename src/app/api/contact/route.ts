import { NextRequest, NextResponse } from "next/server"

type ContactPayload = {
  name: string
  email: string
  message: string
}

/**
 * Handle contact form submissions.
 *
 * Expects a JSON body with `name`, `email`, and `message`.
 * This is intentionally minimal and side‑effect free for now so that
 * agents and future backends have a stable primitive to build on.
 */
export const POST = async (request: NextRequest) => {
  let data: unknown

  try {
    data = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    )
  }

  const { name, email, message } = data as Partial<ContactPayload>

  if (!name || !email || !message) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing required fields",
        missing: {
          name: !name,
          email: !email,
          message: !message,
        },
      },
      { status: 400 }
    )
  }

  const id = `lead_${Date.now()}`

  return NextResponse.json(
    {
      ok: true,
      id,
      receivedAt: new Date().toISOString(),
      payload: { name, email, message },
    },
    { status: 200 }
  )
}

