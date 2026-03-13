"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Morphs between an array of words on an interval.
 * Uses CSS opacity transitions for a smooth crossfade.
 */
export function TextMorph({
  words = ["Design", "Build", "Ship", "Scale"],
  interval = 2000,
  className,
}: {
  words?: string[]
  interval?: number
  className?: string
}) {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  return (
    <span className={cn("relative inline-block", className)} aria-live="polite">
      {words.map((word, i) => (
        <span
          key={word}
          className={cn(
            "absolute inset-0 transition-all duration-500 ease-in-out",
            i === index
              ? "opacity-100 translate-y-0 blur-0"
              : "opacity-0 translate-y-2 blur-[2px]"
          )}
          aria-hidden={i !== index}
        >
          {word}
        </span>
      ))}
      <span className="invisible">{words[0]}</span>
    </span>
  )
}
