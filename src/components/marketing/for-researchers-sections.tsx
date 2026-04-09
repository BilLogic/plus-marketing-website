"use client"

import { ArrowRight, ChevronDown, ExternalLink, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants, plusNavCtaLinkClassName } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { marketingTypography } from "@/lib/marketing-typography"
import { forResearchersSectionIds } from "@/lib/plus-footer-ia"
import { forResearchersAssets } from "@/components/marketing/for-researchers-assets"
import {
  RESEARCH_GENRE_TAGS,
  type ResearchGenreTag,
  sortResearchGenresForDisplay,
} from "@/lib/research/research-genres"
import {
  researchGenreBadgeClassName,
  researchGenreFilterChipClassName,
} from "@/lib/research/research-index-genre-styles"
import type { ResearchPaper, SuccessStory, TeamMember } from "@/lib/notion/types"
import {
  notionSuccessStoryPublicReadUrl,
  splitSuccessStoryQuote,
} from "@/lib/success-stories/notion-public-read-url"

/** Figma `1732:3684` — row label + `genre` for picking two papers (`1732:3685`). */
const RESEARCH_HIGHLIGHT_TOPICS = [
  {
    id: "student-learning",
    title: "Student Learning",
    genre: "Student learning" satisfies ResearchGenreTag,
  },
  {
    id: "gen-ai",
    title: "Gen AI",
    genre: "Gen AI" satisfies ResearchGenreTag,
  },
  {
    id: "tutor-training",
    title: "Tutor Training",
    genre: "Tutor training" satisfies ResearchGenreTag,
  },
] as const

type ResearchHighlightTopicId = (typeof RESEARCH_HIGHLIGHT_TOPICS)[number]["id"]

/**
 * Figma `1732:3684` / study tiles `1732:3704` — row bar, title/chevron, icons, and study-card
 * border/text/focus ring share each topic accent (Gen AI ref: `#0080b4`).
 */
const HIGHLIGHT_TOPIC_THEME: Record<
  ResearchHighlightTopicId,
  {
    bar: string
    title: string
    chevron: string
    contentLinkHover: string
    studyCard: string
    iconDisc: string
    iconGlyphStroke: string
  }
> = {
  "student-learning": {
    bar: "bg-[#ffeaea]",
    title: "text-[#c05053]",
    chevron: "text-[#c05053]",
    contentLinkHover: "hover:[&_a]:text-[#c05053]",
    studyCard: "border-[#c05053] text-[#c05053] focus-visible:ring-[#c05053]/40",
    iconDisc: "#c05053",
    iconGlyphStroke: "#ffeaea",
  },
  "gen-ai": {
    bar: "bg-[#e0f5fe]",
    title: "text-[#0080b4]",
    chevron: "text-[#0080b4]",
    contentLinkHover: "hover:[&_a]:text-[#0080b4]",
    studyCard: "border-[#0080b4] text-[#0080b4] focus-visible:ring-[#0080b4]/40",
    iconDisc: "#0080b4",
    iconGlyphStroke: "#e0f5fe",
  },
  "tutor-training": {
    bar: "bg-[#f4fbf6]",
    title: "text-[#007d49]",
    chevron: "text-[#007d49]",
    contentLinkHover: "hover:[&_a]:text-[#007d49]",
    studyCard: "border-[#007d49] text-[#007d49] focus-visible:ring-[#007d49]/40",
    iconDisc: "#007d49",
    iconGlyphStroke: "#f4fbf6",
  },
}

/** Shared layout — always filled bar; colors from `HIGHLIGHT_TOPIC_THEME`. */
const HIGHLIGHT_CARD_BASE =
  "flex w-full items-center justify-between gap-4 overflow-hidden rounded-[22px] px-6 py-7 transition-[border-radius] duration-200 sm:px-7 sm:py-8 group-aria-expanded/accordion-trigger:rounded-b-none"

/**
 * Figma `1732:3759` — exact tutor-training study cards (left → right).
 * Notion publication page ids (same as `src/data/cache/research.json`).
 */
const HIGHLIGHT_STUDY_IDS_BY_TOPIC: Partial<
  Record<ResearchHighlightTopicId, readonly string[]>
> = {
  "tutor-training": [
    "334b7cca-4982-81e9-969e-e12aca71aea4",
    "334b7cca-4982-8175-b53c-f53d6b95baf9",
  ],
}

/** Match `for-schools-sections` — Community / Benefits / Oversight section headers. */
const sectionHeaderH2 =
  "text-pretty text-lg font-bold tracking-tight text-teal-950 sm:text-2xl md:text-3xl"
const sectionHeaderLead =
  "text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg"
/** Same as SchoolsCommunitySection / SchoolsTrainingSection mascot column. */
const sectionHeaderDecor =
  "pointer-events-none h-[clamp(4.5rem,18vw,10.9375rem)] w-[clamp(3.75rem,24vw,12rem)] shrink-0 object-contain sm:h-32 sm:w-[7.25rem] md:h-40 md:w-36 lg:h-[175px] lg:w-[193px]"
/** SchoolsSuccessStoriesSection header row — slightly wider gaps + compact decor. */
const successStoriesHeaderDecor =
  "pointer-events-none h-[clamp(4.5rem,18vw,9.375rem)] w-auto shrink-0 object-contain sm:h-32 md:h-36 lg:h-[150px] lg:w-[165px]"

/** Figma `1732:3394` / `1732:3704` — layout; border/text/ring from `HIGHLIGHT_TOPIC_THEME.studyCard`. */
const HIGHLIGHT_STUDY_CARD_BASE =
  "flex min-h-[227px] flex-col justify-between rounded-[30px] border-2 bg-white px-[30px] py-[31px] text-left no-underline outline-none transition-opacity hover:no-underline hover:opacity-95 focus-visible:ring-2 focus-visible:ring-offset-2"
const SUCCESS_STORY_GREEN = "text-[#007d49]"
/** Figma IA: search & neutral chrome */
const FIELD_BORDER = "border-gray-600"

