"use client"

import * as React from "react"

import { forSchoolsAssets } from "@/components/marketing/for-schools-assets"
import { cn } from "@/lib/utils"
import { marketingTypography } from "@/lib/marketing-typography"

/**
 * Bento cards — titles/body align with Storybook `Styles/Typography` (card title ≈ H3
 * stepped down to `text-lg`; body matches benefits scroll accordion
 * (`marketingTypography.lead` + `max-w-none`). Section header matches
 * other For Schools blocks.
 */
const activeFillClass = "border-[#ffe8f5] bg-[#ffe8f5]"

export type DayToDayExperienceStep = {
  title: string
  /** Shown in the expanded (hovered/focused) card and reflected in the hero region for screen readers. */
  body: string
  imageSrc: string
  imageAlt?: string
  /**
   * Figma 1206:1373 variants 2–3 — large centered index on the hero (placeholder art).
   */
  heroOverlayNumber?: number
  /** Applied to the hero `<img>` (e.g. Figma crop for step 4 chart). */
  heroImageClassName?: string
}

export type DayToDayExperienceSectionProps = {
  steps: readonly DayToDayExperienceStep[]
  sectionTitle?: string
  sectionDescription?: string
  className?: string
}

/**
 * “Your Day-to-Day Experience with PLUS” — bento row + per-step hero.
 * Figma 1206:1373 — active panel and hero follow **hover**; click/focus for touch & keyboard.
 */
export function DayToDayExperienceSection({
  steps,
  sectionTitle = "Your Day-to-Day Experience with PLUS",
  sectionDescription = "A seamless integration designed to support your faculty and accelerate student growth.",
  className,
}: DayToDayExperienceSectionProps) {
  const [activeIndex, setActiveIndex] = React.useState(0)

  if (steps.length === 0) return null

  const safeIndex = Math.max(0, Math.min(activeIndex, steps.length - 1))
  const displayStep = steps[safeIndex]

  return (
    <div className={cn("relative w-full space-y-6 sm:space-y-8 lg:space-y-10", className)}>
      {/*
        Heading + lead + multiplication mascot — `items-center` matches Benefits / Community.
      */}
      <div className="flex w-full flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        <div className="min-w-0 flex-1 basis-0 space-y-3 sm:space-y-4 md:space-y-5">
          <h2 className="text-pretty text-lg font-bold tracking-tight text-teal-950 sm:text-2xl md:text-3xl">
            {sectionTitle}
          </h2>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            {sectionDescription}
          </p>
        </div>
        <img
          alt=""
          src={forSchoolsAssets.mathDecor.multiplication}
          className="pointer-events-none h-[clamp(4.5rem,18vw,10.9375rem)] w-[clamp(3.75rem,24vw,12rem)] shrink-0 object-contain sm:h-32 sm:w-[7.25rem] md:h-40 md:w-36 lg:h-[247px] lg:w-[222px]"
          aria-hidden
        />
      </div>

      {/* Bento row — Figma 1206:1375 / 1206:1373; xl: flex widths + min floors (active vs narrow columns), height fixed */}
      <div
        className={cn(
          "grid grid-cols-1 gap-5 md:grid-cols-2",
          "xl:flex xl:min-w-0 xl:flex-row xl:items-stretch xl:gap-5 xl:overflow-x-auto"
        )}
        role="group"
        aria-label="Experience steps"
      >
        {steps.map((step, index) => {
          const isActive = index === activeIndex
          return (
            <button
              key={step.title}
              type="button"
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              aria-pressed={isActive}
              style={{
                // xl: middle ground — active gets more space for body; inactive keep a Figma-like floor so titles wrap, not clip.
                flexGrow: isActive ? 30 : 13,
                flexShrink: 1,
                flexBasis: 0,
                minWidth: 0,
                transition: "flex-grow 320ms ease-out",
              }}
              className={cn(
                "flex cursor-pointer flex-col items-start gap-4 rounded-[30px] border-2 px-5 py-7 text-left sm:py-8",
                "h-[min(400px,78svh)] min-h-0 overflow-hidden",
                "min-w-0",
                isActive
                  ? "xl:min-w-[min(21rem,48%)]"
                  : "xl:min-w-[13.25rem]",
                "transition-colors duration-200",
                "focus-visible:ring-2 focus-visible:ring-[#d31998] focus-visible:ring-offset-2 focus-visible:outline-none",
                isActive ? activeFillClass : "border-[#d31998] bg-white"
              )}
            >
              <span
                className={cn(
                  "flex size-[58px] shrink-0 items-center justify-center rounded-full text-[32px] font-bold text-white",
                  "bg-[#d31998]"
                )}
                aria-hidden
              >
                {index + 1}
              </span>
              <span
                className={cn(
                  "w-full min-w-0 shrink-0 text-balance text-pretty font-bold leading-snug text-[#d31998]",
                  /* Narrow bentos: slightly under Storybook H3 card title (`text-xl`) */
                  "text-lg tracking-tight sm:text-xl"
                )}
              >
                {step.title}
              </span>
              {isActive ? (
                <p
                  className={cn(
                    marketingTypography.lead,
                    "max-w-none min-h-0 w-full min-w-0 flex-1 overflow-y-auto overscroll-y-contain text-pretty break-words"
                  )}
                >
                  {step.body}
                </p>
              ) : null}
            </button>
          )
        })}
      </div>

      {/* Hero — Figma 1206:1401; image swaps with active step (1206:1373). */}
      <div
        className="relative isolate min-h-[min(280px,55vw)] overflow-hidden rounded-[30px] bg-muted sm:min-h-[min(380px,50vw)] lg:min-h-[494px]"
        aria-live="polite"
        aria-label={`${displayStep.title} preview`}
      >
        <img
          key={safeIndex}
          src={displayStep.imageSrc}
          alt={displayStep.imageAlt ?? ""}
          decoding="async"
          className={cn(
            displayStep.heroImageClassName ??
              "absolute inset-0 size-full object-cover"
          )}
        />
        {displayStep.heroOverlayNumber != null ? (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <span className="flex size-[73px] items-center justify-center text-[48px] font-bold text-white drop-shadow-md">
              {displayStep.heroOverlayNumber}
            </span>
          </div>
        ) : null}
      </div>

      <p className="sr-only" key={safeIndex}>
        {displayStep.title}. {displayStep.body}
      </p>
    </div>
  )
}
