"use client"

import { useReducedMotion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  FileText,
  GraduationCap,
  School,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BunduiFooterSection } from "@/components/registry/bundui/footer-section"
import { forTutorsAssets } from "@/components/marketing/for-tutors-assets"
import {
  plusHomeHero,
  plusHomeImpactDecor,
  plusHomeImpactRowSchools,
  plusHomeImpactRowStudents,
  plusHomeImpactRowTutors,
  plusHomeScience,
  plusHomeSmartTech,
  plusHomeTestimonialAvatars,
} from "@/components/marketing/plus-home-assets"
import {
  MARKETING_CARD_ICON_DIAMETER_PX,
  marketingCardIconAssetFrameClass,
  marketingCardPaddingClass,
  marketingCardStackGapClass,
  marketingFinalCtaOutlineLinkClass,
  marketingFinalCtaPrimaryLinkClass,
  marketingHeroCtaOutlineLinkClass,
  marketingHeroCtaPrimaryLinkClass,
  marketingSectionHeaderDecorAbsoluteClass,
  marketingSectionHeaderDecorImgClass,
  marketingSectionIntroColumnClass,
  marketingSectionLeadColorClass,
  marketingHeroCtaButtonRowClass,
  marketingSectionVerticalGapClass,
} from "@/lib/marketing-section-layout"
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

/** Section typography + rhythm — match `get-involved-sections.tsx` / `for-tutors-sections.tsx`. */
const schoolsSectionTitle =
  "text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl"
const schoolsSectionLead = cn(
  "w-full max-w-none text-lg",
  marketingSectionLeadColorClass,
)

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
/** Uniform pixel size for every ornament character (width = height). */
const ORNAMENT_SIZE = 72

/**
 * Right-side anchor positions (x = left edge in 1280px artboard coords).
 * Left-side mirrors are computed as `ARTBOARD - x - ORNAMENT_SIZE` so every
 * pair sits the same distance from the centre on both sides.
 */
const ORNAMENT_RIGHT = {
  greenGt:   { x: 1058, y: 5   },   // pair 1 — moved up + further out
  equals:    { x: 1148, y: 72  },   // pair 2 — moved up + further out
  character: { x: 1064, y: 164 },   // Figma 1940:2273
} as const

/** Mirrors each right position to the left. */
const mirrorX = (rightX: number) => LANDING_HERO_ARTBOARD - rightX - ORNAMENT_SIZE

/** CSS left value using the 1280px proportional scale. */
const pct = (x: number) => `calc(${x} * 100% / ${LANDING_HERO_ARTBOARD})`

/**
 * Six floating ornament characters — three on each side, symmetric pairs.
 * Pair 1: coral +  ↔  green >     (same top)
 * Pair 2: purple × ↔  blue =      (same top)
 * Pair 3: yellow ÷ ↔  teal figure (same top)
 */
