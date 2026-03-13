"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Renders a trail of fading dots that follow the mouse cursor.
 */
export function MouseTrail({
  dotCount = 12,
  className,
}: {
  dotCount?: number
  className?: string
}) {
  const [dots, setDots] = React.useState<{ x: number; y: number; id: number }[]>([])
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()
      setDots((prev) => [...prev.slice(-(dotCount - 1)), { x, y, id }])
    },
    [dotCount]
  )

  React.useEffect(() => {
    if (dots.length === 0) return
    const id = setTimeout(() => setDots((prev) => prev.slice(1)), 80)
    return () => clearTimeout(id)
  }, [dots])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMove}
    >
      {dots.map((dot, i) => (
        <div
          key={dot.id}
          className="pointer-events-none absolute rounded-full bg-primary"
          style={{
            left: dot.x,
            top: dot.y,
            width: 6 + (i / dots.length) * 6,
            height: 6 + (i / dots.length) * 6,
            opacity: (i + 1) / dots.length,
            transform: "translate(-50%, -50%)",
            transition: "opacity 0.1s",
          }}
        />
      ))}
    </div>
  )
}
