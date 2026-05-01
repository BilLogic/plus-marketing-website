"use client"

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

import { ArrowRight, School } from "lucide-react"
import Link from "next/link"

import {
  MARKETING_CARD_ICON_DIAMETER_PX,
  marketingCardIconAssetFrameClass,
  marketingCardIconCircleClass,
  marketingCardIconTitleRowOffsetClass,
  marketingCardLhAlignedHeaderRowClass,
  marketingCardLucideGlyphClass,
  marketingCardPaddingClass,
  marketingFinalCtaButtonRowClass,
  marketingFinalCtaLeadClass,
  marketingFinalCtaPrimaryLinkClass,
  marketingHeroCtaPrimaryLinkClass,
  marketingFinalCtaShellClass,
  marketingFinalCtaTitleClass,
  marketingCardStackGapClass,
  marketingSectionLeadColorClass,
  marketingSectionVerticalGapClass,
} from "@/lib/marketing-section-layout"
import { cn } from "@/lib/utils"
import { BenefitsAccordionIcon } from "@/components/marketing/benefit-accordion-icons"
import type { SuccessStory } from "@/lib/notion/types"
import {
  notionSuccessStoryPublicReadUrl,
  splitSuccessStoryQuote,
} from "@/lib/success-stories/notion-public-read-url"
import { forSchoolsAssets } from "@/components/marketing/for-schools-assets"
import { forTutorsAssets } from "@/components/marketing/for-tutors-assets"
import { FOR_SCHOOLS_BENEFITS_ITEMS } from "@/lib/marketing/for-schools-benefits"
import { useMarketingStickyPanelTop } from "@/lib/use-marketing-sticky-panel-top"
import { marketingTypography } from "@/lib/marketing-typography"
import { forSchoolsSectionIds } from "@/lib/plus-footer-ia"

/** Match `get-involved-sections` / `for-tutors-sections` section headers (`sectionH2` / `sectionLead`). */
const schoolsSectionH2 =
  "text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl"
/** Same breakpoint rhythm as `marketingTypography.sectionLead` + For Tutors intro copy (not hero). */
const schoolsSectionLead = cn(
  "w-full max-w-none text-base lg:text-lg",
  marketingSectionLeadColorClass,
)

/**
 * Card title + body — same responsive type scale as Benefits of PLUS (`SchoolsTrainingSection`
 * stacked cards + sticky column), for sections that should read consistently with Benefits.
 */
const schoolsBenefitsCardTitleClass =
  "text-pretty text-lg font-bold leading-tight tracking-tight sm:text-xl lg:text-2xl"
const schoolsBenefitsCardBodyClass =
  "text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg"

/** Section intros — grid + in-flow decor (`grid-cols-1` below `md` avoids implicit track bugs + overflow). */
const schoolsSectionHeaderGridClass =
  "relative grid w-full min-w-0 grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
/** Square header decors — `marketingSectionHeaderDecorImgClass` footprint without absolute. */
const schoolsSectionHeaderSquareDecorClass = cn(
  "pointer-events-none aspect-square shrink-0 object-contain opacity-90 select-none",
  "hidden md:block md:w-[110px] lg:w-[124px]",
)
/** Oversight hero decor — wide asset; `auto` column sizes from intrinsic width. */
const schoolsSectionHeaderOversightDecorClass = cn(
  "pointer-events-none hidden h-[104px] w-auto max-w-[150px] shrink-0 object-contain opacity-90 select-none md:block md:h-[118px] md:max-w-[170px]",
)

