"use client"

import { useReducedMotion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ArrowLeft } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { BunduiFooterSection } from "@/components/registry/bundui/footer-section"
import {
  plusHomeAwards,
  plusHomeHero,
  plusHomeImpactDecor,
  plusHomeImpactMap,
  plusHomeScience,
  plusHomeSmartTech,
  plusHomeTestimonialAvatars,
} from "@/components/marketing/plus-home-assets"
import { marketingTypography } from "@/lib/marketing-typography"
import { cn } from "@/lib/utils"

/**
 * Counts from 0 up to `target` over `duration` ms once the element enters the
 * viewport. Respects `prefers-reduced-motion` by snapping immediately to the
 * final value.
 */
function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return
        hasRun.current = true

        if (prefersReduced) {
          setValue(target)
          return
        }

        const start = performance.now()
        const tick = (now: number) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          // Ease-out quad for a snappy deceleration
          const eased = 1 - (1 - progress) * (1 - progress)
          setValue(Math.round(eased * target))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { ref, value }
}

/** Animated number with optional suffix (e.g. "+" or " papers"). */
const CountUpStat = ({
  target,
  suffix = "",
  className,
}: {
  target: number
  suffix?: string
  className?: string
}) => {
  const { ref, value } = useCountUp(target)
  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

/** Section typography + rhythm — match `for-schools-sections.tsx`. */
const schoolsSectionTitle =
  "text-pretty text-lg font-bold tracking-tight text-teal-950 sm:text-2xl md:text-3xl"
const schoolsSectionLead =
  "text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg"
const schoolsSectionGap = "space-y-6 sm:space-y-8 lg:space-y-10"
const schoolsHeaderRow =
  "flex w-full flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8"
const schoolsHeaderText =
  "min-w-0 flex-1 basis-0 space-y-3 sm:space-y-4 md:space-y-5"

/**
 * Trailing header character — same footprint everywhere (compact vs. full Figma frame).
 * Center content with `flex items-center justify-center`; use `bg-white` when using `Image fill`.
 */
const marketingSectionHeaderDecorSlot =
  "relative h-[150px] w-[165px] shrink-0 overflow-hidden"

/**
 * Top announcement bar mirroring the tutors.plus product update banner.
 */
export const PlusAnnouncementBar = () => {
  return (
    <div className="w-full border-b border-border/60 bg-primary/5 px-4 py-2.5 text-xs text-muted-foreground sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs">
          <span className="mr-1.5 inline-flex items-center rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-primary uppercase">
            New
          </span>
          PLUS app v10 is now live — new features for onboarding, AI Feedback and tutoring workflows.
        </p>
        <Button variant="link" size="sm" className="h-auto px-0 py-0 text-xs font-medium text-primary">
          Explore updates →
        </Button>
      </div>
    </div>
  )
}

/** Navigation link items for the updated top nav. */
const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "For schools", href: "/for-schools" },
  { label: "For tutors", href: "/for-tutors" },
  { label: "For researchers", href: "/for-researchers" },
  { label: "Get involved", href: "/#get-involved" },
] as const

export type NavbarCtaStyle = "marketing" | "default"

/**
 * Updated navbar matching the new Figma IA.
 * Links: About, For schools, For tutors, For researchers, Get involved.
 * CTA: "Tutor Login" — marketing = pill teal; default = Storybook default Button.
 */
