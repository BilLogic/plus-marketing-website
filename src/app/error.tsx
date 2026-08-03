"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/analytics"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Boundary-caught render errors don't hit the window listeners — report here.
    trackEvent("js_error", {
      error_message: (error.message || "render error").slice(0, 100),
      error_source: `boundary:${error.digest ?? "route"}`.slice(0, 100),
      non_interaction: true,
    })
  }, [error])

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        Try again
      </button>
    </main>
  )
}
