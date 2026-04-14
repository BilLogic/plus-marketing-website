"use client"

import { ArrowRight, ChevronDown, ChevronRight, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button, buttonVariants } from "@/components/ui/button"
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
} from "@/lib/research/research-genres"
import {
  riFg,
  riFilterFieldLabelCn,
  riFilterLabelCn,
  riFilterTagButtonCn,
  riGenreFilterPillClass,
  riIndexMetaCopy,
  riSeeAllPublicationsLinkMetaClass,
  riSelectItemCn,
  riSelectTriggerCn,
} from "@/components/marketing/research-index/research-index-figma-tokens"
import { ResearchIndexPublicationCard } from "@/components/marketing/research-index/research-index-publication-card"
import {
  riParseYear,
  riPublicationDescription,
} from "@/components/marketing/research-index/research-index-utils"
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
 * Figma `1730:2003` — collapsed row: neutral grays.
 * Figma `1732:3337` Variant2 — open row: accent icon/title/chevron; study tiles shell + inner white (`1732:3394`).
 */
const HIGHLIGHT_TOPIC_THEME: Record<
  ResearchHighlightTopicId,
  {
    contentLinkHover: string
    openTitle: string
    openChevron: string
    openIconDisc: string
    openIconGlyph: string
    studyShellBg: string
    studyAccentText: string
    studyFocusRing: string
  }
> = {
  "student-learning": {
    contentLinkHover: "hover:[&_a]:text-[#c05053]",
    openTitle: "group-aria-expanded/accordion-trigger:text-[#c05053]",
    openChevron: "group-aria-expanded/accordion-trigger:text-[#c05053]",
    openIconDisc: "#c05053",
    openIconGlyph: "#ffffff",
    studyShellBg: "bg-[#fff7f7]",
    studyAccentText: "text-[#c05053]",
    studyFocusRing: "focus-visible:ring-[#c05053]/40",
  },
  "gen-ai": {
    contentLinkHover: "hover:[&_a]:text-[#0080b4]",
    openTitle: "group-aria-expanded/accordion-trigger:text-[#0080b4]",
    openChevron: "group-aria-expanded/accordion-trigger:text-[#0080b4]",
    openIconDisc: "#0080b4",
    openIconGlyph: "#ffffff",
    studyShellBg: "bg-[#e0f5fe]",
    studyAccentText: "text-[#0080b4]",
    studyFocusRing: "focus-visible:ring-[#0080b4]/40",
  },
  "tutor-training": {
    contentLinkHover: "hover:[&_a]:text-[#007d49]",
    openTitle: "group-aria-expanded/accordion-trigger:text-[#007d49]",
    openChevron: "group-aria-expanded/accordion-trigger:text-[#007d49]",
    openIconDisc: "#007d49",
    openIconGlyph: "#ffffff",
    studyShellBg: "bg-[#f4fbf6]",
    studyAccentText: "text-[#007d49]",
    studyFocusRing: "focus-visible:ring-[#007d49]/40",
  },
}

/** Figma `1730:2003` — row inner layout (icon 59px, gap ~22px, chevron 50px). */
const HIGHLIGHT_TRIGGER_ROW =
  "flex w-full min-w-0 items-center justify-between gap-4"

/** Figma `1730:2003` — uniform disc + white glyphs on closed rows. */
const HIGHLIGHT_ROW_ICON_DISC = "#62636c"
const HIGHLIGHT_ROW_ICON_GLYPH = "#ffffff"

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
const sectionHeaderLead = marketingTypography.sectionLead
/** Every `<h2>` on `/for-researchers` — same scale as schools sections + `riFg.title` color as Research Index. */
const forResearchersSectionH2 = cn(sectionHeaderH2, riFg.title)
/** Same as SchoolsCommunitySection / SchoolsTrainingSection mascot column. */
const sectionHeaderDecor =
  "pointer-events-none h-[clamp(4.5rem,18vw,10.9375rem)] w-[clamp(3.75rem,24vw,12rem)] shrink-0 object-contain sm:h-32 sm:w-[7.25rem] md:h-40 md:w-36 lg:h-[175px] lg:w-[193px]"
