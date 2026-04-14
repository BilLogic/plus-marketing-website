"use client"

import {
  useState,
  type ComponentType,
  type ReactNode,
  type SVGProps,
} from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Brain, LayoutDashboard, Sparkles, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { forSchoolsAssets } from "@/components/marketing/for-schools-assets"
import { cn } from "@/lib/utils"
import { forTutorsAssets } from "@/components/marketing/for-tutors-assets"
import { forTutorsSectionIds } from "@/lib/plus-footer-ia"
import type { SuccessStory } from "@/lib/notion/types"

/** Card inner padding — matches About `AboutLatestSection` (Latest at PLUS). */
const cardPaddingLatest = "p-5 sm:p-6"

/** Hand-drawn style doodle blobs (decorative). */
function DoodleBlob({
  className,
  color = "fill-yellow-300",
}: {
  className?: string
  color?: string
}) {
  return (
    <svg
      className={cn("pointer-events-none absolute opacity-90", className)}
      width="56"
      height="56"
      viewBox="0 0 56 56"
      aria-hidden
    >
      <path
        className={color}
        d="M28 4c8 2 14 10 16 18 2 12-4 24-16 28-10 3-20-2-24-12-4-10 0-22 10-28 4-2 9-4 14-6z"
      />
      <circle cx="22" cy="22" r="3" className="fill-white/80" />
      <circle cx="34" cy="24" r="2.5" className="fill-white/80" />
    </svg>
  )
}

/** Hero corner illustrations (IA SVGs). */
export function TutorsHeroDecorImg({
  src,
  className,
}: {
  src: string
  className?: string
}) {
  return (
    <img
      alt=""
      src={src}
      className={cn(
        "pointer-events-none absolute block h-auto w-[min(22vw,4.5rem)] max-w-[88px] opacity-90 select-none sm:w-[min(28vw,8.75rem)] sm:max-w-[160px] md:max-w-[180px]",
        className
      )}
      aria-hidden
    />
  )
}

const TUTORS_HERO_YOUTUBE_VIDEO_ID = "Goh0b8AqVyo"

/**
 * Hero — For Tutors label, headline, subhead, CTAs, YouTube hero video, doodles.
 */
