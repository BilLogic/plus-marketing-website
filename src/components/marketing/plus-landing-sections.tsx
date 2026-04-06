"use client"

import Image from "next/image"
import Link from "next/link"
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

/**
 * Min height below global header — matches `SchoolsHeroSection` (`for-schools-sections.tsx`) so the hero
 * fills the viewport above the fold; `5.5rem` ≈ sticky header chrome in the marketing layout.
 */
const MARKETING_HERO_MIN_HEIGHT = "min-h-[calc(100svh-5.5rem)]"

/**
 * Hero — Figma PLUS-website-IA: copy + collage node `1608:2009` (asymmetric tiles, corner doodles, toast).
 */
export const PlusHeroSection = () => {
  return (
    <section
      id="about"
      className={cn(
        "relative flex flex-col justify-center overflow-visible",
        MARKETING_HERO_MIN_HEIGHT
      )}
    >
      <div className="relative flex w-full flex-col gap-8 py-8 sm:gap-10 sm:py-12 md:py-14 lg:flex-row lg:items-stretch lg:gap-14">
        <div className={cn(schoolsHeaderText, "max-w-xl lg:self-center")}>
          <h1
            className={cn(
              marketingTypography.h1,
              "max-w-prose text-balance text-teal-950 text-3xl sm:text-4xl"
            )}
          >
            Scaling Up High-Impact Math Tutoring with Technology and Training
          </h1>
          <p className={schoolsSectionLead}>
            <span className="font-bold text-teal-900">PLUS</span> is a virtual tutoring platform that
            empowers middle school math learners with AI technology and research-backed methods.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-11 rounded-full border-0 bg-teal-300 px-10 text-base font-normal text-teal-950 hover:bg-teal-400"
              )}
            >
              Our mission
            </Link>
            <Link
              href="/for-tutors"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-full border-2 border-teal-900 bg-white px-10 text-base font-normal text-teal-950 hover:bg-teal-50"
              )}
            >
              Join us
            </Link>
          </div>
        </div>

        {/*
          Collage frame from Figma 1608:2009 — 676×509 reference; tiles are absolute %; doodles sit outside corners.
        */}
        <div className="relative mx-auto flex min-h-0 w-full min-w-0 max-w-lg flex-1 flex-col justify-center lg:mx-0 lg:max-w-none">
          <div
            className={cn(
              "relative mx-auto w-full max-w-[42rem] overflow-visible pb-4",
              /* Grow with hero height on large screens */
              "min-h-[min(20rem,52svh)] lg:min-h-[min(28rem,58svh)]"
            )}
          >
            {/* Aspect + min-height scales collage upward to fill the hero column */}
            <div className="relative mx-auto aspect-[676/509] h-auto w-full min-h-[min(18rem,48svh)] max-w-full lg:min-h-[min(26rem,55svh)]">
              {/* Top-left — largest tile */}
              <div className="absolute left-[6.36%] top-0 z-[1] h-[45.4%] w-[47.49%] overflow-hidden rounded-[30px] shadow-sm">
                <Image
                  src={plusHomeHero.collageTopLeft}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 340px, 45vw"
                  unoptimized
                />
              </div>
              {/* Top-right — dashboard; wide crop per Figma */}
              <div className="absolute left-[56.36%] top-[11.2%] z-[1] h-[47.94%] w-[40.09%] overflow-hidden rounded-[30px] shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element -- wide crop matches Figma asset frame */}
                <img
                  alt=""
                  src={plusHomeHero.collageTopRight}
                  className="pointer-events-none absolute top-0 left-[-36.14%] h-full w-[238.45%] max-w-none object-cover"
                />
              </div>
              {/* Bottom-left — UI strip; wide crop per Figma */}
              <div className="absolute left-[9.47%] top-[48.53%] z-[1] h-[44.79%] w-[45.41%] overflow-hidden rounded-[31.93px] shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element -- wide crop matches Figma asset frame */}
                <img
                  alt=""
                  src={plusHomeHero.collageBottomLeft}
                  className="pointer-events-none absolute top-0 left-[-17.34%] h-full w-[167.74%] max-w-none object-cover"
                />
              </div>
              {/* Bottom-right — smallest tile */}
              <div className="absolute left-[57.4%] top-[62.48%] z-[1] h-[37.52%] w-[32.4%] overflow-hidden rounded-[21.25px] shadow-sm">
                <Image
                  src={plusHomeHero.collageBottomRight}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 220px, 28vw"
                  unoptimized
                />
              </div>

              {/* Center blurb — Figma 1576:2443: compact avatars + caption */}
              <div
                className="absolute left-[29.44%] top-[31.04%] z-[15] flex h-[37.83%] w-[41.12%] flex-col items-center justify-center rounded-[34px] border border-white/60 bg-white/80 px-3 py-2.5 shadow-[0_4.5px_23px_rgba(0,0,0,0.25)] backdrop-blur-[25px] sm:px-3.5 sm:py-3"
                role="status"
              >
                <div className="flex w-full max-w-[92%] flex-col items-center gap-2 sm:gap-2.5">
                  <div className="flex shrink-0 justify-center">
                    <Image
                      src={plusHomeHero.toastAvatarA}
                      alt=""
                      width={40}
                      height={40}
                      className="size-10 rounded-full object-cover ring-2 ring-white"
                      unoptimized
                    />
                    <Image
                      src={plusHomeHero.toastAvatarB}
                      alt=""
                      width={40}
                      height={40}
                      className="-ml-2.5 size-10 rounded-full object-cover ring-2 ring-white"
                      unoptimized
                    />
                  </div>
                  <p className="text-center text-[11px] font-normal leading-snug sm:text-[13px] md:text-[14px]">
                    <span className="text-muted-foreground">Join </span>
                    <span className="font-bold text-[#027f89]">5000+</span>
                    <span className="text-muted-foreground">
                      {" "}
                      students who are getting AI-powered education.
                    </span>
                  </p>
                </div>
              </div>

              {/* Corner doodles — anchored to collage frame, offset outside corners (not over tiles) */}
              <img
                alt=""
                src={plusHomeHero.doodleX}
                className="pointer-events-none absolute top-0 left-0 z-[5] h-[clamp(3.5rem,14vw,6.75rem)] w-[clamp(4rem,16vw,7.25rem)] -translate-x-[38%] -translate-y-[38%] rotate-[-15deg] object-contain"
                aria-hidden
              />
              <img
                alt=""
                src={plusHomeHero.doodleBottom}
                className="pointer-events-none absolute right-0 bottom-0 z-[5] h-[clamp(2.75rem,11vw,4.9rem)] w-[clamp(3.25rem,13vw,5.75rem)] translate-x-[32%] translate-y-[32%] object-contain"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
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