/** Teal outline pill — hero “Our researchers”, Research Index “View all” / empty-state link. */
const forResearchersOutlineCtaClassName = cn(
  buttonVariants({ variant: "outline", size: "navCta" }),
  "rounded-full border border-[#027f89] bg-white px-5 text-sm font-normal text-[#004247] hover:bg-teal-50 sm:px-6 sm:text-base"
)

/**
 * Figma `1730:2453` Images frame scaled for hero balance (640×542); inner collage @ (17,52).
 * Card geometry uses 676×509 reference; asset crops match generated design context 1:1.
 */
const ResearchHeroCollageVisual = () => {
  const c = forResearchersAssets.heroCollage
  const H = 509
  const W = 676
  return (
    <div className="relative mx-auto w-full max-w-[640px] xl:h-[542px]">
      {/* Pink character — `1730:2467` at Images (0,0); inner visual 95×109, -15° */}
      <div className="pointer-events-none absolute left-0 top-0 z-30 hidden sm:block">
        <div className="-rotate-[15deg]">
          <img
            alt=""
            src={c.characterPink}
            className="h-[95px] w-[109px] object-cover"
            aria-hidden
          />
        </div>
      </div>
      {/* Inner collage — `1730:2454` */}
      <div className="relative mx-auto mt-3 w-full max-xl:max-w-[626px] sm:mt-4 xl:absolute xl:left-[17px] xl:top-[52px] xl:mt-0 xl:h-[472px] xl:w-[626px]">
        <div className="relative aspect-[676/509] w-full xl:aspect-auto xl:h-full xl:w-full">
          {/* Learning Ideas — 321×231 @ (43,-1); logo 225×225 centered `1730:2511` */}
          <div
            className="absolute overflow-hidden rounded-[30px] bg-[#ffe8f5]"
            style={{
              left: `${(43 / W) * 100}%`,
              top: `${(-1 / H) * 100}%`,
              width: `${(321 / W) * 100}%`,
              height: `${(231 / H) * 100}%`,
            }}
          >
            <img
              alt=""
              src={c.learningIdeasConference}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[min(100%,225px)] w-[min(100%,225px)] max-h-[98%] max-w-[98%] -translate-x-1/2 -translate-y-1/2 object-cover"
              aria-hidden
            />
          </div>
          {/* SIGCHI — 271×244 @ (381,57); logo 242×255 rounded `1730:2522` */}
          <div
            className="absolute overflow-hidden rounded-[30px] bg-[#fff0cb]"
            style={{
              left: `${(381 / W) * 100}%`,
              top: `${(57 / H) * 100}%`,
              width: `${(271 / W) * 100}%`,
              height: `${(244 / H) * 100}%`,
            }}
          >
            <img
              alt=""
              src={c.sigchi}
              className="pointer-events-none absolute left-[calc(50%+0.5px)] top-[calc(50%-0.5px)] h-[min(106%,255px)] w-[min(90%,242px)] max-w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-[160px] object-contain"
              aria-hidden
            />
          </div>
          {/* SOLAR — 307×228 @ (64,247); logo 227×96.929 `1730:2524` */}
          <div
            className="absolute overflow-hidden bg-[#f4fbf6]"
            style={{
              left: `${(64 / W) * 100}%`,
              top: `${(247 / H) * 100}%`,
              width: `${(307 / W) * 100}%`,
              height: `${(228 / H) * 100}%`,
              borderRadius: "31.932px",
            }}
          >
            <img
              alt=""
              src={c.solar}
              className="pointer-events-none absolute left-1/2 top-[calc(50%+0.46px)] h-[min(42.5%,96.929px)] w-[min(74%,227px)] -translate-x-1/2 -translate-y-1/2 object-cover"
              aria-hidden
            />
          </div>
          {/* AIED — 219×191 @ (388,318); crop `1730:2517` */}
          <div
            className="absolute overflow-hidden bg-[#e0f5fe]"
            style={{
              left: `${(388 / W) * 100}%`,
              top: `${(318 / H) * 100}%`,
              width: `${(219 / W) * 100}%`,
              height: `${(191 / H) * 100}%`,
              borderRadius: "21.254px",
            }}
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[38.74%] w-[75.8%] min-h-[48px] min-w-[120px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
              <img
                alt=""
                src={c.aied}
                className="absolute max-w-none"
                style={{
                  height: "181.11%",
                  width: "174.06%",
                  left: "-7.73%",
                  top: "-5%",
                }}
                aria-hidden
              />
            </div>
          </div>
          {/* CMU tooltip — `1730:2459` 278×218 @ (199,145) */}
          <div
            className="absolute z-20 flex min-h-[11rem] w-[41.12%] min-w-[220px] flex-wrap content-center justify-center gap-y-3 rounded-[34.18px] border border-white/60 bg-white/80 pb-5 pl-5 pr-8 pt-4 shadow-[0px_4.557px_22.787px_rgba(0,0,0,0.25)] backdrop-blur-[25px] sm:min-h-[12.5rem] lg:h-[218px] lg:min-h-0 lg:w-[278px] lg:min-w-0 lg:gap-y-[14px] lg:pb-[25px] lg:pl-[26px] lg:pr-[54px] lg:pt-[18px]"
            style={{
              left: `${(199 / W) * 100}%`,
              top: `${(145 / H) * 100}%`,
            }}
            role="note"
          >
            <img
              alt=""
              src={c.tooltipIconA}
              className="relative mr-[-28px] size-[52px] shrink-0 lg:size-[58px]"
              aria-hidden
            />
            <img
              alt=""
              src={c.tooltipIconB}
              className="relative mr-[-28px] size-[52px] shrink-0 lg:size-[58px]"
              aria-hidden
            />
            <p
              className={cn(
                marketingTypography.body,
                "relative mr-[-28px] w-full max-w-[226px] text-balance text-center text-pretty text-muted-foreground"
              )}
            >
              Based out of{" "}
              <span className="font-bold text-[#027f89]">CMU HCII</span>, we focus on pioneering
              educational research.
            </p>
          </div>
        </div>
      </div>
      {/* Blue character — `1730:2468` at Images (579,506) */}
      <img
        alt=""
        src={c.characterBlue}
        className="pointer-events-none absolute bottom-0 right-[17px] z-20 hidden h-[79px] w-[97px] object-cover sm:block"
        aria-hidden
      />
    </div>
  )
}

/** Hero `1730:2443`: copy + collage share page gutters (`max-w-7xl`); narrow copy so 466+693 fits without overflow. */
export const ResearchersHeroSection = () => {
  return (
    <section className="relative overflow-hidden pb-8 pt-2 sm:pb-10 sm:pt-4 md:pb-12 md:pt-6">
      <div className="mx-auto flex w-full flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-4 xl:gap-5">
        {/* Inner collage bottom ≈ 52+472; frame 542 — pad so CTAs match AIED bottom */}
        <div className="flex w-full min-w-0 max-w-[23.5rem] flex-col sm:max-w-[25rem] lg:max-w-[26.5rem] xl:max-w-[28.5rem] xl:pb-[18px]">
          {/* Figma `1744:2102` — eyebrow above hero H1 (`1730:2510`). */}
          <h1 className="flex flex-col gap-[15px]">
            <span className="text-2xl font-semibold leading-none text-[#027f89] sm:text-[1.75rem] xl:text-[2rem]">
              For researchers
            </span>
            <span className="text-balance text-[1.625rem] font-bold leading-snug tracking-tight text-[#004247] sm:text-[1.75rem] sm:leading-snug md:text-[1.875rem] lg:text-[2rem] lg:leading-snug xl:text-[2.25rem] 2xl:text-[2.375rem]">
              Pioneering Lab Research, Social Technical Support for Every Learning Environment
            </span>
          </h1>
          <div className="mt-10 flex w-full flex-col gap-3 min-[400px]:mt-12 min-[400px]:flex-row min-[400px]:items-stretch min-[400px]:gap-4 lg:mt-14">
            <Link
              href="/research"
              className={cn(
                plusNavCtaLinkClassName,
                "h-11 w-full min-w-0 flex-1 justify-center rounded-full px-5 text-sm font-normal text-[#004247] sm:h-[45px] sm:px-6 sm:text-base"
              )}
            >
              Our publications
            </Link>
            <Link
              href={`#${forResearchersSectionIds.researchers}`}
              className={cn(
                forResearchersOutlineCtaClassName,
                "h-11 w-full min-w-0 flex-1 justify-center sm:h-[45px]"
              )}
            >
              Our researchers
            </Link>
          </div>
        </div>
        <div className="relative flex min-w-0 flex-1 justify-center lg:justify-end">
          <ResearchHeroCollageVisual />
        </div>
      </div>
    </section>
  )
}

const SectionHeader = ({
  title,
  description,
  decor,
  titleClassName,
}: {
  title: string
  description: string
  decor: string
  /** Optional override for h2 color/weight. */
  titleClassName?: string
}) => (
  <div className="flex w-full flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
    <div className="min-w-0 flex-1 basis-0 space-y-3 sm:space-y-4 md:space-y-5">
      <h2 className={cn(sectionHeaderH2, titleClassName)}>{title}</h2>
      <p className={sectionHeaderLead}>{description}</p>
    </div>
    <img alt="" src={decor} className={sectionHeaderDecor} aria-hidden />
  </div>
)

export const ResearchPartnersSection = () => {
  return (
    <section id={forResearchersSectionIds.partners} className="space-y-6 sm:space-y-8 lg:space-y-10">
      <SectionHeader
        title="Our Research Partners"
        description="A strategic alliance of world-class universities and industry leaders committed to rigorous learning engineering at scale."
        decor={forResearchersAssets.partners.decor}
      />
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-12 md:grid-cols-4 md:gap-x-[50px]">
        {forResearchersAssets.partners.logos.map((logo) => (
          <div
            key={logo}
            className="flex aspect-[4/3] max-h-[200px] items-center justify-center rounded-2xl bg-white p-4 md:max-h-[240px]"
          >
            <img alt="" src={logo} className="max-h-full w-full object-contain" aria-hidden />
          </div>
        ))}
      </div>
    </section>
  )
}

function highlightPublishTime(paper: ResearchPaper): number {
  const parts = paper.publishDate.split("/")
  if (parts.length === 3) {
    const t = new Date(+parts[2], +parts[0] - 1, +parts[1]).getTime()
    return Number.isNaN(t) ? 0 : t
  }
  const t = new Date(paper.publishDate).getTime()
  return Number.isNaN(t) ? 0 : t
}

function pickHighlightStudies(
  papers: ResearchPaper[],
  genre: ResearchGenreTag,
  limit = 2
): ResearchPaper[] {
  return [...papers]
    .filter((p) => (p.topics ?? []).includes(genre))
    .sort((a, b) => highlightPublishTime(b) - highlightPublishTime(a))
    .slice(0, limit)
}

function pickStudiesForHighlightTopic(
  papers: ResearchPaper[],
  topic: (typeof RESEARCH_HIGHLIGHT_TOPICS)[number]
): ResearchPaper[] {
  const byId = new Map(papers.map((p) => [p.id, p]))
  const curated = HIGHLIGHT_STUDY_IDS_BY_TOPIC[topic.id]
  const chosen: ResearchPaper[] = []
  if (curated?.length) {
    for (const id of curated) {
      const p = byId.get(id)
      if (p) chosen.push(p)
      if (chosen.length >= 2) return chosen
    }
  }
  const exclude = new Set(chosen.map((p) => p.id))
  const filler = pickHighlightStudies(
    papers.filter((p) => !exclude.has(p.id)),
    topic.genre,
    2 - chosen.length
  )
  return [...chosen, ...filler]
}

/**
 * Figma highlight row icons — inline SVG so disc + strokes match each topic accent (external `<img>`
 * SVGs do not inherit parent CSS variables).
 */
function ResearchHighlightTopicIcon({
  topicId,
  discFill,
  glyphStroke,
  className,
}: {
  topicId: ResearchHighlightTopicId
  discFill: string
  glyphStroke: string
  className?: string
}) {
  const svgProps = {
    className: cn("size-full shrink-0", className),
    viewBox: "0 0 58 58" as const,
    fill: "none" as const,
    xmlns: "http://www.w3.org/2000/svg" as const,
    preserveAspectRatio: "xMidYMid meet" as const,
    overflow: "visible" as const,
    "aria-hidden": true as const,
  }
  const disc = <circle cx="29" cy="29" r="29" fill={discFill} />

  if (topicId === "student-learning") {
    return (
      <svg {...svgProps}>
        <g>
          {disc}
          <g>
            <path
              d="M40.7735 27.6526C40.9973 27.5539 41.1872 27.3917 41.3197 27.1861C41.4522 26.9806 41.5215 26.7406 41.5189 26.4961C41.5164 26.2515 41.4422 26.013 41.3055 25.8102C41.1687 25.6074 40.9755 25.4492 40.7498 25.3551L30.036 20.4751C29.7103 20.3266 29.3565 20.2497 28.9985 20.2497C28.6405 20.2497 28.2867 20.3266 27.961 20.4751L17.2485 25.3501C17.026 25.4476 16.8367 25.6078 16.7037 25.8112C16.5708 26.0145 16.5 26.2522 16.5 26.4951C16.5 26.7381 16.5708 26.9758 16.7037 27.1791C16.8367 27.3825 17.026 27.5427 17.2485 27.6401L27.961 32.5251C28.2867 32.6737 28.6405 32.7506 28.9985 32.7506C29.3565 32.7506 29.7103 32.6737 30.036 32.5251L40.7735 27.6526Z"
              stroke={glyphStroke}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M41.5 26.5V34"
              stroke={glyphStroke}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21.5 29.625V34C21.5 34.9946 22.2902 35.9484 23.6967 36.6517C25.1032 37.3549 27.0109 37.75 29 37.75C30.9891 37.75 32.8968 37.3549 34.3033 36.6517C35.7098 35.9484 36.5 34.9946 36.5 34V29.625"
              stroke={glyphStroke}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    )
  }

  if (topicId === "gen-ai") {
    return (
      <svg {...svgProps}>
        <g>
          {disc}
          <g>
            <path
              d="M27.7694 17.5174C27.8229 17.2307 27.9751 16.9717 28.1995 16.7853C28.4239 16.599 28.7064 16.4969 28.9981 16.4969C29.2898 16.4969 29.5723 16.599 29.7967 16.7853C30.0211 16.9717 30.1733 17.2307 30.2269 17.5174L31.5406 24.4649C31.6339 24.9589 31.874 25.4132 32.2294 25.7687C32.5848 26.1241 33.0392 26.3641 33.5331 26.4574L40.4806 27.7712C40.7674 27.8248 41.0263 27.9769 41.2127 28.2013C41.3991 28.4257 41.5011 28.7082 41.5011 28.9999C41.5011 29.2916 41.3991 29.5742 41.2127 29.7986C41.0263 30.023 40.7674 30.1751 40.4806 30.2287L33.5331 31.5424C33.0392 31.6357 32.5848 31.8758 32.2294 32.2312C31.874 32.5867 31.6339 33.041 31.5406 33.5349L30.2269 40.4824C30.1733 40.7692 30.0211 41.0282 29.7967 41.2145C29.5723 41.4009 29.2898 41.5029 28.9981 41.5029C28.7064 41.5029 28.4239 41.4009 28.1995 41.2145C27.9751 41.0282 27.8229 40.7692 27.7694 40.4824L26.4556 33.5349C26.3623 33.041 26.1223 32.5867 25.7668 32.2312C25.4114 31.8758 24.957 31.6357 24.4631 31.5424L17.5156 30.2287C17.2289 30.1751 16.9699 30.023 16.7835 29.7986C16.5971 29.5742 16.4951 29.2916 16.4951 28.9999C16.4951 28.7082 16.5971 28.4257 16.7835 28.2013C16.9699 27.9769 17.2289 27.8248 17.5156 27.7712L24.4631 26.4574C24.957 26.3641 25.4114 26.1241 25.7668 25.7687C26.1223 25.4132 26.3623 24.9589 26.4556 24.4649L27.7694 17.5174Z"
              stroke={glyphStroke}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M39 16.5V21.5"
              stroke={glyphStroke}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M41.5 19H36.5"
              stroke={glyphStroke}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 41.5C20.3807 41.5 21.5 40.3807 21.5 39C21.5 37.6193 20.3807 36.5 19 36.5C17.6193 36.5 16.5 37.6193 16.5 39C16.5 40.3807 17.6193 41.5 19 41.5Z"
              stroke={glyphStroke}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    )
  }

  return (
    <svg {...svgProps}>
      <g>
        {disc}
        <g>
          <path
            d="M33.3484 30.1124L35.2421 40.7699C35.2633 40.8954 35.2457 41.0243 35.1917 41.1396C35.1376 41.2548 35.0496 41.3507 34.9395 41.4146C34.8295 41.4785 34.7025 41.5072 34.5756 41.497C34.4488 41.4868 34.3281 41.4381 34.2296 41.3574L29.7546 37.9986C29.5386 37.8372 29.2762 37.75 29.0065 37.75C28.7368 37.75 28.4744 37.8372 28.2584 37.9986L23.7759 41.3561C23.6775 41.4367 23.557 41.4853 23.4302 41.4955C23.3035 41.5058 23.1767 41.4771 23.0667 41.4135C22.9567 41.3498 22.8687 41.254 22.8145 41.139C22.7603 41.024 22.7425 40.8953 22.7634 40.7699L24.6559 30.1124"
            stroke={glyphStroke}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M29 31.5C33.1421 31.5 36.5 28.1421 36.5 24C36.5 19.8579 33.1421 16.5 29 16.5C24.8579 16.5 21.5 19.8579 21.5 24C21.5 28.1421 24.8579 31.5 29 31.5Z"
            stroke={glyphStroke}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  )
}

/** Figma `1732:3394` / `1732:3704` — title + bottom-aligned “Read study →”; accent from topic theme. */
function HighlightStudyCard({
  paper,
  topicId,
}: {
  paper: ResearchPaper
  topicId: ResearchHighlightTopicId
}) {
  const cardClass = cn(HIGHLIGHT_STUDY_CARD_BASE, HIGHLIGHT_TOPIC_THEME[topicId].studyCard)
  const inner = (
    <>
      <p className="max-w-[min(100%,430px)] text-pretty text-xl font-semibold leading-snug text-current sm:text-2xl sm:leading-snug">
        {paper.title}
      </p>
      <span className="mt-6 flex items-center justify-end gap-2.5 self-end text-base font-normal text-current">
        Read study
        <ArrowRight className="size-[26px] shrink-0 text-current" aria-hidden />
      </span>
    </>
  )
  if (paper.paperLink) {
    return (
      <a
        href={paper.paperLink}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        {inner}
      </a>
    )
  }
  return (
    <Link href="/research" className={cardClass}>
      {inner}
    </Link>
  )
}

export const ResearchHighlightsSection = ({ papers }: { papers: ResearchPaper[] }) => {
  const studiesByTopic = useMemo(() => {
    const map = new Map<string, ResearchPaper[]>()
    for (const topic of RESEARCH_HIGHLIGHT_TOPICS) {
      map.set(topic.id, pickStudiesForHighlightTopic(papers, topic))
    }
    return map
  }, [papers])

  return (
    <section id={forResearchersSectionIds.highlights} className="space-y-6 sm:space-y-8 lg:space-y-10">
      <SectionHeader
        title="Our Latest Research Highlights"
        description="Explore our most recent findings in generative artificial intelligence, tutor training, and student learning."
        decor={forResearchersAssets.highlights.decor}
      />

      <Accordion
        multiple={false}
        defaultValue={[]}
        aria-label="Research highlight themes"
        className="mx-auto flex w-full max-w-[70.25rem] flex-col gap-6 sm:gap-8"
      >
        {RESEARCH_HIGHLIGHT_TOPICS.map((topic) => {
          const studies = studiesByTopic.get(topic.id) ?? []
          const theme = HIGHLIGHT_TOPIC_THEME[topic.id]
          return (
            <AccordionItem key={topic.id} value={topic.id} className="border-0 not-last:border-b-0">
              <AccordionTrigger
                hideChevron
                className="hover:no-underline focus-visible:rounded-[22px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              >
                <span className={cn(HIGHLIGHT_CARD_BASE, theme.bar)}>
                  <span className="flex min-w-0 items-center gap-4 sm:gap-5">
                    <span className="size-[59px] shrink-0">
                      <ResearchHighlightTopicIcon
                        topicId={topic.id}
                        discFill={theme.iconDisc}
                        glyphStroke={theme.iconGlyphStroke}
                      />
                    </span>
                    <span
                      className={cn(
                        "min-w-0 text-left text-2xl font-semibold capitalize tracking-tight sm:text-[32px] sm:leading-tight",
                        theme.title
                      )}
                    >
                      {topic.title}
                    </span>
                  </span>
                  <ChevronDown
                    strokeWidth={2}
                    className={cn(
                      "size-10 shrink-0 transition-transform duration-200 ease-out group-aria-expanded/accordion-trigger:rotate-180 sm:size-[50px]",
                      theme.chevron
                    )}
                    aria-hidden
                  />
                </span>
              </AccordionTrigger>
              <AccordionContent
                className={cn(
                  "!p-0 !pb-0 [&_a]:no-underline hover:[&_a]:no-underline",
                  theme.contentLinkHover
                )}
              >
                <div className="pt-[30px]">
                  {studies.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                      {studies.map((paper) => (
                        <HighlightStudyCard key={paper.id} paper={paper} topicId={topic.id} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-pretty text-sm text-muted-foreground">
                      <Link
                        href="/research"
                        className="font-medium text-[#027f89] underline-offset-4 hover:underline"
                      >
                        Browse all research
                      </Link>{" "}
                      for papers in this theme.
                    </p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </section>
  )
}

function parseResearchYear(publishDate: string): string {
  const parts = publishDate.split("/")
  if (parts.length === 3) {
    const y = new Date(+parts[2], +parts[0] - 1, +parts[1]).getFullYear()
    return Number.isNaN(y) ? "" : String(y)
  }
  const y = new Date(publishDate).getFullYear()
  return Number.isNaN(y) ? "" : String(y)
}

/** Select sentinel — must not match a real venue string. */
const INDEX_FILTER_ANY = "all"

function indexYearOptionsFromPapers(papers: ResearchPaper[]): string[] {
  const years = new Set<string>()
  for (const p of papers) {
    const y = parseResearchYear(p.publishDate)
    if (y) years.add(y)
  }
  return [...years].sort((a, b) => Number(b) - Number(a))
}

function indexVenueOptionsFromPapers(papers: ResearchPaper[]): string[] {
  const venues = new Set<string>()
  for (const p of papers) {
    const v = p.venue?.trim()
    if (v) venues.add(v)
  }
  return [...venues].sort((a, b) => a.localeCompare(b))
}

function formatAuthorsShort(authors: string[]) {
  if (authors.length === 0) return ""
  if (authors.length <= 2) return authors.join(", ")
  return `${authors[0]}, ${authors[1]} et al.`
}

/** Cropped scroll region — keeps the section short (card list only; full `/research` has table + cards). */
const INDEX_PREVIEW_SCROLL =
  "max-h-[min(26rem,50svh)] overflow-y-auto overscroll-y-contain min-h-0 scroll-smooth sm:max-h-[min(30rem,55svh)]"

/** Research Index — prose matches `text-muted-foreground` body/supporting grey (`globals.css`). */
const INDEX_SECTION = "font-sans"
const INDEX_TITLE = "text-muted-foreground"
const INDEX_TITLE_LINK =
  "text-muted-foreground underline-offset-2 hover:text-muted-foreground hover:underline"
/** “All” filter chip — neutral grey (genre chips stay color-coded). */
const INDEX_TAG_ALL_SELECTED =
  "border-muted-foreground/35 bg-muted text-muted-foreground shadow-sm hover:bg-muted hover:text-muted-foreground"
const INDEX_TAG_ALL_IDLE =
  "border-border bg-background text-muted-foreground hover:bg-muted/60 hover:text-muted-foreground"

/** Wider list than trigger — min = trigger width, grows for long labels (capped to viewport). */
const INDEX_SELECT_CONTENT_CLASS =
  "min-w-(--anchor-width) !w-max max-w-[min(100vw-2rem,48rem)]"

function ResearchIndexSearchForm() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  return (
    <form
      role="search"
      className="block font-sans"
      onSubmit={(e) => {
        e.preventDefault()
        const params = new URLSearchParams()
        if (query.trim()) params.set("q", query.trim())
        router.push(`/research${params.toString() ? `?${params}` : ""}`)
      }}
    >
      <label className="block">
        <span className="sr-only">Search publications — opens the full Research &amp; Publications page</span>
        <div
          className={cn(
            "flex h-16 items-center gap-3 rounded-full border-2 bg-white px-6",
            FIELD_BORDER
          )}
        >
          <Search className="size-6 shrink-0 text-muted-foreground" aria-hidden />
          <input
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search papers by title, author, or keyword…"
            className="min-w-0 flex-1 border-0 bg-transparent font-sans text-base text-muted-foreground placeholder:text-muted-foreground/80 sm:text-lg focus:outline-none focus:ring-0"
            autoComplete="off"
          />
        </div>
      </label>
    </form>
  )
}

export const ResearchIndexSection = ({
  papers,
  totalCount,
  filterSourcePapers,
}: {
  papers: ResearchPaper[]
  totalCount: number
  /** Years/conference options — defaults to `papers`. Pass full catalogue so filters stay useful on the preview slice. */
  filterSourcePapers?: ResearchPaper[]
}) => {
  const [tagFilter, setTagFilter] = useState<"all" | string>("all")
  const [yearFilter, setYearFilter] = useState<string>(INDEX_FILTER_ANY)
  const [venueFilter, setVenueFilter] = useState<string>(INDEX_FILTER_ANY)

  const optionSource = filterSourcePapers ?? papers
  const yearOptions = useMemo(
    () => indexYearOptionsFromPapers(optionSource),
    [optionSource]
  )
  const venueOptions = useMemo(
    () => indexVenueOptionsFromPapers(optionSource),
    [optionSource]
  )

  const filteredPapers = useMemo(() => {
    return papers.filter((p) => {
      if (tagFilter !== "all" && !(p.topics ?? []).includes(tagFilter)) {
        return false
      }
      if (yearFilter !== INDEX_FILTER_ANY) {
        if (parseResearchYear(p.publishDate) !== yearFilter) return false
      }
      if (venueFilter !== INDEX_FILTER_ANY) {
        const v = p.venue?.trim()
        if (!v || v !== venueFilter) return false
      }
      return true
    })
  }, [papers, tagFilter, yearFilter, venueFilter])

  return (
    <section
      id={forResearchersSectionIds.index}
      className={cn("space-y-6 sm:space-y-8 lg:space-y-10", INDEX_SECTION)}
    >
      <SectionHeader
        title="Research Index"
        description="Recent peer-reviewed work from the PLUS team. Cards use color-coded tags—filter by topic, year, or conference, or open the full Research & Publications catalogue."
        decor={forResearchersAssets.index.decor}
      />
      <ResearchIndexSearchForm />

      {papers.length === 0 ? (
        <div
          className={cn(
            "rounded-[30px] border-2 bg-white px-6 py-10 text-center",
            FIELD_BORDER
          )}
        >
          <p className="text-pretty text-muted-foreground">
            Publications could not be loaded right now. Browse the archive directly on the Research
            &amp; Publications page.
          </p>
          <Link href="/research" className={cn(forResearchersOutlineCtaClassName, "mt-6")}>
            Open publications
          </Link>
        </div>
      ) : (
        <div
          className={cn(
            "overflow-hidden rounded-[30px] border-2 bg-white",
            FIELD_BORDER
          )}
        >
          <div>
            <div className="border-b border-border/80 bg-muted/25 px-4 py-3 sm:px-5">
              <p className="text-pretty text-sm text-muted-foreground">
                Card preview: {filteredPapers.length} of {papers.length} shown · {totalCount} total in
                catalogue (newest first)
                {tagFilter !== "all" || yearFilter !== INDEX_FILTER_ANY || venueFilter !== INDEX_FILTER_ANY ? (
                  <span>
                    {" "}
                    · Active filters
                    {tagFilter !== "all" ? ` · ${tagFilter}` : null}
                    {yearFilter !== INDEX_FILTER_ANY ? ` · ${yearFilter}` : null}
                    {venueFilter !== INDEX_FILTER_ANY ? (
                      <span className="break-words"> · {venueFilter}</span>
                    ) : null}
                  </span>
                ) : null}
              </p>
            </div>

            <div
              className="flex flex-col gap-2 border-b border-border/80 bg-muted/15 px-4 py-3 sm:px-5"
              role="group"
              aria-label="Filter publications by tag"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Tags
              </span>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className={cn(
                    "border-2 font-sans",
                    tagFilter === "all" ? INDEX_TAG_ALL_SELECTED : INDEX_TAG_ALL_IDLE
                  )}
                  aria-pressed={tagFilter === "all"}
                  onClick={() => setTagFilter("all")}
                >
                  All
                </Button>
                {RESEARCH_GENRE_TAGS.map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    size="sm"
                    variant="outline"
                    className={cn(
                      "border-2 font-sans",
                      researchGenreFilterChipClassName(tag, tagFilter === tag)
                    )}
                    aria-pressed={tagFilter === tag}
                    onClick={() => setTagFilter(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            <div
              className="flex flex-col gap-4 border-b border-border/80 bg-muted/15 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-end sm:px-5"
              role="group"
              aria-label="Filter publications by year and conference"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:min-w-[11rem] sm:max-w-[14rem]">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Year
                </span>
                <Select
                  value={yearFilter}
                  onValueChange={(v) => setYearFilter(v ?? INDEX_FILTER_ANY)}
                >
                  <SelectTrigger
                    size="sm"
                    className={cn(
                      "h-10 w-full border-2 bg-white font-sans text-muted-foreground",
                      FIELD_BORDER
                    )}
                  >
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent
                    align="start"
                    alignItemWithTrigger={false}
                    className={INDEX_SELECT_CONTENT_CLASS}
                  >
                    <SelectItem value={INDEX_FILTER_ANY}>Any year</SelectItem>
                    {yearOptions.map((y) => (
                      <SelectItem key={y} value={y}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex min-w-0 flex-[2] flex-col gap-1.5 sm:min-w-[min(100%,24rem)]">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Conference
                </span>
                <Select
                  value={venueFilter}
                  onValueChange={(v) => setVenueFilter(v ?? INDEX_FILTER_ANY)}
                >
                  <SelectTrigger
                    size="sm"
                    className={cn(
                      "h-10 w-full border-2 bg-white font-sans text-muted-foreground",
                      FIELD_BORDER
                    )}
                  >
                    <SelectValue placeholder="Conference" />
                  </SelectTrigger>
                  <SelectContent
                    align="start"
                    alignItemWithTrigger={false}
                    className={cn("max-h-72", INDEX_SELECT_CONTENT_CLASS)}
                  >
                    <SelectItem value={INDEX_FILTER_ANY}>Any conference</SelectItem>
                    {venueOptions.map((v) => (
                      <SelectItem
                        key={v}
                        value={v}
                        className="items-start whitespace-normal py-2 text-pretty"
                      >
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className={cn("p-4 sm:p-5", INDEX_PREVIEW_SCROLL)} tabIndex={0}>
              {filteredPapers.length === 0 ? (
                <p className="text-pretty px-1 py-6 text-center text-sm text-muted-foreground">
                  No papers in this preview match your filters. Try other tags, year, or conference—or
                  open the full catalogue to search the archive.
                </p>
              ) : (
                <ul className="flex flex-col gap-3 pr-1">
                  {filteredPapers.map((paper) => {
                    const year = parseResearchYear(paper.publishDate)
                    const authorsLine = formatAuthorsShort(paper.authors)
                    return (
                      <li
                        key={paper.id}
                        className={cn(
                          "rounded-[24px] border border-border/80 bg-background/80 px-4 py-3 transition-colors sm:px-5 sm:py-3.5",
                          "hover:bg-muted/40"
                        )}
                      >
                        <div className="min-w-0 space-y-1.5">
                          <h3 className={cn("text-pretty font-semibold leading-snug", INDEX_TITLE)}>
                            {paper.paperLink ? (
                              <a
                                href={paper.paperLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn("inline-flex items-start gap-1.5", INDEX_TITLE_LINK)}
                              >
                                {paper.title}
                                <ExternalLink
                                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                                  aria-hidden
                                />
                              </a>
                            ) : (
                              paper.title
                            )}
                          </h3>
                          {(paper.topics ?? []).length > 0 ? (
                            <div className="flex flex-wrap gap-1.5" aria-label="Genres">
                              {sortResearchGenresForDisplay(paper.topics ?? []).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className={cn(
                                    "border-2 font-sans text-xs font-medium",
                                    researchGenreBadgeClassName(tag)
                                  )}
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          ) : null}
                          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                            {[year, paper.venue, authorsLine].filter(Boolean).join(" · ")}
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className="flex justify-center border-t border-border/80 bg-muted/10 px-4 py-4">
            <Link href="/research" className={forResearchersOutlineCtaClassName}>
              View all publications
              <ArrowRight className="ml-2 size-4 shrink-0 text-[#004247]" aria-hidden />
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

/** Figma `1730:2037` — card footer + link styling. */
const RESEARCHER_CARD_FOOTER = "bg-[#e0f5fe]"
const RESEARCHER_CARD_NAME = "text-2xl font-bold text-[#004247]"
const RESEARCHER_CARD_BODY_TEXT = "text-base text-[#004247]"
const RESEARCHER_CARD_INLINE_LINK =
  "text-[#0080b4] underline decoration-[#0080b4] underline-offset-2 hover:text-[#006a94]"

function researcherCardLinks(
  member: TeamMember
): { label: string; href: string; external: boolean }[] {
  const rows: { label: string; href: string; external: boolean }[] = []
  if (member.googleScholar) {
    rows.push({ label: "Google Scholar", href: member.googleScholar, external: true })
  }
  if (member.linkedIn) {
    rows.push({ label: "LinkedIn", href: member.linkedIn, external: true })
  }
  if (member.personalWebsite) {
    rows.push({ label: "Website", href: member.personalWebsite, external: true })
  }
  if (rows.length === 0) {
    rows.push({
      label: "Team profile",
      href: `/about/team?q=${encodeURIComponent(member.name)}`,
      external: false,
    })
  }
  return rows
}

/** One image fills the card header — proxy URL → Notion URL → Figma placeholder. */
function ResearcherCardPhoto({
  memberId,
  name,
  notionPictureUrl,
  placeholderSrc,
}: {
  memberId: string
  name: string
  notionPictureUrl: string | null
  placeholderSrc: string
}) {
  const [src, setSrc] = useState(`/api/team-photo/${memberId}`)

  return (
    <img
      src={src}
      alt={name}
      className="h-full w-full object-cover object-[center_20%]"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        if (src.startsWith("/api/") && notionPictureUrl) {
          setSrc(notionPictureUrl)
          return
        }
        if (src !== placeholderSrc) {
          setSrc(placeholderSrc)
        }
      }}
    />
  )
}

export const ResearchersGridSection = ({ members }: { members: TeamMember[] }) => {
  const fallbackPhoto = forResearchersAssets.researchers.fallbackPhoto

  return (
    <section id={forResearchersSectionIds.researchers} className="space-y-6 sm:space-y-8 lg:space-y-10">
      <SectionHeader
        title="Our Researchers"
        description="Meet our team who are driving evidence-based breakthroughs in learning science, HCI, and artificial intelligence."
        decor={forResearchersAssets.researchers.decor}
      />

      {members.length === 0 ? (
        <p className="text-pretty text-sm text-muted-foreground">
          Researcher profiles will appear here once loaded from our team directory.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => {
            const links = researcherCardLinks(member)
            return (
              <article
                key={member.id}
                className="flex flex-col overflow-hidden rounded-[30px] bg-white"
              >
                <div className="relative aspect-[344/322] w-full overflow-hidden rounded-t-[30px] bg-muted">
                  <ResearcherCardPhoto
                    memberId={member.id}
                    name={member.name}
                    notionPictureUrl={member.picture}
                    placeholderSrc={fallbackPhoto}
                  />
                </div>
                <div
                  className={cn(
                    "flex flex-1 flex-col gap-2.5 px-5 py-6 sm:px-6",
                    RESEARCHER_CARD_FOOTER
                  )}
                >
                  <h3 className={cn("text-pretty", RESEARCHER_CARD_NAME)}>{member.name}</h3>
                  <p className={cn(RESEARCHER_CARD_BODY_TEXT, "flex flex-wrap items-center gap-x-1")}>
                    {links.map((item, i) => (
                      <span key={`${item.label}-${item.href}`} className="inline-flex items-center gap-x-1">
                        {i > 0 ? (
                          <span className="text-[#004247]" aria-hidden>
                            |
                          </span>
                        ) : null}
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={RESEARCHER_CARD_INLINE_LINK}
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link href={item.href} className={RESEARCHER_CARD_INLINE_LINK}>
                            {item.label}
                          </Link>
                        )}
                      </span>
                    ))}
                  </p>
                  {member.title1 ? (
                    <p className={cn("text-pretty", RESEARCHER_CARD_BODY_TEXT)}>{member.title1}</p>
                  ) : null}
                  {member.title2 ? (
                    <p className={cn("text-pretty", RESEARCHER_CARD_BODY_TEXT)}>{member.title2}</p>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export const ResearchSuccessStoriesSection = ({ stories }: { stories: SuccessStory[] }) => {
  const titleIcon = forResearchersAssets.successStories.cardTitleIcon

  return (
    <section
      id={forResearchersSectionIds.successStories}
      className="space-y-10 sm:space-y-12 lg:space-y-14"
    >
      <div className="mx-auto flex w-full max-w-[1124px] flex-col gap-10 sm:gap-12 lg:gap-14">
        <div className="flex w-full flex-row items-start gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <div className="min-w-0 flex-1 basis-0 space-y-3 text-left sm:space-y-4 md:space-y-5">
            <h2 className="text-pretty text-2xl font-bold tracking-tight text-[#004247] sm:text-3xl md:text-4xl">
              Research Success Story
            </h2>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
              Here&apos;s what researchers are saying about PLUS.
            </p>
          </div>
          <img
            alt=""
            src={forResearchersAssets.successStories.decor}
            className={successStoriesHeaderDecor}
            aria-hidden
          />
        </div>

        {stories.length === 0 ? (
          <p className="text-pretty text-sm text-muted-foreground">
            Success stories will appear here when available.{" "}
            <Link href="/success-stories" className="font-medium text-[#027f89] underline-offset-4 hover:underline">
              Browse all success stories
            </Link>
            .
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 lg:gap-9">
            {stories.map((story) => {
              const readUrl = notionSuccessStoryPublicReadUrl(story)
              const quoteParts =
                story.quote ? splitSuccessStoryQuote(story.quote) : null

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
                          SUCCESS_STORY_GREEN
                        )}
                      >
                        {story.title}
                      </h3>
                    </div>
                    {story.quote ? (
                      <>
                        <blockquote
                          className={cn(
                            "text-pretty text-lg italic leading-relaxed text-muted-foreground sm:text-xl"
                          )}
                        >
                          {quoteParts ? (
                            <>
                              &ldquo;{quoteParts.before}{" "}
                              <strong className={cn("font-semibold italic", SUCCESS_STORY_GREEN)}>
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
                      SUCCESS_STORY_GREEN,
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
      </div>
    </section>
  )
}

/** Match `SchoolsRegisterCTA` shell + header typography. */
const COLLABORATE_CTA_CARD =
  "mx-auto w-full max-w-[1022px] overflow-hidden rounded-[30px] bg-white p-8 sm:p-10 md:p-[50px]"

export const ResearchCollaborateCtaSection = () => {
  return (
    <section id={forResearchersSectionIds.collaborate} className="scroll-mt-24">
      <div className={COLLABORATE_CTA_CARD}>
        <div className="flex flex-col items-center gap-12 md:gap-14 lg:gap-[60px]">
          <div className="mx-auto w-full max-w-[49rem] space-y-3 text-center sm:space-y-4 md:space-y-5">
            <h2 className={sectionHeaderH2}>Conduct Research with Us</h2>
            <p className={sectionHeaderLead}>
              Want to get involved? Reach out if you are interested in conducting research with us.
            </p>
          </div>
          <Button
            type="button"
            variant="plusNavCta"
            size="navCta"
            className="h-[45px] min-h-[45px] rounded-full px-10 text-base font-normal"
          >
            Reach out
          </Button>
        </div>
      </div>
    </section>
  )
}