export const PlusNavbar = ({
  ctaStyle = "marketing",
}: {
  ctaStyle?: NavbarCtaStyle
}) => {
  return (
    <header className="sticky top-0 z-40 bg-background/80 pb-3 backdrop-blur-md">
      <div className="flex justify-center px-4 pt-3 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border border-border/70 bg-background/90 px-4 py-2.5 shadow-sm shadow-black/[0.04]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="relative flex size-7 items-center justify-center rounded-full bg-primary/10">
              <span className="absolute inset-1.5 rounded-full bg-primary" />
            </span>
            <span className="text-sm font-semibold tracking-tight">PLUS</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Tutor Login CTA */}
          {ctaStyle === "default" ? (
            <Button size="sm">
              <ArrowLeft className="size-4" />
              Tutor Login
            </Button>
          ) : (
            <Button size="sm" className="rounded-full gap-1.5 px-4">
              <ArrowLeft className="size-4" />
              Tutor Login
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

const LANDING_HERO_ARTBOARD = 1280
/** Figma `1727:1970` right-pair `left` values (`1714:2175`, `1714:2177`) + tiny nudge only. */
const landingHeroRightOrnamentNudgePx = 8

/**
 * Floating math characters — Figma `1727:1970` on a 1280px-wide artboard (positions scale with track width).
 */
const LandingHeroOrnaments = () => (
  <div
    className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden justify-center md:flex"
    aria-hidden
  >
    <div className="relative h-[280px] w-full max-w-[1280px] shrink-0">
      {/* 1714:2169 — pink +, left 0 top 115, −15° */}
      <div className="absolute left-0 top-[115px] flex h-[76.961px] w-[83.14px] items-center justify-center">
        <div className="-rotate-[15deg]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={plusHomeHero.landingOrnamentPinkPlus}
            className="h-[60.992px] w-[69.731px] max-w-none object-contain"
          />
        </div>
      </div>
      {/* 1714:2171 — purple ×, left 75 top 3, +15° */}
      <div
        className="absolute top-[3px] flex h-[95.093px] w-[108.563px] items-center justify-center"
        style={{ left: "calc(75 * 100% / 1280)" }}
      >
        <div className="rotate-[15deg]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={plusHomeHero.landingOrnamentPurpleX}
            className="h-[73.617px] w-[92.667px] max-w-none object-contain"
          />
        </div>
      </div>
      {/* 1714:2173 — ÷, left 107 top 145, −15° */}
      <div
        className="absolute top-[145px] flex h-[93.161px] w-[90.035px] items-center justify-center"
        style={{ left: "calc(107 * 100% / 1280)" }}
      >
        <div className="-rotate-[15deg]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={plusHomeHero.landingOrnamentDivide}
            className="h-[77px] w-[72.579px] max-w-none object-contain"
          />
        </div>
      </div>
      {/* 1714:2175 — green &gt;, left 1014 + nudge */}
      <div
        className="absolute top-[51px] flex h-[79.722px] w-[84.122px] items-center justify-center"
        style={{
          left: `calc(${1014 + landingHeroRightOrnamentNudgePx} * 100% / ${LANDING_HERO_ARTBOARD})`,
        }}
      >
        <div className="rotate-[15deg]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={plusHomeHero.landingOrnamentGreenGt}
            className="h-[63.778px] w-[70px] max-w-none object-contain"
          />
        </div>
      </div>
      {/* 1714:2177 — =, left 1105 + same nudge */}
      <div
        className="absolute top-[132px] h-[57px] w-[69.687px]"
        style={{
          left: `calc(${1105 + landingHeroRightOrnamentNudgePx} * 100% / ${LANDING_HERO_ARTBOARD})`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={plusHomeHero.landingOrnamentEquals}
          className="absolute inset-0 size-full max-w-none object-contain"
        />
      </div>
    </div>
  </div>
)

/** Figma `1732:3947` — four marks in a row under the dashboard (`1714:1883` Landing). */
const landingHeroAwards = [
  {
    src: plusHomeHero.landingAwardEdTech,
    label: "Edtech Awards Finalist",
  },
  {
    src: plusHomeHero.landingAwardBestDemo,
    label: "2023 Best Demo Award",
  },
  {
    src: plusHomeHero.landingAwardCodie,
    label: "2024 SIIA CODiE Finalist",
  },
  {
    src: plusHomeHero.landingAwardIela,
    label: "2022 iela Gold Star",
  },
] as const

/**
 * Same marquee pattern as `SchoolsCommunitySection` — `partner-marquee-track` in `globals.css`.
 */
const LandingHeroAwardsRow = () => {
  const reduceMotion = useReducedMotion()
  const [marqueePaused, setMarqueePaused] = useState(false)

  const awardCell = (
    { src, label }: (typeof landingHeroAwards)[number],
    index: number,
    keySuffix: string
  ) => (
    <article
      key={`${label}-${keySuffix}`}
      className="flex w-[14.8125rem] shrink-0 flex-col items-center gap-3 text-center"
      aria-hidden={index >= landingHeroAwards.length ? true : undefined}
    >
      <div className="flex h-[6.75rem] w-[11.1875rem] shrink-0 items-center justify-center">
        <Image
          src={src}
          alt=""
          width={179}
          height={108}
          className="max-h-full max-w-full object-contain"
          unoptimized
        />
      </div>
      <p className="text-pretty text-xl font-semibold text-muted-foreground">{label}</p>
    </article>
  )

  return (
    <div
      id="get-involved"
      className="relative z-10 mx-auto mt-12 w-full max-w-[min(80rem,100%)] scroll-mt-28 px-4 pb-8 sm:mt-14 sm:pb-10 md:px-8 lg:scroll-mt-32"
    >
      <p className="text-center text-xl font-normal text-muted-foreground">Our Awards</p>
      <div
        role="region"
        aria-label="Award recognition"
        className="relative mx-auto mt-6 w-full max-w-5xl"
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
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-8 sm:gap-x-10 lg:gap-x-[3.75rem]">
            {landingHeroAwards.map((item, index) => awardCell(item, index, `static-${index}`))}
          </div>
        ) : (
          <div className="overflow-hidden">
            <div
              className="partner-marquee-track flex w-max items-stretch gap-x-8 sm:gap-x-10 lg:gap-x-[3.75rem]"
              style={{
                animationPlayState: marqueePaused ? "paused" : "running",
              }}
            >
              {[...landingHeroAwards, ...landingHeroAwards].map((item, index) =>
                awardCell(item, index, `marquee-${index}`)
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const HERO_VIDEO_ID = "UGoYioREH0E"

/**
 * Hero — Figma `1714:1883` Landing: wash, copy, ornaments, video (`1791:3805`), Our Awards (`1732:3947`).
 */
export const PlusHeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section
      id="about"
      className="relative w-full overflow-x-clip overflow-y-visible bg-white pb-10 pt-10 sm:pb-14 sm:pt-12 md:pt-16"
    >
      {/* Figma `1714:2153` — blob order L→R: pink → coral → yellow → green → blue; then white veil (heavy white) */}
      <div
        className="pointer-events-none absolute inset-0 min-h-full w-full overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-24 -left-[12%] h-[clamp(14rem,28vw,22.375rem)] w-[clamp(22rem,65vw,51.875rem)] rounded-full bg-[#ffe8f5] blur-[100px] sm:-top-28" />
        <div className="absolute -top-20 left-[8%] h-[clamp(12rem,22vw,22.375rem)] w-[clamp(12rem,23vw,18.6875rem)] rounded-full bg-[#ffd9d8] blur-[100px] sm:-top-24 sm:left-[11%]" />
        <div className="absolute -top-24 left-[20%] h-[clamp(14rem,28vw,22.375rem)] w-[clamp(28rem,104vw,83rem)] max-w-[1329px] rounded-full bg-[#fff0cb] blur-[100px] sm:-top-28 sm:left-[25%]" />
        <div className="absolute -top-20 left-[48%] h-[clamp(12rem,24vw,22.375rem)] w-[clamp(12rem,26vw,20.8125rem)] rounded-full bg-[#d7f0de] blur-[100px] sm:-top-24 sm:left-[53%]" />
        <div className="absolute -top-24 left-[58%] h-[clamp(14rem,28vw,22.375rem)] w-[clamp(18rem,66vw,53.1875rem)] rounded-full bg-[#caeffe] blur-[100px] sm:-top-28 sm:left-[66%]" />
        {/* ~Figma `1714:2163`: thin pastel band at top, most of the fold reads white */}
        <div
          className="absolute inset-x-0 top-0 bottom-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.45)_7%,rgba(255,255,255,0.82)_14%,#fff_22%,#fff_100%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[min(80rem,100%)] px-4 text-center md:px-8 lg:px-12">
        {/* Shared offset so Figma ornaments + copy move together; rhythm aligned with `SchoolsHeroSection` padding */}
        <div className="relative mt-8 sm:mt-10 md:mt-12">
          {/* Ornaments: Figma `1727:1970` — 1280px coordinate track */}
          <LandingHeroOrnaments />
          <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-8 sm:gap-10">
            <div className="flex w-full flex-col gap-4 sm:gap-5">
              <h1
                className="mx-auto max-w-prose text-balance text-center text-3xl font-bold leading-tight tracking-tight text-teal-950 dark:text-white sm:text-4xl md:text-5xl"
              >
                Scaling Up High-Impact Math Tutoring with Technology and Training
              </h1>
              <p
                className={cn(
                  marketingTypography.lead,
                  "mx-auto max-w-prose text-center text-pretty"
                )}
              >
                <span className="font-bold text-primary">PLUS</span> is a virtual tutoring platform that empowers
                middle school math learners with AI technology and research-backed methods.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-5">
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "h-11 min-w-[169px] justify-center rounded-full border-0 bg-[#a6edf4] px-8 text-base font-normal text-[#004247] hover:bg-[#94e5ee]"
                )}
              >
                Our mission
              </Link>
              <Link
                href="/for-tutors"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 min-w-[132px] justify-center rounded-full border border-[#027f89] bg-white px-8 text-base font-normal text-[#004247] hover:bg-teal-50"
                )}
              >
                Join us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Figma `1791:3805` — video player: 822×406, rounded-[22px], dark overlay + centered play button */}
      <div className="relative z-10 mx-auto mt-10 w-full max-w-[1000px] px-4 sm:mt-12">
        <div className="relative aspect-video overflow-hidden rounded-[22px]">
          {isVideoPlaying ? (
            <iframe
              className="absolute inset-0 size-full"
              src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}?autoplay=1&rel=0`}
              title="PLUS platform walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsVideoPlaying(true)}
              className="group absolute inset-0 size-full"
              aria-label="Play PLUS platform video"
            >
              {/* YouTube maxres thumbnail as poster */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${HERO_VIDEO_ID}/maxresdefault.jpg`}
                alt=""
                className="size-full object-cover"
              />
              {/* Dark overlay — Figma rgba(54,54,54,0.5) */}
              <div
                className="absolute inset-0 bg-[rgba(54,54,54,0.5)] transition-opacity group-hover:bg-[rgba(54,54,54,0.38)]"
                aria-hidden
              />
              {/* Play button — Figma `1791:3797` icon-park-solid:play, 75px */}
              <svg
                className="absolute left-1/2 top-1/2 size-[75px] -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-110 drop-shadow-md"
                viewBox="0 0 75 75"
                fill="none"
                aria-hidden
              >
                <circle cx="37.5" cy="37.5" r="37.5" fill="#a6edf4" fillOpacity="0.82" />
                {/* Play triangle — optically centred with +2px right nudge */}
                <path d="M30 22.5L54 37.5L30 52.5V22.5Z" fill="#004247" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <LandingHeroAwardsRow />
    </section>
  )
}

/** Figma IA — brown stat color (#a56d1e) */
const IMPACT_STAT = "text-[#a56d1e]"

/** Match `SchoolsSuccessStoriesSection` card + quote panel (`for-schools-sections.tsx`). */
const VOICES_STORY_CARD =
  "flex flex-col gap-[25px] overflow-hidden rounded-[30px] bg-[#f4fbf6] p-[15px]"
const VOICES_QUOTE_PANEL =
  "flex h-[280px] flex-col items-center justify-center overflow-y-auto rounded-[30px] bg-white px-5 py-6 sm:h-[300px] sm:px-6 lg:h-[320px]"

/**
 * Figma `1714:1912` — 473px + 93px + 556px; stat stacks 395px wide, 18px vertical rhythm inside each.
 */
const IMPACT_STAT_STACK =
  "mx-auto flex w-full max-w-[395px] flex-col items-start gap-[18px] lg:mx-0"

/**
 * Impact — “Serving Low-Income Students” — Figma `1714:1912` (asymmetric columns + map height 472).
 */
export const PlusImpactStatsSection = () => {
  return (
    <section id="impact" className={cn("relative", schoolsSectionGap)}>
      <div className={schoolsHeaderRow}>
        <div className={schoolsHeaderText}>
          <h2 className={schoolsSectionTitle}>Serving Low-Income Students</h2>
          <p className={schoolsSectionLead}>
            Bridging the opportunity gap in math education by empowering schools and community tutors with
            AI-enhanced tools designed for every student&apos;s success.
          </p>
        </div>
        <div
          className={cn(
            marketingSectionHeaderDecorSlot,
            "hidden items-center justify-center lg:flex"
          )}
          aria-hidden
        >
          <img
            alt=""
            src={plusHomeImpactDecor.equalSign}
            className="pointer-events-none max-h-full max-w-full object-contain"
          />
        </div>
      </div>

      {/*
        Figma `1714:1912`: lg 2×2 grid (473 + 93 + 556, row gap 61). Mobile reading order: students → map → schools → tutors.
      */}
      <div className="mx-auto mt-10 grid w-full max-w-[1122px] grid-cols-1 gap-y-10 sm:mt-12 lg:mt-14 lg:grid-cols-[minmax(0,473fr)_minmax(0,556fr)] lg:gap-x-[93px] lg:gap-y-[61px]">
        <div className="order-1 lg:col-start-1 lg:row-start-1 lg:self-start lg:pt-14">
          <div className={IMPACT_STAT_STACK}>
            <div className="relative size-[58px] shrink-0">
              <Image
                src={plusHomeImpactDecor.iconStudents}
                alt=""
                width={58}
                height={58}
                className="block size-[58px] object-contain"
                unoptimized
              />
            </div>
            <p className={cn("text-2xl font-bold leading-tight sm:text-3xl", IMPACT_STAT)}>
              <CountUpStat target={5000} suffix="+" /> students
            </p>
            <p className={schoolsSectionLead}>
              Students across the country receiving personalized math support through PLUS.
            </p>
            <Link
              href="/for-tutors"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "mt-4 h-[45px] w-fit min-w-[263px] justify-center rounded-full border-0 bg-[#a6edf4] px-10 text-base font-normal text-[#004247] hover:bg-[#94e5ee]"
              )}
            >
              Learn more about toolkit
            </Link>
          </div>
        </div>

        <div className="order-2 lg:col-start-2 lg:row-start-1 lg:self-start">
          <div className="relative h-[min(472px,78vw)] w-full overflow-hidden rounded-[30px] bg-muted/30 sm:h-[400px] lg:h-[472px]">
            {/* eslint-disable-next-line @next/next/no-img-element -- Figma crop (`1714:1956`) */}
            <img
              alt=""
              src={plusHomeImpactMap}
              className="pointer-events-none absolute left-[0.05%] top-[-36.79%] h-[133.99%] w-full max-w-none object-cover"
            />
          </div>
        </div>

        <div className="order-3 lg:col-start-1 lg:row-start-2 lg:flex lg:flex-col">
          <div className={cn(IMPACT_STAT_STACK, "lg:h-full")}>
            <div className="relative size-[58px] shrink-0">
              <Image
                src={plusHomeImpactDecor.iconSchools}
                alt=""
                width={58}
                height={58}
                className="block size-[58px] object-contain"
                unoptimized
              />
            </div>
            <p className={cn("text-2xl font-bold leading-tight sm:text-3xl", IMPACT_STAT)}>
              <CountUpStat target={13} suffix="+" /> schools
            </p>
            <p className={schoolsSectionLead}>
              PLUS tutors provide instructional support to middle-school math learners during the school day.
            </p>
            <Link
              href="/for-schools"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "mt-auto h-[45px] w-fit min-w-[212px] justify-center rounded-full border border-[#027f89] bg-white px-10 text-base font-normal text-[#004247] hover:bg-teal-50"
              )}
            >
              Get PLUS tutoring
            </Link>
          </div>
        </div>

        <div className="order-4 lg:col-start-2 lg:row-start-2 lg:flex lg:flex-col lg:pl-[83px]">
          <div className={cn(IMPACT_STAT_STACK, "lg:h-full")}>
            <div className="relative size-[58px] shrink-0">
              <Image
                src={plusHomeImpactDecor.iconTutors}
                alt=""
                width={58}
                height={58}
                className="block size-[58px] object-contain"
                unoptimized
              />
            </div>
            <p className={cn("text-2xl font-bold leading-tight sm:text-3xl", IMPACT_STAT)}>
              <CountUpStat target={500} suffix="+" /> tutors
            </p>
            <p className={schoolsSectionLead}>
              University and community tutors trained to support middle school math learners.
            </p>
            <Link
              href="/for-tutors"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "mt-auto h-[45px] w-fit min-w-[195px] justify-center rounded-full border border-[#027f89] bg-white px-10 text-base font-normal text-[#004247] hover:bg-teal-50"
              )}
            >
              Become a tutor
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Figma `1707:1917` — bento column gap + row heights (556+520+46 ≈ 1122). */
const SMART_TECH_BENTO_GAP = "gap-[46px]"

