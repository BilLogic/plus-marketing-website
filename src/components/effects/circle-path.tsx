"use client"

import { cn } from "@/lib/utils"

/**
 * An animated SVG circle that draws itself along a circular path.
 */
export function CirclePath({
  size = 120,
  strokeWidth = 3,
  duration = 2,
  className,
}: {
  size?: number
  strokeWidth?: number
  duration?: number
  className?: string
}) {
  const r = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * r

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("", className)}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        opacity={0.15}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        className="animate-draw-circle"
        style={{
          animation: `draw-circle ${duration}s ease-in-out infinite`,
        }}
      />
      <style>{`
        @keyframes draw-circle {
          0% { stroke-dashoffset: ${circumference}; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -${circumference}; }
        }
      `}</style>
    </svg>
  )
}
