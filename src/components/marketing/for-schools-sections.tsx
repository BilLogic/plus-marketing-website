"use client"

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { BenefitsAccordionIcon } from "@/components/marketing/benefit-accordion-icons"
import type { SuccessStory } from "@/lib/notion/types"
import {
  notionSuccessStoryPublicReadUrl,
  splitSuccessStoryQuote,
} from "@/lib/success-stories/notion-public-read-url"
import { forSchoolsAssets } from "@/components/marketing/for-schools-assets"
import { marketingTypography } from "@/lib/marketing-typography"
import { forSchoolsSectionIds } from "@/lib/plus-footer-ia"

/** Match `get-involved-sections` / `for-tutors-sections` typography. */
const schoolsSectionH2 =
  "text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl"
const schoolsSectionLead = "w-full max-w-none text-pretty text-lg text-[#62636C] dark:text-white/90"

/** Shared CTA button styles — match `get-involved-sections` / `for-tutors-sections`. */
const primaryCta =
  "inline-flex items-center justify-center h-11 rounded-full border-0 bg-[#A6EDF4] px-8 text-base font-normal text-[#004247] shadow-none transition-opacity hover:bg-[#A6EDF4] hover:opacity-95 hover:text-[#004247] dark:bg-[#A6EDF4] dark:text-[#004247] dark:hover:bg-[#A6EDF4]"

