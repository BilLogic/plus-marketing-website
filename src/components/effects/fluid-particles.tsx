"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Soft, fluid-like particles that drift and pulse.
 */
export function FluidParticles({
  count = 20,
  className,
}: {
  count?: number
  className?: string
}) {
  const particles = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 60 + Math.random() * 120,
        hue: 230 + Math.random() * 40,
        delay: Math.random() * 4,
        duration: 8 + Math.random() * 8,
      })),
    [count]
  )

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `oklch(0.5 0.12 ${p.hue} / 0.15)`,
            animation: `fluid-drift ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes fluid-drift {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -20px) scale(1.15); }
        }
      `}</style>
    </div>
  )
}