/** SchoolsSuccessStoriesSection header row — slightly wider gaps + compact decor. */
const successStoriesHeaderDecor =
  "pointer-events-none h-[clamp(4.5rem,18vw,9.375rem)] w-auto shrink-0 object-contain sm:h-32 md:h-36 lg:h-[150px] lg:w-[165px]"

const SUCCESS_STORY_GREEN = "text-[#007d49]"

/** Teal outline pill — Research Index “View all” / empty-state link. */
const forResearchersOutlineCtaClassName = cn(
  buttonVariants({ variant: "outline", size: "navCta" }),
  "rounded-full border border-[#027f89] bg-white px-5 text-sm font-normal text-[#004247] hover:bg-teal-50 sm:px-6 sm:text-base"
)

/** Figma `1730:2451` — primary hero CTA (fill `#a6edf4`); sized for a single horizontal row with the secondary CTA. */
const researchersHeroPrimaryCtaClassName = cn(
  "inline-flex h-[45px] w-fit items-center justify-center rounded-full bg-[#a6edf4] px-10 text-base font-normal text-[#004247] no-underline transition-opacity hover:opacity-95"
)

/** Figma `1730:2452` — outline “Our publications”. */
const researchersHeroSecondaryCtaClassName =
  "inline-flex h-[45px] w-fit items-center justify-center rounded-full border border-[#027f89] bg-white px-10 text-base font-normal text-[#004247] no-underline transition-colors hover:bg-teal-50"

/**
 * Figma `1730:2510` / `1730:2453` — 2×2 partner grid (20px gap), pink character top-left, blue bottom-right.
 * Row 1: Learning Ideas | SIGCHI · Row 2: SOLAR | AIED. No CMU tooltip in current IA.
 */
/**
 * Figma `1730:2453` grid proportions, slightly shorter tiles than 231px height so the hero text column can keep CTAs on one row.
 */
const heroCollageTileLayout =
  "relative flex aspect-[270/200] w-full min-h-0 items-center justify-center overflow-hidden min-[480px]:aspect-[270/210]"

const ResearchHeroCollageVisual = () => {
  const c = forResearchersAssets.heroCollage
  return (
    <div className="relative mx-auto w-full max-w-[min(100%,38rem)] pb-12 pt-12 sm:max-w-[40rem] sm:pt-14 sm:pb-16 lg:max-w-[38.5rem] lg:pt-16 lg:pb-0">
      {/* Pink character — Figma `1730:2467` 109×95, −15°, ~44px above grid */}
      <div className="pointer-events-none absolute left-[-3px] top-0 z-20">
        <div className="-rotate-[15deg]">
          <img
            alt=""
            src={c.characterPink}
            className="h-[95px] w-[109px] object-cover max-[479px]:h-[76px] max-[479px]:w-[87px]"
            aria-hidden
          />
        </div>
      </div>
      <div
        className={cn(
          "relative z-0 mx-auto grid w-full max-w-[min(100%,520px)] grid-cols-1 gap-3.5 min-[480px]:grid-cols-2 min-[480px]:gap-5"
        )}
      >
        {/* Learning Ideas — pink, Figma `1730:2455` */}
        <div className={cn(heroCollageTileLayout, "rounded-[24px] bg-[#ffe8f5] min-[480px]:rounded-[30px]")}>
          <img
            alt=""
            src={c.learningIdeasConference}
            className="pointer-events-none max-h-[min(200px,86%)] max-w-[min(200px,74%)] object-cover"
            aria-hidden
          />
        </div>
        {/* SIGCHI — yellow */}
        <div className={cn(heroCollageTileLayout, "rounded-[24px] bg-[#fff0cb] min-[480px]:rounded-[30px]")}>
          <img
            alt=""
            src={c.sigchi}
            className="pointer-events-none max-h-[min(200px,86%)] max-w-[min(200px,74%)] rounded-[96px] object-contain min-[480px]:rounded-[132px]"
            aria-hidden
          />
        </div>
        {/* SOLAR — green, inner fill 228px tall in Figma */}
        <div
          className={cn(
            heroCollageTileLayout,
            "rounded-[24px] bg-[#f4fbf6] min-[480px]:rounded-[31.932px]"
          )}
        >
          <img
            alt=""
            src={c.solar}
            className="pointer-events-none max-h-[min(71px,31%)] max-w-[min(165px,61%)] object-cover"
            aria-hidden
          />
        </div>
        {/* AIED — tile + "=" outside the blue box, anchored to its bottom-right corner (Figma `1730:2468`) */}
        <div className="relative min-h-0 w-full">
          <div
            className={cn(
              heroCollageTileLayout,
              "rounded-[18px] bg-[#e0f5fe] min-[480px]:rounded-[21.254px]"
            )}
          >
            <div className="pointer-events-none relative z-0 h-[min(74px,32%)] w-[min(166px,61%)] min-h-[36px] min-w-[100px] overflow-hidden">
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
          <img
            alt=""
            src={c.characterBlue}
            className="pointer-events-none absolute bottom-0 right-0 z-10 hidden h-[79px] w-[97px] origin-bottom-right translate-x-[30%] translate-y-[28%] object-cover object-bottom-right sm:block"
            aria-hidden
          />
        </div>
      </div>
    </div>
  )
}

