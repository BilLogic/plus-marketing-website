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
import {
  marketingCardContentInsetFromStepRowClass,
  marketingCardIconCircleClass,
  marketingCardLucideGlyphClass,
  marketingCardPaddingClass,
  marketingCardStackGapClass,
  marketingCardStepDigitClass,
  marketingFinalCtaButtonRowClass,
  marketingHeroCtaButtonRowClass,
  marketingFinalCtaLeadClass,
  marketingFinalCtaOutlineLinkClass,
  marketingFinalCtaPrimaryLinkClass,
  marketingHeroCtaOutlineLinkClass,
  marketingHeroCtaPrimaryLinkClass,
  marketingFinalCtaShellClass,
  marketingFinalCtaTitleClass,
  marketingSectionContentShellClass,
  marketingSectionHeaderDecorAbsoluteClass,
  marketingSectionHeaderDecorImgClass,
  marketingSectionIntroColumnClass,
  marketingSectionLeadColorClass,
  marketingSectionVoicesHeaderDecorImgClass,
} from "@/lib/marketing-section-layout"
import { marketingTypography } from "@/lib/marketing-typography"
import { cn } from "@/lib/utils"
import { forTutorsAssets } from "@/components/marketing/for-tutors-assets"
import { forTutorsSectionIds } from "@/lib/plus-footer-ia"
import type { SuccessStory } from "@/lib/notion/types"

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
 * Hero — For tutors label, headline, subhead, CTAs, YouTube hero video, doodles.
 */
