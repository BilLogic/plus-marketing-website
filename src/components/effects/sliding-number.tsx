"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A number display where each digit slides in from below on change.
 */
export function SlidingNumber({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const digits = String(value).split("")

  return (
    <span className={cn("inline-flex overflow-hidden tabular-nums", className)}>
      {digits.map((digit, i) => (
        <span key={`${i}-${digit}`} className="inline-block animate-slide-in">
          {digit}
        </span>
      ))}
      <style>{`
        @keyframes slide-in {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </span>
  )
}