const LandingHeroOrnaments = () => (
  <div
    className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden justify-center md:flex"
    aria-hidden
  >
    <div
      className="relative w-full max-w-[1280px] shrink-0"
      style={{ height: ORNAMENT_RIGHT.character.y + ORNAMENT_SIZE + 16 }}
    >
      {/* ── LEFT SIDE ─────────────────────────────────────────────── */}

      {/* Pair 1 left — coral + (mirrors green >) */}
      <div
        className="absolute flex items-center justify-center -rotate-[15deg]"
        style={{ left: pct(mirrorX(ORNAMENT_RIGHT.greenGt.x)), top: ORNAMENT_RIGHT.greenGt.y, width: ORNAMENT_SIZE, height: ORNAMENT_SIZE }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={plusHomeHero.landingOrnamentPinkPlus} className="size-full object-contain" />
      </div>

      {/* Pair 2 left — purple × (mirrors =) */}
      <div
        className="absolute flex items-center justify-center rotate-[15deg]"
        style={{ left: pct(mirrorX(ORNAMENT_RIGHT.equals.x)), top: ORNAMENT_RIGHT.equals.y, width: ORNAMENT_SIZE, height: ORNAMENT_SIZE }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={plusHomeHero.landingOrnamentPurpleX} className="size-full object-contain" />
      </div>

      {/* Pair 3 left — yellow ÷ (mirrors teal character) */}
      <div
        className="absolute flex items-center justify-center -rotate-[15deg]"
        style={{ left: pct(mirrorX(ORNAMENT_RIGHT.character.x)), top: ORNAMENT_RIGHT.character.y, width: ORNAMENT_SIZE, height: ORNAMENT_SIZE }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={plusHomeHero.landingOrnamentDivide} className="size-full object-contain" />
      </div>

      {/* ── RIGHT SIDE ────────────────────────────────────────────── */}

      {/* Pair 1 right — green > */}
      <div
        className="absolute flex items-center justify-center rotate-[15deg]"
        style={{ left: pct(ORNAMENT_RIGHT.greenGt.x), top: ORNAMENT_RIGHT.greenGt.y, width: ORNAMENT_SIZE, height: ORNAMENT_SIZE }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={plusHomeHero.landingOrnamentGreenGt} className="size-full object-contain" />
      </div>

      {/* Pair 2 right — blue = */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: pct(ORNAMENT_RIGHT.equals.x), top: ORNAMENT_RIGHT.equals.y, width: ORNAMENT_SIZE, height: ORNAMENT_SIZE }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={plusHomeHero.landingOrnamentEquals} className="size-full object-contain" />
      </div>

      {/* Pair 3 right — teal character figure */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: pct(ORNAMENT_RIGHT.character.x), top: ORNAMENT_RIGHT.character.y, width: ORNAMENT_SIZE, height: ORNAMENT_SIZE }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={plusHomeHero.landingCharacterFigure} className="size-full object-contain" />
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

const LEARN_MORE_AUDIENCE_ITEMS = [
  { label: "For schools", href: "/for-schools", icon: School },
  { label: "For tutors", href: "/for-tutors", icon: GraduationCap },
  { label: "For researchers", href: "/for-researchers", icon: FileText },
] as const

const LearnMoreDropdown = () => {
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(marketingHeroCtaOutlineLinkClass, "min-w-[140px] gap-2")}
      >
        Learn more
        <ChevronDown className="size-4 shrink-0 transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" sideOffset={8} className="min-w-[200px]">
        {LEARN_MORE_AUDIENCE_ITEMS.map(({ label, href, icon: Icon }) => (
          <DropdownMenuItem
            key={href}
            className={cn(
              "cursor-pointer gap-2 focus:bg-[#A6EDF4]/30 focus:text-[#004247]",
              /* Keep label teal on focus; keep icons muted (override menu `focus:**:text-accent-foreground` on svgs) */
              "[&>svg]:!text-[#62636C] focus:[&>svg]:!text-[#62636C] data-[highlighted]:[&>svg]:!text-[#62636C] data-focus-visible:[&>svg]:!text-[#62636C]",
            )}
            onClick={() => router.push(href)}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
          <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-6 sm:gap-8">
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
                <span className="font-bold text-[#027f89]">PLUS</span> is a virtual tutoring platform that empowers
                middle school math learners with AI technology and research-backed methods.
              </p>
            <div className={marketingHeroCtaButtonRowClass}>
              <Link href="/about" className={cn(marketingHeroCtaPrimaryLinkClass, "min-w-[169px]")}>
                Our mission
              </Link>
              <LearnMoreDropdown />
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
              className="group absolute inset-0 size-full cursor-pointer"
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
              {/* Play button — Figma `1791:3797` icon-park-solid:play, 75px (not tied to card icon tokens). */}
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

/** Tinted shell — matches `TutorVoiceCard` rhythm (`for-tutors-sections` Voices from Our Tutors). */
const VOICES_STORY_CARD = cn(
  "flex h-full flex-col overflow-hidden rounded-[30px] bg-[#f4fbf6] dark:bg-emerald-950/20",
  marketingCardPaddingClass,
)

/** Inner white quote panel — same `mt-4` + `rounded-3xl` + padding as `TutorVoiceCard`. */
const VOICES_QUOTE_SHELL = cn(
  "mt-4 flex min-h-0 flex-1 flex-col rounded-3xl bg-white dark:bg-card dark:ring-1 dark:ring-white/10",
  marketingCardPaddingClass,
)

/** “Read story” row — same interaction as tutor voices; emerald accent for homepage testimonials. */
const VOICES_READ_STORY_CLASS =
  "group mt-4 ml-auto inline-flex cursor-pointer items-center gap-2 text-lg font-medium text-[#007d49] no-underline transition-opacity hover:opacity-90 dark:text-emerald-300"

/** Avatar + attribution — flush to card `p-*` top; `items-center` vertically centers copy with the disc. */
const VOICES_ATTRIBUTION_ROW = "flex w-full shrink-0 items-center gap-3"

/** Testimonial profile photo — `size-16` (64px) circle; larger than 48px marketing disc, smaller than prior 96px. */
const VOICES_AVATAR_BOX =
  "relative size-16 shrink-0 overflow-hidden rounded-full bg-muted"

/**
 * Copy column — matches get-involved **Why Work at PLUS** zigzag (responsive widths + `gap-[18px]`).
 */
const impactZigzagTextColClass = cn(
  "flex w-full min-w-0 flex-col items-start gap-[18px]",
  "max-md:max-w-[min(36rem,100%)] max-md:self-start",
  "md:min-w-0 md:flex-1 md:basis-0 md:max-w-[min(28rem,52%)]",
  "lg:w-[473px] lg:max-w-[473px] lg:flex-none lg:basis-auto",
)

/** Stat line — original impact scale (unchanged color). */
const impactStatTitleClass = cn("text-2xl font-bold leading-tight sm:text-3xl", IMPACT_STAT)

/** Body — matches get-involved section lead (`text-base lg:text-lg`). */
const impactZigzagBodyClass = cn(
  "w-full max-w-none text-pretty text-base leading-relaxed lg:text-lg",
  marketingSectionLeadColorClass,
)

/** Raster in 48×48 frame — same as `SmartTechCardHeader` (`marketingCardIconAssetFrameClass`). */
function ImpactStatIcon({ src }: { src: string }) {
  return (
    <div className={cn("relative shrink-0", marketingCardIconAssetFrameClass)}>
      <Image
        src={src}
        alt=""
        width={MARKETING_CARD_ICON_DIAMETER_PX}
        height={MARKETING_CARD_ICON_DIAMETER_PX}
        className={cn("object-contain", marketingCardIconAssetFrameClass)}
        unoptimized
      />
    </div>
  )
}

const ImpactRowPhoto = ({ src, alt = "" }: { src: string; alt?: string }) => (
  <div className="relative w-full min-w-0">
    <div className="relative w-full overflow-hidden rounded-[30px] bg-muted/30">
      <div className="relative aspect-[556/472] w-full">
        {/* eslint-disable-next-line @next/next/no-img-element -- public static asset; object-cover in ratio frame */}
        <img
          alt={alt}
          src={src}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  </div>
)

/**
 * Impact — Figma `2127:2274` Z-layout: (students | photo) → (photo | schools) → (tutors | photo).
 */
const impactZigzagRowClass = cn(
  "flex w-full flex-col items-stretch gap-6 sm:gap-8",
  "md:flex-row md:items-center md:justify-between md:gap-5 lg:gap-8 xl:gap-[93px]",
)

const impactZigzagPhotoColClass = (orderClass: "md:order-1" | "md:order-2") =>
  cn(
    "w-full min-w-0 shrink-0",
    "max-md:mx-auto max-md:max-w-[min(36rem,100%)]",
    "md:max-w-[min(320px,44%)] md:basis-[min(320px,44%)]",
    "lg:min-w-0 lg:max-w-[556px] lg:flex-1 lg:basis-0",
    orderClass,
  )

export const PlusImpactStatsSection = () => {
  return (
    <section id="impact" className={cn("relative", marketingSectionVerticalGapClass)}>
      <div className="relative w-full text-left">
        <div className="relative">
          <div className={cn(marketingSectionIntroColumnClass, "sm:space-y-1")}>
            <h2 className={schoolsSectionTitle}>Serving Students from Low-Income Families</h2>
            <p className={impactZigzagBodyClass}>
              Bridging the opportunity gap in math education by empowering schools and community tutors with
              AI-enhanced tools designed for every student&apos;s success.
            </p>
          </div>
          <img
            alt=""
            src={plusHomeImpactDecor.equalSign}
            className={cn(
              marketingSectionHeaderDecorImgClass,
              marketingSectionHeaderDecorAbsoluteClass,
            )}
            aria-hidden
          />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1122px] flex-col space-y-10 md:space-y-12 lg:space-y-16">
        {/* Row 1: copy | photo (wide); stacked copy → photo below md */}
        <div className={impactZigzagRowClass}>
          <div className={cn(impactZigzagTextColClass, "shrink-0", "md:order-1")}>
            <ImpactStatIcon src={plusHomeImpactDecor.iconStudents} />
            <p className={impactStatTitleClass}>
              <CountUpStat target={5000} suffix="+" /> students
            </p>
            <p className={impactZigzagBodyClass}>
              Students across the country receiving personalized math support through PLUS.
            </p>
            <Link
              href="/success-stories"
              className={cn(marketingHeroCtaPrimaryLinkClass, "w-fit self-start")}
            >
              See impact
            </Link>
          </div>
          <div className={impactZigzagPhotoColClass("md:order-2")}>
            <ImpactRowPhoto
              src={plusHomeImpactRowStudents}
              alt="Students in a classroom with laptops and headphones"
            />
          </div>
        </div>

        {/* Row 2: photo left on wide (order); DOM copy first for stacked */}
        <div className={impactZigzagRowClass}>
          <div className={cn(impactZigzagTextColClass, "shrink-0", "md:order-2")}>
            <ImpactStatIcon src={plusHomeImpactDecor.iconSchools} />
            <p className={impactStatTitleClass}>
              <CountUpStat target={13} suffix="+" /> schools
            </p>
            <p className={impactZigzagBodyClass}>
              PLUS tutors provide instructional support to middle-school math learners during the school day.
            </p>
            <Link
              href="/for-schools"
              className={cn(marketingHeroCtaOutlineLinkClass, "w-fit self-start")}
            >
              Get PLUS tutoring
            </Link>
          </div>
          <div className={impactZigzagPhotoColClass("md:order-1")}>
            <ImpactRowPhoto
              src={plusHomeImpactRowSchools}
              alt="Team members in front of a school building"
            />
          </div>
        </div>

        {/* Row 3: copy | photo */}
        <div className={impactZigzagRowClass}>
          <div className={cn(impactZigzagTextColClass, "shrink-0", "md:order-1")}>
            <ImpactStatIcon src={plusHomeImpactDecor.iconTutors} />
            <p className={impactStatTitleClass}>
              <CountUpStat target={500} suffix="+" /> tutors
            </p>
            <p className={impactZigzagBodyClass}>
              University and community tutors trained to support middle school math learners.
            </p>
            <Link
              href="/for-tutors"
              className={cn(marketingHeroCtaOutlineLinkClass, "w-fit self-start")}
            >
              Become a tutor
            </Link>
          </div>
          <div className={impactZigzagPhotoColClass("md:order-2")}>
            <ImpactRowPhoto
              src={plusHomeImpactRowTutors}
              alt="Student on a video call with a tutor on a laptop"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/** Icon + title row — `gap-3` matches `getInvolvedDiscTitleRowClass` on tutoring cards. */
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
  <div className={cn("relative z-20 flex w-full shrink-0 items-center gap-3", className)}>
    <div className={cn("relative", marketingCardIconAssetFrameClass)}>
      <Image
        src={iconSrc}
        alt=""
        width={MARKETING_CARD_ICON_DIAMETER_PX}
        height={MARKETING_CARD_ICON_DIAMETER_PX}
        className={cn("object-contain", marketingCardIconAssetFrameClass)}
        unoptimized
      />
    </div>
    <h3 className={cn(marketingTypography.bentoTitle, "max-w-[18rem] text-[#d31998] lg:max-w-[289px]", titleClassName)}>
      {title}
    </h3>
  </div>
)

/**
 * Smart Tech, Smarter Learning — Figma `1714:1957`.
 * Layout: Supervisor + AI Tutor side-by-side in row 1; Collaborative Goal Setting full-width in row 2.
 * Card gaps use `marketingCardStackGapClass`; icon→title gap matches tutoring (`gap-3`).
 *
 * Bento `<article>`s intentionally skip `marketingCardPaddingClass` on the shell: mobile uses
 * split insets on the header vs image row, with `pt-6 sm:pt-6` / `sm:px-6` / `sm:pb-6` so top
 * and horizontal rhythm match that token; at `lg` the header uses `left-6 top-6` so the disc
 * lines up with the same 24px inset as `marketingCardPaddingClass` (`sm:p-6`), while layers
 * fill the fixed-height frame.
 */
export const PlusSmartTechSection = () => {
  return (
    <section id="smart-tech" className={cn("relative", marketingSectionVerticalGapClass)}>
      <div className="relative w-full text-left">
        <div className={marketingSectionIntroColumnClass}>
          <h2 className={schoolsSectionTitle}>Smart Tech, Smarter Learning</h2>
          <p className={schoolsSectionLead}>
            Smart systems for superior outcomes. Our platform integrates AI tutor training, centralized
            supervisor tracking, and interactive goal setting to turn complex data into clear academic
            breakthroughs.
          </p>
        </div>
        <img
          alt=""
          src={forTutorsAssets.toolkitDecor}
          className={cn(
            marketingSectionHeaderDecorImgClass,
            marketingSectionHeaderDecorAbsoluteClass,
          )}
          aria-hidden
        />
      </div>

      <div
        className={cn(
          "mx-auto flex w-full max-w-[1122px] flex-col",
          marketingCardStackGapClass,
        )}
      >
        {/* Row 1: Supervisor Dashboard + AI Tutor Training — Figma `1714:1965` + `1714:1976` */}
        <div
          className={cn("grid grid-cols-1 lg:grid-cols-2", marketingCardStackGapClass)}
        >
          {/* Supervisor Dashboard — Figma `1714:1965` (526×423) */}
          <article className="relative overflow-hidden rounded-[30px] bg-[#ffe8f5] lg:h-[423px]">
            <SmartTechCardHeader
              iconSrc={plusHomeSmartTech.iconSupervisor}
              title="Supervisor Dashboard"
              className="px-5 pt-6 sm:px-6 sm:pt-6 lg:absolute lg:left-6 lg:top-6 lg:px-0 lg:pt-0"
            />
            <div className="relative mt-4 px-5 pb-5 sm:px-6 sm:pb-6 lg:hidden">
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
              className="px-5 pt-6 sm:px-6 sm:pt-6 lg:absolute lg:left-6 lg:top-6 lg:px-0 lg:pt-0"
            />
            <div className="relative mt-4 px-5 pb-5 sm:px-6 sm:pb-6 lg:hidden">
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
            className="px-5 pt-6 sm:px-6 sm:pt-6 lg:absolute lg:left-6 lg:top-6 lg:px-0 lg:pt-0"
            titleClassName="lg:max-w-[539px] lg:whitespace-nowrap"
          />
          <div className="relative mt-4 px-5 pb-5 sm:px-6 sm:pb-6 lg:hidden">
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
    <section id="science-of-learning" className={cn("relative", marketingSectionVerticalGapClass)}>
      <div className="relative w-full text-left">
        <div className={marketingSectionIntroColumnClass}>
          <h2 className={schoolsSectionTitle}>Built on the Science of Learning</h2>
          <p className={schoolsSectionLead}>
            Developed within CMU&apos;s HCII, our platform is a direct result of world-class educational
            research. We&apos;ve engineered AI tools designed to adapt to how students think.
          </p>
        </div>
        <img
          alt=""
          src={forTutorsAssets.compensationDecor}
          className={cn(
            marketingSectionHeaderDecorImgClass,
            marketingSectionHeaderDecorAbsoluteClass,
          )}
          aria-hidden
        />
      </div>

      <div className="mx-auto grid w-full max-w-[1122px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,473fr)_minmax(0,556fr)] lg:items-start lg:gap-[72px]">
        {/* Left — Figma `1709:2079`: 395px-wide stack, gap 18px, vertically centered in 473px column */}
        <div className="flex w-full justify-center lg:min-h-[397px] lg:items-center lg:justify-center">
          <div className="flex w-full max-w-[395px] flex-col gap-[18px]">
            <div className={cn("relative", marketingCardIconAssetFrameClass)}>
              <Image
                src={plusHomeScience.iconPapers}
                alt=""
                width={MARKETING_CARD_ICON_DIAMETER_PX}
                height={MARKETING_CARD_ICON_DIAMETER_PX}
                className={cn("object-contain", marketingCardIconAssetFrameClass)}
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
              className={cn(marketingFinalCtaPrimaryLinkClass, "w-fit min-w-[215px]")}
            >
              Read our research
            </Link>
          </div>
        </div>

        {/* Right — Figma `1709:2094`: 556×397, #e0f6fe, layered paper + table (positions from `1709:2116` / `1709:2114`) */}
        <div className="relative mx-auto min-h-[280px] w-full max-w-[556px] overflow-hidden rounded-[30px] bg-[#e0f6fe] lg:mx-0 lg:h-[397px] lg:min-h-0">
          {/* Mobile: stacked layers (Figma asset order) */}
          <div className={cn("relative flex flex-col gap-3 lg:hidden", marketingCardPaddingClass)}>
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
 * Testimonials — card layout aligned with `TutorVoiceCard` (Voices from Our Tutors): inner white
 * quote shell, left-aligned copy, “Read story” + arrow linking to success stories.
 */
export const PlusVoicesSection = () => {
  const testimonials = [
    {
      avatar: plusHomeTestimonialAvatars.student,
      quote: "Tutoring has affected me and it made me realize if I didn't get the help I needed I would still be struggling. But it made me see",
      highlight: "math differently in a good way",
      end: ".",
      attribution: "Student with PLUS Tutoring",
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
    <section className={cn("relative", marketingSectionVerticalGapClass)}>
      <div className="relative w-full text-left">
        <div className={marketingSectionIntroColumnClass}>
          <h2 className={schoolsSectionTitle}>Testimonials</h2>
          <p className={schoolsSectionLead}>
            Here&apos;s what students, faculty, and researchers are saying about PLUS.
          </p>
        </div>
        <img
          alt=""
          src={forTutorsAssets.experienceDecor}
          className={cn(
            marketingSectionHeaderDecorImgClass,
            marketingSectionHeaderDecorAbsoluteClass,
          )}
          aria-hidden
        />
      </div>

      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 md:items-stretch md:gap-8 lg:grid-cols-3",
          marketingCardStackGapClass,
        )}
      >
        {testimonials.map(({ avatar, quote, highlight, end, attribution }) => (
          <article
            key={attribution}
            className={cn(VOICES_STORY_CARD, "max-w-[480px] md:max-w-none")}
          >
            <div className={VOICES_ATTRIBUTION_ROW}>
              <div className={VOICES_AVATAR_BOX}>
                <Image
                  src={avatar}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                  unoptimized
                />
              </div>
              <p
                className={cn(
                  marketingTypography.bentoTitle,
                  "min-w-0 flex-1 text-pretty text-[#007d49]",
                )}
              >
                {attribution}
              </p>
            </div>
            <div className={VOICES_QUOTE_SHELL}>
              <blockquote className="text-pretty text-left text-base font-normal italic leading-relaxed text-[#4A4A4A] dark:text-neutral-200">
                &ldquo;{quote}{" "}
                <strong className="font-bold italic text-[#007d49] dark:text-emerald-300">
                  {highlight}
                </strong>
                {end}&rdquo;
              </blockquote>
            </div>
            <Link
              href="/success-stories"
              className={VOICES_READ_STORY_CLASS}
              aria-label={`Read story: ${attribution}`}
            >
              <span>Read story</span>
              <ArrowRight
                className="size-6 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
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
