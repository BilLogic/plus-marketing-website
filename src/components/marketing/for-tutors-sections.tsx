"use client"

import type { ComponentType, ReactNode, SVGProps } from "react"
import Image from "next/image"
import { Brain, LayoutDashboard, Sparkles, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BunduiTestimonialsSection } from "@/components/registry/bundui/testimonials-section"
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
function TutorsHeroDecorImg({
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
    <section className="relative flex flex-col items-center gap-8 overflow-x-visible pb-12 pt-14 text-center sm:gap-10 sm:pb-16 sm:pt-16 md:pt-20">
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
        <p className="text-base font-semibold tracking-wide text-teal-700 dark:text-teal-300 sm:text-lg">
          For Tutors
        </p>
        <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-teal-950 dark:text-white sm:text-4xl md:text-5xl">
          Teach What Matters and Earn What You Deserve
        </h1>
      </div>

      <div className="mx-auto w-full max-w-5xl text-center">
        <p className="text-base text-teal-900/80 dark:text-white/90 sm:text-lg">
          Join 500+ tutors supporting 4,800+ students. Earn while you learn and
          lead.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button className="h-11 rounded-full bg-teal-600 px-8 text-base font-medium text-teal-950 hover:bg-teal-700">
          Check Our Demo
        </Button>
        <Button
          variant="outline"
          className="h-11 rounded-full border-2 border-teal-800 bg-transparent px-8 text-base font-medium text-teal-950 hover:bg-teal-50"
        >
          Become a Tutor
        </Button>
      </div>

      <div className="relative mx-auto mt-2 w-full max-w-5xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-teal-100/80 ring-1 ring-teal-200/80">
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              className="flex size-16 items-center justify-center rounded-full bg-white/95 ring-4 ring-white/50 transition-transform hover:scale-105"
              aria-label="Play video"
            >
              <svg
                className="ml-1 size-7 text-teal-800"
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
              <p className="mx-auto max-w-2xl text-base text-teal-900/75 dark:text-white/90 sm:mx-0 sm:text-lg">
                Join PLUS and start supporting 1:1 with students. Earn up to $20
                per hour.
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
                className="px-6 py-7 text-center md:px-8 md:py-8 md:text-left"
              >
                <p className="text-3xl font-bold tracking-tight text-sky-900 dark:text-sky-100 md:text-4xl">
                  {col.stat}
                </p>
                <p className="mt-1 text-sm font-bold text-sky-800 dark:text-sky-300 md:text-base">
                  {col.sub}
                </p>
              </div>
            ))}
          </div>
          {/* Bottom band — white, bullet lists */}
          <div className="grid bg-white dark:bg-card md:grid-cols-3">
            {COMPENSATION_COLUMNS.map((col) => (
              <div key={`${col.stat}-body`} className="px-6 py-7 md:px-8 md:py-8">
                <ul className="space-y-3 text-left">
                  {col.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]"
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
      "Begin each session by connecting with your student—trust makes learning stick.",
    active: true,
  },
  {
    title: "Get support",
    description:
      "Access mentor feedback, office hours, and a community of fellow tutors.",
    active: false,
  },
  {
    title: "Believe & Grow",
    description:
      "Reflect on each session and build teaching skills that last a career.",
    active: false,
  },
] as const

/**
 * What Tutoring at PLUS Looks Like — bento grid (same rhythm as For Schools
 * Day-to-Day Experience), tutor copy + green palette + session photo.
 */
export const TutorsExperienceSection = () => {
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
            <p className="mx-auto max-w-2xl text-base text-teal-900/75 dark:text-white/90 sm:mx-0 sm:text-lg">
              Build meaningful relationships while helping students achieve their
              goals.
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

      <ol className="mx-auto grid max-w-5xl list-none gap-4 p-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-[2fr_1fr_1fr] lg:gap-8">
        {EXPERIENCE_CARDS.map((card, index) => {
          const isFilled = card.active
          return (
            <li
              key={card.title}
              className={cn(
                "flex flex-col gap-4 rounded-3xl p-5 sm:gap-6 sm:p-6",
                isFilled
                  ? "border-2 border-green-400 bg-green-50/90"
                  : "border-2 border-green-200/90 bg-white"
              )}
            >
              <div
                className={cn(
                  "flex size-14 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white",
                  isFilled ? "bg-green-600" : "bg-green-500/80"
                )}
              >
                {index + 1}
              </div>
              <div className="min-w-0 space-y-2">
                <p className="text-lg font-bold tracking-tight text-teal-950 sm:text-xl">
                  {card.title}
                </p>
                <p className="text-sm leading-relaxed text-teal-900/75 sm:text-base">
                  {card.description}
                </p>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mx-auto max-w-5xl">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl ring-1 ring-teal-200/60 dark:ring-teal-800/50">
          <Image
            src={forTutorsAssets.experienceSessionPhoto}
            alt="Student with headphones on a video call with a PLUS tutor, laptop on a desk"
            fill
            className="object-cover"
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
              <p className="mx-auto max-w-2xl text-base text-teal-900/75 dark:text-white/90 sm:mx-0 sm:text-lg">
                Showcase your skills and expertise with our digital badges and
                certifications.
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

        <div className="flex flex-col gap-8 rounded-3xl border border-amber-200/90 bg-[#FFF1C7] px-6 py-7 dark:border-amber-900/40 dark:bg-[#FFF1C7]/12 md:flex-row md:items-stretch md:gap-10 md:px-8 md:py-8">
          <div className="flex flex-1 flex-col justify-center gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-4">
              <span
                className="mx-auto flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-800 text-white dark:bg-amber-700 sm:mx-0"
                aria-hidden
              >
                <Star className="size-[18px]" strokeWidth={2.25} />
              </span>
              <h3 className="min-w-0 text-center text-balance text-lg font-bold tracking-tight text-amber-900 dark:text-amber-100 sm:text-left sm:text-xl">
                Tutor Certification &amp; Digital Badges
              </h3>
            </div>
            <p className="text-center text-base leading-relaxed text-muted-foreground sm:text-left">
              Complete all training to get sharable badges for resumes and social
              media.
            </p>
            <p className="text-center text-sm leading-relaxed text-muted-foreground sm:text-left">
              Note: Available to institutions only. Contact us to activate.
            </p>
            <Button className="mx-auto h-11 w-fit rounded-full bg-amber-400 px-8 font-medium text-teal-950 hover:bg-amber-300 sm:mx-0">
              Register now
            </Button>
          </div>
          <div className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm dark:border-border dark:bg-card">
            <Image
              src={forTutorsAssets.certificationBadgeCard}
              alt="My Badge card: Certified Tutor with PLUS and Carnegie Mellon University branding"
              width={783}
              height={505}
              className="h-auto w-full object-contain object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40rem"
            />
          </div>
        </div>
      </div>
    </section>
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
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-fuchsia-900 text-white dark:bg-fuchsia-200 dark:text-fuchsia-950"
        aria-hidden
      >
        <Icon className="size-[18px]" strokeWidth={2.25} />
      </span>
      <p className="min-w-0 text-lg font-bold tracking-tight text-fuchsia-900 dark:text-fuchsia-200 sm:text-xl">
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
              <p className="mx-auto max-w-2xl text-base text-teal-900/75 dark:text-white/90 sm:mx-0 sm:text-lg">
                Access all the tools and resources you need to support your
                tutoring.
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

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:grid-rows-2 md:gap-5">
          <div className="flex min-h-[280px] w-full min-w-0 flex-col rounded-2xl border border-fuchsia-200/60 bg-[#FFE8F6] px-6 py-7 md:row-span-2 md:min-h-[360px] md:px-8 md:py-8">
            <ToolkitCardHeading icon={Sparkles}>
              Dashboard Tracking Insights
            </ToolkitCardHeading>
            <div className="mt-4 flex-1 rounded-xl bg-gradient-to-b from-teal-50 to-white ring-1 ring-teal-100" />
          </div>
          <div className="flex min-h-[160px] min-w-0 flex-col rounded-2xl border border-fuchsia-200/60 bg-[#FFE8F6] px-6 py-7 md:px-8 md:py-8">
            <ToolkitCardHeading icon={LayoutDashboard}>
              Student Progress At-A-Glance
            </ToolkitCardHeading>
            <div className="mt-3 flex-1 rounded-lg bg-muted/40 ring-1 ring-border/60" />
          </div>
          <div className="flex min-h-[160px] min-w-0 flex-col rounded-2xl border border-fuchsia-200/60 bg-[#FFE8F6] px-6 py-7 md:px-8 md:py-8">
            <ToolkitCardHeading icon={Brain}>
              Session Tracking
            </ToolkitCardHeading>
            <div className="mt-3 flex-1 rounded-lg bg-muted/40 ring-1 ring-border/60" />
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
      "PLUS gave me the structure and tools to actually see my students improve week over week. The pay is fair and the team truly cares.",
  },
  {
    name: "PLUS Tutor B",
    quote:
      "I love the flexibility and the training—I feel prepared for every session, even on tough topics.",
  },
  {
    name: "PLUS Tutor C",
    quote:
      "The platform is intuitive and the community of tutors is supportive. It’s the most rewarding work I’ve done.",
  },
] as const

const tutorVoicesBunduiTestimonials = TUTOR_TESTIMONIAL_VOICES.map(
  (story, index) => ({
    name: story.name,
    role: "Tutor",
    company: "PLUS",
    quote: story.quote,
    avatarUrl: forSchoolsAssets.avatars[index],
  })
)

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
              <p className="mx-auto max-w-2xl text-base text-teal-900/75 dark:text-white/90 sm:mx-0 sm:text-lg">
                Hear from our tutors about their experience working with PLUS.
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
        <BunduiTestimonialsSection
          showHeader={false}
          showOuterContainer={false}
          figureClassName="shadow-none"
          testimonials={[...tutorVoicesBunduiTestimonials]}
          className="w-full"
        />
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
      <div className="mx-auto max-w-3xl space-y-6 rounded-3xl bg-white p-8 text-center dark:bg-transparent sm:p-12">
        <h2 className="text-3xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-4xl">
          Ready to Make an Impact?
        </h2>
        <p className="text-base text-teal-900/75 dark:text-white/90 sm:text-lg">
          Join our community of tutors today and start making a difference.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button className="h-11 rounded-full bg-teal-600 px-8 text-base font-medium text-teal-950 hover:bg-teal-700">
            Check Our Demo
          </Button>
          <Button
            variant="outline"
            className="h-11 rounded-full border-2 border-teal-800 bg-transparent px-8 text-base font-medium text-teal-950 hover:bg-teal-50"
          >
            Become a Tutor
          </Button>
        </div>
      </div>
    </section>
  )
}