export const SchoolsHeroSection = () => {
  /**
   * Peak sizes match pre–overlap-fix art (`lg` 110px, `xl` 150px). When the section is
   * narrow, `min(...)` shrinks so sprites stay inside the side margin past `max-w-3xl`.
   */
  const heroDecorBase =
    "pointer-events-none absolute z-0 block h-auto w-auto opacity-90 select-none " +
    "hidden lg:block " +
    "lg:max-w-[min(110px,max(4.5rem,calc((100%-48rem)/2-2rem)))] " +
    "xl:max-w-[min(150px,max(4.5rem,calc((100%-48rem)/2-2rem)))]"
  /** ~35rem reserves space for the wider `xl` cap (150px) without covering the headline. */
  const heroDecorLeft = "left-[max(0.5rem,calc(50%-35rem))]"
  const heroDecorRight = "right-[max(0.5rem,calc(50%-35rem))]"
  return (
    <section
      className={cn(
        "relative w-full min-w-0 overflow-x-clip lg:overflow-hidden",
        "flex flex-col items-center justify-center",
        "min-h-[380px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[530px]",
        "pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14",
      )}
    >
      <img
        alt=""
        src={forSchoolsAssets.heroDecor[0]}
        className={cn(heroDecorBase, heroDecorLeft, "top-[18%]")}
        aria-hidden
      />
      <img
        alt=""
        src={forSchoolsAssets.heroDecor[1]}
        className={cn(heroDecorBase, heroDecorLeft, "top-[54%]")}
        aria-hidden
      />
      <img
        alt=""
        src={forSchoolsAssets.heroDecor[2]}
        className={cn(heroDecorBase, heroDecorRight, "top-[18%]")}
        aria-hidden
      />
      <img
        alt=""
        src={forSchoolsAssets.heroDecor[3]}
        className={cn(heroDecorBase, heroDecorRight, "top-[54%]")}
        aria-hidden
      />

      {/*
        Full-width section + centered copy track — same idea as `PlusHeroSection`
        (`mx-auto w-full max-w-[min(80rem,100%)]`), not `mx-auto max-w-7xl` on the section
        (that narrowed the positioning box and mis-centered copy vs the negated shell).
      */}
      <div className="relative z-10 mx-auto flex w-full max-w-[min(80rem,100%)] flex-col items-center px-4 sm:px-6 min-[1800px]:max-w-[min(96rem,100%)]">
        <div className="flex w-full max-w-3xl flex-col items-center gap-6 text-center sm:gap-8 min-[1800px]:max-w-5xl">
          <h1 className="flex flex-col items-center gap-3 sm:gap-4">
            <span className="text-2xl font-semibold text-teal-900 sm:text-3xl">
              For schools
            </span>
            <span className={cn(marketingTypography.heroH1, "max-w-prose")}>
              Research-backed, AI-powered Math Tutoring to Supplement Classroom Instruction
            </span>
          </h1>
          <Link href={`#${forSchoolsSectionIds.register}`} className={marketingHeroCtaPrimaryLinkClass}>
            Get Started for Free
          </Link>
        </div>
      </div>
    </section>
  )
}

