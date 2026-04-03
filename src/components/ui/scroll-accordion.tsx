"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export type ScrollAccordionTitleRender = (args: { isOpen: boolean }) => React.ReactNode

export type ScrollAccordionItem = {
  /** Stable id — passed to `AccordionItem value` and used for scroll sync. */
  value: string
  /**
   * Row label when collapsed. Pass a function to vary by `isOpen` (e.g. full row when
   * closed, `sr-only` when open so the expanded panel can own the visible title).
   */
  title: React.ReactNode | ScrollAccordionTitleRender
  children: React.ReactNode
}

export type PinPhase = "before" | "pinned" | "after"

export type ScrollAccordionProps = {
  items: readonly ScrollAccordionItem[]
  className?: string
  /**
   * What to measure scroll against.
   * - `viewport` — window/page scroll; collapsed rows are title-height only (default for marketing pages).
   * - `container` — scroll inside the component wrapper (fixed-height box + optional `sectionMinHeightClassName`).
   */
  scrollRoot?: "viewport" | "container"
  /**
   * `viewport-center` — tall in-flow scroll track; accordion stays **fixed and vertically centered** while
   * the viewport center moves through the track, then docks at the bottom before the next section.
   * Ignored when `scrollRoot` is `container`.
   */
  pinMode?: "none" | "viewport-center"
  /** Viewport height consumed per slide while pinned (larger = less sensitive). Default 100. */
  pinScrollVhPerItem?: number
  /** Minimum ms between slide changes while pinned (reduces abrupt flipping). Default 380. */
  pinSwitchCooldownMs?: number
  /** Classes for the outer wrapper (e.g. shadow). With `scrollRoot="container"`, merged with overflow/max-height defaults. */
  scrollContainerClassName?: string
  /**
   * Extra classes on each section wrapper. For `scrollRoot="container"`, defaults add min-height
   * so inner scroll can drive changes. For `viewport`, omit unless you need spacing (no default min-height).
   */
  sectionMinHeightClassName?: string | false
  /** Merged onto each `AccordionItem` (e.g. page-specific padding). */
  itemClassName?: string
  /** Merged onto each `AccordionTrigger` (e.g. marketing heading styles). */
  triggerClassName?: string
  /** Merged onto each `AccordionContent` inner wrapper. */
  contentClassName?: string
  /**
   * In non-pinned viewport mode, require this minimum improvement (px) before switching
   * to a different item. Higher values reduce sensitivity.
   */
  viewportSwitchThresholdPx?: number
  /** Minimum ms between non-pinned viewport item switches. */
  viewportSwitchCooldownMs?: number
  /**
   * In `scrollRoot="viewport"` mode, gently recenters the newly opened row so the expanded
   * content sits near viewport center. Does not pin/fix the whole accordion.
   */
  centerActiveInViewport?: boolean
  /** Pixel offset applied when centering (useful for sticky headers). */
  centerActiveOffsetPx?: number
  /** Minimum ms between programmatic center scrolls. */
  centerActiveCooldownMs?: number
  /** Hide chevron indicators on each row trigger (Figma-aligned marketing accordions). */
  hideTriggerChevron?: boolean
}

/**
 * Map scroll position (0…n) to slide index. Offset shifts boundaries so switches happen
 * mid-segment (with `pinSwitchCooldownMs` this feels less twitchy than raw `floor`).
 */
function posToSlideIndex(posInZones: number, n: number): number {
  return Math.min(Math.max(Math.round(posInZones - 0.35), 0), n - 1)
}

/**
 * **Scroll Accordion** — same Accordion visuals; one panel open at a time.
 * With `pinMode="viewport-center"`, a tall track pins the accordion in the viewport center until you scroll past it.
 * With `scrollRoot="viewport"` (default) and no pin, the open item follows in-flow sections nearest the viewport center.
 * With `scrollRoot="container"`, scroll happens inside the bordered box (Storybook).
 */
