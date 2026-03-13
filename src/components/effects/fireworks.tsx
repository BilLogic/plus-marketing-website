"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Animated firework bursts rendered with CSS keyframes.
 */
export function Fireworks({
  count = 5,
  className,
}: {
  count?: number
  className?: string
}) {
  const bursts = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: 15 + Math.random() * 70,
        y: 10 + Math.random() * 50,
        delay: Math.random() * 3,
        hue: Math.floor(Math.random() * 360),
        duration: 1.5 + Math.random() * 1,
      })),
    [count]
  )

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {bursts.map((b) =>
        Array.from({ length: 8 }, (_, j) => {
          const angle = (j / 8) * 360
          const rad = (angle * Math.PI) / 180
          const dist = 30 + Math.random() * 40
          return (
            <div
              key={`${b.id}-${j}`}
              className="absolute rounded-full"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: 4,
                height: 4,
                backgroundColor: `oklch(0.7 0.2 ${b.hue + j * 20})`,
                animation: `firework-particle ${b.duration}s ease-out ${b.delay}s infinite`,
                ["--dx" as string]: `${Math.cos(rad) * dist}px`,
                ["--dy" as string]: `${Math.sin(rad) * dist}px`,
              }}
            />
          )
        })
      )}
      <style>{`
        @keyframes firework-particle {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
