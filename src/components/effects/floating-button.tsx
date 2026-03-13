"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A button that gently floats up and down with a CSS animation.
 */
export function FloatingButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <>
      <button
        className={cn(
          "animate-float rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-shadow hover:shadow-xl",
          className
        )}
        {...props}
      >
        {children}
      </button>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </>
  )
}