/** Hero `1730:2510` — copy left; collage sized to Figma `1730:2453` (560px grid, 676px frame). */
export const ResearchersHeroSection = () => {
  return (
    <section className="relative w-full min-w-0 overflow-x-hidden pt-8 pb-6 sm:pt-10 sm:pb-8 md:pt-12 md:pb-10 lg:pt-14 lg:pb-12">
      <div className="mx-auto flex w-full flex-col gap-6 sm:gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-10 xl:gap-12">
        <div className="flex w-full min-w-0 max-w-[34rem] flex-col lg:max-w-[min(34rem,51vw)]">
          <h1 className="flex flex-col gap-2 sm:gap-2.5 lg:gap-3">
            <span className="text-xl font-semibold leading-none text-[#027f89] sm:text-2xl lg:text-[26px] xl:text-[28px]">
              For researchers
            </span>
            <span className="text-balance text-[1.625rem] font-bold leading-[1.2] tracking-tight text-[#004247] sm:text-[1.875rem] md:text-[2.125rem] lg:text-[2.375rem] xl:text-[2.75rem] 2xl:text-[3rem]">
              Pioneering CMU Research: Human-Centered AI for Personalized Math Learning
            </span>
          </h1>
          <div className="mt-5 flex w-full flex-row items-stretch gap-2 min-[400px]:gap-3 sm:mt-6 lg:mt-7">
            <Link
              href={`#${forResearchersSectionIds.collaborate}`}
              className={researchersHeroPrimaryCtaClassName}
            >
              Research with us
            </Link>
            <Link href="/research" className={researchersHeroSecondaryCtaClassName}>
              Our publications
            </Link>
          </div>
        </div>
        <div className="relative flex min-w-0 flex-1 shrink-0 justify-center lg:max-w-[min(100%,38.5rem)] lg:justify-end">
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
  descriptionClassName,
}: {
  title: string
  description: string
  decor: string
  /** Optional override for h2 color/weight. */
  titleClassName?: string
  /** Optional override for lead paragraph (e.g. Research Index Figma `1730:2012`). */
  descriptionClassName?: string
}) => (
  <div className="flex w-full flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
    <div className="min-w-0 flex-1 basis-0 space-y-3 sm:space-y-4 md:space-y-5">
      <h2 className={cn(sectionHeaderH2, titleClassName)}>{title}</h2>
      <p className={cn(sectionHeaderLead, descriptionClassName)}>{description}</p>
    </div>
    <img alt="" src={decor} className={sectionHeaderDecor} aria-hidden />
  </div>
)