export const SchoolsCommunitySection = () => {
  const reduceMotion = useReducedMotion()
  const [marqueePaused, setMarqueePaused] = useState(false)
  const partnerLogos = forSchoolsAssets.partnerLogos

  const logoCell = (src: string, index: number, keySuffix: string) => (
    <div
      key={`${src}-${keySuffix}`}
      className="relative flex size-48 shrink-0 items-center justify-center sm:size-64 lg:size-72"
      aria-hidden={index >= partnerLogos.length ? true : undefined}
    >
      <img alt="" src={src} className="h-full w-full object-contain p-6 sm:p-8" />
    </div>
  )

  return (
    <section
      id={forSchoolsSectionIds.community}
      className={cn("relative scroll-mt-24", marketingSectionVerticalGapClass)}
    >
      <div className="relative w-full text-left">
        <div className={schoolsSectionHeaderGridClass}>
          <div className="min-w-0 space-y-3">
            <h2 className={schoolsSectionH2}>Join the PLUS School Community</h2>
            <p className={schoolsSectionLead}>
              Our school partners have seen big improvements in student learning through PLUS
              Tutoring.
            </p>
          </div>
          <img
            alt=""
            src={forSchoolsAssets.decor.community}
            className={schoolsSectionHeaderSquareDecorClass}
            aria-hidden
          />
        </div>
      </div>

      <div
        role="region"
        aria-label="Partner school logos"
        className="relative w-full min-w-0"
        onMouseEnter={() => setMarqueePaused(true)}
        onMouseLeave={() => setMarqueePaused(false)}
        onFocusCapture={() => setMarqueePaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setMarqueePaused(false)
          }
        }}
      >
        {reduceMotion ? (
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {partnerLogos.map((src, index) => logoCell(src, index, `static-${index}`))}
          </div>
        ) : (
          <div className="overflow-hidden">
            <div
              className="partner-marquee-track flex w-max items-center gap-6 sm:gap-8"
              style={{
                animationPlayState: marqueePaused ? "paused" : "running",
              }}
            >
              {[...partnerLogos, ...partnerLogos].map((src, index) =>
                logoCell(src, index, `marquee-${index}`)
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/**
 * Benefits — Figma 1379:2340 / 1104-1220. Icons: `BenefitsAccordionIcon`; panel art from IA export.
 * Copy lives in `@/lib/marketing/for-schools-benefits` (`FOR_SCHOOLS_BENEFITS_ITEMS`) for stable SSR + hydration.
 *
 * Sticky + scroll–spy column: fixed equal heights (not `min-h`) so rows never grow
 * when a long blurb is active. Body slot uses a fixed `h-` with overflow as a safety
 * net for very small viewports.
 */
const BENEFITS_STICKY_ITEM_CLASS =
  "box-border flex h-[26rem] flex-col justify-center sm:h-[27rem] md:h-[28rem] lg:h-[30rem] py-5 sm:py-6 md:py-7 lg:py-8"
/** Room for 2 title lines at `lg:text-2xl` — fixed so row height is identical. */
const BENEFITS_STICKY_TITLE_H =
  "h-[2.5rem] sm:h-[2.75rem] md:h-[3rem] lg:h-[3.5rem] lg:leading-snug"
/** Fills longest copy (`goal-setting`); fixed `h-` + scroll if a viewport wraps more. */
const BENEFITS_STICKY_BODY_H =
  "h-[7.25rem] shrink-0 overflow-y-auto sm:h-[7.75rem] md:h-[8.5rem] lg:h-[9.5rem] xl:h-[10rem]"
/** CTA row — fixed so rows with/without a link match. */
const BENEFITS_STICKY_CTA_ROW = "h-[2.5rem] shrink-0"

export const SchoolsTrainingSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const { ref: benefitsStickyPanelRef, top: benefitsStickyTop } = useMarketingStickyPanelTop()

  /**
   * Pick the benefit whose block center is closest to the viewport center. More stable
   * than a narrow IntersectionObserver rootMargin (avoids “skipping” when frames differ
   * or two regions overlap the band). Uses rAF; lengths are fixed with `BENEFITS_STICKY_ITEM_CLASS`.
   */
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const mid = window.innerHeight * 0.5
      let bestI = 0
      let bestD = Number.POSITIVE_INFINITY
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        if (r.height === 0) return
        const c = r.top + r.height * 0.5
        const d = Math.abs(c - mid)
        if (d < bestD) {
          bestD = d
          bestI = i
        }
      })
      setActiveIndex((p) => (p === bestI ? p : bestI))
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => { update() })
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <section
      id={forSchoolsSectionIds.benefits}
      className={cn("scroll-mt-24", marketingSectionVerticalGapClass)}
    >
      <div className="relative z-10 w-full text-left">
        <div className={schoolsSectionHeaderGridClass}>
          <div className="min-w-0 space-y-3 sm:space-y-1">
            <h2 className={schoolsSectionH2}>Benefits of PLUS</h2>
            <p className={schoolsSectionLead}>
              Here&apos;s how PLUS supports schools and trains tutors to guide students to
              success.
            </p>
          </div>
          <img
            alt=""
            src={forTutorsAssets.certificationDecor}
            className={schoolsSectionHeaderSquareDecorClass}
            aria-hidden
          />
        </div>
      </div>

      {/* Below md: stacked amber cards (+ art); at md+ match two-column Benefits + sticky panel */}
      <div className={cn("flex flex-col md:hidden", marketingCardStackGapClass)}>
        {FOR_SCHOOLS_BENEFITS_ITEMS.map((item, i) => (
          <article
            key={item.id}
            className={cn(
              "flex flex-col gap-4 rounded-[30px] bg-amber-50 dark:bg-amber-950/20",
              marketingCardPaddingClass,
            )}
          >
            <div className="flex items-start gap-3">
              <BenefitsAccordionIcon index={i} tone="accent" />
              <div className="flex min-w-0 flex-col gap-3">
                <h3 className="pt-[calc((3rem-1lh)/2)] text-pretty text-base font-bold leading-tight tracking-tight text-[#a56d1e] sm:text-lg md:text-xl">
                  {item.title}
                </h3>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.description}
                </p>
                {item.cta ? (
                  <Link
                    href={`#${forSchoolsSectionIds.register}`}
                    className={cn(marketingFinalCtaPrimaryLinkClass, "mt-1 w-fit")}
                  >
                    {item.cta}
                  </Link>
                ) : null}
              </div>
            </div>
            <div className="relative aspect-square w-full overflow-hidden rounded-[30px]">
              <img
                alt=""
                src={
                  item.id === "goal-setting"
                    ? forSchoolsAssets.benefitsPanelGoalScreenshots[2]
                    : (forSchoolsAssets.benefitsPanelArt[i] ?? forSchoolsAssets.images.benefits)
                }
                className="size-full object-cover"
                decoding="async"
              />
            </div>
          </article>
        ))}
      </div>

      {/* md+: spy + sticky art — activate grid only when both columns participate (right is `md:flex`). */}
      <div
        className={cn(
          "relative z-0 hidden min-w-0 grid-cols-1 items-stretch md:grid md:grid-cols-2 md:gap-12 lg:gap-16",
          marketingCardStackGapClass,
        )}
      >

        {/* Left: scrolling benefit items */}
        <div className="relative z-0 min-w-0 pb-[5vh]">
          {FOR_SCHOOLS_BENEFITS_ITEMS.map((item, i) => {
            const isActive = i === activeIndex
            return (
              <div
                key={item.id}
                ref={(el) => { itemRefs.current[i] = el }}
                className={BENEFITS_STICKY_ITEM_CLASS}
              >
                <div className="flex flex-col gap-5">
                  <BenefitsAccordionIcon
                    index={i}
                    tone={isActive ? "accent" : "muted"}
                    className="transition-colors duration-300"
                  />
                  <div className="flex flex-col gap-3">
                    <h3
                      className={cn(
                        "line-clamp-3 text-pretty text-base font-bold leading-tight tracking-tight transition-colors duration-300 sm:text-lg md:text-xl lg:text-2xl",
                        BENEFITS_STICKY_TITLE_H,
                        isActive ? "text-[#a56d1e]" : "text-muted-foreground",
                      )}
                    >
                      {item.title}
                    </h3>
                    <div className={BENEFITS_STICKY_BODY_H}>
                      {isActive ? (
                        <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
                          {item.description}
                        </p>
                      ) : null}
                    </div>
                    <div className={cn(BENEFITS_STICKY_CTA_ROW, "flex items-end")}>
                      {isActive && item.cta ? (
                        <Link
                          href={`#${forSchoolsSectionIds.register}`}
                          className={cn(marketingFinalCtaPrimaryLinkClass, "w-fit")}
                        >
                          {item.cta}
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: sticky art — `top` is measured (viewport center − half block height) so the frame isn’t yanked with transform, keeping section start/end alignment. Intro z-10. */}
        <div
          className={cn(
            "relative z-0 hidden min-h-0 md:flex md:h-full md:min-h-0 md:flex-col",
            "pb-[5vh]",
          )}
        >
          <div
            ref={benefitsStickyPanelRef}
            className="sticky w-full"
            style={{ top: benefitsStickyTop }}
          >
            <div
              className={cn(
                "relative aspect-square w-full overflow-hidden rounded-[38px] transition-colors duration-500",
                activeIndex === 2 ? "bg-[#fff3dd]" : "bg-muted"
              )}
            >
              {FOR_SCHOOLS_BENEFITS_ITEMS.map((item, i) => (
                <div
                  key={item.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500",
                    i === activeIndex ? "opacity-100" : "opacity-0"
                  )}
                >
                  {item.id === "free-for-all" ? (
                    /* Figma 1116:1392 — wider photo panned left to frame subject */
                    <img
                      alt=""
                      src={forSchoolsAssets.benefitsPanelArt[0]}
                      className="pointer-events-none absolute top-0 left-[-32.71%] h-full max-w-none w-[177.78%] select-none object-cover"
                      decoding="async"
                    />
                  ) : item.id === "goal-setting" ? (
                    /* Figma 1116:1396 — 3 layered screenshots, back→front */
                    <>
                      <img
                        alt=""
                        src={forSchoolsAssets.benefitsPanelGoalScreenshots[0]}
                        className="pointer-events-none absolute left-1/2 -translate-x-1/2 max-w-none w-[79.5%] h-[39.3%] rounded-[5px] object-cover select-none"
                        style={{ bottom: "36.1%" }}
                        decoding="async"
                      />
                      <img
                        alt=""
                        src={forSchoolsAssets.benefitsPanelGoalScreenshots[1]}
                        className="pointer-events-none absolute left-1/2 -translate-x-1/2 max-w-none w-[87.5%] h-[43.2%] rounded-[5px] shadow-[0_4px_40px_rgba(0,0,0,0.25)] object-cover select-none"
                        style={{ bottom: "21.4%" }}
                        decoding="async"
                      />
                      <img
                        alt=""
                        src={forSchoolsAssets.benefitsPanelGoalScreenshots[2]}
                        className="pointer-events-none absolute left-1/2 -translate-x-1/2 max-w-none w-[96.6%] h-[47.7%] rounded-[5px] shadow-[0_4px_40px_rgba(0,0,0,0.25)] object-cover select-none"
                        style={{ bottom: "-2.5%" }}
                        decoding="async"
                      />
                    </>
                  ) : (
                    <img
                      alt=""
                      src={
                        forSchoolsAssets.benefitsPanelArt[i] ??
                        forSchoolsAssets.images.benefits
                      }
                      className="pointer-events-none absolute inset-0 size-full object-cover select-none"
                      decoding="async"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

const EXPERIENCE_PHASES = [
  {
    phase: "Phase 1",
    title: "Expert Kickoff",
    description:
      "We onboard your faculty and send specialists to your campus for a hands-on kickoff, ensuring a seamless integration into your school's daily schedule.",
    icon: forSchoolsAssets.experienceIcons[0],
    number: "1",
  },
  {
    phase: "Phase 2",
    title: "1:1 Centered Tutoring",
    description:
      "Students are paired with certified tutors who have mastered evidence-based engagement strategies for consistent, high-impact individual learning.",
    icon: forSchoolsAssets.experienceIcons[1],
    number: "2",
  },
  {
    phase: "Phase 3",
    title: "Goal-Driven Monitoring",
    description:
      "Tutors set specific targets for every student, using real-time data to monitor progress and adjust instruction to meet individual learning gaps.",
    icon: forSchoolsAssets.experienceIcons[2],
    number: "3",
  },
  {
    phase: "Phase 4",
    title: "The Teacher Loop",
    description:
      "We share session insights and host regular debriefs with your staff to align tutoring outcomes with your classroom goals and identify areas for growth.",
    icon: forSchoolsAssets.experienceIcons[3],
    number: "4",
  },
] as const

export const SchoolsExperienceSection = () => {
  return (
    <section
      id={forSchoolsSectionIds.experience}
      className={cn("scroll-mt-24", marketingSectionVerticalGapClass)}
    >
      <div className="relative w-full text-left">
        <div className={schoolsSectionHeaderGridClass}>
          <div className="min-w-0 space-y-3 sm:space-y-1">
            <h2 className={schoolsSectionH2}>Your Day-to-Day Experience with PLUS</h2>
            <p className={schoolsSectionLead}>
              A seamless integration designed to support your faculty and accelerate student
              growth.
            </p>
          </div>
          <img
            alt=""
            src={forTutorsAssets.toolkitDecor}
            className={schoolsSectionHeaderSquareDecorClass}
            aria-hidden
          />
        </div>
      </div>

      {/* 2×2 card grid — icon stacked above phase/title/body; shared left edge with card padding. */}
      <div className={cn("grid grid-cols-1 sm:grid-cols-2", marketingCardStackGapClass)}>
        {EXPERIENCE_PHASES.map((phase) => (
          <article
            key={phase.phase}
            className={cn(
              "relative overflow-hidden rounded-[30px] bg-[#ffe8f5]",
              marketingCardPaddingClass,
            )}
          >
            {/* Ghost number — decorative, top-right */}
            <span
              className="pointer-events-none absolute right-0 top-0 select-none font-bold leading-none text-[#d31998]/10"
              style={{ fontSize: "clamp(7rem,18vw,12.5rem)" }}
              aria-hidden
            >
              {phase.number}
            </span>

            {/* `gap-5` below icon matches Benefits of PLUS (`SchoolsTrainingSection`) icon → title rhythm. */}
            <div className="relative z-10 flex w-full min-w-0 flex-col items-start gap-5">
              <img
                src={phase.icon}
                alt=""
                className={cn(
                  "shrink-0 object-contain",
                  marketingCardIconAssetFrameClass,
                )}
                width={MARKETING_CARD_ICON_DIAMETER_PX}
                height={MARKETING_CARD_ICON_DIAMETER_PX}
                aria-hidden
              />
              <div className="flex w-full min-w-0 flex-col gap-4">
                <div>
                  <p className="text-sm font-normal uppercase tracking-wider text-[#d31998] sm:text-base">
                    {phase.phase}
                  </p>
                  <h3 className={cn(schoolsBenefitsCardTitleClass, "mt-1 text-[#d31998]")}>
                    {phase.title}
                  </h3>
                </div>
                <p className={cn(schoolsBenefitsCardBodyClass, "max-w-none")}>
                  {phase.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}


/**
 * Robust Oversight — card uses `marketingCardPaddingClass`; inner grid stretches so the
 * text column fills the row height: icon + title + body flush to top inset, CTA flush to bottom.
 * Grid: 1fr + 360px image. Card width matches About shell (`max-w-5xl`).
 */
/** No outer `overflow-clip` — it was clipping copy/CTAs on narrow viewports; images use their own `overflow-hidden`. */
const OVERSIGHT_CARD_FRAME =
  "flex w-full min-w-0 max-w-5xl flex-col rounded-[30px] min-[1800px]:max-w-7xl"
/** Stack until `lg` (avoids `1fr` + fixed 360px overflow on tablets); two columns from `lg` up. */
const OVERSIGHT_CARD_ROW = cn(
  "grid w-full min-w-0 grid-cols-1 items-stretch gap-6",
  "lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-x-0 lg:gap-y-0",
)
/** Icon + gap + copy; full width when stacked, capped when side-by-side with art. */
const OVERSIGHT_LEFT = cn(
  "flex w-full min-w-0 shrink-0 flex-row items-stretch gap-[25px]",
  "max-w-full lg:h-full lg:min-h-0 lg:max-w-[553px]",
)
const OVERSIGHT_COPY = cn(
  "flex min-h-0 min-w-0 w-full max-w-full flex-1 flex-col gap-5 sm:gap-6 sm:max-w-[420px] lg:gap-0 lg:justify-between",
)
const OVERSIGHT_TITLE_BODY = "flex w-full flex-col gap-4"
/** min-h matches the icon so the title text is vertically centred with it. */
const OVERSIGHT_TITLE_WRAP = "flex min-h-[48px] w-full min-w-0 items-center"
/** Slightly smaller than Figma 411×350 so inset matches text; aspect preserved. */
const OVERSIGHT_IMAGE =
  "relative aspect-[411/350] w-full max-w-[360px] shrink-0 overflow-hidden rounded-[30px] bg-background/20 md:w-full md:max-w-none"
const OVERSIGHT_IMG =
  "pointer-events-none absolute inset-0 size-full max-w-none rounded-[30px] object-cover"

/** Pill sizing + type scale — same as `marketingFinalCtaPrimaryLinkClass` / Benefits CTAs; colors come from each card’s `btnBg` / `btnText`. */
const oversightCardCtaClass = cn(
  "inline-flex w-fit items-center justify-center whitespace-nowrap no-underline outline-none",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "h-9 sm:h-11 rounded-full border-0 px-5 sm:px-8 text-sm sm:text-base font-normal shadow-none transition-opacity hover:opacity-95 min-[1800px]:h-12 min-[1800px]:px-9 min-[1800px]:text-lg",
)

const OVERSIGHT_CARDS = [
  /** CTA pill fills + label colors — Figma `1877:2183` (title hues may differ from buttons). */
  {
    title: "Align with Your Curriculum",
    description:
      "We work with your faculty to tailor lesson strategies that complement your school’s specific learning objectives and standards.",
    cta: "Get training",
    href: "/get-involved#partnerships-contact-form",
    bgColor: "bg-[#ffeaea]",
    titleColor: "text-[#c05053]",
    btnBg: "bg-[#ff8789]",
    btnText: "text-white",
    icon: forSchoolsAssets.icons.oversight[0],
    image: forSchoolsAssets.oversightCardImages[0],
  },
  {
    title: "Data at Your Fingertips",
    description:
      "Track tutor performance, monitor student progress, and access high-level analytics to measure the ROI of your tutoring initiatives.",
    cta: "Try our demo",
    href: "https://app.tutors.plus/demo",
    bgColor: "bg-[#f4fbf6]",
    titleColor: "text-[#007d49]",
    btnBg: "bg-[#2ca96b]",
    btnText: "text-white",
    panelBg: "bg-[#d7f0de]",
    imageLayout: "dashboard" as const,
    icon: forSchoolsAssets.icons.oversight[1],
    image: forSchoolsAssets.oversightCardImages[1],
  },
  {
    title: "Professional Growth & Accountability",
    description:
      "Tutors earn industry-recognized credentials upon completion, ensuring they meet the standards of your institution.",
    cta: "Register your tutors",
    href: "/get-involved#partnerships-contact-form",
    bgColor: "bg-[#fff0cb]",
    titleColor: "text-[#a56d1e]",
    btnBg: "bg-[#ffc94b]",
    btnText: "text-[#463923]",
    icon: forSchoolsAssets.icons.oversight[2],
    image: forSchoolsAssets.oversightCardImages[2],
  },
  {
    title: "Works with Any Math Software",
    description:
      "PLUS is designed to be software-agnostic, which means no new software licenses or changes required.",
    cta: "See How it Works",
    href: "https://app.tutors.plus/demo",
    bgColor: "bg-[#e0f5fe]",
    titleColor: "text-[#0080b4]",
    btnBg: "bg-[#00c3fb]",
    btnText: "text-white",
    icon: forSchoolsAssets.icons.oversight[3],
    image: forSchoolsAssets.oversightCardImages[3],
  },
] as const

/** Shared card inner content — used by both motion and static variants. */
function OversightCardInner({
  card,
}: {
  card: (typeof OVERSIGHT_CARDS)[number]
}) {
  return (
    <article className={cn(OVERSIGHT_CARD_FRAME, marketingCardPaddingClass, card.bgColor)}>
      <div className={OVERSIGHT_CARD_ROW}>
        <div className={OVERSIGHT_LEFT}>
          <img
            alt=""
            src={card.icon}
            className={cn(
              "shrink-0 self-start object-contain",
              marketingCardIconAssetFrameClass,
            )}
            width={MARKETING_CARD_ICON_DIAMETER_PX}
            height={MARKETING_CARD_ICON_DIAMETER_PX}
            aria-hidden
          />
          <div className={OVERSIGHT_COPY}>
            <div className={OVERSIGHT_TITLE_BODY}>
              <div className={OVERSIGHT_TITLE_WRAP}>
                <h3 className={cn(schoolsBenefitsCardTitleClass, "min-w-0", card.titleColor)}>
                  {card.title}
                </h3>
              </div>
              <p className={cn(schoolsBenefitsCardBodyClass, "max-w-none")}>
                {card.description}
              </p>
            </div>
            <a
              href={card.href}
              {...(card.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={cn(oversightCardCtaClass, card.btnBg, card.btnText)}
            >
              {card.cta}
            </a>
          </div>
        </div>

        <div
          className={cn(
            OVERSIGHT_IMAGE,
            "mx-auto md:mx-0",
            "panelBg" in card ? card.panelBg : undefined
          )}
        >
          {"imageLayout" in card && card.imageLayout === "dashboard" ? (
            <img
              alt=""
              src={card.image}
              className="pointer-events-none absolute left-[8.5%] top-[13%] w-[153%] max-w-none rounded-[5px] object-cover"
              decoding="async"
              aria-hidden
            />
          ) : (
            <img
              alt=""
              src={card.image}
              className={OVERSIGHT_IMG}
              decoding="async"
              aria-hidden
            />
          )}
        </div>
      </div>
    </article>
  )
}

/**
 * Single card with scroll-driven exit: slides up and away during its segment of
 * scroll progress. The last card never exits — it stays visible as the base.
 */
/** px each lower card is offset downward at rest, creating the "peek" effect. */
const PEEK_PX = 16
/**
 * Viewport height budget per card for scroll-driven peel — matches `ScrollAccordion`’s
 * default `pinScrollVhPerItem` (100) so this block doesn’t advance faster than other
 * long-form sections on the page.
 */
const OVERSIGHT_SCROLL_VH_PER_CARD = 100

function OversightMotionCard({
  card,
  index,
  scrollYProgress,
}: {
  card: (typeof OVERSIGHT_CARDS)[number]
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const total = OVERSIGHT_CARDS.length
  const isLast = index === total - 1
  const peekStart = `${index * PEEK_PX}px`

  // Multi-keyframe transform:
  //   0 → index/total  : peek offset reduces to 0 as cards above peel away
  //   index/total → (index+1)/total : this card exits upward (skipped for last card)
  const inputRange = isLast
    ? [0, (total - 1) / total]
    : index === 0
      ? [0, 1 / total]
      : [0, index / total, (index + 1) / total]

  const outputRange = isLast
    ? [peekStart, "0px"]
    : index === 0
      ? ["0px", "-110vh"]
      : [peekStart, "0px", "-110vh"]

  const y = useTransform(scrollYProgress, inputRange, outputRange)

  return (
    <motion.div
      className="col-start-1 row-start-1"
      style={{
        zIndex: total - index, // card 0 = highest, exits first
        y,
      }}
    >
      <OversightCardInner card={card} />
    </motion.div>
  )
}

export const SchoolsOversightSection = () => {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  // Computed so cards center in the available viewport (below the nav) when sticky.
  // Measured on mount and on resize to avoid any overlap with the section header.
  const [stickyTop, setStickyTop] = useState("50vh")

  useLayoutEffect(() => {
    const el = cardsRef.current
    if (!el) return
    const measure = () => {
      const h = el.getBoundingClientRect().height
      // At scrollYProgress=0, cards are in their initial peek state: card i is
      // translated down by i * PEEK_PX. The total visual height of the stack is
      // h + PEEK_PX * (total - 1). Centering the visual midpoint in the area below
      // the nav (center = 50vh + 2.25rem) requires offsetting by half that height.
      const total = OVERSIGHT_CARDS.length
      const halfVisualHeight = h / 2 + (PEEK_PX * (total - 1)) / 2
      setStickyTop(`calc(50vh + 2.25rem - ${halfVisualHeight}px)`)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // A second tracker on the same container with an offset window that fires
  // after the cards have locked into place. "start 0.35" ≈ container top at
  // 35 vh from viewport top, which is right around the sticky engagement point.
  // "start 0.05" ≈ container top at 5 vh — intro is gone just before the card
  // animation begins (scrollYProgress = 0, container top = viewport top).
  const { scrollYProgress: introFadeProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.35", "start 0.05"],
  })
  const introOpacity = useTransform(introFadeProgress, [0, 1], [1, 0])

  return (
    <section
      id={forSchoolsSectionIds.oversight}
      className={cn("scroll-mt-24", marketingSectionVerticalGapClass)}
    >
      <motion.div
        className="relative w-full min-w-0 text-left"
        style={prefersReducedMotion ? undefined : { opacity: introOpacity }}
      >
        <div className={schoolsSectionHeaderGridClass}>
          <div className="min-w-0 space-y-3 sm:space-y-1">
            <h2 className={schoolsSectionH2}>Maintain Excellence with Robust Oversight</h2>
            <p className={schoolsSectionLead}>
              Ensure high-impact tutoring through data-driven insights and professional
              certification.
            </p>
          </div>
          <img
            alt=""
            src={forSchoolsAssets.oversightHeaderEqual}
            className={schoolsSectionHeaderOversightDecorClass}
            width={467}
            height={371}
            aria-hidden
          />
        </div>
      </motion.div>

      {prefersReducedMotion ? (
        /* Static fallback — plain vertical stack, no animation */
        <div className={cn("mx-auto flex w-full max-w-5xl flex-col min-[1800px]:max-w-7xl", marketingCardStackGapClass)}>
          {OVERSIGHT_CARDS.map((card) => (
            <OversightCardInner key={card.title} card={card} />
          ))}
        </div>
      ) : (
        /*
          Scroll-driven unstack: a tall container drives scroll progress while a
          sticky inner holds the card stack in view. All cards occupy the same CSS
          grid cell (col-start-1 row-start-1) so they are perfectly layered.
          Card 0 (highest z-index) peels away first; each subsequent card follows
          until the last card is revealed and the user scrolls on.
        */
        <div
          ref={containerRef}
          className="min-w-0"
          style={{ height: `${OVERSIGHT_CARDS.length * OVERSIGHT_SCROLL_VH_PER_CARD}vh` }}
        >
          {/* stickyTop is measured so the card stack's midpoint lands at the
              viewport center when pinned — no transform needed, no layout shift. */}
          <div className="sticky" style={{ top: stickyTop }}>
            <div ref={cardsRef} className="mx-auto w-full max-w-5xl min-[1800px]:max-w-7xl">
              <div className="grid grid-cols-1">
                {OVERSIGHT_CARDS.map((card, index) => (
                  <OversightMotionCard
                    key={card.title}
                    card={card}
                    index={index}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

const SCHOOLS_SUCCESS_STORY_GREEN = "text-[#007d49]"

/** Notion-backed school stories — omitted entirely when `stories` is empty (no footer gap). */
export const SchoolsSuccessStoriesSection = ({ stories }: { stories: SuccessStory[] }) => {
  if (stories.length === 0) return null

  return (
    <section
      id={forSchoolsSectionIds.successStories}
      className={cn("scroll-mt-24", marketingSectionVerticalGapClass)}
    >
      <div className="relative w-full min-w-0 text-left">
        <div className={schoolsSectionHeaderGridClass}>
          <div className="min-w-0 space-y-3">
            <h2 className={schoolsSectionH2}>School Success Stories</h2>
            <p className={schoolsSectionLead}>Here&apos;s what schools are saying about PLUS.</p>
          </div>
          <img
            alt=""
            src={forTutorsAssets.experienceDecor}
            className={schoolsSectionHeaderSquareDecorClass}
            aria-hidden
          />
        </div>
      </div>

      <div className={cn("flex flex-col", marketingCardStackGapClass)}>
        {stories.map((story) => {
            const readUrl = notionSuccessStoryPublicReadUrl(story)
            const quoteParts = story.quote ? splitSuccessStoryQuote(story.quote) : null

            return (
              <article
                key={story.id}
                className={cn(
                  "flex h-full flex-col rounded-[30px] bg-[#f4fbf6] dark:bg-teal-950/30",
                  marketingCardPaddingClass,
                )}
              >
                <div
                  className={cn(
                    "flex min-h-0 flex-1 flex-col rounded-3xl bg-white dark:bg-card dark:ring-1 dark:ring-white/10",
                    marketingCardPaddingClass,
                  )}
                >
                  <div className={marketingCardLhAlignedHeaderRowClass}>
                    <span
                      className={cn(
                        marketingCardIconTitleRowOffsetClass,
                        marketingCardIconCircleClass,
                        "shrink-0 bg-[#007d49] text-white",
                      )}
                    >
                      <School className={marketingCardLucideGlyphClass} aria-hidden />
                    </span>
                    <h3
                      className={cn(
                        "min-w-0 flex-1 text-pretty text-base font-bold leading-snug tracking-tight sm:text-lg lg:text-2xl",
                        SCHOOLS_SUCCESS_STORY_GREEN,
                      )}
                    >
                      {story.title}
                    </h3>
                  </div>
                  {story.quote ? (
                    <>
                      <blockquote className="mt-4 min-h-0 flex-1 text-pretty text-sm italic leading-relaxed text-muted-foreground sm:text-base">
                        {quoteParts ? (
                          <>
                            &ldquo;{quoteParts.before}{" "}
                            <strong
                              className={cn("font-semibold italic", SCHOOLS_SUCCESS_STORY_GREEN)}
                            >
                              {quoteParts.highlight}
                            </strong>
                            {quoteParts.after}&rdquo;
                          </>
                        ) : (
                          <>&ldquo;{story.quote}&rdquo;</>
                        )}
                      </blockquote>
                      {story.quoteAttribution ? (
                        <p className="mt-2 text-sm not-italic text-muted-foreground">
                          — {story.quoteAttribution}
                        </p>
                      ) : null}
                    </>
                  ) : (
                    <p className="mt-4 min-h-0 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {story.summary}
                    </p>
                  )}
                </div>
                <a
                  href={readUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group mt-4 ml-auto flex w-fit items-center gap-2 text-base font-medium no-underline transition-opacity hover:opacity-90 sm:text-lg",
                    SCHOOLS_SUCCESS_STORY_GREEN,
                  )}
                >
                  <span>Read story</span>
                  <ArrowRight
                    className="size-6 shrink-0 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </article>
            )
        })}
      </div>
    </section>
  )
}

/**
 * Register — bottom CTA matches `TutorsImpactCTA` (spacing, title/lead scale, pill CTA).
 */
export const SchoolsRegisterCTA = () => {
  return (
    <section id={forSchoolsSectionIds.register} className="scroll-mt-24">
      <div className={marketingFinalCtaShellClass}>
        <h2 className={marketingFinalCtaTitleClass}>Register Your Institution</h2>
        <p className={marketingFinalCtaLeadClass}>
          Want to get started? Sign up to register your organization and provide your tutors with
          access to our full training suite.
        </p>
        <div className={marketingFinalCtaButtonRowClass}>
          <Link
            href="/get-involved#partnerships-contact-form"
            className={marketingFinalCtaPrimaryLinkClass}
          >
            Sign up
          </Link>
        </div>
      </div>
    </section>
  )
}
