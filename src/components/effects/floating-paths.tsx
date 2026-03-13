"use client"

import { cn } from "@/lib/utils"

/**
 * Animated SVG paths that float and undulate in the background.
 */
export function FloatingPaths({
  pathCount = 4,
  className,
}: {
  pathCount?: number
  className?: string
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden opacity-30", className)}>
      <svg className="h-full w-full" viewBox="0 0 800 600" preserveAspectRatio="none">
        {Array.from({ length: pathCount }, (_, i) => {
          const yOffset = 100 + i * 120
          const dur = 6 + i * 2
          return (
            <path
              key={i}
              d={`M-100,${yOffset} C200,${yOffset - 80} 400,${yOffset + 80} 600,${yOffset - 40} S900,${yOffset + 60} 1000,${yOffset}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeOpacity={0.4 - i * 0.08}
              style={{
                animation: `float-path ${dur}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          )
        })}
      </svg>
      <style>{`
        @keyframes float-path {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-20px) translateX(15px); }
        }
      `}</style>
    </div>
  )
}
