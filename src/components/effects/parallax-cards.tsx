"use client"

import type { ReactNode } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"

type ParallaxCardProps = {
  title: string
  description: string
  index: number
}

type ParallaxCardsProps = {
  items: ParallaxCardProps[]
  className?: string
}

/** Bundui-inspired parallax card grid for feature or stat callouts. */
const ParallaxCards = ({ items, className }: ParallaxCardsProps) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [0, 1], [8, -8])
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8])

  return (
    <motion.div
      className={cn(
        "grid gap-4 rounded-3xl border border-border/70 bg-card/70 p-5 md:grid-cols-3",
        className
      )}
      style={{
        perspective: 1000,
      }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - bounds.left) / bounds.width
        const y = (event.clientY - bounds.top) / bounds.height
        mouseX.set(x)
        mouseY.set(y)
      }}
      onMouseLeave={() => {
        mouseX.set(0.5)
        mouseY.set(0.5)
      }}
    >
      {items.map((item) => (
        <motion.article
          key={item.title}
          className="rounded-2xl border border-border/60 bg-background/60 p-4 text-sm shadow-sm"
          style={{
            rotateX,
            rotateY,
          }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {String(item.index).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-sm font-semibold tracking-tight">{item.title}</h3>
          <p className="mt-2 text-xs text-muted-foreground">{item.description}</p>
        </motion.article>
      ))}
    </motion.div>
  )
}

type ParallaxCardsShellProps = {
  title?: ReactNode
  description?: ReactNode
  items: ParallaxCardProps[]
}

/** Shell that pairs a Bundui-style heading with the parallax card grid. */
const ParallaxCardsSection = ({
  title = "Motion-rich feature grid",
  description = "Layer subtle parallax over your feature cards to add depth without overwhelming the content.",
  items,
}: ParallaxCardsShellProps) => {
  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Bundui-inspired
        </p>
        <h2 className="text-balance text-xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </header>
      <ParallaxCards items={items} />
    </section>
  )
}

export { ParallaxCards, ParallaxCardsSection }

