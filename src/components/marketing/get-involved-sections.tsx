"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Heart,
  BookOpen,
  Microscope,
  FileText,
  HandCoins,
  DollarSign,
  Hospital,
  School,
} from "lucide-react"
import { TutorsHeroDecorImg } from "@/components/marketing/for-tutors-sections"
import { forTutorsAssets } from "@/components/marketing/for-tutors-assets"
import { cn } from "@/lib/utils"
import type { JobListing } from "@/lib/notion/types"

// ─── Shared tokens (match about/for-tutors pages) ────────────────────────────

const sectionH2 =
  "text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl"

const sectionLead =
  "w-full max-w-none text-pretty text-base text-teal-900/75 lg:text-lg dark:text-white/90"

const primaryCta =
  "h-9 sm:h-11 rounded-full border-0 bg-[#A6EDF4] px-5 sm:px-8 text-sm sm:text-base font-normal text-[#004247] shadow-none transition-opacity hover:bg-[#A6EDF4] hover:opacity-95 hover:text-[#004247] dark:bg-[#A6EDF4] dark:text-[#004247] dark:hover:bg-[#A6EDF4]"

const outlineCta =
  "h-9 sm:h-11 rounded-full border-2 border-[#A6EDF4] bg-transparent px-5 sm:px-8 text-sm sm:text-base font-medium text-teal-950 hover:border-[#A6EDF4] hover:bg-[#A6EDF4]/15 dark:text-white dark:hover:bg-[#A6EDF4]/20"

const ctaLinkLayout =
  "inline-flex items-center justify-center whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

const sectionDecorImgClass =
  "pointer-events-none hidden h-auto w-28 max-w-[140px] shrink-0 opacity-90 select-none md:block md:w-32 md:max-w-[165px] lg:w-36 lg:max-w-[180px]"

/** Inner padding for cards — matches About `AboutLatestSection` (Latest at PLUS). */
const cardPaddingLatest = "p-5 sm:p-6"

/** Learn more row — matches About `AboutSuccessStoriesSection` Read story link (size, arrow, interaction). */
const careersLearnMoreLinkClass =
  "group ml-auto inline-flex cursor-pointer items-center gap-2 text-lg font-medium text-[#297E43] no-underline transition-opacity hover:opacity-90 dark:text-[#297E43]"

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function GetInvolvedHeroSection() {
  return (
    <section className="relative flex min-h-0 flex-col items-center justify-center gap-6 overflow-x-visible py-8 text-center sm:min-h-[calc(100svh-5.5rem)] sm:gap-8 sm:py-12 md:gap-10 md:py-16 lg:py-20">
      <TutorsHeroDecorImg
        src={forTutorsAssets.heroDecor[0]}
        className="-left-1 top-36 max-sm:top-3 max-sm:left-1 sm:-left-2 sm:top-52 md:left-0 md:top-56"
      />
      <TutorsHeroDecorImg
        src={forTutorsAssets.heroDecor[1]}
        className="right-0 top-20 max-sm:top-3 max-sm:right-1 sm:right-1 sm:top-36 md:right-4 md:top-32"
      />
      <TutorsHeroDecorImg
        src={forTutorsAssets.heroDecor[2]}
        className="-right-1 top-[12rem] max-sm:top-[17.5rem] max-sm:right-1 sm:top-[19rem] md:-right-2 md:top-[25rem] md:translate-x-1 lg:-right-3 lg:top-[29rem] lg:translate-x-2"
      />

      <div className="relative z-[1] flex max-w-3xl flex-col items-center gap-3 sm:gap-4 md:gap-5">
        <p className="text-lg font-semibold text-teal-900 sm:text-xl md:text-3xl">
          Get Involved
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-teal-950 sm:text-4xl md:text-5xl">
          Join PLUS and Make a Lasting Difference in Education
        </h1>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:mt-6 sm:gap-4 md:mt-8">
        <Link href="/get-involved#careers" className={cn(ctaLinkLayout, primaryCta)}>
          Careers at PLUS
        </Link>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfnLoEbL_irrlGeoW6toMctQ8rstewQ1-PB4h7XwUKZAeXmVg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(ctaLinkLayout, outlineCta)}
        >
          Join as a Tutor
        </a>
      </div>
    </section>
  )
}