/** Icon + title row — Figma `gap-[25px]`; titles use shared `marketingTypography.bentoTitle` + brand pink. */
const SmartTechCardHeader = ({
  iconSrc,
  title,
  className,
  titleClassName,
}: {
  iconSrc: string
  title: string
  className?: string
  titleClassName?: string
}) => (
  <div className={cn("relative z-20 flex items-center gap-[25px]", className)}>
    <div className="relative size-[58px] shrink-0">
      <Image src={iconSrc} alt="" width={58} height={58} className="object-contain" unoptimized />
    </div>
    <h3 className={cn(marketingTypography.bentoTitle, "max-w-[18rem] text-[#d31998] lg:max-w-[289px]", titleClassName)}>
      {title}
    </h3>
  </div>
)

/**
 * Smart Tech, Smarter Learning — Figma `1714:1957`.
 * Layout: Supervisor (526×423) + AI Tutor (526×423) side-by-side in row 1;
 *         Collaborative Goal Setting (~1094×520) full-width in row 2.
 */
export const PlusSmartTechSection = () => {
  return (
    <section id="smart-tech" className={cn("relative", schoolsSectionGap)}>
      <div className={schoolsHeaderRow}>
        <div className={schoolsHeaderText}>
          <h2 className={schoolsSectionTitle}>Smart Tech, Smarter Learning</h2>
          <p className={schoolsSectionLead}>
            Smart systems for superior outcomes. Our platform integrates AI tutor training, centralized
            supervisor tracking, and interactive goal setting to turn complex data into clear academic
            breakthroughs.
          </p>
        </div>
        <div
          className={cn(
            marketingSectionHeaderDecorSlot,
            "mx-auto hidden bg-white sm:mx-0 sm:block"
          )}
        >
          <Image
            src={plusHomeSmartTech.headerDoodle}
            alt=""
            fill
            className="object-contain object-center"
            sizes="165px"
            unoptimized
          />
        </div>
      </div>

      <div
        className={cn(
          "mx-auto mt-10 flex w-full max-w-[1122px] flex-col sm:mt-12 lg:mt-[69px]",
          SMART_TECH_BENTO_GAP
        )}
      >
        {/* Row 1: Supervisor Dashboard + AI Tutor Training — Figma `1714:1965` + `1714:1976` */}
        <div className={cn("grid grid-cols-1 lg:grid-cols-2", SMART_TECH_BENTO_GAP)}>
          {/* Supervisor Dashboard — Figma `1714:1965` (526×423) */}
          <article className="relative overflow-hidden rounded-[30px] bg-[#ffe8f5] lg:h-[423px]">
            <SmartTechCardHeader
              iconSrc={plusHomeSmartTech.iconSupervisor}
              title="Supervisor Dashboard"
              className="px-5 pt-5 lg:absolute lg:left-[23px] lg:top-[17px] lg:px-0 lg:pt-0"
            />
            <div className="relative mt-4 px-5 pb-5 lg:hidden">
              <Image
                src={plusHomeSmartTech.supervisor}
                alt=""
                width={800}
                height={480}
                className="h-auto w-full rounded-[5px] object-contain object-top"
                unoptimized
              />
            </div>
            {/*
              Figma `1714:1965` (526×423):
              Back `1714:1974`: left=28px→5.32%, top=215px→50.83%, w=430px→81.75%, h=212px→50.12%
              Front `1714:1975`: left=148px→28.14%, top=164px→38.77%, w=532px→101.14%, h=263px→62.17%
            */}
            <div className="pointer-events-none hidden lg:absolute lg:inset-0 lg:block" aria-hidden>
              <div className="absolute left-[5.32%] top-[50.83%] h-[50.12%] w-[81.75%] overflow-hidden rounded-[5px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={plusHomeSmartTech.supervisorLayerBack}
                  className="absolute h-[99.83%] w-[100.27%] max-w-none object-cover"
                  style={{ left: "-0.27%", top: "0.08%" }}
                />
              </div>
              <div className="absolute left-[28.14%] top-[38.77%] h-[62.17%] w-[101.14%] overflow-hidden rounded-[5px] shadow-[-2px_-2px_53px_rgba(0,0,0,0.25)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={plusHomeSmartTech.supervisorLayerFront}
                  className="absolute h-[100.1%] w-[100.4%] max-w-none object-cover"
                  style={{ left: "-0.4%", top: "-0.05%" }}
                />
              </div>
            </div>
          </article>

          {/* AI tutor training — Figma `1714:1976` (526×423) */}
          <article className="relative overflow-hidden rounded-[30px] bg-[#ffe8f5] lg:h-[423px]">
            <SmartTechCardHeader
              iconSrc={plusHomeSmartTech.iconAiTutor}
              title="AI tutor training"
              className="px-5 pt-5 lg:absolute lg:left-[23px] lg:top-[17px] lg:px-0 lg:pt-0"
            />
            <div className="relative mt-4 px-5 pb-5 lg:hidden">
              <Image
                src={plusHomeSmartTech.aiTutor}
                alt=""
                width={800}
                height={480}
                className="h-auto w-full rounded-[5px] object-contain object-top"
                unoptimized
              />
            </div>
            {/*
              Figma `1714:1976` (526×423):
              Back `1714:1986`: centered, top=124px→29.31%, w=415px→78.90%, h=204px→48.23%
              Front `1714:1987`: centered, top=199px→47.05%, w=469px→89.16%, h=230px→54.37%
            */}
            <div className="pointer-events-none hidden lg:absolute lg:inset-0 lg:block" aria-hidden>
              <div className="absolute left-1/2 top-[29.31%] h-[48.23%] w-[78.90%] -translate-x-1/2 overflow-hidden rounded-[5px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={plusHomeSmartTech.aiTutorLayerBack}
                  className="size-full max-w-none object-contain"
                />
              </div>
              <div className="absolute left-1/2 top-[47.05%] h-[54.37%] w-[89.16%] -translate-x-1/2 overflow-hidden rounded-[5px] shadow-[0_-2px_40px_rgba(0,0,0,0.25)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={plusHomeSmartTech.aiTutorLayerFront}
                  className="size-full max-w-none object-contain"
                />
              </div>
            </div>
          </article>
        </div>

        {/* Row 2: Collaborative Goal Setting — Figma `1714:1988` (full-width ~1094×465) */}
        <article className="relative overflow-hidden rounded-[30px] bg-[#ffe8f5] lg:h-[465px]">
          <SmartTechCardHeader
            iconSrc={plusHomeSmartTech.iconGoal}
            title="Collaborative Goal Setting"
            className="px-5 pt-5 lg:absolute lg:left-[23px] lg:top-[17px] lg:px-0 lg:pt-0"
            titleClassName="lg:max-w-[539px] lg:whitespace-nowrap"
          />
          <div className="relative mt-4 px-5 pb-5 lg:hidden">
            <Image
              src={plusHomeSmartTech.goalSetting}
              alt=""
              width={900}
              height={560}
              className="h-auto w-full rounded-[5px] object-contain object-center"
              unoptimized
            />
          </div>
          {/*
            Figma `1714:1988` (wide ~1094×465, rotation-derived coordinates):
            Front `1714:1997` (shadow): left=3.9%, top=30.1%, w=55.9%, h=66.7%
            Back `1714:1996`: left=39.8%, top=46%, w=55.8%, h=65%
          */}
          <div className="pointer-events-none hidden lg:absolute lg:inset-0 lg:block" aria-hidden>
            <div className="absolute left-[39.8%] top-[46%] z-[1] h-[65%] w-[55.8%] overflow-hidden rounded-[5px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={plusHomeSmartTech.goalLayerBack}
                className="absolute h-[99.91%] w-[100.19%] max-w-none object-cover"
                style={{ left: "-0.19%", top: "0.05%" }}
              />
            </div>
            <div className="absolute left-[3.9%] top-[30.1%] z-[2] h-[66.7%] w-[55.9%] overflow-hidden rounded-[5px] shadow-[-2px_-2px_40px_rgba(0,0,0,0.25)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={plusHomeSmartTech.goalLayerFront}
                className="absolute h-[99.82%] w-full max-w-none object-cover"
                style={{ left: 0, top: "0.09%" }}
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

/**
 * Figma `1708:2035` — two columns (473 + 72 gap + 556), 397px-tall row; right panel layered screenshots.
 * Typography: shared `schoolsSection*` + `marketingTypography.bentoTitle` for the stat line (brand blue).
 */
export const PlusScienceOfLearningSection = () => {
  return (
    <section id="science-of-learning" className={cn("relative", schoolsSectionGap)}>
      <div className={schoolsHeaderRow}>
        <div className={schoolsHeaderText}>
          <h2 className={schoolsSectionTitle}>Built on the Science of Learning</h2>
          <p className={schoolsSectionLead}>
            Developed within CMU&apos;s HCII, our platform is a direct result of world-class educational
            research. We&apos;ve engineered AI tools designed to adapt to how students think.
          </p>
        </div>
        <div
          className={cn(
            marketingSectionHeaderDecorSlot,
            "mx-auto hidden bg-white sm:mx-0 sm:block"
          )}
        >
          <Image
            src={plusHomeScience.headerDoodle}
            alt=""
            fill
            className="object-contain object-center"
            sizes="165px"
            unoptimized
          />
        </div>
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-[1122px] grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[minmax(0,473fr)_minmax(0,556fr)] lg:items-start lg:gap-[72px]">
        {/* Left — Figma `1709:2079`: 395px-wide stack, gap 18px, vertically centered in 473px column */}
        <div className="flex w-full justify-center lg:min-h-[397px] lg:items-center lg:justify-center">
          <div className="flex w-full max-w-[395px] flex-col gap-[18px]">
            <div className="relative size-[58px] shrink-0">
              <Image
                src={plusHomeScience.iconPapers}
                alt=""
                width={58}
                height={58}
                className="object-contain"
                unoptimized
              />
            </div>
            <p className={cn(marketingTypography.bentoTitle, "text-[#0080b4]")}>
              <CountUpStat target={30} suffix="+" /> published papers
            </p>
            <p className={schoolsSectionLead}>
              PLUS is founded on decades of learning science research from leaders at Carnegie Mellon University
              and Stanford University. PLUS&apos;s findings are freely available to all.
            </p>
            <Link
              href="/research"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-[45px] w-fit min-w-[215px] justify-center rounded-full border-0 bg-[#a6edf4] px-10 text-base font-normal text-[#004247] hover:bg-[#94e5ee]"
              )}
            >
              Read our research
            </Link>
          </div>
        </div>

        {/* Right — Figma `1709:2094`: 556×397, #e0f6fe, layered paper + table (positions from `1709:2116` / `1709:2114`) */}
        <div className="relative mx-auto min-h-[280px] w-full max-w-[556px] overflow-hidden rounded-[30px] bg-[#e0f6fe] lg:mx-0 lg:h-[397px] lg:min-h-0">
          {/* Mobile: stacked layers (Figma asset order) */}
          <div className="relative flex flex-col gap-3 p-4 sm:p-6 lg:hidden">
            <Image
              src={plusHomeScience.papersLayerBack}
              alt=""
              width={266}
              height={278}
              className="h-auto w-full max-w-[16rem] rounded-[5px] object-contain"
              unoptimized
            />
            <Image
              src={plusHomeScience.papersLayerFront}
              alt=""
              width={558}
              height={278}
              className="h-auto w-full rounded-[5px] object-contain shadow-[-2px_2px_40px_rgba(0,0,0,0.25)]"
              unoptimized
            />
          </div>

          {/* Desktop — Figma `1709:2116` + `1709:2114` (556×397 panel) */}
          <div className="pointer-events-none relative hidden h-[397px] w-full lg:block" aria-hidden>
            <div className="absolute left-[calc(50%-111px)] top-[119px] h-[278px] w-[266px] -translate-x-1/2 overflow-hidden rounded-[5px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={plusHomeScience.papersLayerBack}
                className="absolute h-full max-w-none object-cover"
                style={{ left: "0.02%", top: 0, width: "99.96%" }}
              />
            </div>
            <div className="absolute left-[calc(50%+144px)] top-[54px] h-[278px] w-[558px] -translate-x-1/2 overflow-hidden rounded-[5px] shadow-[-2px_2px_40px_rgba(0,0,0,0.25)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={plusHomeScience.papersLayerFront}
                className="absolute h-full max-w-none object-cover"
                style={{ left: "-0.04%", top: 0, width: "98.79%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Testimonials — same card + quote panel pattern as `SchoolsSuccessStoriesSection` (For Schools).
 */
export const PlusVoicesSection = () => {
  const testimonials = [
    {
      avatar: plusHomeTestimonialAvatars.student,
      quote: "Tutoring has affected me and it made me realize if I didn't get the help I needed I would still be struggling. But it made me see",
      highlight: "math differently in a good way",
      end: ".",
      attribution: "Student Receiving PLUS Tutoring",
    },
    {
      avatar: plusHomeTestimonialAvatars.district,
      quote: "The students' reactions speak for themselves. They look forward to the tutoring sessions. It's not just about math. It's about relationships. It's about",
      highlight: "building confidence",
      end: ".",
      attribution: "School District of Lancaster",
    },
    {
      avatar: plusHomeTestimonialAvatars.teacher,
      quote: "My students were able to understand concepts more easily than before due to the",
      highlight: "one-to-one help",
      end: ". My students' math confidence has also increased!",
      attribution: "Teacher working with PLUS Tutors",
    },
  ] as const

  return (
    <section className={cn("relative", schoolsSectionGap)}>
      <div className={schoolsHeaderRow}>
        <div className={schoolsHeaderText}>
          <h2 className={schoolsSectionTitle}>Testimonials</h2>
          <p className={schoolsSectionLead}>
            Here&apos;s what students, faculty, and researchers are saying about PLUS.
          </p>
        </div>
        <div
          className={cn(
            marketingSectionHeaderDecorSlot,
            "mx-auto hidden items-center justify-center sm:mx-0 sm:flex"
          )}
          aria-hidden
        >
          <img
            alt=""
            src={plusHomeAwards.headerDecor}
            className="pointer-events-none max-h-full max-w-full object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
        {testimonials.map(({ avatar, quote, highlight, end, attribution }) => (
          <article
            key={attribution}
            className={cn(VOICES_STORY_CARD, "max-w-[480px] md:max-w-none")}
          >
            <div className="flex w-full shrink-0 items-end gap-[19px]">
              <div className="relative size-[62px] shrink-0 overflow-hidden rounded-full bg-muted">
                <Image
                  src={avatar}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="62px"
                  unoptimized
                />
              </div>
              <p
                className={cn(
                  marketingTypography.h3,
                  "min-w-0 flex-1 text-pretty text-[#007d49]"
                )}
              >
                {attribution}
              </p>
            </div>
            <div className={VOICES_QUOTE_PANEL}>
              <blockquote
                className={cn(
                  marketingTypography.body,
                  "mx-auto max-w-[22rem] text-center text-pretty text-muted-foreground"
                )}
              >
                &ldquo;{quote}{" "}
                <strong className="font-semibold text-teal-950">{highlight}</strong>
                {end}&rdquo;
              </blockquote>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/** @deprecated Prefer `BunduiFooterSection` from `@/components/registry/bundui/footer-section`. */
export const PlusFooterSection = () => (
  <BunduiFooterSection productName="PLUS" />
)
