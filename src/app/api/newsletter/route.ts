import { NextRequest, NextResponse } from "next/server"

type NewsletterPayload = {
  email: string
}

/**
 * Handle newsletter subscription requests.
 *
 * Expects a JSON body with `email`.
 * Designed as a stable primitive for agents and future backend wiring.
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

  const { email } = data as Partial<NewsletterPayload>

  if (!email) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing required fields",
        missing: { email: !email },
      },
      { status: 400 }
    )
  }

  const id = `sub_${Date.now()}`

  return NextResponse.json(
    {
      ok: true,
      id,
      receivedAt: new Date().toISOString(),
      payload: { email },
    },
    { status: 200 }
  )
}