function ScrollAccordion({
  items,
  className,
  scrollRoot = "viewport",
  pinMode = "none",
  pinScrollVhPerItem = 100,
  pinSwitchCooldownMs = 380,
  scrollContainerClassName,
  sectionMinHeightClassName,
  itemClassName,
  triggerClassName,
  contentClassName,
  viewportSwitchThresholdPx = 48,
  viewportSwitchCooldownMs = 260,
  centerActiveInViewport = false,
  centerActiveOffsetPx = -24,
  centerActiveCooldownMs = 320,
  hideTriggerChevron = false,
}: ScrollAccordionProps) {
  const containerScrollRef = React.useRef<HTMLDivElement>(null)
  const trackOuterRef = React.useRef<HTMLDivElement>(null)
  const sectionRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const pinnedIndexRef = React.useRef(0)
  const lastPinSwitchRef = React.useRef(0)
  const pendingPinIndexRef = React.useRef<number | null>(null)
  const pinSwitchRafRef = React.useRef(0)
  const lastCenterScrollRef = React.useRef(0)
  const lastViewportSwitchRef = React.useRef(0)

  const [openValues, setOpenValues] = React.useState<string[]>(() =>
    items[0] ? [items[0].value] : []
  )
  const [pinPhase, setPinPhase] = React.useState<PinPhase>("before")

  const usePin =
    pinMode === "viewport-center" && scrollRoot === "viewport" && items.length > 0

  const resolvedSectionMinHeight =
    sectionMinHeightClassName === false
      ? undefined
      : sectionMinHeightClassName ??
        (scrollRoot === "container"
          ? "min-h-[min(72vh,420px)]"
          : undefined)

  const setSectionRef = React.useCallback((index: number, el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el
  }, [])

  const applyOpenIndex = React.useCallback(
    (index: number) => {
      const v = items[index]?.value
      if (v == null) return
      setOpenValues((prev) => (prev[0] === v ? prev : [v]))
    },
    [items]
  )

  const centerSectionInViewport = React.useCallback(
    (index: number) => {
      if (!centerActiveInViewport || scrollRoot !== "viewport") return
      const el = sectionRefs.current[index]
      if (!el) return
      const rect = el.getBoundingClientRect()
      const centerDelta = rect.top + rect.height / 2 - window.innerHeight / 2
      if (Math.abs(centerDelta) < 36) return
      const now = performance.now()
      if (now - lastCenterScrollRef.current < centerActiveCooldownMs) return
      lastCenterScrollRef.current = now
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      window.scrollTo({
        top: window.scrollY + centerDelta + centerActiveOffsetPx,
        behavior: prefersReduced ? "auto" : "smooth",
      })
    },
    [
      centerActiveCooldownMs,
      centerActiveInViewport,
      centerActiveOffsetPx,
      scrollRoot,
    ]
  )

  /** Non-pin: nearest in-flow section to reference center. */
  const syncOpenPanelToScroll = React.useCallback(() => {
    if (items.length === 0 || usePin) return

    let centerY: number
    if (scrollRoot === "viewport") {
      centerY = window.innerHeight / 2
    } else {
      const root = containerScrollRef.current
      if (!root) return
      const rootRect = root.getBoundingClientRect()
      centerY = rootRect.top + rootRect.height / 2
    }

    let bestValue: string | null = null
    let bestIndex = -1
    let bestDist = Infinity
    let openIndex = -1
    let openDist = Infinity

    items.forEach((item, i) => {
      const el = sectionRefs.current[i]
      if (!el) return
      const rect = el.getBoundingClientRect()
      const mid = rect.top + rect.height / 2
      const dist = Math.abs(mid - centerY)
      if (openValues[0] === item.value) {
        openIndex = i
        openDist = dist
      }
      if (dist < bestDist) {
        bestDist = dist
        bestValue = item.value
        bestIndex = i
      }
    })

    if (bestValue != null) {
      const nextOpen = bestValue
      if (scrollRoot === "viewport" && openIndex >= 0 && bestIndex !== openIndex) {
        const improvement = openDist - bestDist
        if (improvement < viewportSwitchThresholdPx) return
        const now = performance.now()
        if (now - lastViewportSwitchRef.current < viewportSwitchCooldownMs) return
        lastViewportSwitchRef.current = now
      }
      setOpenValues((prev) => {
        if (prev[0] === nextOpen) return prev
        if (bestIndex >= 0) {
          requestAnimationFrame(() => centerSectionInViewport(bestIndex))
        }
        return [nextOpen]
      })
    }
  }, [
    centerSectionInViewport,
    items,
    openValues,
    scrollRoot,
    usePin,
    viewportSwitchCooldownMs,
    viewportSwitchThresholdPx,
  ])

  const syncPinnedToScroll = React.useCallback(() => {
    if (!usePin) return
    const outer = trackOuterRef.current
    if (!outer) return

    const rect = outer.getBoundingClientRect()
    const cy = window.innerHeight / 2
    const n = items.length

    let nextPhase: PinPhase
    if (rect.bottom < cy) nextPhase = "after"
    else if (rect.top > cy) nextPhase = "before"
    else nextPhase = "pinned"

    setPinPhase((p) => (p === nextPhase ? p : nextPhase))

    const trackHeight = Math.max(rect.height, 1)
    const yProgress = (cy - rect.top) / trackHeight
    const clamped = Math.max(0, Math.min(1, yProgress))
    const posInZones = clamped * n

    if (nextPhase === "before") {
      pinnedIndexRef.current = 0
      pendingPinIndexRef.current = null
      applyOpenIndex(0)
      return
    }
    if (nextPhase === "after") {
      pinnedIndexRef.current = n - 1
      pendingPinIndexRef.current = null
      applyOpenIndex(n - 1)
      return
    }

    const ideal = posToSlideIndex(posInZones, n)

    if (ideal === pinnedIndexRef.current) {
      pendingPinIndexRef.current = null
      return
    }

    const now = performance.now()
    if (now - lastPinSwitchRef.current >= pinSwitchCooldownMs) {
      lastPinSwitchRef.current = now
      pinnedIndexRef.current = ideal
      pendingPinIndexRef.current = null
      applyOpenIndex(ideal)
      return
    }

    pendingPinIndexRef.current = ideal
    if (pinSwitchRafRef.current) cancelAnimationFrame(pinSwitchRafRef.current)
    pinSwitchRafRef.current = requestAnimationFrame(() => {
      pinSwitchRafRef.current = 0
      const pending = pendingPinIndexRef.current
      if (pending == null) return
      const t = performance.now()
      if (t - lastPinSwitchRef.current >= pinSwitchCooldownMs) {
        lastPinSwitchRef.current = t
        pinnedIndexRef.current = pending
        pendingPinIndexRef.current = null
        applyOpenIndex(pending)
      }
    })
  }, [applyOpenIndex, items.length, pinSwitchCooldownMs, usePin])

  React.useEffect(() => {
    let raf = 0
    const onScrollOrResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(usePin ? syncPinnedToScroll : syncOpenPanelToScroll)
    }

    if (usePin) {
      window.addEventListener("scroll", onScrollOrResize, { passive: true })
      window.addEventListener("resize", onScrollOrResize, { passive: true })
      syncPinnedToScroll()
      return () => {
        cancelAnimationFrame(raf)
        cancelAnimationFrame(pinSwitchRafRef.current)
        window.removeEventListener("scroll", onScrollOrResize)
        window.removeEventListener("resize", onScrollOrResize)
      }
    }

    if (scrollRoot === "viewport") {
      window.addEventListener("scroll", onScrollOrResize, { passive: true })
      window.addEventListener("resize", onScrollOrResize, { passive: true })
      syncOpenPanelToScroll()
      return () => {
        cancelAnimationFrame(raf)
        window.removeEventListener("scroll", onScrollOrResize)
        window.removeEventListener("resize", onScrollOrResize)
      }
    }

    const root = containerScrollRef.current
    if (!root) return
    root.addEventListener("scroll", onScrollOrResize, { passive: true })
    window.addEventListener("resize", onScrollOrResize, { passive: true })
    syncOpenPanelToScroll()
    return () => {
      cancelAnimationFrame(raf)
      root.removeEventListener("scroll", onScrollOrResize)
      window.removeEventListener("resize", onScrollOrResize)
    }
  }, [scrollRoot, syncOpenPanelToScroll, syncPinnedToScroll, usePin])

  if (items.length === 0) return null

  const isContainer = scrollRoot === "container"

  const renderItemTitle = (
    title: ScrollAccordionItem["title"],
    isItemOpen: boolean
  ) =>
    typeof title === "function" ? title({ isOpen: isItemOpen }) : title

  const accordion = (
    <Accordion
      value={openValues}
      onValueChange={(next) =>
        setOpenValues(
          (next ?? []).filter((v): v is string => typeof v === "string")
        )
      }
      className={cn(
        "flex w-full flex-col rounded-xl bg-transparent",
        className
      )}
    >
      {items.map((item, index) => (
        <div
          key={item.value}
          ref={(el) => setSectionRef(index, el)}
          className={cn("scroll-mt-4", resolvedSectionMinHeight)}
        >
          <AccordionItem
            value={item.value}
            className={cn(
              "border-border/60 px-4 not-last:border-b last:border-b-0 sm:px-5",
              itemClassName
            )}
          >
            <AccordionTrigger
              hideChevron={hideTriggerChevron}
              className={cn("py-4 text-left sm:py-5", triggerClassName)}
            >
              {renderItemTitle(item.title, openValues[0] === item.value)}
            </AccordionTrigger>
            <AccordionContent
              className={cn("pb-5 pt-0 sm:pb-6", contentClassName)}
            >
              {item.children}
            </AccordionContent>
          </AccordionItem>
        </div>
      ))}
    </Accordion>
  )

  if (usePin) {
    const trackMinHeight = `calc(${items.length} * ${pinScrollVhPerItem}vh)`
    return (
      <div
        ref={trackOuterRef}
        data-slot="scroll-accordion"
        data-scroll-root="viewport"
        data-pin-mode="viewport-center"
        className={cn("relative w-full", scrollContainerClassName)}
        style={{ minHeight: trackMinHeight }}
      >
        <div
          className={cn(
            "w-full max-w-3xl transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
            pinPhase === "pinned" &&
              "pointer-events-none fixed left-1/2 top-1/2 z-30 w-[min(100%-2rem,48rem)] -translate-x-1/2 -translate-y-1/2 px-4 sm:px-0",
            pinPhase === "before" && "relative z-10 mx-auto",
            pinPhase === "after" &&
              "absolute bottom-8 left-1/2 z-10 w-[min(100%-2rem,48rem)] -translate-x-1/2 px-4 sm:px-0"
          )}
        >
          <div
            className={cn(pinPhase === "pinned" && "pointer-events-auto")}
          >
            {accordion}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={isContainer ? containerScrollRef : undefined}
      data-slot="scroll-accordion"
      data-scroll-root={scrollRoot}
      className={cn(
        isContainer &&
          "max-h-[min(85vh,720px)] overflow-y-auto overscroll-contain",
        scrollContainerClassName
      )}
    >
      {accordion}
    </div>
  )
}

export { ScrollAccordion }
