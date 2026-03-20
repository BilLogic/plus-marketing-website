"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Animated counter that counts up from 0 to a target value.
 * Starts when visible via IntersectionObserver.
 */
export function CounterAnimation({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
  className,
}: {
  target: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const [value, setValue] = React.useState(0)
  const [hasStarted, setHasStarted] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) setHasStarted(true)
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStarted])

  React.useEffect(() => {
    if (!hasStarted) return
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [hasStarted, target, duration])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  )
}