export const TutorsHeroSection = () => {
  const [heroVideoActive, setHeroVideoActive] = useState(false)

  return (
    <section className="relative flex min-h-0 flex-col items-center justify-center gap-6 overflow-x-visible py-8 text-center sm:min-h-[calc(100svh-5.5rem)] sm:gap-8 sm:py-12 md:gap-10 md:py-16 lg:py-20">
      <TutorsHeroDecorImg
        src={forTutorsAssets.heroDecor[0]}
        className="-left-1 top-32 max-sm:top-3 max-sm:left-1 sm:-left-2 sm:top-44 md:left-0 md:top-48"
      />
      <TutorsHeroDecorImg
        src={forTutorsAssets.heroDecor[1]}
        className="right-0 top-10 max-sm:top-3 max-sm:right-1 sm:right-1 sm:top-16 md:right-4 md:top-12"
      />
      <TutorsHeroDecorImg
        src={forTutorsAssets.heroDecor[2]}
        className="-right-1 top-[11.5rem] max-sm:top-[24rem] max-sm:right-1 sm:top-[17.5rem] md:-right-2 md:top-[14rem] md:translate-x-1 lg:-right-3 lg:top-[17rem] lg:translate-x-2"
      />

      <div className="relative z-[1] flex max-w-3xl flex-col items-center gap-3 sm:gap-4 md:gap-5">
        <p className="text-xl font-semibold text-teal-900 max-sm:text-2xl sm:text-2xl md:text-3xl">
          For Tutors
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-teal-950 max-sm:text-4xl sm:text-4xl md:text-5xl">
          Teach What Matters and Earn What You Deserve
        </h1>

      </div>

      <div className="relative z-[1] mx-auto w-full max-w-5xl text-center">
        <p className="text-lg text-teal-900/80 dark:text-white/90">
          Join 500+ tutors supporting 5,000+ students. Earn while you learn and
          lead.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <Button
          className="h-11 rounded-full border-0 bg-[#A6EDF4] px-8 text-base font-normal text-[#004247] shadow-none transition-opacity hover:bg-[#A6EDF4] hover:opacity-95 hover:text-[#004247] dark:bg-[#A6EDF4] dark:text-[#004247] dark:hover:bg-[#A6EDF4]"
        >
          Check Our Demo
        </Button>
        <Button
          variant="outline"
          className="h-11 rounded-full border-2 border-[#A6EDF4] bg-transparent px-8 text-base font-medium text-teal-950 hover:border-[#A6EDF4] hover:bg-[#A6EDF4]/15 dark:text-white dark:hover:bg-[#A6EDF4]/20"
        >
          Become a Tutor
        </Button>
      </div>

      <div className="relative mx-auto mt-2 w-full max-w-5xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-muted ring-1 ring-teal-200/80 dark:ring-teal-800/50">
          {heroVideoActive ? (
            <iframe
              title="PLUS for tutors — video on YouTube"
              className="absolute inset-0 h-full w-full border-0"
              src={`https://www.youtube.com/embed/${TUTORS_HERO_YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <>
              <Image
                src={`https://i.ytimg.com/vi/${TUTORS_HERO_YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 64rem"
                priority
              />
              <div
                className="absolute inset-0 bg-neutral-950/45"
                aria-hidden
              />
              <button
                type="button"
                onClick={() => setHeroVideoActive(true)}
                className="absolute inset-0 flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Play PLUS for tutors video on YouTube"
              >
                <span className="flex size-16 items-center justify-center rounded-full bg-white/95 text-teal-800 shadow-lg ring-4 ring-white/40 transition-transform hover:scale-105">
                  <svg
                    className="ml-1 size-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

const COMPENSATION_COLUMNS = [
  {
    stat: "$18/hr",
    sub: "Starting pay",
    bullets: [
      "Competitive base rate for every session",
      "Paid for prep, tutoring, and reflection",
      "Reliable weekly payouts",
    ],
  },
  {
    stat: "2–10 hrs",
    sub: "Per week",
    bullets: [
      "Flexible scheduling that fits your life",
      "Evening and weekend slots available",
      "Work remotely from anywhere",
    ],
  },
  {
    stat: "$0 cost",
    sub: "For training",
    bullets: [
      "Full curriculum and materials included",
      "No application or onboarding fees",
      "Mentor support throughout onboarding",
    ],
  },
] as const

/**
 * Get Paid for All Your Hours — below `lg`, three matching bordered cards; from
 * `lg` up, single card with light-blue header band + white body, three columns.
 */
export const TutorsCompensationSection = () => {
  return (
    <section
      id={forTutorsSectionIds.compensation}
      className="relative"
    >
      <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
        <div className="text-left">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
            <div className="w-full space-y-3 md:min-w-0 md:flex-1">
              <h2 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
                Get Paid for All Your Hours
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-teal-900/75 dark:text-white/90 sm:mx-0">
                Earn for every hour you spend training, tutoring, and reflecting
                on your work
              </p>
            </div>
            <img
              alt=""
              src={forTutorsAssets.compensationDecor}
              className="pointer-events-none hidden h-auto w-28 max-w-[140px] shrink-0 opacity-90 select-none md:block md:w-32 md:max-w-[165px] lg:w-36 lg:max-w-[180px]"
              aria-hidden
            />
          </div>
        </div>

        {/* Below lg: three matching bordered cards (one per column); unified grid from lg up */}
        <div className="flex flex-col gap-4 lg:hidden">
          {COMPENSATION_COLUMNS.map((col) => (
            <div
              key={col.stat}
              className="overflow-hidden rounded-2xl border-2 border-sky-200 bg-white dark:border-sky-800/50 dark:bg-card"
            >
              <div
                className={cn(
                  cardPaddingLatest,
                  "border-b border-sky-200 bg-sky-100 text-left dark:border-sky-800/50 dark:bg-sky-950/35",
                )}
              >
                <p className="text-2xl font-bold tracking-tight text-sky-900 dark:text-sky-100">
                  {col.stat}
                </p>
                <p className="mt-1 text-xl font-bold leading-snug tracking-tight text-sky-800 dark:text-sky-300">
                  {col.sub}
                </p>
              </div>
              <div className={cn(cardPaddingLatest, "bg-white dark:bg-card")}>
                <ul className="space-y-3 text-left">
                  {col.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 text-lg leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-sky-400 dark:bg-sky-500"
                        aria-hidden
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* lg+: single card, two-row three-column grid */}
        <div className="hidden overflow-hidden rounded-2xl border-2 border-sky-200 bg-white lg:block dark:border-sky-800/50 dark:bg-card">
          <div className="grid border-b border-sky-200 bg-sky-100 dark:border-sky-800/50 dark:bg-sky-950/35 lg:grid-cols-3">
            {COMPENSATION_COLUMNS.map((col) => (
              <div
                key={col.stat}
                className={cn(cardPaddingLatest, "text-left")}
              >
                <p className="text-2xl font-bold tracking-tight text-sky-900 dark:text-sky-100 sm:text-3xl md:text-4xl">
                  {col.stat}
                </p>
                <p className="mt-1 text-xl font-bold leading-snug tracking-tight text-sky-800 dark:text-sky-300 sm:text-2xl">
                  {col.sub}
                </p>
              </div>
            ))}
          </div>
          <div className="grid bg-white dark:bg-card lg:grid-cols-3">
            {COMPENSATION_COLUMNS.map((col) => (
              <div key={`${col.stat}-body`} className={cardPaddingLatest}>
                <ul className="space-y-3 text-left">
                  {col.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 text-lg leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-sky-400 dark:bg-sky-500"
                        aria-hidden
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/*
 * ─── PRESERVED: TutorsExperienceSection bento grid (commented out 2026-04-13) ───
 *
 * Bento grid with hover/click-to-expand cards + swapping photo panel below.
 * Re-enable by restoring this block and adding `useState` back to the import.
 *
 * import { useState } from "react"
 *
 * const EXPERIENCE_CARDS = [
 *   {
 *     title: "Build Bonds",
 *     description: "Begin each session by connecting with students.",
 *   },
 *   {
 *     title: "1:1 Support",
 *     description: "Lead one-on-one sessions for students’ needs.",
 *   },
 *   {
 *     title: "Reflect & Grow",
 *     description: "Submit reflections, join tutor discussions to grow.",
 *   },
 * ] as const
 *
 * export const TutorsExperienceSection = () => {
 *   const [selectedIndex, setSelectedIndex] = useState(0)
 *
 *   // Wide column follows selection — grid animates via Tailwind class swap
 *   // (order stays 1 · 2 · 3, only column widths change).
 *   const experienceLgGridCols =
 *     selectedIndex === 0
 *       ? "lg:grid-cols-[2fr_1fr_1fr]"
 *       : selectedIndex === 1
 *         ? "lg:grid-cols-[1fr_2fr_1fr]"
 *         : "lg:grid-cols-[1fr_1fr_2fr]"
 *
 *   const experiencePhotoSrc =
 *     selectedIndex === 1
 *       ? forTutorsAssets.experienceOneToOneSupportPhoto
 *       : selectedIndex === 2
 *         ? forTutorsAssets.experienceReflectGrowPhoto
 *         : forTutorsAssets.experienceSessionPhoto
 *
 *   const experiencePhotoUsesZoomCrop = selectedIndex === 1 || selectedIndex === 2
 *
 *   const experiencePhotoAlt =
 *     selectedIndex === 1
 *       ? "Student wearing headphones at a laptop during a live online tutoring session with a tutor on video"
 *       : selectedIndex === 2
 *         ? "PLUS Personalized Learning dashboard on the Reflection tab with session reflection and training lessons"
 *         : "Student with headphones on a video call with a PLUS tutor, laptop on a desk"
 *
 *   return (
 *     <section
 *       id={forTutorsSectionIds.experience}
 *       className="relative space-y-6 sm:space-y-8 md:space-y-10"
 *     >
 *       <div className="mx-auto max-w-5xl text-left">
 *         <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
 *           <div className="w-full space-y-3 md:min-w-0 md:flex-1">
 *             <h2 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
 *               What Tutoring at PLUS Looks Like
 *             </h2>
 *             <p className="mx-auto max-w-2xl text-lg text-teal-900/75 dark:text-white/90 sm:mx-0">
 *               Build connections, provide 1:1 student support, and reflect with mentors
 *             </p>
 *           </div>
 *           <img
 *             alt=""
 *             src={forTutorsAssets.certificationDecor}
 *             className="pointer-events-none hidden h-auto w-28 max-w-[140px] shrink-0 opacity-90 select-none md:block md:w-32 md:max-w-[165px] lg:w-36 lg:max-w-[180px]"
 *             aria-hidden
 *           />
 *         </div>
 *       </div>
 *
 *       <ol
 *         className={cn(
 *           "mx-auto grid max-w-5xl list-none items-stretch gap-4 p-0 sm:grid-cols-2 sm:gap-6 lg:gap-8",
 *           experienceLgGridCols
 *         )}
 *       >
 *         {EXPERIENCE_CARDS.map((card, index) => {
 *           const isSelected = selectedIndex === index
 *           return (
 *             <li key={card.title} className="flex min-h-0">
 *               <button
 *                 type="button"
 *                 onClick={() => setSelectedIndex(index)}
 *                 onMouseEnter={() => setSelectedIndex(index)}
 *                 aria-pressed={isSelected}
 *                 className={cn(
 *                   "flex h-full min-h-0 w-full cursor-default flex-col gap-3 rounded-3xl p-5 text-left transition-colors sm:gap-5 sm:p-6",
 *                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
 *                   isSelected
 *                     ? "border-2 border-[#EBC077] bg-[#FFF1C7]"
 *                     : "border-2 border-[#EBC077]/60 bg-white"
 *                 )}
 *               >
 *                 <div
 *                   className={cn(
 *                     "flex size-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white",
 *                     isSelected ? "bg-[#A27707]" : "bg-[#A27707]/85"
 *                   )}
 *                 >
 *                   {index + 1}
 *                 </div>
 *                 <div className="flex min-h-0 flex-1 flex-col gap-2">
 *                   <p className="shrink-0 text-pretty text-xl font-bold leading-snug tracking-tight text-[#9A6D00] sm:text-2xl dark:text-[#9A6D00]">
 *                     {card.title}
 *                   </p>
 *                   <div className="flex min-h-0 flex-1 flex-col">
 *                     {isSelected ? (
 *                       <p className="text-lg leading-relaxed text-muted-foreground">
 *                         {card.description}
 *                       </p>
 *                     ) : (
 *                       <div className="flex-1" aria-hidden />
 *                     )}
 *                   </div>
 *                 </div>
 *               </button>
 *             </li>
 *           )
 *         })}
 *       </ol>
 *
 *       <div className="mx-auto max-w-5xl">
 *         <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl ring-1 ring-teal-200/60 dark:ring-teal-800/50">
 *           <Image
 *             key={experiencePhotoSrc}
 *             src={experiencePhotoSrc}
 *             alt={experiencePhotoAlt}
 *             fill
 *             className={cn(
 *               "object-cover object-center",
 *               experiencePhotoUsesZoomCrop &&
 *                 "origin-center scale-[1.07] sm:scale-[1.06]"
 *             )}
 *             sizes="(max-width: 1024px) 100vw, 64rem"
 *           />
 *         </div>
 *       </div>
 *     </section>
 *   )
 * }
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Numbered step badge — same diameter as Earn Certification star circle (`size-10`). */
const tutoringLooksStepBadge =
  "flex size-10 shrink-0 items-center justify-center self-start rounded-full bg-[#A27707] text-lg font-bold text-white"

/** Body copy — matches Earn Certification panel paragraphs. */
const tutoringLooksDescription = "text-lg leading-relaxed text-muted-foreground"

/** Bottom row card titles — matches Earn Certification in-panel `h3` scale. */
const tutoringLooksCardTitleMd =
  "text-balance text-xl font-bold leading-snug tracking-tight text-[#9A6D00] dark:text-[#9A6D00] sm:text-2xl"

/** Full-width top card title — one step larger for hierarchy (Figma reference). */
const tutoringLooksCardTitleLg =
  "text-balance text-2xl font-bold leading-snug tracking-tight text-[#9A6D00] sm:text-3xl dark:text-[#9A6D00]"

/**
 * Cream card shell — minimal bottom padding so the container hugs the image edge.
 * Header row keeps horizontal padding on the right for copy.
 */
const tutoringLooksCardShell =
  "flex w-full min-w-0 flex-col gap-4 overflow-hidden rounded-3xl bg-[#FFF1C7] pt-5 pl-5 pb-0 pr-0 dark:bg-amber-950/20 sm:gap-4 sm:pt-6 sm:pl-6"

/** `size-10` step badge + `gap-4` — aligns image block with title column. */
const tutoringLooksImageInset = "pl-14"

const TUTORING_LOOKS_CARDS = [
  {
    step: 1,
    title: "Build Connections",
    description: "Begin each session by connecting with students.",
    imageSrc: forTutorsAssets.experienceSessionPhoto,
    imageAlt:
      "Student with headphones on a video call with a PLUS tutor, laptop on a desk",
    titleClassName: tutoringLooksCardTitleLg,
    imageAspect: "aspect-[5/2] w-full",
    sizes: "(max-width: 1024px) 100vw, 64rem",
  },
  {
    step: 2,
    title: "Personalized Support",
    description: "Lead one-on-one sessions with students.",
    imageSrc: forTutorsAssets.experienceOneToOneSupportPhoto,
    imageAlt:
      "Student wearing headphones at a laptop during a live online tutoring session with a tutor on video",
    titleClassName: tutoringLooksCardTitleMd,
    imageAspect: "aspect-[2/1] w-full",
    sizes: "(max-width: 640px) 100vw, 50vw",
  },
  {
    step: 3,
    title: "Reflect & Grow",
    description: "Submit reflections, join discussions, grow.",
    imageSrc: forTutorsAssets.experienceReflectGrowPhoto,
    imageAlt:
      "PLUS Personalized Learning dashboard on the Reflection tab with session reflection and training lessons",
    titleClassName: tutoringLooksCardTitleMd,
    imageAspect: "aspect-[2/1] w-full",
    sizes: "(max-width: 640px) 100vw, 50vw",
  },
] as const

function TutoringLooksCard({
  step,
  title,
  description,
  imageSrc,
  imageAlt,
  titleClassName,
  imageAspect,
  sizes,
}: (typeof TUTORING_LOOKS_CARDS)[number]) {
  return (
    <article className={tutoringLooksCardShell}>
      <div className="flex gap-4 pr-5 sm:pr-6">
        <span className={tutoringLooksStepBadge} aria-hidden>
          {step}
        </span>
        <div className="min-w-0 flex-1 space-y-2">
          <h3 className={titleClassName}>{title}</h3>
          <p className={tutoringLooksDescription}>{description}</p>
        </div>
      </div>
      <div
        className={cn(
          "w-full min-w-0 max-w-full overflow-hidden",
          tutoringLooksImageInset,
        )}
      >
        <div
          className={cn(
            "relative isolate w-full max-w-full translate-z-0 overflow-hidden rounded-tl-2xl rounded-br-2xl bg-[#FFF1C7] ring-1 ring-inset ring-[#A27707]/15 dark:bg-amber-950/30",
            imageAspect,
            /* Next/Image `fill` — pin wrapper + img so cover always fills frame height */
            "[&>span]:absolute [&>span]:inset-0 [&>span]:m-0 [&>span]:block [&>span]:size-full [&>span]:max-w-none",
            "[&_img]:!h-full [&_img]:!w-full [&_img]:max-h-none [&_img]:object-cover [&_img]:object-center",
          )}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes={sizes}
            className="object-cover object-center"
          />
        </div>
      </div>
    </article>
  )
}

/**
 * What Tutoring at PLUS Looks Like — full-width step1, then two columns for steps 2–3.
 * Number badges, copy scale, and panel padding track `TutorsCertificationSection`.
 */
export const TutorsExperienceSection = () => {
  const [primary, ...secondary] = TUTORING_LOOKS_CARDS

  return (
    <section
      id={forTutorsSectionIds.experience}
      className="relative space-y-6 sm:space-y-8 md:space-y-10"
    >
      <div className="mx-auto max-w-5xl text-left">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
          <div className="w-full space-y-3 md:min-w-0 md:flex-1">
            <h2 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
              What Tutoring at PLUS Looks Like
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-teal-900/75 dark:text-white/90 sm:mx-0">
              Build connections, provide 1:1 student support, and reflect with
              mentors
            </p>
          </div>
          <img
            alt=""
            src={forTutorsAssets.certificationDecor}
            className="pointer-events-none hidden h-auto w-28 max-w-[140px] shrink-0 opacity-90 select-none md:block md:w-32 md:max-w-[165px] lg:w-36 lg:max-w-[180px]"
            aria-hidden
          />
        </div>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:gap-6 lg:gap-8">
        <TutoringLooksCard {...primary} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-start sm:gap-6 lg:gap-8">
          {secondary.map((card) => (
            <TutoringLooksCard key={card.step} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Certification — section header (title, intro, decor) + pale yellow panel (#FFF1C7),
 * star + in-panel title, copy, CTA, badge card image.
 */
export const TutorsCertificationSection = () => {
  return (
    <section
      id={forTutorsSectionIds.certification}
      className="relative"
    >
      <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
        <div className="text-left">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
            <div className="w-full space-y-3 md:min-w-0 md:flex-1">
              <h2 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
                Earn Certification &amp; Digital Badges
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-teal-900/75 dark:text-white/90 sm:mx-0">
                Build credentials that showcase your expertise and professional
                growth
              </p>
            </div>
            <img
              alt=""
              src={forTutorsAssets.experienceDecor}
              className="pointer-events-none hidden h-auto w-28 max-w-[140px] shrink-0 opacity-90 select-none md:block md:w-32 md:max-w-[165px] lg:w-36 lg:max-w-[180px]"
              aria-hidden
            />
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col gap-5 rounded-3xl bg-[#E8F6EA] dark:bg-[#E8F6EA]/12 sm:gap-8 md:flex-row md:items-stretch md:gap-10",
            cardPaddingLatest,
          )}
        >
          <div className="flex flex-[3] gap-4">
            <span
              className="flex size-10 shrink-0 items-center justify-center self-start rounded-full bg-[#297E43] text-white"
              aria-hidden
            >
              <Star className="size-5" strokeWidth={2.25} />
            </span>
            <div className="flex flex-1 flex-col justify-between gap-4">
              <div className="space-y-4">
                <h3 className="min-w-0 text-balance text-xl font-bold leading-snug tracking-tight text-[#297E43] dark:text-green-200 sm:text-2xl">
                  Tutor Certification &amp; Digital Badges
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Complete all training to get sharable badges for resumes and social
                  media.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Note: Available to institutions only. Contact us to activate.
                </p>
              </div>
              <Button className="h-11 w-fit rounded-full bg-[#4CAB65] px-8 text-base font-medium text-white hover:bg-[#3d9655]">
                Register now
              </Button>
            </div>
          </div>
          <div className="flex min-w-0 flex-[2] items-center justify-end max-sm:justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={forTutorsAssets.certificationBadgeCard}
              alt="Claimed badge: Certified Tutor with PLUS branding"
              className="h-auto w-auto max-w-[min(99vw,clamp(13.5rem,calc(4rem+34vw),22rem))] object-contain object-right max-sm:mx-auto max-sm:object-center xl:max-w-none xl:w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/** Fills toolkit card mockup slot: flush right/bottom of pink card, inset left via parent. */
function ToolkitCardMockup({
  src,
  alt,
  variant,
}: {
  src: string
  alt: string
  variant: "dashboard" | "compact"
}) {
  return (
    <div
      className={cn(
        "relative min-h-0 flex-1 overflow-hidden ring-1 ring-inset",
        variant === "dashboard"
          ? "rounded-tl-xl ring-teal-100"
          : "rounded-tl-lg ring-border/60"
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-left"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
      />
    </div>
  )
}

/** Title row with magenta circle + white Lucide icon (toolkit cards). */
function ToolkitCardHeading({
  icon: Icon,
  children,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  children: ReactNode
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-fuchsia-900 text-white dark:bg-fuchsia-200 dark:text-fuchsia-950"
        aria-hidden
      >
        <Icon className="size-5" strokeWidth={2.25} />
      </span>
      <p className="min-w-0 text-pretty text-xl font-bold leading-snug tracking-tight text-fuchsia-900 dark:text-fuchsia-200 sm:text-2xl">
        {children}
      </p>
    </div>
  )
}

/**
 * Your Tutor Toolkit — large dashboard + two stacked mockups.
 */
export const TutorsToolkitSection = () => {
  return (
    <section
      id={forTutorsSectionIds.toolkit}
      className="relative"
    >
      <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
        <div className="text-left">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
            <div className="w-full space-y-3 md:min-w-0 md:flex-1">
              <h2 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
                Your Tutor Toolkit
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-teal-900/75 dark:text-white/90 sm:mx-0">
                Access training, AI-powered feedback, and resources to support
                your tutoring
              </p>
            </div>
            <img
              alt=""
              src={forTutorsAssets.toolkitDecor}
              className="pointer-events-none hidden h-auto w-28 max-w-[140px] shrink-0 opacity-90 select-none md:block md:w-32 md:max-w-[165px] lg:w-36 lg:max-w-[180px]"
              aria-hidden
            />
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4 md:gap-6 md:grid-cols-2 md:grid-rows-2 lg:gap-8">
          <div className="flex min-h-[280px] w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-fuchsia-200/60 bg-[#FFE8F6] sm:min-h-[340px] md:row-span-2 md:min-h-[400px] lg:min-h-[520px]">
            <div className={cardPaddingLatest}>
              <ToolkitCardHeading icon={Sparkles}>
                Dashboard Tracking Insights
              </ToolkitCardHeading>
            </div>
            <div className="flex min-h-0 flex-1 flex-col pl-5 pr-0 pb-0 sm:pl-6">
              <ToolkitCardMockup
                variant="dashboard"
                src={forTutorsAssets.toolkitDashboardInsights}
                alt="PLUS dashboard with charts, insights, and connected learner avatars"
              />
            </div>
          </div>
          <div className="flex min-h-[200px] min-w-0 flex-col overflow-hidden rounded-2xl border border-fuchsia-200/60 bg-[#FFE8F6] sm:min-h-[220px] md:min-h-[260px]">
            <div className={cardPaddingLatest}>
              <ToolkitCardHeading icon={LayoutDashboard}>
                Student Progress At-A-Glance
              </ToolkitCardHeading>
            </div>
            <div className="flex min-h-0 flex-1 flex-col pl-5 pr-0 pb-0 sm:pl-6">
              <ToolkitCardMockup
                variant="compact"
                src={forTutorsAssets.toolkitStudentProgress}
                alt="Students overview metrics and My Students list in PLUS"
              />
            </div>
          </div>
          <div className="flex min-h-[200px] min-w-0 flex-col overflow-hidden rounded-2xl border border-fuchsia-200/60 bg-[#FFE8F6] sm:min-h-[220px] md:min-h-[260px]">
            <div className={cardPaddingLatest}>
              <ToolkitCardHeading icon={Brain}>
                Session Tracking
              </ToolkitCardHeading>
            </div>
            <div className="flex min-h-0 flex-1 flex-col pl-5 pr-0 pb-0 sm:pl-6">
              <ToolkitCardMockup
                variant="compact"
                src={forTutorsAssets.toolkitSessionTracking}
                alt="PLUS training modules and session overview cards"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Read story row — same interaction pattern as About Success Stories (`cursor-pointer`, arrow nudge). */
const tutorVoiceReadStoryClass =
  "group mt-4 ml-auto inline-flex cursor-pointer items-center gap-2 text-lg font-medium text-[#A55D5D] no-underline transition-opacity hover:opacity-90 dark:text-[#c97a7a]"

const TUTOR_TESTIMONIAL_VOICES = [
  {
    name: "PLUS Tutor A",
    quoteLead:
      "The students' reactions speak for themselves. They look forward to the tutoring sessions. It's not just about math. ",
    quoteHighlight: "It's about relationships and about building confidence.",
    quoteTail: "",
  },
  {
    name: "PLUS Tutor B",
    quoteLead:
      "Tutoring has affected me and it made me realize if I didn't get the help I needed I would still be struggling. But it made me see ",
    quoteHighlight: "math differently in a good way",
    quoteTail: ".",
  },
  {
    name: "PLUS Tutor C",
    quoteLead:
      "My students were able to understand concepts more easily than before due to the ",
    quoteHighlight: "one-to-one help",
    quoteTail: ". My students' math confidence has also increased!",
  },
] as const

/** Tutor voice card — shell + white quote panel padding matches About `AboutSuccessStoriesSection`. */
function TutorVoiceCard({
  name,
  quoteLead,
  quoteHighlight,
  quoteTail,
  avatarUrl,
}: {
  name: string
  quoteLead: string
  quoteHighlight: string
  quoteTail: string
  avatarUrl: string
}) {
  return (
    <article className="flex h-full flex-col rounded-3xl bg-[#FDECEC] p-4 dark:bg-[#3d2528]/40 sm:p-5">
      <div className="flex shrink-0 items-center gap-4">
        <Avatar className="size-10 shrink-0 border border-[#A55D5D]/25 bg-white">
          <AvatarImage src={avatarUrl} alt="" aria-hidden />
          <AvatarFallback className="bg-white text-xs font-semibold text-[#A55D5D]">
            {name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p className="text-pretty text-xl font-bold leading-snug tracking-tight text-[#A55D5D] dark:text-[#e8a0a0] sm:text-2xl">
          {name}
        </p>
      </div>
      <div className="mt-4 flex min-h-0 flex-1 flex-col rounded-3xl bg-white p-6 dark:bg-card dark:ring-1 dark:ring-white/10 sm:p-7">
        <blockquote className="text-pretty text-left text-base italic leading-relaxed text-[#4A4A4A] dark:text-neutral-200">
          &ldquo;{quoteLead}
          <strong className="font-bold italic text-[#A55D5D] dark:text-[#c97a7a]">
            {quoteHighlight}
          </strong>
          {quoteTail}&rdquo;
        </blockquote>
      </div>
      <Link
        href="/success-stories"
        className={tutorVoiceReadStoryClass}
        aria-label={`Read story: ${name}`}
      >
        <span>Read story</span>
        <ArrowRight
          className="size-6 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>
    </article>
  )
}

/**
 * Voices from Our Tutors — For Schools Success Stories layout (Bundui grid), tutor copy + heading.
 * Accepts Notion-fetched tutor success stories; falls back to placeholder data when none are available.
 */
export const TutorsTestimonialsSection = ({ stories = [] }: { stories?: SuccessStory[] }) => {
  const hasNotionData = stories.length > 0

  return (
    <section className="relative" id="tutor-testimonials">
      <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
        <div className="text-left">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
            <div className="w-full space-y-3 md:min-w-0 md:flex-1">
              <h2 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
                Voices from Our Tutors
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-teal-900/75 dark:text-white/90 sm:mx-0">
                Learn from real tutor stories, experiences, and tips to improve
                your practice
              </p>
            </div>
            <img
              alt=""
              src={forTutorsAssets.voicesDecor}
              className="pointer-events-none hidden h-auto w-28 max-w-[140px] shrink-0 opacity-90 select-none md:block md:w-32 md:max-w-[165px] lg:w-36 lg:max-w-[180px]"
              aria-hidden
            />
          </div>
        </div>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3 md:items-stretch lg:gap-8">
          {hasNotionData
            ? stories.map((story, index) => (
                <TutorVoiceCard
                  key={story.id}
                  name={story.quoteAttribution ?? story.title}
                  quoteLead={story.quote ?? ""}
                  quoteHighlight=""
                  quoteTail=""
                  avatarUrl={story.coverImage ?? forSchoolsAssets.avatars[index % forSchoolsAssets.avatars.length]!}
                />
              ))
            : TUTOR_TESTIMONIAL_VOICES.map((story, index) => (
                <TutorVoiceCard
                  key={story.name}
                  name={story.name}
                  quoteLead={story.quoteLead}
                  quoteHighlight={story.quoteHighlight}
                  quoteTail={story.quoteTail}
                  avatarUrl={forSchoolsAssets.avatars[index]!}
                />
              ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Final CTA — Check Our Demo / Become a Tutor.
 */
export const TutorsImpactCTA = () => {
  return (
    <section id={forTutorsSectionIds.impact}>
      <div
        className={cn(
          "mx-auto max-w-5xl space-y-6 rounded-3xl bg-white text-center dark:bg-transparent",
          cardPaddingLatest,
        )}
      >
        <h2 className="text-3xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-4xl">
          Ready to Make an Impact?
        </h2>
        <p className="w-full max-w-none text-lg text-teal-900/75 dark:text-white/90">
          Join a community of tutors committed to growth, equity, and meaningful
          math mentorship.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            className="h-11 rounded-full border-0 bg-[#A6EDF4] px-8 text-base font-normal text-[#004247] shadow-none transition-opacity hover:bg-[#A6EDF4] hover:opacity-95 hover:text-[#004247] dark:bg-[#A6EDF4] dark:text-[#004247] dark:hover:bg-[#A6EDF4]"
          >
            Check Our Demo
          </Button>
          <Button
            variant="outline"
            className="h-11 rounded-full border-2 border-[#A6EDF4] bg-transparent px-8 text-base font-medium text-teal-950 hover:border-[#A6EDF4] hover:bg-[#A6EDF4]/15 dark:text-white dark:hover:bg-[#A6EDF4]/20"
          >
            Become a Tutor
          </Button>
        </div>
      </div>
    </section>
  )
}
