"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Applies a 3D tilt effect on hover based on cursor position.
 */
export function TiltEffect({
  children,
  maxTilt = 15,
  className,
}: {
  children: React.ReactNode
  maxTilt?: number
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [style, setStyle] = React.useState<React.CSSProperties>({})

  const handleMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setStyle({
        transform: `perspective(600px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg)`,
        transition: "transform 0.1s ease-out",
      })
    },
    [maxTilt]
  )

  const handleLeave = React.useCallback(() => {
    setStyle({ transform: "perspective(600px) rotateY(0deg) rotateX(0deg)", transition: "transform 0.4s ease-out" })
  }, [])

  return (
    <div
      ref={ref}
      className={cn("inline-block", className)}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}