export const TutorsHeroSection = () => {
  const [heroVideoActive, setHeroVideoActive] = useState(false)

  return (
    <section className="relative mx-auto w-full max-w-7xl min-w-0 overflow-hidden flex flex-col items-center gap-6 text-center min-h-[380px] sm:gap-8 sm:min-h-[440px] sm:pt-10 sm:pb-10 md:min-h-[500px] md:pt-12 md:pb-12 lg:min-h-[530px] lg:pt-14 lg:pb-14 pt-8 pb-8">
      {/** Same decor size + `lg` visibility as `AboutHeroSection` (uses `heroDecor[0]` / `[2]` only). */}
      <TutorsHeroDecorImg
        src={forSchoolsAssets.heroDecor[0]}
        className="hidden lg:block lg:max-w-[110px] xl:max-w-[150px] left-[10%] top-[18%] min-[1800px]:left-[4%]"
      />
      <TutorsHeroDecorImg
        src={forSchoolsAssets.heroDecor[2]}
        className="hidden lg:block lg:max-w-[110px] xl:max-w-[150px] right-[10%] top-[18%] min-[1800px]:right-[4%]"
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 text-center sm:gap-8 sm:px-6 min-[1800px]:max-w-5xl">
        <h1 className="flex flex-col items-center gap-3 sm:gap-4">
          <span className="text-2xl font-semibold text-teal-900 sm:text-3xl">
            For tutors
          </span>
          <span className={cn(marketingTypography.heroH1, "max-w-prose")}>
            Teach What Matters and Earn What You Deserve
          </span>
        </h1>
        <p
          className={cn(
            "text-base lg:text-lg",
            marketingSectionLeadColorClass,
          )}
        >
          Join 500+ tutors supporting 5,000+ students. Earn while you learn and
          lead.
        </p>
        <div className={marketingHeroCtaButtonRowClass}>
          <a
            href="https://app.tutors.plus/demo"
            target="_blank"
            rel="noopener noreferrer"
            className={marketingHeroCtaPrimaryLinkClass}
          >
            Check Our Demo
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfnLoEbL_irrlGeoW6toMctQ8rstewQ1-PB4h7XwUKZAeXmVg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className={marketingHeroCtaOutlineLinkClass}
          >
            Become a Tutor
          </a>
        </div>
      </div>

      <div className="relative mx-auto mt-2 w-full max-w-[1000px] min-[1800px]:max-w-[1280px]">
        <div className="relative aspect-video w-full overflow-hidden rounded-[30px] bg-muted ring-1 ring-teal-200/80 dark:ring-teal-800/50">
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
              <button
                type="button"
                onClick={() => setHeroVideoActive(true)}
                className="group absolute inset-0 size-full cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Play PLUS for tutors video on YouTube"
              >
                <div
                  className="absolute inset-0 bg-[rgba(54,54,54,0.5)] transition-opacity group-hover:bg-[rgba(54,54,54,0.38)]"
                  aria-hidden
                />
                <svg
                  className="absolute left-1/2 top-1/2 size-[75px] -translate-x-1/2 -translate-y-1/2 drop-shadow-md transition-transform group-hover:scale-110"
                  viewBox="0 0 75 75"
                  fill="none"
                  aria-hidden
                >
                  <circle cx="37.5" cy="37.5" r="37.5" fill="#a6edf4" fillOpacity="0.82" />
                  <path d="M30 22.5L54 37.5L30 52.5V22.5Z" fill="#004247" />
                </svg>
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
    stat: "$18+",
    sub: "Starting pay",
    bullets: [
      "Competitive base rate for every session",
      "Paid for prep, tutoring, and reflection",
      "Reliable bi-weekly payouts",
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
      <div className={marketingSectionContentShellClass}>
        <div className="text-left">
          <div className="relative">
            <div className={marketingSectionIntroColumnClass}>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
                Get Paid for All Your Hours
              </h2>
              <p
                className={cn(
                  "mx-auto max-w-2xl text-base sm:mx-0 lg:text-lg",
                  marketingSectionLeadColorClass,
                )}
              >
                Earn for every hour you spend training, tutoring, and reflecting on
                your work.
              </p>
            </div>
            <img
              alt=""
              src={forTutorsAssets.compensationDecor}
              className={cn(
                marketingSectionHeaderDecorImgClass,
                marketingSectionHeaderDecorAbsoluteClass
              )}
              aria-hidden
            />
          </div>
        </div>

        {/* Below lg: three matching bordered cards (one per column); unified grid from lg up */}
        <div className="flex flex-col gap-4 lg:hidden">
          {COMPENSATION_COLUMNS.map((col) => (
            <div
              key={col.stat}
              className="overflow-hidden rounded-[30px] border-2 border-sky-200 bg-white dark:border-sky-800/50 dark:bg-card"
            >
              <div
                className={cn(
                  marketingCardPaddingClass,
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
              <div className={cn(marketingCardPaddingClass, "bg-white dark:bg-card")}>
                <ul className="space-y-3 text-left">
                  {col.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 text-base leading-relaxed text-muted-foreground lg:text-lg"
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
        <div className="hidden overflow-hidden rounded-[30px] border-2 border-sky-200 bg-white lg:block dark:border-sky-800/50 dark:bg-card">
          <div className="grid border-b border-sky-200 bg-sky-100 dark:border-sky-800/50 dark:bg-sky-950/35 lg:grid-cols-3">
            {COMPENSATION_COLUMNS.map((col) => (
              <div
                key={col.stat}
                className={cn(marketingCardPaddingClass, "text-left")}
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
              <div key={`${col.stat}-body`} className={marketingCardPaddingClass}>
                <ul className="space-y-3 text-left">
                  {col.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 text-base leading-relaxed text-muted-foreground lg:text-lg"
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
 *             <h2 className="text-balance text-xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-2xl md:text-4xl">
 *               What Tutoring at PLUS Looks Like
 *             </h2>
 *             <p className="mx-auto max-w-2xl text-sm text-teal-900/75 sm:mx-0 sm:text-base lg:text-lg dark:text-white/90">
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
 *                     marketingCardIconCircleClass,
 *                     marketingCardStepDigitClass,
 *                     "text-white",
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

/** Numbered step badge — matches Day-to-Day Experience step circles (shared `marketingCardIcon*` tokens). */
const tutoringLooksStepBadge = cn(
  marketingCardIconCircleClass,
  "bg-[#A27707] text-white",
  marketingCardStepDigitClass,
)

/** Body copy — matches Earn Certification panel paragraphs. */
const tutoringLooksDescription = "text-base leading-relaxed text-muted-foreground lg:text-lg"

/** Bottom row card titles — matches Earn Certification in-panel `h3` scale. */
const tutoringLooksCardTitleMd =
  "text-balance text-lg font-bold leading-snug tracking-tight text-[#9A6D00] dark:text-[#9A6D00] sm:text-xl lg:text-2xl"

/** Full-width top card title — one step larger for hierarchy (Figma reference). */
const tutoringLooksCardTitleLg =
  "text-balance text-lg font-bold leading-snug tracking-tight text-[#9A6D00] sm:text-xl lg:text-3xl dark:text-[#9A6D00]"

/**
 * Cream card shell — minimal bottom padding so the container hugs the image edge.
 * Header row keeps horizontal padding on the right for copy.
 */
const tutoringLooksCardShell =
  "flex w-full min-w-0 flex-col gap-4 overflow-hidden rounded-[30px] bg-[#FFF1C7] pt-5 pl-5 pb-0 pr-0 dark:bg-amber-950/20 sm:gap-4 sm:pt-6 sm:pl-6"

/** Step badge + `gap-3` — aligns image block with title column. */
const tutoringLooksImageInset = marketingCardContentInsetFromStepRowClass

const TUTORING_LOOKS_CARDS = [
  {
    step: 1,
    title: "Build Connections",
    description: "Begin each session by connecting with students.",
    imageSrc: "/figma/for-tutors/tutoring-build-connections.jpg",
    imageAlt:
      "Student with headphones on a video call with a PLUS tutor, laptop on a desk",
    titleClassName: tutoringLooksCardTitleMd,
    imageAspect: "aspect-[5/2.5] w-full",
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
      <div className="flex flex-col gap-2 pr-5 sm:pr-6">
        <div className="flex items-center gap-3">
          <span className={tutoringLooksStepBadge} aria-hidden>
            {step}
          </span>
          <h3 className={titleClassName}>{title}</h3>
        </div>
        <p className={cn(tutoringLooksDescription, tutoringLooksImageInset)}>{description}</p>
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
    <section id={forTutorsSectionIds.experience} className="relative">
      <div className={marketingSectionContentShellClass}>
        <div className="text-left">
          <div className="relative">
            <div className={marketingSectionIntroColumnClass}>
              <h2 className="text-balance text-xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-2xl md:text-4xl">
                What Tutoring at PLUS Looks Like
              </h2>
              <p
                className={cn(
                  "mx-auto max-w-2xl text-sm sm:mx-0 sm:text-base lg:text-lg",
                  marketingSectionLeadColorClass,
                )}
              >
                Build connections, provide 1:1 student support, and reflect with
                mentors.
              </p>
            </div>
            <img
              alt=""
              src={forTutorsAssets.certificationDecor}
              className={cn(
                marketingSectionHeaderDecorImgClass,
                marketingSectionHeaderDecorAbsoluteClass
              )}
              aria-hidden
            />
          </div>
        </div>

        <div className={cn("flex flex-col", marketingCardStackGapClass)}>
          <TutoringLooksCard {...primary} />
          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 sm:items-start",
              marketingCardStackGapClass,
            )}
          >
            {secondary.map((card) => (
              <TutoringLooksCard key={card.step} {...card} />
            ))}
          </div>
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
      <div className={marketingSectionContentShellClass}>
        <div className="text-left">
          <div className="relative">
            <div className={marketingSectionIntroColumnClass}>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
                Earn Certification &amp; Digital Badges
              </h2>
              <p
                className={cn(
                  "mx-auto max-w-2xl text-base sm:mx-0 lg:text-lg",
                  marketingSectionLeadColorClass,
                )}
              >
                Build credentials that showcase your expertise and professional
                growth.
              </p>
            </div>
            <img
              alt=""
              src={forTutorsAssets.experienceDecor}
              className={cn(
                marketingSectionHeaderDecorImgClass,
                marketingSectionHeaderDecorAbsoluteClass
              )}
              aria-hidden
            />
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col gap-5 rounded-[30px] bg-[#E8F6EA] dark:bg-[#E8F6EA]/12 sm:gap-8 md:flex-row md:items-stretch md:gap-10",
            marketingCardPaddingClass,
          )}
        >
          <div className="flex flex-[3] flex-col gap-4">
            <div className="flex items-center gap-3">
              <span
                className={cn(marketingCardIconCircleClass, "bg-[#297E43] text-white")}
                aria-hidden
              >
                <Star className={cn(marketingCardLucideGlyphClass)} strokeWidth={2.25} />
              </span>
              <h3 className="min-w-0 text-balance text-lg font-bold leading-snug tracking-tight text-[#297E43] dark:text-green-200 sm:text-xl lg:text-2xl">
                Tutor Certification &amp; Digital Badges
              </h3>
            </div>
            <div
              className={cn(
                "flex flex-1 flex-col justify-between gap-4",
                marketingCardContentInsetFromStepRowClass,
              )}
            >
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                  Complete all training to get sharable badges for resumes and social
                  media.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                  Note: Available to institutions only. Contact us to activate.
                </p>
              </div>
              <Button className="h-9 sm:h-11 w-fit cursor-pointer rounded-full bg-[#4CAB65] px-8 text-sm sm:text-base font-medium text-white hover:bg-[#3d9655]">
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
        className={cn(
          marketingCardIconCircleClass,
          "bg-fuchsia-900 text-white dark:bg-fuchsia-200 dark:text-fuchsia-950",
        )}
        aria-hidden
      >
        <Icon className={cn(marketingCardLucideGlyphClass)} strokeWidth={2.25} />
      </span>
      <p className="min-w-0 text-pretty text-lg font-bold leading-snug tracking-tight text-fuchsia-900 dark:text-fuchsia-200 sm:text-xl lg:text-2xl">
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
      <div className={marketingSectionContentShellClass}>
        <div className="text-left">
          <div className="relative">
            <div className={marketingSectionIntroColumnClass}>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
                Your Tutor Toolkit
              </h2>
              <p
                className={cn(
                  "mx-auto max-w-2xl text-base sm:mx-0 lg:text-lg",
                  marketingSectionLeadColorClass,
                )}
              >
                Access training, AI-powered feedback, and resources to support your
                tutoring.
              </p>
            </div>
            <img
              alt=""
              src={forTutorsAssets.toolkitDecor}
              className={cn(
                marketingSectionHeaderDecorImgClass,
                marketingSectionHeaderDecorAbsoluteClass
              )}
              aria-hidden
            />
          </div>
        </div>

        <div className={cn("grid md:grid-cols-2 md:grid-rows-2", marketingCardStackGapClass)}>
          <div className="flex min-h-[280px] w-full min-w-0 flex-col overflow-hidden rounded-[30px] border border-fuchsia-200/60 bg-[#FFE8F6] sm:min-h-[340px] md:row-span-2 md:min-h-[400px] lg:min-h-[520px]">
            <div className={marketingCardPaddingClass}>
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
          <div className="flex min-h-[200px] min-w-0 flex-col overflow-hidden rounded-[30px] border border-fuchsia-200/60 bg-[#FFE8F6] sm:min-h-[220px] md:min-h-[260px]">
            <div className={marketingCardPaddingClass}>
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
          <div className="flex min-h-[200px] min-w-0 flex-col overflow-hidden rounded-[30px] border border-fuchsia-200/60 bg-[#FFE8F6] sm:min-h-[220px] md:min-h-[260px]">
            <div className={marketingCardPaddingClass}>
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

/** Avatar + name — same 64px disc + `gap-3` row as homepage `PlusVoicesSection` testimonials. */
const tutorVoicesAvatarRowClass = "flex w-full shrink-0 items-center gap-3"

/** Tutor voice card — tinted shell and inner white both use `marketingCardPaddingClass` (matches About success stories). */
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
    <article
      className={cn(
        "flex h-full flex-col rounded-[30px] bg-[#FDECEC] dark:bg-[#3d2528]/40",
        marketingCardPaddingClass,
      )}
    >
      <div className={tutorVoicesAvatarRowClass}>
        <Avatar
          className={cn(
            "size-16 shrink-0 rounded-full border border-[#A55D5D]/25 bg-white",
          )}
        >
          <AvatarImage src={avatarUrl} alt="" aria-hidden />
          <AvatarFallback className="bg-white text-xs font-semibold text-[#A55D5D]">
            {name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p className="min-w-0 flex-1 text-pretty text-lg font-bold leading-snug tracking-tight text-[#A55D5D] dark:text-[#e8a0a0] sm:text-xl lg:text-2xl">
          {name}
        </p>
      </div>
      <div
        className={cn(
          "mt-4 flex min-h-0 flex-1 flex-col rounded-3xl bg-white dark:bg-card dark:ring-1 dark:ring-white/10",
          marketingCardPaddingClass,
        )}
      >
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
 * Voices from Our Tutors — Notion-backed **Tutors** category only (`fetchTutorTestimonials`).
 * Returns `null` when there are no stories so the layout ends at the preceding section + footer with no spacer.
 */
export const TutorsTestimonialsSection = ({ stories = [] }: { stories?: SuccessStory[] }) => {
  if (stories.length === 0) return null

  return (
    <section className="relative" id="tutor-testimonials">
      <div className={marketingSectionContentShellClass}>
        <div className="text-left">
          <div className="relative">
            <div className={marketingSectionIntroColumnClass}>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
                Voices from Our Tutors
              </h2>
              <p
                className={cn(
                  "mx-auto max-w-2xl text-base sm:mx-0 lg:text-lg",
                  marketingSectionLeadColorClass,
                )}
              >
                Learn from real tutor stories, experiences, and tips to improve your
                practice.
              </p>
            </div>
            <img
              alt=""
              src={forTutorsAssets.voicesDecor}
              className={cn(
                marketingSectionVoicesHeaderDecorImgClass,
                marketingSectionHeaderDecorAbsoluteClass
              )}
              aria-hidden
            />
          </div>
        </div>
        <div className={cn("grid md:grid-cols-3 md:items-stretch", marketingCardStackGapClass)}>
          {stories.map((story, index) => (
              <TutorVoiceCard
                key={story.id}
                name={story.quoteAttribution ?? story.title}
                quoteLead={story.quote ?? ""}
                quoteHighlight=""
                quoteTail=""
                avatarUrl={story.coverImage ?? forSchoolsAssets.avatars[index % forSchoolsAssets.avatars.length]!}
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
      <div className={marketingFinalCtaShellClass}>
        <h2 className={marketingFinalCtaTitleClass}>Ready to Make an Impact?</h2>
        <p className={marketingFinalCtaLeadClass}>
          Join a community of tutors committed to growth, equity, and meaningful
          math mentorship.
        </p>
        <div className={marketingFinalCtaButtonRowClass}>
          <a
            href="https://app.tutors.plus/demo"
            target="_blank"
            rel="noopener noreferrer"
            className={marketingFinalCtaPrimaryLinkClass}
          >
            Check Our Demo
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfnLoEbL_irrlGeoW6toMctQ8rstewQ1-PB4h7XwUKZAeXmVg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className={marketingFinalCtaOutlineLinkClass}
          >
            Become a Tutor
          </a>
        </div>
      </div>
    </section>
  )
}
