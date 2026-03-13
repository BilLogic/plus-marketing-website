"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Wraps children and shows an expanding ripple on click.
 */
export function RippleEffect({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [ripples, setRipples] = React.useState<{ x: number; y: number; id: number }[]>([])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples((prev) => [...prev, { x, y, id }])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600)
  }

  return (
    <div className={cn("relative overflow-hidden", className)} onClick={handleClick}>
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-foreground/20 animate-ripple-expand"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      <style>{`
        @keyframes ripple-expand {
          to { width: 300px; height: 300px; opacity: 0; }
        }
        .animate-ripple-expand {
          animation: ripple-expand 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
