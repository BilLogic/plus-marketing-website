"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A thin progress bar fixed to the top of the viewport showing scroll progress.
 */
export function ScrollProgressBar({
  className,
}: {
  className?: string
}) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={cn("fixed top-0 left-0 z-50 h-0.5 w-full bg-muted", className)}>
      <div
        className="h-full bg-primary transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
