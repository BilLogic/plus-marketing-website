"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Wraps children in a container that magnetically follows the cursor within bounds.
 */
export function MagneticHover({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [transform, setTransform] = React.useState("translate(0px, 0px)")

  const handleMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * strength
      const y = (e.clientY - rect.top - rect.height / 2) * strength
      setTransform(`translate(${x}px, ${y}px)`)
    },
    [strength]
  )

  const handleLeave = React.useCallback(() => {
    setTransform("translate(0px, 0px)")
  }, [])

  return (
    <div
      ref={ref}
      className={cn("inline-block transition-transform duration-200 ease-out", className)}
      style={{ transform }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}
