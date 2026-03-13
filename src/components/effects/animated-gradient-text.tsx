"use client"

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type AnimatedGradientTextProps = {
  children: ReactNode
  className?: string
}

/** Bundui-inspired animated gradient headline effect. */
const AnimatedGradientText = ({ children, className }: AnimatedGradientTextProps) => {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-[length:200%_200%] bg-clip-text text-3xl font-semibold tracking-tight text-transparent motion-safe:animate-[gradient-x_4s_ease_infinite]",
        className
      )}
    >
      {children}
    </span>
  )
}

export { AnimatedGradientText }

