"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Tabs with a sliding underline indicator that animates between items.
 */
export function AnimatedTabs({
  items,
  className,
}: {
  items: string[]
  className?: string
}) {
  const [active, setActive] = React.useState(0)
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0 })

  React.useEffect(() => {
    const el = refs.current[active]
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
    }
  }, [active])

  return (
    <div className={cn("relative inline-flex gap-1 rounded-lg bg-muted p-1", className)}>
      {items.map((label, i) => (
        <button
          key={label}
          ref={(el) => { refs.current[i] = el }}
          onClick={() => setActive(i)}
          className={cn(
            "relative z-10 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            i === active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {label}
        </button>
      ))}
      <div
        className="absolute bottom-1 top-1 rounded-md bg-background shadow-sm transition-all duration-300 ease-out"
        style={{ left: indicator.left, width: indicator.width }}
      />
    </div>
  )
}