// ─── Why Work at PLUS ─────────────────────────────────────────────────────────

const WHY_WORK_ITEMS = [
  {
    id: "your-benefits",
    title: "Your Benefits at PLUS",
    description:
      "We provide robust benefits to ensure your health, financial security, work-life balance, and growth.",
    cta: "Learn more",
    icon: HandCoins,
    panelArt: "/figma/get-involved/why-work-benefits.jpg",
  },
  {
    id: "pto",
    title: "Paid Time Off",
    description:
      "Generous PTO and flexible scheduling so you can recharge and show up at your best.",
    cta: "",
    icon: DollarSign,
    panelArt: "/figma/get-involved/why-work-pto.jpg",
  },
  {
    id: "health",
    title: "Full Health Coverage",
    description:
      "Comprehensive medical, dental, and vision coverage for you and your family.",
    cta: "",
    icon: Hospital,
    panelArt: "/figma/get-involved/why-work-health.jpg",
  },
  {
    id: "tuition",
    title: "Tuition Benefits",
    description:
      "Invest in your future with tuition reimbursement and professional development support.",
    cta: "",
    icon: School,
    panelArt: "/figma/get-involved/why-work-tuition.jpg",
  },
] as const

export function GetInvolvedWhyWorkSection() {
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
    <section id="why-work" className="scroll-mt-24">

      {/* Sticky section header */}
      <div className="pb-6 sm:pb-8">
        <div className="flex flex-col items-start gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
          <div className="w-full space-y-3 md:min-w-0 md:flex-1">
            <h2 className={sectionH2}>Why Work at PLUS?</h2>
            <p className={sectionLead}>
              Join a team shaping the future of personalized learning. Become part of PLUS!
            </p>
          </div>
          <img
            alt=""
            src={forTutorsAssets.compensationDecor}
            className={sectionDecorImgClass}
            aria-hidden
          />
        </div>
      </div>

      {/* Phone: full list — light blue card per item */}
      <div className="flex flex-col gap-4 sm:hidden">
        {WHY_WORK_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-[30px] bg-sky-100 p-5 dark:bg-sky-950/35"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#007EB8]"
                  aria-hidden
                >
                  <Icon className="size-5 text-white" strokeWidth={2} />
                </span>
                <h3 className="text-pretty text-lg font-bold leading-snug tracking-tight text-[#007EB8] sm:text-xl">
                  {item.title}
                </h3>
              </div>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
                {item.description}
              </p>
              {item.cta ? (
                <Link
                  href="https://www.cmu.edu/hr/benefits/staff.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    ctaLinkLayout,
                    primaryCta,
                    "w-fit self-start no-underline",
                  )}
                >
                  {item.cta}
                </Link>
              ) : null}
              <div className="relative aspect-square w-full overflow-hidden rounded-[30px]">
                <img
                  alt=""
                  src={item.panelArt}
                  className="size-full object-cover"
                  decoding="async"
                />
              </div>
            </article>
          )
        })}
      </div>

      {/* sm+: two-column — left scrolls, right sticky image */}
      <div className="hidden grid-cols-1 gap-6 sm:grid sm:gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">

        <div className="pb-[5vh]">
          {WHY_WORK_ITEMS.map((item, i) => {
            const isActive = i === activeIndex
            const Icon = item.icon
            return (
              <div
                key={item.id}
                ref={(el) => { itemRefs.current[i] = el }}
                className="flex flex-col gap-4 py-10 sm:gap-5 sm:py-14 md:py-16 lg:py-20"
              >
                <div className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                  isActive ? "bg-[#007EB8]" : "bg-foreground/20"
                )}>
                  <Icon className="size-5 text-white" strokeWidth={2} />
                </div>
                <p className={cn(
                  "text-pretty text-lg font-bold leading-snug tracking-tight transition-colors duration-300 sm:text-xl lg:text-2xl",
                  isActive ? "text-[#007EB8]" : "text-muted-foreground"
                )}>
                  {item.title}
                </p>
                {isActive && (
                  <>
                    <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                      {item.description}
                    </p>
                    {item.cta && (
                      <Link href="https://www.cmu.edu/hr/benefits/staff.html" target="_blank" rel="noopener noreferrer" className={cn(ctaLinkLayout, primaryCta, "mt-2 w-fit no-underline")}>
                        {item.cta}
                      </Link>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>

        <div className="hidden md:block" style={{ minHeight: 400 }}>
          <div className="sticky" style={{ top: 88 }}>
            <div className="relative aspect-square w-full overflow-hidden rounded-[30px]">
              {WHY_WORK_ITEMS.map((item, i) => (
                <img
                  key={item.id}
                  alt=""
                  src={item.panelArt}
                  className={cn(
                    "pointer-events-none absolute inset-0 size-full object-cover select-none transition-opacity duration-500",
                    i === activeIndex ? "opacity-100" : "opacity-0"
                  )}
                  decoding="async"
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── Explore Career Opportunities ─────────────────────────────────────────────

// Placeholder data — replace with Notion API results when wired up
const PLACEHOLDER_CAREER_LISTINGS: JobListing[] = []

export function GetInvolvedCareersSection({ jobs }: { jobs?: JobListing[] }) {
  const listings = jobs ?? PLACEHOLDER_CAREER_LISTINGS
  return (
    <section id="careers" className="scroll-mt-24">
      <div className="flex flex-col items-start gap-6 pb-6 sm:pb-8 md:flex-row md:items-center md:justify-between md:gap-6 md:pb-10 lg:gap-8">
        <div className="w-full space-y-3 md:min-w-0 md:flex-1">
          <h2 className={sectionH2}>Explore Career Opportunities</h2>
          <p className={sectionLead}>
            Educators, researchers, and technologists united to close the math opportunity gap
          </p>
        </div>
        <img
          alt=""
          src={forTutorsAssets.experienceDecor}
          className={sectionDecorImgClass}
          aria-hidden
        />
      </div>

      <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
      {listings.length === 0 ? (
        <div className={cn("rounded-[30px] bg-[#E8F6EA] dark:bg-emerald-950/20", cardPaddingLatest)}>
          <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">No open jobs at this time. Check back soon!</p>
        </div>
      ) : (
      <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
        {listings.map((job) => (
          <div
            key={job.id}
            className={cn(
              "flex flex-col gap-3 rounded-[30px] bg-[#E8F6EA] dark:bg-emerald-950/20",
              cardPaddingLatest,
            )}
          >
            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2">
              <div className="row-start-1 flex items-center">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#297E43]">
                  <Microscope className="size-5 text-white" aria-hidden />
                </div>
              </div>
              <p className="row-start-1 col-start-2 self-center text-lg font-bold leading-tight tracking-tight text-[#297E43] sm:text-xl lg:text-2xl">
                {job.title}
              </p>
              <p className="col-start-2 row-start-2 text-base leading-relaxed text-muted-foreground lg:text-lg">
                {job.location}
              </p>
            </div>
            <div className="flex justify-end">
              <Link
                href={job.href}
                className={careersLearnMoreLinkClass}
                aria-label={`Learn more: ${job.title}`}
              >
                <span>Learn more</span>
                <ArrowRight
                  className="size-6 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
      )}

      <div
        className={cn("rounded-[30px] bg-[#E8F6EA] dark:bg-emerald-950/20", cardPaddingLatest)}
      >
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-3">
          <div className="row-start-1 flex items-center">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#297E43]">
              <FileText className="size-5 text-white" aria-hidden />
            </div>
          </div>
          <p className="row-start-1 col-start-2 self-center text-pretty text-lg font-bold leading-tight tracking-tight text-[#297E43] sm:text-xl lg:text-2xl">
            Don&apos;t See a Role That Fits?
          </p>
          <p className="col-start-2 row-start-2 text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
            Interested in joining us? Fill out the form below with any job-related questions.
          </p>
          <div className="col-start-2 row-start-3 mt-2 scroll-mt-24">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc0TFyKzbPu5WGHWc13SDQ5aOrUQZgAAC_MMp0hK467OAzjeQ/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                ctaLinkLayout,
                "inline-flex h-9 sm:h-11 min-w-[10rem] items-center justify-center rounded-full border-0 bg-[#4CAB65] px-8 text-sm sm:text-base font-medium text-white shadow-none transition-opacity hover:opacity-90 dark:bg-[#4CAB65] dark:text-white",
              )}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

// ─── Start Your Part-Time Tutoring Journey ────────────────────────────────────

export function GetInvolvedTutoringSection() {
  return (
    <section id="tutoring" className="scroll-mt-24">
      <div className="flex flex-col items-start gap-6 pb-6 sm:pb-8 md:flex-row md:items-center md:justify-between md:gap-6 md:pb-10 lg:gap-8">
        <div className="w-full space-y-3 md:min-w-0 md:flex-1">
          <h2 className={sectionH2}>Start Your Part-Time Tutoring Journey</h2>
          <p className={sectionLead}>
            Support students' learning in flexible part-time roles that make a difference every day
          </p>
        </div>
        <img
          alt=""
          src={forTutorsAssets.certificationDecor}
          className={sectionDecorImgClass}
          aria-hidden
        />
      </div>

      <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
      {/* Featured card */}
      <div
        className={cn(
          "overflow-hidden rounded-[30px] bg-[#FFF1C7] dark:bg-amber-950/20",
          cardPaddingLatest,
        )}
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-stretch md:gap-8">
          <div className="flex min-h-0 w-full flex-col justify-between gap-4 md:gap-6">
            <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2">
              <div className="row-start-1 flex items-start">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#A27707]">
                  <GraduationCap className="size-5 text-white" aria-hidden />
                </div>
              </div>
              <p className="row-start-1 col-start-2 self-start text-pretty text-lg font-bold leading-snug tracking-tight text-[#9A6D00] dark:text-amber-200 sm:text-xl lg:text-2xl">
                Becoming a Tutor at PLUS
              </p>
              <p className="col-start-2 row-start-2 text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
                If you're a college student or looking for flexible work, explore part-time tutoring
                opportunities with PLUS.
              </p>
            </div>
            <div className="flex shrink-0 justify-start pl-14 md:pt-0">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfnLoEbL_irrlGeoW6toMctQ8rstewQ1-PB4h7XwUKZAeXmVg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 sm:h-11 w-fit items-center justify-center rounded-full bg-[#FFC94B] px-8 text-sm sm:text-base font-medium text-[#463923] transition-opacity hover:opacity-95 dark:bg-[#FFC94B] dark:text-[#463923] dark:hover:opacity-95"
              >
                Become a Tutor
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl md:w-72 lg:w-80">
            <Image
              src="/figma/get-involved/tutoring-becoming-tutor.jpg"
              alt="Tutor working with a student during a PLUS session"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
        <div
          className={cn(
            "rounded-[30px] bg-[#FFF1C7] dark:bg-amber-950/20",
            cardPaddingLatest,
          )}
        >
          <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2">
            <div className="row-start-1 flex items-center">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#A27707]">
                <Heart className="size-5 text-white" aria-hidden />
              </div>
            </div>
            <p className="row-start-1 col-start-2 self-center text-pretty text-lg font-bold leading-snug tracking-tight text-[#9A6D00] dark:text-amber-200 sm:text-xl lg:text-2xl">
              No Prior Experience Needed
            </p>
            <p className="col-start-2 row-start-2 text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
              Join our team of motivated tutors! Semester-long virtual positions offer up to 10
              hours/week at $18/hr. Apply now!
            </p>
          </div>
        </div>
        <div
          className={cn(
            "rounded-[30px] bg-[#FFF1C7] dark:bg-amber-950/20",
            cardPaddingLatest,
          )}
        >
          <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2">
            <div className="row-start-1 flex items-center">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#A27707]">
                <BookOpen className="size-5 text-white" aria-hidden />
              </div>
            </div>
            <p className="row-start-1 col-start-2 self-center text-pretty text-lg font-bold leading-snug tracking-tight text-[#9A6D00] dark:text-amber-200 sm:text-xl lg:text-2xl">
              What You'll Do
            </p>
            <p className="col-start-2 row-start-2 text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
              Get PLUS training while math tutoring 1–4 middle school students. Mostly virtual, with
              some in-person opportunities.
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

// ─── Building Partnerships with PLUS ─────────────────────────────────────────

export function GetInvolvedPartnershipsSection() {
  return (
    <section id="partnerships" className="scroll-mt-24 space-y-6 sm:space-y-8 md:space-y-10">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
        <div className="w-full space-y-3 md:min-w-0 md:flex-1">
          <h2 className={sectionH2}>Building Partnerships with PLUS</h2>
          <p className={sectionLead}>
            Collaborate to create programs and initiatives that expand access to quality education
          </p>
        </div>
        <img
          alt=""
          src={forTutorsAssets.toolkitDecor}
          className={sectionDecorImgClass}
          aria-hidden
        />
      </div>

      <div
        className={cn(
          "rounded-[30px] bg-[#fdf0f6] dark:bg-[#fdf0f6]/[0.08]",
          cardPaddingLatest,
        )}
      >
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-3">
          <div className="row-start-1 flex items-center">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C6009C]">
              <FileText className="size-5 text-white" aria-hidden />
            </div>
          </div>
          <p className="row-start-1 col-start-2 self-center text-pretty text-lg font-bold text-[#C6009C] sm:text-xl lg:text-2xl dark:text-[#e879a9]">
            Contact Us to Learn More
          </p>
          <p className="col-start-2 row-start-2 text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
            Book a demo, explore joining a program, or reach out with general questions about
            partnerships — we&apos;d love to hear from you.
          </p>
          <div id="partnerships-contact-form" className="col-start-2 row-start-3 mt-2 scroll-mt-24">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc0TFyKzbPu5WGHWc13SDQ5aOrUQZgAAC_MMp0hK467OAzjeQ/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                ctaLinkLayout,
                "inline-flex h-9 sm:h-11 min-w-[10rem] items-center justify-center rounded-full border-0 bg-[#ECA8D3] px-8 text-sm sm:text-base font-medium text-[#690051] shadow-none transition-opacity hover:opacity-90 dark:bg-[#ECA8D3]/90 dark:text-[#690051]",
              )}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

export function GetInvolvedFinalCTA() {
  return (
    <section className="scroll-mt-24">
      <div
        className={cn(
          "mx-auto max-w-4xl space-y-6 rounded-3xl bg-white text-center dark:bg-transparent",
          cardPaddingLatest,
        )}
      >
        <h2 className="text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl lg:text-4xl">
          Get Involved at PLUS
        </h2>
        <p className="text-pretty text-base text-teal-900/75 lg:text-lg dark:text-white/90">
          Be part of our mission to make learning more accessible and impactful
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
          <Link href="/get-involved#careers" className={cn(ctaLinkLayout, primaryCta)}>
            Careers at PLUS
          </Link>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfnLoEbL_irrlGeoW6toMctQ8rstewQ1-PB4h7XwUKZAeXmVg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(ctaLinkLayout, outlineCta)}
          >
            Join as a Tutor
          </a>
        </div>
      </div>
    </section>
  )
}
