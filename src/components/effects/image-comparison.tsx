"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Before/after image comparison slider.
 * Drag the handle to reveal the "after" image.
 */
export function ImageComparison({
  beforeSrc = "https://placehold.co/600x400/1a1a2e/e0e0e0?text=Before",
  afterSrc = "https://placehold.co/600x400/0f3460/e0e0e0?text=After",
  className,
}: {
  beforeSrc?: string
  afterSrc?: string
  className?: string
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState(50)
  const dragging = React.useRef(false)

  const handleMove = React.useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.max(0, Math.min(100, pct)))
  }, [])

  React.useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return
      const x = "touches" in e ? e.touches[0].clientX : e.clientX
      handleMove(x)
    }
    const onUp = () => { dragging.current = false }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    window.addEventListener("touchmove", onMove)
    window.addEventListener("touchend", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("touchend", onUp)
    }
  }, [handleMove])

  return (
    <div
      ref={containerRef}
      className={cn("relative select-none overflow-hidden rounded-xl", className)}
      style={{ aspectRatio: "3/2" }}
    >
      <img src={afterSrc} alt="After" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={beforeSrc} alt="Before" className="h-full w-full object-cover" style={{ width: containerRef.current?.offsetWidth }} />
      </div>
      <div
        className="absolute top-0 bottom-0 z-10 flex w-1 cursor-col-resize items-center justify-center bg-white/80"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        onMouseDown={() => { dragging.current = true }}
        onTouchStart={() => { dragging.current = true }}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 3L2 8L5 13M11 3L14 8L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