const STAT_BLOCK = "flex max-w-[473px] flex-col items-start gap-[18px]"

/**
 * Impact — Figma `1579:1929` “Serving Low-Income Students”: 2×2 grid (students + map | schools + tutors).
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
        <img
          alt=""
          src={plusHomeImpactDecor.equalSign}
          className="pointer-events-none hidden h-[174px] w-[165px] shrink-0 object-contain lg:block"
          aria-hidden
        />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 lg:gap-x-10 lg:gap-y-12">
        {/* Row 1 — students + map */}
        <div className={STAT_BLOCK}>
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
          <p className={cn("text-2xl font-bold leading-tight sm:text-3xl", IMPACT_STAT)}>5000+ students</p>
          <p className={schoolsSectionLead}>
            Students across the country receiving personalized math support through PLUS.
          </p>
          <Link
            href="/for-tutors"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-[45px] w-fit min-w-[12rem] rounded-full border-0 bg-[#a6edf4] px-10 text-base font-normal text-[#004247] hover:bg-[#94e5ee]"
            )}
          >
            Learn more about toolkit
          </Link>
        </div>

        <div className="relative aspect-[556/361] w-full overflow-hidden rounded-[30px] bg-muted/30">
          <Image
            src={plusHomeImpactMap}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(min-width: 768px) 45vw, 100vw"
            unoptimized
          />
        </div>

        {/* Row 2 — schools + tutors */}
        <div className={STAT_BLOCK}>
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
          <p className={cn("text-2xl font-bold leading-tight sm:text-3xl", IMPACT_STAT)}>13+ schools</p>
          <p className={schoolsSectionLead}>
            PLUS tutors provide instructional support to middle-school math learners during the school day.
          </p>
          <Link
            href="/for-schools"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-[45px] w-fit rounded-full border-2 border-teal-800 bg-white px-10 text-base font-normal text-[#004247] hover:bg-teal-50"
            )}
          >
            Get PLUS tutoring
          </Link>
        </div>

        <div className={STAT_BLOCK}>
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
          <p className={cn("text-2xl font-bold leading-tight sm:text-3xl", IMPACT_STAT)}>500+ tutors</p>
          <p className={schoolsSectionLead}>
            University and community tutors trained to support middle school math learners.
          </p>
          <Link
            href="/for-tutors"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-[45px] w-fit rounded-full border-2 border-teal-800 bg-white px-10 text-base font-normal text-[#004247] hover:bg-teal-50"
            )}
          >
            Become a tutor
          </Link>
        </div>
      </div>
    </section>
  )
}

