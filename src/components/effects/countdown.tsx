"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A countdown timer that ticks down to zero from a given number of seconds.
 */
export function Countdown({
  seconds: initialSeconds = 60,
  onComplete,
  className,
}: {
  seconds?: number
  onComplete?: () => void
  className?: string
}) {
  const [remaining, setRemaining] = React.useState(initialSeconds)

  React.useEffect(() => {
    if (remaining <= 0) {
      onComplete?.()
      return
    }
    const id = setTimeout(() => setRemaining((r) => r - 1), 1000)
    return () => clearTimeout(id)
  }, [remaining, onComplete])

  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60

  return (
    <span className={cn("tabular-nums font-mono", className)}>
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </span>
  )
}
