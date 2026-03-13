"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Infinite-scrolling marquee that duplicates children for seamless looping.
 */
export function Marquee({
  children,
  speed = 30,
  pauseOnHover = true,
  reverse = false,
  className,
}: {
  children: React.ReactNode
  speed?: number
  pauseOnHover?: boolean
  reverse?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:1rem]",
        pauseOnHover && "[&:hover_[data-marquee]]:animation-play-state-paused",
        className
      )}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          data-marquee
          className="flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)]"
          style={{
            animation: `marquee-scroll ${speed}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
          aria-hidden={i === 1}
        >
          {children}
        </div>
      ))}
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - var(--gap))); }
        }
        [data-marquee]:hover { animation-play-state: paused; }
      `}</style>
    </div>
  )
}
