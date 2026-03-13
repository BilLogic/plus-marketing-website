"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Text whose gradient fill reveals as the user scrolls.
 * Uses IntersectionObserver for a lightweight approach (no Framer Motion needed).
 */
export function TextGradientScroll({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      const raw = 1 - (rect.top - windowH * 0.3) / (windowH * 0.6)
      setProgress(Math.max(0, Math.min(1, raw)))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <span
      ref={ref}
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-muted-foreground/30",
        className
      )}
      style={{
        backgroundSize: "200% 100%",
        backgroundPosition: `${100 - progress * 100}% 0`,
        transition: "background-position 0.1s linear",
      }}
    >
      {children}
    </span>
  )
}
