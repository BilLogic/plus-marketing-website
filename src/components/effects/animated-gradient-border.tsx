"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A card wrapper with a rotating conic-gradient border animation.
 */
export function AnimatedGradientBorder({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("relative rounded-xl p-[2px]", className)}>
      <div
        className="absolute inset-0 rounded-xl animate-spin-slow"
        style={{
          background:
            "conic-gradient(from var(--angle, 0deg), oklch(0.7 0.2 250), oklch(0.6 0.15 300), oklch(0.7 0.2 200), oklch(0.7 0.2 250))",
          animation: "gradient-border-spin 4s linear infinite",
        }}
      />
      <div className="relative rounded-[10px] bg-background p-4">
        {children}
      </div>
      <style>{`
        @keyframes gradient-border-spin {
          to { --angle: 360deg; }
        }
        @property --angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
      `}</style>
    </div>
  )
}
