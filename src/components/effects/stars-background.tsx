"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A twinkling stars background rendered with CSS animations.
 */
export function StarsBackground({
  count = 60,
  className,
}: {
  count?: number
  className?: string
}) {
  const stars = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
      })),
    [count]
  )

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-foreground"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animation: `star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.3); }
        }
      `}</style>
    </div>
  )
}
