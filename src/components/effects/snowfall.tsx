"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Animated snowfall background with CSS-only particles.
 */
export function Snowfall({
  count = 40,
  className,
}: {
  count?: number
  className?: string
}) {
  const flakes = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 6,
        size: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    [count]
  )

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {flakes.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full bg-foreground/80"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animation: `snowfall-drop ${f.duration}s linear ${f.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes snowfall-drop {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(calc(100vh + 10px)) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
