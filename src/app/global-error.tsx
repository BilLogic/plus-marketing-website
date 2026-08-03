"use client"

import { useEffect } from "react"
import "./globals.css"
import { trackEvent } from "@/lib/analytics"

/** Root-layout errors only; replaces the whole document, production only. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    trackEvent("js_error", {
      error_message: (error.message || "root layout error").slice(0, 100),
      error_source: `boundary:global:${error.digest ?? "root"}`.slice(0, 100),
      non_interaction: true,
    })
  }, [error])

  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground antialiased">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-muted-foreground">
          An unexpected error occurred. Please reload the page.
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Try again
        </button>
      </body>
    </html>
  )
}