/** Figma `1707:1917` — Smart Tech, Smarter Learning (pink cards + product screenshots). */
export const PlusSmartTechSection = () => {
  const cards = [
    {
      title: "Supervisor Dashboard",
      icon: plusHomeSmartTech.iconSupervisor,
      image: plusHomeSmartTech.supervisor,
      className: "min-h-[280px] lg:min-h-[320px]",
    },
    {
      title: "AI tutor training",
      icon: plusHomeSmartTech.iconAiTutor,
      image: plusHomeSmartTech.aiTutor,
      className: "min-h-[320px] lg:min-h-[360px]",
    },
  ] as const

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
        <img
          alt=""
          src={plusHomeSmartTech.headerDoodle}
          className="pointer-events-none hidden h-[120px] w-auto shrink-0 object-contain sm:block max-sm:h-24"
          aria-hidden
        />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="flex flex-1 flex-col gap-6">
          {cards.map(({ title, icon, image, className }) => (
            <article
              key={title}
              className={cn(
                "flex flex-col overflow-hidden rounded-[30px] bg-[#ffe8f5] p-5 sm:p-6",
                className
              )}
            >
              <div className="flex flex-wrap items-start gap-4">
                <div className="relative size-[58px] shrink-0">
                  <Image src={icon} alt="" width={58} height={58} className="object-contain" unoptimized />
                </div>
                <h3 className="max-w-[18rem] text-2xl font-semibold leading-tight text-[#d31998] sm:text-3xl">
                  {title}
                </h3>
              </div>
              <div className="relative mt-4 flex min-h-0 flex-1 overflow-hidden rounded-md">
                <Image
                  src={image}
                  alt=""
                  width={800}
                  height={480}
                  className="h-auto w-full object-contain object-top"
                  unoptimized
                />
              </div>
            </article>
          ))}
        </div>

        <article className="flex flex-1 flex-col overflow-hidden rounded-[30px] bg-[#ffe8f5] p-5 sm:p-6 lg:max-w-[32rem] lg:self-stretch">
          <div className="flex flex-wrap items-start gap-4">
            <div className="relative size-[58px] shrink-0">
              <Image
                src={plusHomeSmartTech.iconGoal}
                alt=""
                width={58}
                height={58}
                className="object-contain"
                unoptimized
              />
            </div>
            <h3 className="max-w-[18rem] text-2xl font-semibold leading-tight text-[#d31998] sm:text-3xl">
              Collaborative Goal Setting
            </h3>
          </div>
          <div className="relative mt-4 min-h-[280px] flex-1 overflow-hidden rounded-md lg:min-h-[320px]">
            <Image
              src={plusHomeSmartTech.goalSetting}
              alt=""
              width={900}
              height={560}
              className="h-auto w-full object-contain object-center"
              unoptimized
            />
          </div>
        </article>
      </div>
    </section>
  )
}