export const ResearchPartnersSection = () => {
  return (
    <section
      id={forResearchersSectionIds.partners}
      className="w-full min-w-0 space-y-6 sm:space-y-8 lg:space-y-10"
    >
      <SectionHeader
        title="Our Research Partners"
        description="A strategic alliance of world-class universities and industry leaders committed to rigorous learning engineering at scale."
        decor={forResearchersAssets.partners.decor}
        titleClassName={riFg.title}
      />
      <div className="flex items-center justify-between">
        {forResearchersAssets.partners.logos.map((logo, i) => (
          <div
            key={logo}
            className={cn(
              "relative shrink-0",
              i === 2
                ? "size-[160px] sm:size-[210px] md:size-[260px]"
                : "size-[120px] sm:size-[160px] md:size-[200px]",
            )}
          >
            <img
              alt=""
              src={logo}
              className="absolute inset-0 size-full max-w-none object-contain"
              aria-hidden
            />
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

/** Figma `1815:2160` — same SVG exports as the file (not Lucide approximations). */
function HighlightStudyPublicationIcon({
  topicId,
  studyIndex,
  className,
}: {
  topicId: ResearchHighlightTopicId
  studyIndex: number
  className?: string
}) {
  const row = forResearchersAssets.highlights.studyPublicationIcons[topicId]
  const src = row[Math.min(Math.max(studyIndex, 0), row.length - 1)]
  return (
    <img
      src={src}
      alt=""
      width={24}
      height={24}
      decoding="async"
      className={cn("size-6 shrink-0 object-contain", className)}
      aria-hidden
    />
  )
}

/** Figma `1732:3394` / `1732:3337` — tinted shell, white inner, footer “Read study →”. */
function HighlightStudyCard({
  paper,
  topicId,
  studyIndex,
}: {
  paper: ResearchPaper
  topicId: ResearchHighlightTopicId
  studyIndex: number
}) {
  const theme = HIGHLIGHT_TOPIC_THEME[topicId]
  const summary = riPublicationDescription(paper)
  const shellClass = cn(
    "flex h-full min-h-[22rem] w-full min-w-0 flex-col gap-2.5 rounded-[30px] p-[15px] text-left no-underline outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-offset-2 sm:min-h-[24rem]",
    theme.studyShellBg,
    theme.studyFocusRing
  )
  const inner = (
    <>
        <div className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden rounded-[30px] bg-white p-[15px] sm:p-5">
        <div className="flex w-full min-w-0 flex-col gap-8">
          <div className="flex shrink-0 items-start gap-2.5">
            <HighlightStudyPublicationIcon
              topicId={topicId}
              studyIndex={studyIndex}
              className="mt-1 shrink-0"
            />
            <p
              className={cn(
                "min-w-0 flex-1 text-pretty",
                marketingTypography.bentoTitle,
                theme.studyAccentText
              )}
            >
              {paper.title}
            </p>
          </div>
          {summary ? (
            <div className="max-h-[min(50%,12.5rem)] w-full min-w-0 overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch] sm:max-h-[min(50%,15rem)]">
              <p
                className={cn(
                  "text-pretty text-muted-foreground",
                  riIndexMetaCopy
                )}
              >
                {summary}
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <span
        className={cn(
          "flex shrink-0 items-center justify-end gap-2.5",
          marketingTypography.body,
          theme.studyAccentText
        )}
      >
        Read study
        <ArrowRight className="size-[26px] shrink-0" strokeWidth={2} aria-hidden />
      </span>
    </>
  )
  if (paper.paperLink) {
    return (
      <a
        href={paper.paperLink}
        target="_blank"
        rel="noopener noreferrer"
        className={shellClass}
      >
        {inner}
      </a>
    )
  }
  return (
    <Link href="/research" className={shellClass}>
      {inner}
    </Link>
  )
}

export const ResearchHighlightsSection = ({
  papers,
  openAllAccordions = false,
}: {
  papers: ResearchPaper[]
  /** Set via `?highlights=all` — expands every theme for Figma/screenshots (not default UX). */
  openAllAccordions?: boolean
}) => {
  const studiesByTopic = useMemo(() => {
    const map = new Map<string, ResearchPaper[]>()
    for (const topic of RESEARCH_HIGHLIGHT_TOPICS) {
      map.set(topic.id, pickStudiesForHighlightTopic(papers, topic))
    }
    return map
  }, [papers])

  const defaultExpandedIds = openAllAccordions
    ? RESEARCH_HIGHLIGHT_TOPICS.map((t) => t.id)
    : []

  return (
    <section
      id={forResearchersSectionIds.highlights}
      className="w-full min-w-0 space-y-6 font-sans sm:space-y-8 lg:space-y-10"
    >
      <SectionHeader
        title="Our Latest Research Highlights"
        description="Explore our most recent findings in generative artificial intelligence, tutor training, and student learning."
        decor={forResearchersAssets.highlights.decor}
        titleClassName={riFg.title}
      />

      <Accordion
        multiple={openAllAccordions}
        defaultValue={defaultExpandedIds}
        aria-label="Research highlight themes"
        className="flex w-full min-w-0 flex-col gap-[30px]"
      >
        {RESEARCH_HIGHLIGHT_TOPICS.map((topic) => {
          const studies = studiesByTopic.get(topic.id) ?? []
          const theme = HIGHLIGHT_TOPIC_THEME[topic.id]
          return (
            <AccordionItem
              key={topic.id}
              value={topic.id}
              className="w-full min-w-0 overflow-hidden rounded-[30px] border-0 bg-white not-last:border-b-0 shadow-none outline-none ring-0"
            >
              <AccordionTrigger
                hideChevron
                className="w-full items-center border-0 py-8 pl-0 pr-0 text-base font-normal shadow-none outline-none ring-0 hover:no-underline focus-visible:border-transparent focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:after:border-transparent"
              >
                <span className={HIGHLIGHT_TRIGGER_ROW}>
                  <span className="flex min-w-0 items-center gap-[22px]">
                    <span className="relative size-[59px] shrink-0">
                      <span className="absolute inset-0 group-aria-expanded/accordion-trigger:hidden">
                        <ResearchHighlightTopicIcon
                          topicId={topic.id}
                          discFill={HIGHLIGHT_ROW_ICON_DISC}
                          glyphStroke={HIGHLIGHT_ROW_ICON_GLYPH}
                        />
                      </span>
                      <span className="absolute inset-0 hidden group-aria-expanded/accordion-trigger:block">
                        <ResearchHighlightTopicIcon
                          topicId={topic.id}
                          discFill={theme.openIconDisc}
                          glyphStroke={theme.openIconGlyph}
                        />
                      </span>
                    </span>
                    <span
                      className={cn(
                        "min-w-0 text-left text-2xl font-semibold capitalize leading-snug tracking-[-0.02em] text-[#62636c] sm:text-[32px] sm:leading-[1.22]",
                        theme.openTitle
                      )}
                    >
                      {topic.title}
                    </span>
                  </span>
                  <ChevronRight
                    strokeWidth={1.75}
                    className={cn(
                      "size-10 shrink-0 text-[#62636c] transition-transform duration-200 ease-out group-aria-expanded/accordion-trigger:rotate-90 sm:size-[50px]",
                      theme.openChevron
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
                <div className="px-0 pb-8 pt-[30px]">
                  {studies.length > 0 ? (
                    <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6">
                      {studies.map((paper, studyIndex) => (
                        <HighlightStudyCard
                          key={paper.id}
                          paper={paper}
                          topicId={topic.id}
                          studyIndex={studyIndex}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-pretty text-base text-muted-foreground">
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

/** Select sentinel — must not match a real venue string. */
const INDEX_FILTER_ANY = "all"

function indexYearOptionsFromPapers(papers: ResearchPaper[]): string[] {
  const years = new Set<string>()
  for (const p of papers) {
    const y = riParseYear(p.publishDate)
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

/** Cropped scroll region — keeps the section short (card list only; full `/research` has table + cards). */
const INDEX_PREVIEW_SCROLL =
  "max-h-[min(26rem,50svh)] overflow-y-auto overscroll-y-contain min-h-0 scroll-smooth sm:max-h-[min(30rem,55svh)]"

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
        <span className="sr-only">
          Search studies — opens the full Research Index with your query
        </span>
        <div className="relative">
          <Search
            className={cn(
              "pointer-events-none absolute left-6 top-1/2 size-6 -translate-y-1/2",
              riFg.bodyMuted
            )}
            aria-hidden
            strokeWidth={2}
          />
          <input
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search studies"
            autoComplete="off"
            className={cn(
              "h-[56px] w-full rounded-full border-0 bg-[#f9f9fb]/70 pl-14 pr-5 font-sans shadow-none sm:h-[63px]",
              riFg.bodyMuted,
              riIndexMetaCopy,
              "leading-normal placeholder:text-[#62636c]/80",
              "focus:outline-none focus:ring-2 focus:ring-[#004247]/15"
            )}
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
  const [tagFilter, setTagFilter] = useState<"all" | ResearchGenreTag>("all")
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
        if (riParseYear(p.publishDate) !== yearFilter) return false
      }
      if (venueFilter !== INDEX_FILTER_ANY) {
        const v = p.venue?.trim()
        if (!v || v !== venueFilter) return false
      }
      return true
    })
  }, [papers, tagFilter, yearFilter, venueFilter])

  const hasExtraFilters =
    tagFilter !== "all" ||
    yearFilter !== INDEX_FILTER_ANY ||
    venueFilter !== INDEX_FILTER_ANY

  return (
    <section
      id={forResearchersSectionIds.index}
      className="w-full min-w-0 space-y-6 font-sans text-[#62636c] sm:space-y-8 lg:space-y-10"
    >
      <SectionHeader
        title="Research Index"
        titleClassName={riFg.title}
        description="Explore the full archive of PLUS research"
        descriptionClassName={cn(riIndexMetaCopy, riFg.bodyMuted)}
        decor={forResearchersAssets.index.decor}
      />
      <ResearchIndexSearchForm />

      {papers.length === 0 ? (
        <div className="rounded-[30px] bg-white px-6 py-10 text-center">
          <p className={cn("text-pretty", riIndexMetaCopy, riFg.bodyMuted)}>
            Publications could not be loaded right now. Browse the archive on the Research Index
            page.
          </p>
          <Link href="/research" className={cn(forResearchersOutlineCtaClassName, "mt-6")}>
            Open publications
          </Link>
        </div>
      ) : (
        <div
          className={cn("overflow-hidden rounded-[30px] shadow-none", riFg.shellBg)}
        >
          <div
            className={cn(
              "flex min-h-[57px] items-center px-5 sm:px-5",
              riFg.shellRow
            )}
          >
            <p className={cn("font-sans", riIndexMetaCopy, riFg.bodyMuted)}>
              Showing {filteredPapers.length} of {papers.length} in this preview · {totalCount} total
              in catalogue (newest first)
              {hasExtraFilters ? (
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
            className={cn("px-5 py-3 sm:px-5", riFg.shellRow)}
            role="group"
            aria-label="Filter publications by tag"
          >
            <p className={riFilterLabelCn}>Tags</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setTagFilter("all")}
                className={cn(
                  riFilterTagButtonCn,
                  tagFilter === "all"
                    ? riFg.allActive
                    : "bg-[#f0f0f2] text-[#62636c] hover:bg-[#e8e8eb]"
                )}
              >
                All
              </button>
              {RESEARCH_GENRE_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    setTagFilter((prev) => (prev === tag ? "all" : tag))
                  }
                  className={cn(
                    riFilterTagButtonCn,
                    riGenreFilterPillClass(tag, tagFilter === tag)
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "flex flex-col gap-4 px-5 py-3 sm:flex-row sm:items-end sm:gap-2 sm:px-5",
              riFg.shellRow
            )}
            role="group"
            aria-label="Filter publications by year and conference"
          >
            <div className="flex w-full min-w-0 flex-col gap-2 sm:w-[173px] sm:shrink-0">
              <span className={riFilterFieldLabelCn}>Year</span>
              <Select
                value={yearFilter}
                onValueChange={(v) => setYearFilter(v ?? INDEX_FILTER_ANY)}
              >
                <SelectTrigger size="sm" className={riSelectTriggerCn}>
                  <SelectValue placeholder="all" />
                </SelectTrigger>
                <SelectContent
                  align="start"
                  alignItemWithTrigger={false}
                  className={INDEX_SELECT_CONTENT_CLASS}
                >
                  <SelectItem value={INDEX_FILTER_ANY} className={riSelectItemCn}>
                    all
                  </SelectItem>
                  {yearOptions.map((y) => (
                    <SelectItem key={y} value={y} className={riSelectItemCn}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <span className={riFilterFieldLabelCn}>Conference</span>
              <Select
                value={venueFilter}
                onValueChange={(v) => setVenueFilter(v ?? INDEX_FILTER_ANY)}
              >
                <SelectTrigger
                  size="sm"
                  className={cn(riSelectTriggerCn, "sm:min-w-0")}
                >
                  <SelectValue placeholder="all" />
                </SelectTrigger>
                <SelectContent
                  align="start"
                  alignItemWithTrigger={false}
                  className={cn("max-h-72", INDEX_SELECT_CONTENT_CLASS)}
                >
                  <SelectItem value={INDEX_FILTER_ANY} className={riSelectItemCn}>
                    all
                  </SelectItem>
                  {venueOptions.map((v) => (
                    <SelectItem
                      key={v}
                      value={v}
                      className={cn(
                        riSelectItemCn,
                        "items-start whitespace-normal text-pretty"
                      )}
                    >
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className={cn("px-5 sm:px-5", INDEX_PREVIEW_SCROLL)} tabIndex={0}>
            <div className="flex w-full flex-col gap-3 py-5">
              {filteredPapers.length === 0 ? (
                <p className={cn("text-pretty py-6 text-center", riIndexMetaCopy, riFg.bodyMuted)}>
                  No papers in this preview match your filters. Try other tags, year, or conference—or
                  open the full catalogue to search the archive.
                </p>
              ) : (
                <ul className="flex w-full min-w-0 flex-col gap-3">
                  {filteredPapers.map((paper) => (
                    <li key={paper.id} className="w-full min-w-0">
                      <ResearchIndexPublicationCard paper={paper} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex justify-end px-5 py-4 sm:px-5">
            <Link href="/research" className={riSeeAllPublicationsLinkMetaClass}>
              See all publications
              <ArrowRight
                className="size-[26px] shrink-0"
                strokeWidth={2}
                aria-hidden
              />
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

/** Figma `1730:2027` — researcher list row + accordion (header uses `sectionHeaderH2` / `sectionHeaderLead`). */
/** Single-line names: width follows content on `sm+`; narrow screens may truncate with ellipsis. */
const RESEARCHERS_ROW_NAME =
  "text-xl font-bold leading-normal text-[#004247] sm:text-2xl sm:leading-normal"
const RESEARCHERS_ROW_META = "text-pretty text-base font-normal leading-normal text-[#004247]"
const RESEARCHER_CARD_INLINE_LINK =
  "text-[#0080b4] underline decoration-[#0080b4] underline-offset-2 hover:text-[#006a94]"
/** Expanded bio — grey body, matches Research Index muted copy. */
const RESEARCHERS_BIO_COPY = cn("text-pretty text-base leading-relaxed", riFg.bodyMuted)

function ResearcherListRow({ member }: { member: TeamMember }) {
  const links = researcherCardLinks(member)
  const primaryRole = member.title1?.trim()
  const secondaryLine = member.title2?.trim()
  return (
    <div className="flex min-h-0 w-full flex-col gap-3 py-1 sm:min-h-[68px] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2 sm:py-0">
      <div
        className={cn(
          "min-w-0 max-w-full shrink-0 truncate sm:w-fit sm:max-w-none sm:overflow-visible sm:whitespace-nowrap",
          RESEARCHERS_ROW_NAME
        )}
      >
        {member.name}
      </div>
      <div
        className={cn(
          "min-w-0 shrink-0 text-base sm:whitespace-nowrap",
          "flex flex-wrap items-center gap-x-1"
        )}
      >
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
      </div>
      {primaryRole ? (
        <div className={cn("min-w-0 max-w-full sm:max-w-[min(100%,24rem)]", RESEARCHERS_ROW_META)}>
          {primaryRole}
        </div>
      ) : null}
      {secondaryLine ? (
        <div className={cn("min-w-0 max-w-full sm:max-w-[min(100%,22rem)]", RESEARCHERS_ROW_META)}>
          {secondaryLine}
        </div>
      ) : null}
    </div>
  )
}

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

export const ResearchersGridSection = ({ members }: { members: TeamMember[] }) => {
  const equalDecor = forResearchersAssets.heroDecor.equal

  return (
    <section
      id={forResearchersSectionIds.researchers}
      className="w-full min-w-0 space-y-6 sm:space-y-8 lg:space-y-10"
    >
      {/* Same title / lead scale as `SectionHeader`; equal mascot in Figma frame. */}
      <div className="flex w-full flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        <div className="min-w-0 flex-1 basis-0 space-y-3 sm:space-y-4 md:space-y-5">
          <h2 className={forResearchersSectionH2}>Our Researchers</h2>
          <p className={sectionHeaderLead}>
            Meet our team who are driving evidence-based breakthroughs in learning science, HCI, and
            artificial intelligence.
          </p>
        </div>
        <div
          className="relative mx-auto flex h-[140px] w-[180px] shrink-0 overflow-hidden bg-white sm:mx-0 sm:h-[177px] sm:w-[229px]"
          aria-hidden
        >
          <img
            alt=""
            src={equalDecor}
            className="pointer-events-none absolute left-[21px] top-0 h-[140px] w-[160px] object-cover object-top sm:h-[163px] sm:w-[187px]"
          />
        </div>
      </div>

      {members.length === 0 ? (
        <p className="text-pretty text-sm text-muted-foreground">
          Researcher profiles will appear here once loaded from our team directory.
        </p>
      ) : (
        <div className="flex w-full min-w-0 flex-col gap-[30px]" role="list">
          {members.map((member) => {
            const bio = member.bio?.trim()
            if (!bio) {
              return (
                <div
                  key={member.id}
                  className="w-full min-w-0 bg-white"
                  role="listitem"
                >
                  <ResearcherListRow member={member} />
                </div>
              )
            }
            return (
              <div key={member.id} className="w-full min-w-0" role="listitem">
                <Accordion
                  aria-label={`Bio for ${member.name}`}
                  className="w-full min-w-0"
                >
                <AccordionItem
                  value={member.id}
                  className="w-full min-w-0 border-0 bg-white shadow-none not-last:border-b-0 outline-none ring-0"
                >
                  {/* Figma `1730:2027` — chevron on the right of the row (not below). */}
                  <div className="flex w-full min-w-0 items-start gap-3 sm:items-center sm:gap-5">
                    <div className="min-w-0 flex-1">
                      <ResearcherListRow member={member} />
                    </div>
                    <AccordionTrigger
                      hideChevron
                      className="mt-0.5 flex-none shrink-0 self-start rounded-none border-0 p-0 text-base font-normal shadow-none outline-none ring-0 ring-offset-0 hover:no-underline focus:outline-none focus-visible:border-transparent focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:after:border-transparent sm:mt-0 sm:self-center"
                    >
                      <span className="sr-only">Show bio for {member.name}</span>
                      <ChevronDown
                        strokeWidth={2}
                        className="size-6 shrink-0 text-[#62636c] transition-transform duration-200 ease-out group-aria-expanded/accordion-trigger:rotate-180"
                        aria-hidden
                      />
                    </AccordionTrigger>
                  </div>
                  <AccordionContent className="!px-0 !pb-6 !pt-4 text-base">
                    <p className={RESEARCHERS_BIO_COPY}>{bio}</p>
                  </AccordionContent>
                </AccordionItem>
                </Accordion>
              </div>
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
      className="w-full min-w-0 space-y-10 sm:space-y-12 lg:space-y-14"
    >
      <div className="flex w-full flex-row items-start gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        <div className="min-w-0 flex-1 basis-0 space-y-3 text-left sm:space-y-4 md:space-y-5">
          <h2 className={forResearchersSectionH2}>Research Success Story</h2>
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
    </section>
  )
}

/** Match `SchoolsRegisterCTA` shell + header typography; full width within page `max-w-7xl` shell. */
const COLLABORATE_CTA_CARD =
  "mx-auto w-full min-w-0 overflow-hidden rounded-[30px] bg-white p-8 sm:p-10 md:p-[50px]"

export const ResearchCollaborateCtaSection = () => {
  return (
    <section id={forResearchersSectionIds.collaborate} className="scroll-mt-24 w-full min-w-0">
      <div className={COLLABORATE_CTA_CARD}>
        <div className="flex flex-col items-center gap-12 md:gap-14 lg:gap-[60px]">
          <div className="mx-auto w-full max-w-[49rem] space-y-3 text-center sm:space-y-4 md:space-y-5">
            <h2 className={forResearchersSectionH2}>Conduct Research with Us</h2>
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