export const SchoolsHeroSection = () => {
  const { division, multiplication, equal, greaterThan } = forSchoolsAssets.mathDecor
  const heroCharCn = "pointer-events-none absolute hidden h-24 w-auto object-contain sm:block sm:h-28 md:h-32 lg:h-36 select-none"
  return (
    <section className="relative mx-auto w-full max-w-7xl min-w-0 overflow-hidden flex flex-col justify-center min-h-[380px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[530px] pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14">
      <img
        alt=""
        src={division}
        className={cn(heroCharCn, "left-4 top-1/2 -translate-y-1/2 sm:left-6")}
        aria-hidden
      />
      <img
        alt=""
        src={multiplication}
        className={cn(heroCharCn, "bottom-4 left-[16%] sm:bottom-6")}
        aria-hidden
      />
      <img
        alt=""
        src={equal}
        className={cn(heroCharCn, "right-4 top-1/2 -translate-y-1/2 sm:right-6")}
        aria-hidden
      />
      <img
        alt=""
        src={greaterThan}
        className={cn(heroCharCn, "bottom-4 right-[16%] sm:bottom-6")}
        aria-hidden
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 text-center sm:gap-8 sm:px-6">
        <h1 className="flex flex-col items-center gap-3 sm:gap-4">
          <span className="text-2xl font-semibold text-teal-900 sm:text-3xl">
            For schools
          </span>
          <span className={cn(marketingTypography.heroH1, "max-w-prose")}>
            Research-driven, AI-powered Support for Every Classroom
          </span>
        </h1>
        <Link
          href={`#${forSchoolsSectionIds.register}`}
          className={primaryCta}
        >
          Get Started for Free
        </Link>
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
      className="relative space-y-6 sm:space-y-8 lg:space-y-10"
    >
      {/*
        Text + character in one row; `items-center` vertically centers the mascot with the
        heading + lead block (see Benefits / Day-to-Day sections).
      */}
      <div className="flex w-full flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        <div className="min-w-0 flex-1 basis-0 space-y-3 sm:space-y-4 md:space-y-5">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
            Join the PLUS School Community
          </h2>
          <p className="w-full max-w-none text-pretty text-lg text-[#62636C] dark:text-white/90">
            We partner with forward-thinking schools to bridge learning gaps. See
            the organizations already making a difference with us.
          </p>
        </div>
        <img
          alt=""
          src={forSchoolsAssets.decor.community}
          className="pointer-events-none h-[95px] w-auto shrink-0 object-contain"
          aria-hidden
        />
      </div>

      <div
        role="region"
        aria-label="Partner school logos"
        className="relative w-full"
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
 */
const BENEFITS_ITEMS = [
  {
    id: "free-for-all",
    title: "Free for All",
    description:
      "High-quality education shouldn't be gated. Access our full suite of AI-driven training and feedback tools at no cost to your district.",
    cta: "See if your school qualifies",
  },
  {
    id: "multilingual-support",
    title: "Multilingual Support",
    description:
      "Support your diverse student body with lessons available in both English and Spanish.",
    cta: "",
  },
  {
    id: "goal-setting",
    title: "Goal Setting with Students",
    description:
      "Tutors set weekly math goals with students and reward them for meeting their goals. By using this goal-setting method, there is a 25% increase in time spent practicing and a 40% increase in skill mastery.",
    cta: "",
  },
  {
    id: "human-ai",
    title: "Human + AI Tutoring Model",
    description:
      "We allow teachers to select the scope and sequence of what is taught. We also determine which students get taught by looking at their past performance on math software.",
    cta: "",
  },
] as const

export const SchoolsTrainingSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    itemRefs.current.forEach((el, i) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i) },
        { threshold: 0, rootMargin: "-40% 0px -40% 0px" }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section
      id={forSchoolsSectionIds.benefits}
      className="space-y-6 sm:space-y-8 lg:space-y-10"
    >
      {/* Figma 1379:2340 — copy + division mascot */}
      <div className="flex w-full flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        <div className="min-w-0 flex-1 basis-0 space-y-3 sm:space-y-4 md:space-y-5">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
            Benefits of PLUS
          </h2>
          <p className="w-full max-w-none text-pretty text-lg text-[#62636C] dark:text-white/90">
            Here&apos;s how PLUS supports schools and trains tutors to guide students
            to success
          </p>
        </div>
        <img
          alt=""
          src={forSchoolsAssets.mathDecor.division}
          className="pointer-events-none h-[95px] w-auto shrink-0 object-contain"
          aria-hidden
        />
      </div>

      {/* Two-column sticky scroll */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">

        {/* Left: scrolling benefit items */}
        <div className="pb-[5vh]">
          {BENEFITS_ITEMS.map((item, i) => {
            const isActive = i === activeIndex
            return (
              <div
                key={item.id}
                ref={(el) => { itemRefs.current[i] = el }}
                className="flex flex-col gap-5 py-16 sm:py-20"
              >
                <BenefitsAccordionIcon
                  index={i}
                  tone={isActive ? "accent" : "muted"}
                  className="transition-colors duration-300"
                />
                <p
                  className={cn(
                    marketingTypography.h2,
                    "text-pretty transition-colors duration-300",
                    isActive ? "text-[#a56d1e]" : "text-muted-foreground"
                  )}
                >
                  {item.title}
                </p>
                {isActive && (
                  <>
                    <p className={cn(marketingTypography.lead, "max-w-none text-pretty")}>
                      {item.description}
                    </p>
                    {item.cta ? (
                      <Link
                        href={`#${forSchoolsSectionIds.register}`}
                        className={cn(primaryCta, "mt-2 w-full max-w-[277px]")}
                      >
                        {item.cta}
                      </Link>
                    ) : null}
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Right: sticky art panel — Figma 1104:1183 */}
        <div className="hidden md:block" style={{ minHeight: 400 }}>
          <div className="sticky" style={{ top: 88 }}>
            <div
              className={cn(
                "relative aspect-square w-full overflow-hidden rounded-[38px] transition-colors duration-500",
                activeIndex === 2 ? "bg-[#fff3dd]" : "bg-muted"
              )}
            >
              {BENEFITS_ITEMS.map((item, i) => (
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
      className="space-y-6 sm:space-y-8 lg:space-y-10"
    >
      {/* Section header — same pattern as Benefits / Community / Oversight */}
      <div className="flex w-full flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        <div className="min-w-0 flex-1 basis-0 space-y-3 sm:space-y-4 md:space-y-5">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
            Your Day-to-Day Experience with PLUS
          </h2>
          <p className="w-full max-w-none text-pretty text-lg text-[#62636C] dark:text-white/90">
            A seamless integration designed to support your faculty and accelerate student growth.
          </p>
        </div>
        <img
          alt=""
          src={forSchoolsAssets.mathDecor.multiplication}
          className="pointer-events-none h-[95px] w-auto shrink-0 object-contain"
          aria-hidden
        />
      </div>

      {/* 2×2 card grid — Figma `1877:2175`: bg #ffe8f5, rounded-[30px], ghost number at 200px */}
      <div className="grid grid-cols-1 gap-[38px] sm:grid-cols-2">
        {EXPERIENCE_PHASES.map((phase) => (
          <article
            key={phase.phase}
            className="relative overflow-hidden rounded-[30px] bg-[#ffe8f5] px-7 pb-8 pt-[46px]"
          >
            {/* Ghost number — Figma: 200px bold, rgba(211,25,152,0.1), right-aligned */}
            <span
              className="pointer-events-none absolute right-0 top-0 select-none font-bold leading-none text-[#d31998]/10"
              style={{ fontSize: "clamp(7rem,18vw,12.5rem)" }}
              aria-hidden
            >
              {phase.number}
            </span>

            {/* Icon */}
            <img
              src={phase.icon}
              alt=""
              className="relative z-10 size-[58px] object-contain"
              aria-hidden
            />

            {/* Phase label + title */}
            <div className="relative z-10 mt-[37px]">
              <p className="text-xs font-normal uppercase tracking-wider text-[#d31998] sm:text-sm">
                {phase.phase}
              </p>
              <h3 className={cn(marketingTypography.bentoTitle, "mt-1 text-[#d31998]")}>
                {phase.title}
              </h3>
            </div>

            {/* Description */}
            <p className={cn(marketingTypography.sectionLead, "relative z-10 mt-4")}>
              {phase.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

/**
 * Robust Oversight — Figma 1379:2361. Card: overflow-clip px 38 py 30 (symmetric horizontal inset).
 * Inner row: CSS Grid (1fr + 360px) so the image column’s right edge aligns with the padded
 * content box—symmetric 38px card inset on both sides.
 * Left 553×260; icon + 25px gap + copy max 456.
 */
const OVERSIGHT_CARD_FRAME =
  "flex w-full max-w-[1122px] flex-col overflow-clip rounded-[30px] px-[38px] py-[30px]"
/** md: two columns — text block max 553px in first column; image exactly 360px in second. */
const OVERSIGHT_CARD_ROW =
  "grid w-full min-w-0 grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_360px] md:items-center md:gap-x-0 md:gap-y-0"
/** 58px icon + 25px gap + copy column (Figma). */
const OVERSIGHT_LEFT =
  "flex w-full min-w-0 shrink-0 flex-row items-start gap-[25px] md:h-[260px] md:max-w-[553px]"
const OVERSIGHT_COPY =
  "flex min-w-0 w-full max-w-[420px] flex-col justify-between md:h-[260px]"
const OVERSIGHT_TITLE_BODY = "flex w-full flex-col gap-4"
/** min-h matches the icon (58px) so the title text is always vertically centred with it. */
const OVERSIGHT_TITLE_WRAP = "flex min-h-[58px] w-full items-center"
/** Slightly smaller than Figma 411×350 so inset matches text; aspect preserved. */
const OVERSIGHT_IMAGE =
  "relative aspect-[411/350] w-full max-w-[360px] shrink-0 overflow-hidden rounded-[30px] bg-background/20 md:w-full md:max-w-none"
const OVERSIGHT_IMG =
  "pointer-events-none absolute inset-0 size-full max-w-none rounded-[30px] object-cover"

const OVERSIGHT_CARDS = [
  {
    title: "Align with Your Curriculum",
    description:
      "We work with your faculty to tailor lesson strategies that complement your school’s specific learning objectives and standards.",
    cta: "Get training",
    bgColor: "bg-[#ffe8f5]",
    titleColor: "text-[#d31998]",
    btnBg: "bg-[#d31998]",
    btnText: "text-white",
    icon: forSchoolsAssets.icons.oversight[0],
    image: forSchoolsAssets.oversightCardImages[0],
  },
  {
    title: "Data at Your Fingertips",
    description:
      "Track tutor performance, monitor student progress, and access high-level analytics to measure the ROI of your tutoring initiatives.",
    cta: "Try our demo",
    bgColor: "bg-[#f4fbf6]",
    titleColor: "text-[#007d49]",
    btnBg: "bg-[#007d49]",
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
    bgColor: "bg-[#e0f5fe]",
    titleColor: "text-[#0080b4]",
    btnBg: "bg-[#0080b4]",
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
    <article className={cn(OVERSIGHT_CARD_FRAME, card.bgColor)}>
      <div className={OVERSIGHT_CARD_ROW}>
        <div className={OVERSIGHT_LEFT}>
          <img
            alt=""
            src={card.icon}
            className="size-[58px] shrink-0"
            width={58}
            height={58}
            aria-hidden
          />
          <div className={OVERSIGHT_COPY}>
            <div className={OVERSIGHT_TITLE_BODY}>
              <div className={OVERSIGHT_TITLE_WRAP}>
                <h3 className={cn(marketingTypography.bentoTitle, card.titleColor)}>
                  {card.title}
                </h3>
              </div>
              <p className={cn(marketingTypography.sectionLead, "max-w-none")}>
                {card.description}
              </p>
            </div>
            <button
              type="button"
              className={cn(
                "h-[45px] w-fit rounded-full px-10 text-base font-normal",
                card.btnBg,
                card.btnText
              )}
            >
              {card.cta}
            </button>
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <section
      id={forSchoolsSectionIds.oversight}
      className="space-y-8 sm:space-y-10 lg:space-y-12"
    >
      <div className="flex w-full flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        <div className="min-w-0 flex-1 basis-0 space-y-3 sm:space-y-4 md:space-y-5">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
            Maintain Excellence with Robust Oversight
          </h2>
          <p className="w-full max-w-none text-pretty text-lg text-[#62636C] dark:text-white/90">
            Ensure high-impact tutoring through data-driven insights and professional
            certification.
          </p>
        </div>
        <img
          alt=""
          src={forSchoolsAssets.mathDecor.equal}
          className="pointer-events-none h-[95px] w-auto shrink-0 object-contain"
          aria-hidden
        />
      </div>

      {prefersReducedMotion ? (
        /* Static fallback — plain vertical stack, no animation */
        <div className="mx-auto flex w-full max-w-[1122px] flex-col gap-6">
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
        <div ref={containerRef} style={{ height: `${OVERSIGHT_CARDS.length * 75}vh` }}>
          <div className="sticky top-[4.5rem] flex h-[calc(100vh-4.5rem)] items-center">
            <div className="mx-auto w-full max-w-[1122px]">
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

export const SchoolsSuccessStoriesSection = ({ stories }: { stories: SuccessStory[] }) => {
  const titleIcon = forSchoolsAssets.successStories.cardTitleIcon

  return (
    <section
      id={forSchoolsSectionIds.successStories}
      className="space-y-10 sm:space-y-12 lg:space-y-14"
    >
      <div className="flex w-full flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        <div className="min-w-0 flex-1 basis-0 space-y-3 text-left sm:space-y-4 md:space-y-5">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
            School Success Stories
          </h2>
          <p className="w-full max-w-none text-pretty text-lg text-[#62636C] dark:text-white/90">
            Here&apos;s what schools are saying about PLUS.
          </p>
        </div>
        <img
          alt=""
          src={forSchoolsAssets.successStories.headerDecor}
          className="pointer-events-none h-[95px] w-auto shrink-0 object-contain"
          aria-hidden
        />
      </div>

      {stories.length === 0 ? (
        <p className="text-pretty text-sm text-muted-foreground">
          Success stories will appear here when available.
        </p>
      ) : (
        <div className={cn("grid grid-cols-1 gap-8", stories.length > 1 && "md:grid-cols-2 md:gap-8")}>
          {stories.map((story) => {
            const readUrl = notionSuccessStoryPublicReadUrl(story)
            const quoteParts = story.quote ? splitSuccessStoryQuote(story.quote) : null

            return (
              <article
                key={story.id}
                className="flex flex-col gap-6 rounded-[30px] bg-[#f4fbf6] p-[15px]"
              >
                <div className="flex min-h-[min(28rem,70svh)] flex-col gap-8 rounded-[30px] bg-white px-6 py-12 sm:px-7 sm:py-14 md:min-h-[27.75rem] md:px-[26px] md:py-[70px]">
                  <div className="flex gap-2.5">
                    <img
                      alt=""
                      src={titleIcon}
                      className="mt-1 size-6 shrink-0"
                      width={24}
                      height={24}
                      aria-hidden
                    />
                    <h3
                      className={cn(
                        "text-pretty text-xl font-semibold leading-snug sm:text-2xl",
                        SCHOOLS_SUCCESS_STORY_GREEN
                      )}
                    >
                      {story.title}
                    </h3>
                  </div>
                  {story.quote ? (
                    <>
                      <blockquote className="text-pretty text-lg italic leading-relaxed text-muted-foreground sm:text-xl">
                        {quoteParts ? (
                          <>
                            &ldquo;{quoteParts.before}{" "}
                            <strong
                              className={cn(
                                "font-semibold italic",
                                SCHOOLS_SUCCESS_STORY_GREEN
                              )}
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
                        <p className="text-sm not-italic text-muted-foreground">
                          — {story.quoteAttribution}
                        </p>
                      ) : null}
                    </>
                  ) : (
                    <p className="text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                      {story.summary}
                    </p>
                  )}
                </div>
                <a
                  href={readUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group ml-auto flex w-fit items-center gap-2.5 text-base font-normal",
                    SCHOOLS_SUCCESS_STORY_GREEN,
                    "underline-offset-4 hover:underline"
                  )}
                >
                  <span>Read story</span>
                  <ArrowRight
                    className="size-[26px] shrink-0 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

/**
 * Register — Figma 1379:2453 shell (white card, centered stack). Title + lead match other For
 * Schools section headers (Benefits, Success Stories, etc.).
 */
const REGISTER_CTA_CARD =
  "mx-auto w-full max-w-[1022px] overflow-hidden rounded-[30px] bg-white p-8 sm:p-10 md:p-[50px]"

export const SchoolsRegisterCTA = () => {
  return (
    <section id={forSchoolsSectionIds.register} className="scroll-mt-24">
      <div className={REGISTER_CTA_CARD}>
        <div className="flex flex-col items-center gap-12 md:gap-14 lg:gap-[60px]">
          <div className="mx-auto w-full max-w-[49rem] space-y-3 text-center sm:space-y-4 md:space-y-5">
            <h2 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
              Register Your Institution
            </h2>
            <p className="w-full max-w-none text-pretty text-lg text-[#62636C] dark:text-white/90">
              Want to get started? Sign up to register your organization and provide your tutors
              access to our full training suite.
            </p>
          </div>
          <Link href="/get-involved#partnerships-contact-form" className={primaryCta}>
            Sign up
          </Link>
        </div>
      </div>
    </section>
  )
}