/** Figma `1708:2035` — Built on the Science of Learning. */
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
        <img
          alt=""
          src={plusHomeScience.headerDoodle}
          className="pointer-events-none hidden h-[130px] w-auto shrink-0 object-contain sm:block"
          aria-hidden
        />
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 lg:items-center">
        <div className={cn(STAT_BLOCK, "max-w-none")}>
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
          <p className="text-2xl font-semibold leading-tight text-[#0080b4] sm:text-3xl">30+ published papers</p>
          <p className={schoolsSectionLead}>
            PLUS is founded on decades of learning science research from leaders at Carnegie Mellon University
            and Stanford University. PLUS&apos;s findings are freely available to all.
          </p>
          <Link
            href="/research"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-[45px] w-fit rounded-full border-0 bg-[#a6edf4] px-10 text-base font-normal text-[#004247] hover:bg-[#94e5ee]"
            )}
          >
            Read our research
          </Link>
        </div>

        <div className="relative min-h-[280px] overflow-hidden rounded-[30px] bg-[#e0f6fe] p-6 sm:min-h-[320px] sm:p-8">
          <div className="relative mx-auto flex max-w-lg flex-col items-center gap-4">
            <div className="relative w-full max-w-[16rem] shadow-md sm:max-w-xs">
              <Image
                src={plusHomeScience.papersStackA}
                alt=""
                width={400}
                height={320}
                className="h-auto w-full rounded-md object-contain"
                unoptimized
              />
            </div>
            <div className="relative -mt-8 w-full max-w-md shadow-lg sm:-mt-10">
              <Image
                src={plusHomeScience.papersStackB}
                alt=""
                width={560}
                height={280}
                className="h-auto w-full rounded-md object-contain"
                unoptimized
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
        <img
          alt=""
          src={plusHomeAwards.headerDecor}
          className="pointer-events-none h-[clamp(4.5rem,18vw,9.375rem)] w-auto shrink-0 object-contain sm:h-32 md:h-36 lg:h-[150px] lg:w-[165px]"
          aria-hidden
        />
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

/** Shared image slot so award titles + leads line up — sized between the ~401px Figma marks and the tighter mobile pass. */
const AWARD_MARK_MAX_W = "max-w-[17rem] sm:max-w-[19rem]"
const AWARD_MARK_SLOT_H = "h-[140px] sm:h-[158px]"

/**
 * Awards — compact marks; fixed-height slot keeps typography aligned between columns.
 */
export const PlusAwardsSection = () => {
  const awards = [
    {
      image: plusHomeAwards.edTechFinalist,
      title: "The EdTech Awards Finalist",
      sub: "The largest edtech awards program",
    },
    {
      image: plusHomeAwards.bestDemo,
      title: "2023 Best Demo Award",
      sub: "2023 International Conference on Artificial Intelligence in Education",
    },
  ] as const

  return (
    <section id="get-involved" className={cn("relative", schoolsSectionGap)}>
      <div className={schoolsHeaderRow}>
        <div className={schoolsHeaderText}>
          <h2 className={schoolsSectionTitle}>Our Awards</h2>
          <p className={schoolsSectionLead}>
            A strategic alliance of world-class universities and industry leaders committed to rigorous
            learning engineering at scale.
          </p>
        </div>
        <img
          alt=""
          src={plusHomeAwards.headerCharacter}
          className="pointer-events-none hidden h-[175px] w-[193px] shrink-0 object-contain lg:block"
          aria-hidden
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-x-[50px] lg:gap-y-0">
        {awards.map(({ image, title, sub }) => (
          <article
            key={title}
            className="flex w-full min-w-0 flex-col items-stretch gap-3 text-left sm:gap-4"
          >
            <div
              className={cn(
                "mx-auto flex w-full shrink-0 items-center justify-center",
                AWARD_MARK_MAX_W,
                AWARD_MARK_SLOT_H
              )}
            >
              <div className="relative h-full w-full min-h-0">
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-contain object-center"
                  sizes="(min-width: 1024px) 304px, 85vw"
                  unoptimized
                />
              </div>
            </div>
            <h3 className={cn(schoolsSectionTitle, "text-balance")}>{title}</h3>
            <p className={schoolsSectionLead}>{sub}</p>
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
