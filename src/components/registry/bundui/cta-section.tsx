import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { marketingTypography } from "@/lib/marketing-typography"
import { Button } from "@/components/ui/button"

type BunduiCtaSectionProps = {
  eyebrow?: ReactNode
  heading?: ReactNode
  body?: ReactNode
  primaryLabel?: string
  /** Omit or set to empty to hide the secondary button. */
  secondaryLabel?: string | null
  className?: string
}

/** Bundui-inspired CTA section with stacked copy and dual actions. */
const BunduiCtaSection = ({
  eyebrow = "Ready to launch?",
  heading = "Turn your marketing site into a living system.",
  body = "Connect registry-driven blocks, Storybook, and production so every experiment ships with confidence.",
  primaryLabel = "Get started",
  secondaryLabel = "Talk to sales",
  className,
}: BunduiCtaSectionProps) => {
  const showSecondary = secondaryLabel != null && secondaryLabel !== ""
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-tr from-background via-background/95 to-primary/5 p-5 sm:p-6",
        className
      )}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </p>
          <h2 className={marketingTypography.h2}>{heading}</h2>
          <p className={marketingTypography.lead}>{body}</p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg">{primaryLabel}</Button>
            {showSecondary && (
              <Button size="lg" variant="outline">
                {secondaryLabel}
              </Button>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Inspired by Bundui marketing CTA sections. Built with Plus tokens.
          </p>
        </div>
      </div>
    </section>
  )
}

export { BunduiCtaSection }

