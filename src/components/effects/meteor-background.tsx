"use client"

import { memo, useEffect, useMemo, useState } from "react"
import { motion, useAnimationControls } from "framer-motion"

import { cn } from "@/lib/utils"

type MeteorBackgroundProps = {
  density?: number
  className?: string
}

/** Bundui-inspired meteor shower background for high-impact hero sections. */
const MeteorBackground = memo(function MeteorBackground({
  density = 12,
  className,
}: MeteorBackgroundProps) {
  const controls = useAnimationControls()
  const [mounted, setMounted] = useState(false)

  const meteors = useMemo(
    () =>
      Array.from({ length: density }, (_, index) => ({
        id: index,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 2,
        top: Math.random() * 100,
        left: Math.random() * 100,
      })),
    [density]
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    controls.start("visible")
  }, [controls, mounted])

  if (!mounted) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] bg-gradient-to-b from-background via-background/80 to-background",
        className
      )}
    >
      {meteors.map((meteor) => (
        <motion.div
          key={meteor.id}
          className="absolute h-px w-24 rounded-full bg-gradient-to-r from-transparent via-primary/80 to-primary"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {
              opacity: 0,
              x: "-10%",
              y: "-10%",
            },
            visible: {
              opacity: [0, 1, 0],
              x: ["0%", "140%"],
              y: ["0%", "140%"],
              transition: {
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeOut",
              },
            },
          }}
          transition={{
            delay: meteor.delay,
            duration: meteor.duration,
          }}
          style={{
            top: `${meteor.top}%`,
            left: `${meteor.left}%`,
          }}
        />
      ))}
    </div>
  )
})

export { MeteorBackground }

