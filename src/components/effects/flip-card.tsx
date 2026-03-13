"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A card that flips 180° on hover to reveal its back face.
 */
export function FlipCard({
  front,
  back,
  className,
}: {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("group perspective-[800px]", className)}>
      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 rounded-xl border bg-card p-6 [backface-visibility:hidden]">
          {front}
        </div>
        <div className="absolute inset-0 rounded-xl border bg-card p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </div>
  )
}
