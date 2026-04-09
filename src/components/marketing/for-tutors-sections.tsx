"use client"

import { useState, type ComponentType, type ReactNode, type SVGProps } from "react"
import Image from "next/image"
import { Brain, LayoutDashboard, Sparkles, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { forSchoolsAssets } from "@/components/marketing/for-schools-assets"
import { cn } from "@/lib/utils"
import { forTutorsAssets } from "@/components/marketing/for-tutors-assets"
import { forTutorsSectionIds } from "@/lib/plus-footer-ia"

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
        "pointer-events-none absolute h-auto w-[min(32vw,7.5rem)] max-w-[140px] opacity-90 select-none sm:w-[min(28vw,8.75rem)] sm:max-w-[160px] md:max-w-[180px]",
        className
      )}
      aria-hidden
    />
  )
}

/**
 * Hero — For Tutors label, headline, subhead, CTAs, video placeholder, doodles.
 */
export const TutorsHeroSection = () => {
  return (
    <section className="relative flex min-h-[calc(100svh-5.5rem)] flex-col items-center justify-center gap-8 overflow-x-visible py-12 text-center sm:gap-10 sm:py-16 md:py-20">
      <TutorsHeroDecorImg
        src={forTutorsAssets.heroDecor[0]}
        className="-left-2 top-20 hidden sm:block md:left-0"
      />
      <TutorsHeroDecorImg
        src={forTutorsAssets.heroDecor[1]}
        className="right-0 top-5 hidden sm:right-1 sm:top-7 sm:block md:right-4 md:top-5"
      />
      <TutorsHeroDecorImg
        src={forTutorsAssets.heroDecor[2]}
        className="-right-1 top-56 hidden md:block md:-right-2 md:top-64 md:translate-x-1 lg:-right-3 lg:top-72 lg:translate-x-2"
      />

      <div className="relative flex max-w-3xl flex-col items-center gap-4 sm:gap-5">
        <p className="text-2xl font-semibold text-teal-900 sm:text-3xl">
          For Tutors
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-teal-950 sm:text-5xl">
          Teach What Matters and Earn What You Deserve
        </h1>

      </div>

      <div className="mx-auto w-full max-w-5xl text-center">
        <p className="text-lg text-teal-900/80 dark:text-white/90">
          Join 500+ tutors supporting 4,800+ students. Earn while you learn and
          lead.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
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
          <Image
            src={forTutorsAssets.heroVideoPoster}
            alt="Tutor at a desk using PLUS on a laptop, with coffee nearby"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 64rem"
            priority
          />
          {/* Grey overlay — paused-video state */}
          <div
            className="absolute inset-0 bg-neutral-950/50"
            aria-hidden
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              className="relative z-10 flex size-16 items-center justify-center rounded-full bg-white/95 text-teal-800 shadow-lg ring-4 ring-white/40 transition-transform hover:scale-105"
              aria-label="Play video"
            >
              <svg
                className="ml-1 size-7"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
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
 * Get Paid for All Your Hours — single bordered card: light-blue header band +
 * white body band, three columns (reference layout).
 */
export const TutorsCompensationSection = () => {
  return (
    <section
      id={forTutorsSectionIds.compensation}
      className="relative"
    >
      <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
        <div className="text-center sm:text-left">
          <div className="flex flex-col items-center gap-6 sm:items-start md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
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

        <div className="overflow-hidden rounded-2xl border-2 border-sky-200 bg-white dark:border-sky-800/50 dark:bg-card">
          {/* Top band — light blue, stats + sublabels */}
          <div className="grid border-b border-sky-200 bg-sky-100 dark:border-sky-800/50 dark:bg-sky-950/35 md:grid-cols-3">
            {COMPENSATION_COLUMNS.map((col) => (
              <div
                key={col.stat}
                className="px-2 py-5 text-center first:pl-6 last:pr-6 md:px-3 md:py-6 md:text-left md:first:pl-8 md:last:pr-8"
              >
                <p className="text-3xl font-bold tracking-tight text-sky-900 dark:text-sky-100 md:text-4xl">
                  {col.stat}
                </p>
                <p className="mt-1 text-xl font-bold leading-snug tracking-tight text-sky-800 dark:text-sky-300 sm:text-2xl">
                  {col.sub}
                </p>
              </div>
            ))}
          </div>
          {/* Bottom band — white, bullet lists */}
          <div className="grid bg-white dark:bg-card md:grid-cols-3">
            {COMPENSATION_COLUMNS.map((col) => (
              <div key={`${col.stat}-body`} className="px-2 py-7 first:pl-6 last:pr-6 md:px-3 md:py-8 md:first:pl-8 md:last:pr-8">
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

const EXPERIENCE_CARDS = [
  {
    title: "Build Bonds",
    description:
      "Begin each session by connecting with students.",
  },
  {
    title: "1:1 Support",
    description:
      "Lead one-on-one sessions for students’ needs.",
  },
  {
    title: "Reflect & Grow",
    description:
      "Submit reflections, join tutor discussions to grow.",
  },
] as const

/**
 * What Tutoring at PLUS Looks Like — bento grid (same rhythm as For Schools
 * Day-to-Day Experience), tutor copy + green palette + session photo.
 */
export const TutorsExperienceSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  /** Wide column follows selection — same pattern as About foundations (order stays 1 · 2 · 3). */
  const experienceLgGridCols =
    selectedIndex === 0
      ? "lg:grid-cols-[2fr_1fr_1fr]"
      : selectedIndex === 1
        ? "lg:grid-cols-[1fr_2fr_1fr]"
        : "lg:grid-cols-[1fr_1fr_2fr]"

  const experiencePhotoSrc =
    selectedIndex === 1
      ? forTutorsAssets.experienceOneToOneSupportPhoto
      : selectedIndex === 2
        ? forTutorsAssets.experienceReflectGrowPhoto
        : forTutorsAssets.experienceSessionPhoto

  const experiencePhotoUsesZoomCrop = selectedIndex === 1 || selectedIndex === 2

  const experiencePhotoAlt =
    selectedIndex === 1
      ? "Student wearing headphones at a laptop during a live online tutoring session with a tutor on video"
      : selectedIndex === 2
        ? "PLUS Personalized Learning dashboard on the Reflection tab with session reflection and training lessons"
        : "Student with headphones on a video call with a PLUS tutor, laptop on a desk"

  return (
    <section
      id={forTutorsSectionIds.experience}
      className="relative space-y-8 sm:space-y-10"
    >
      <div className="mx-auto max-w-5xl text-center sm:text-left">
        <div className="flex flex-col items-center gap-6 sm:items-start md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
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

      <ol
        className={cn(
          "mx-auto grid max-w-5xl list-none items-stretch gap-4 p-0 sm:grid-cols-2 sm:gap-6 lg:gap-8",
          experienceLgGridCols
        )}
      >
        {EXPERIENCE_CARDS.map((card, index) => {
          const isSelected = selectedIndex === index
          return (
            <li key={card.title} className="flex min-h-0">
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                onMouseEnter={() => setSelectedIndex(index)}
                aria-pressed={isSelected}
                className={cn(
                  "flex h-full min-h-0 w-full cursor-default flex-col gap-3 rounded-3xl p-5 text-left transition-colors sm:gap-5 sm:p-6",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isSelected
                    ? "border-2 border-[#EBC077] bg-[#FFF1C7]"
                    : "border-2 border-[#EBC077]/60 bg-white"
                )}
              >
                <div
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white",
                    isSelected ? "bg-[#A27707]" : "bg-[#A27707]/85"
                  )}
                >
                  {index + 1}
                </div>
                <div className="flex min-h-0 flex-1 flex-col gap-2">
                  <p className="shrink-0 text-pretty text-xl font-bold leading-snug tracking-tight text-[#9A6D00] sm:text-2xl dark:text-[#9A6D00]">
                    {card.title}
                  </p>
                  <div className="flex min-h-0 flex-1 flex-col">
                    {isSelected ? (
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        {card.description}
                      </p>
                    ) : (
                      <div className="flex-1" aria-hidden />
                    )}
                  </div>
                </div>
              </button>
            </li>
          )
        })}
      </ol>

      <div className="mx-auto max-w-5xl">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl ring-1 ring-teal-200/60 dark:ring-teal-800/50">
          <Image
            key={experiencePhotoSrc}
            src={experiencePhotoSrc}
            alt={experiencePhotoAlt}
            fill
            className={cn(
              "object-cover object-center",
              experiencePhotoUsesZoomCrop &&
                "origin-center scale-[1.07] sm:scale-[1.06]"
            )}
            sizes="(max-width: 1024px) 100vw, 64rem"
          />
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
        <div className="text-center sm:text-left">
          <div className="flex flex-col items-center gap-6 sm:items-start md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
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

        <div className="flex flex-col gap-8 rounded-3xl bg-[#E8F6EA] px-6 py-7 dark:bg-[#E8F6EA]/12 md:flex-row md:items-stretch md:gap-10 md:px-8 md:py-8">
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
          <div className="flex min-w-0 flex-[2] items-center justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={forTutorsAssets.certificationBadgeCard}
              alt="Claimed badge: Certified Tutor with PLUS branding"
              className="h-auto w-full object-contain object-right"
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
        <div className="text-center sm:text-left">
          <div className="flex flex-col items-center gap-6 sm:items-start md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
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

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 md:grid-rows-2 lg:gap-8">
          <div className="flex min-h-[400px] w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-fuchsia-200/60 bg-[#FFE8F6] md:row-span-2 md:min-h-[520px]">
            <div className="px-6 py-5 md:px-8 md:py-6">
              <ToolkitCardHeading icon={Sparkles}>
                Dashboard Tracking Insights
              </ToolkitCardHeading>
            </div>
            <div className="flex min-h-0 flex-1 flex-col pl-6 pr-0 pb-0 md:pl-8">
              <ToolkitCardMockup
                variant="dashboard"
                src={forTutorsAssets.toolkitDashboardInsights}
                alt="PLUS dashboard with charts, insights, and connected learner avatars"
              />
            </div>
          </div>
          <div className="flex min-h-[240px] min-w-0 flex-col overflow-hidden rounded-2xl border border-fuchsia-200/60 bg-[#FFE8F6] md:min-h-[260px]">
            <div className="px-6 py-5 md:px-8 md:py-6">
              <ToolkitCardHeading icon={LayoutDashboard}>
                Student Progress At-A-Glance
              </ToolkitCardHeading>
            </div>
            <div className="flex min-h-0 flex-1 flex-col pl-6 pr-0 pb-0 md:pl-8">
              <ToolkitCardMockup
                variant="compact"
                src={forTutorsAssets.toolkitStudentProgress}
                alt="Students overview metrics and My Students list in PLUS"
              />
            </div>
          </div>
          <div className="flex min-h-[240px] min-w-0 flex-col overflow-hidden rounded-2xl border border-fuchsia-200/60 bg-[#FFE8F6] md:min-h-[260px]">
            <div className="px-6 py-5 md:px-8 md:py-6">
              <ToolkitCardHeading icon={Brain}>
                Session Tracking
              </ToolkitCardHeading>
            </div>
            <div className="flex min-h-0 flex-1 flex-col pl-6 pr-0 pb-0 md:pl-8">
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

const TUTOR_TESTIMONIAL_VOICES = [
  {
    name: "PLUS Tutor A",
    quote:
      "The Students’ Reactions Speak For Themselves. They Look Forward To The Tutoring Sessions. It’s Not Just About Math. It’s About Relationships. It’s About Building Confidence.",
  },
  {
    name: "PLUS Tutor B",
    quote:
      "Tutoring Has Affected Me And It Made Me Realize If I Didn’t Get The Help I Needed I Would Still Be Struggling. But It Made Me See Math Differently In A Good Way.",
  },
  {
    name: "PLUS Tutor C",
    quote:
      "My Students Were Able To Understand Concepts More Easily Than Before Due To The One-To-One Help. My Students’ Math Confidence Has Also Increased!",
  },
] as const

/** Figma-style tutor voice card: pale pink shell, maroon name row, white quote panel. */
function TutorVoiceCard({
  name,
  quote,
  avatarUrl,
}: {
  name: string
  quote: string
  avatarUrl: string
}) {
  return (
    <article className="flex min-h-[340px] flex-col rounded-[22px] bg-[#FDECEC] p-5 sm:min-h-[380px] sm:p-6 dark:bg-[#3d2528]/40">
      <div className="flex items-center gap-3">
        <Avatar className="size-11 shrink-0 border border-[#B05B5B]/20 bg-white">
          <AvatarImage src={avatarUrl} alt="" />
          <AvatarFallback className="bg-white text-[#B05B5B] text-xs font-semibold">
            {name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p className="text-pretty text-xl font-bold leading-snug tracking-tight text-[#B05B5B] dark:text-[#e8a0a0] sm:text-2xl">
          {name}
        </p>
      </div>
      <div className="mt-4 flex min-h-0 flex-1 flex-col rounded-2xl bg-white p-5 shadow-sm dark:bg-card dark:ring-1 dark:ring-white/10 sm:p-6">
        <blockquote className="text-left text-base leading-relaxed text-[#4A4A4A] dark:text-neutral-200">
          <span className="text-[#4A4A4A]/80 dark:text-neutral-400">“</span>
          {quote}
          <span className="text-[#4A4A4A]/80 dark:text-neutral-400">”</span>
        </blockquote>
      </div>
    </article>
  )
}

/**
 * Voices from Our Tutors — For Schools Success Stories layout (Bundui grid), tutor copy + heading.
 */
export const TutorsTestimonialsSection = () => {
  return (
    <section className="relative" id="tutor-testimonials">
      <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
        <div className="text-center sm:text-left">
          <div className="flex flex-col items-center gap-6 sm:items-start md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
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
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
          {TUTOR_TESTIMONIAL_VOICES.map((story, index) => (
            <TutorVoiceCard
              key={story.name}
              name={story.name}
              quote={story.quote}
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
      <div className="mx-auto max-w-5xl space-y-6 rounded-3xl bg-white p-8 text-center dark:bg-transparent sm:p-12">
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
