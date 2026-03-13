"use client"

import { cn } from "@/lib/utils"

/**
 * A decorative animated beam / ray that sweeps across its container.
 */
export function AnimatedBeam({
  className,
}: {
  className?: string
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: "linear-gradient(90deg, transparent 0%, oklch(0.7 0.2 250 / 0.3) 50%, transparent 100%)",
          animation: "beam-sweep 3s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes beam-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
