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
  ClipboardList,
  ChevronDown,
  HandCoins,
  DollarSign,
  Hospital,
  School,
} from "lucide-react"
import { TutorsHeroDecorImg } from "@/components/marketing/for-tutors-sections"
import { forTutorsAssets } from "@/components/marketing/for-tutors-assets"
import { cn } from "@/lib/utils"

// ─── Shared tokens (match about/for-tutors pages) ────────────────────────────

const sectionH2 =
  "text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl"

const sectionLead =
  "w-full max-w-none text-pretty text-lg text-teal-900/75 dark:text-white/90"

const primaryCta =
  "h-11 rounded-full border-0 bg-[#A6EDF4] px-8 text-base font-normal text-[#004247] shadow-none transition-opacity hover:bg-[#A6EDF4] hover:opacity-95 hover:text-[#004247] dark:bg-[#A6EDF4] dark:text-[#004247] dark:hover:bg-[#A6EDF4]"

const outlineCta =
  "h-11 rounded-full border-2 border-[#A6EDF4] bg-transparent px-8 text-base font-medium text-teal-950 hover:border-[#A6EDF4] hover:bg-[#A6EDF4]/15 dark:text-white dark:hover:bg-[#A6EDF4]/20"

const ctaLinkLayout =
  "inline-flex items-center justify-center whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

const sectionDecorImgClass =
  "pointer-events-none hidden h-auto w-28 max-w-[140px] shrink-0 opacity-90 select-none md:block md:w-32 md:max-w-[165px] lg:w-36 lg:max-w-[180px]"

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function GetInvolvedHeroSection() {
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

      <div className="relative z-[1] flex max-w-3xl flex-col items-center gap-4 sm:gap-5">
        <p className="text-2xl font-semibold text-teal-900 sm:text-3xl">
          Get Involved
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-teal-950 sm:text-5xl">
          Join PLUS and Make a Lasting Difference in Education
        </h1>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:mt-8">
        <Link href="/get-involved#careers" className={cn(ctaLinkLayout, primaryCta)}>
          Careers at PLUS
        </Link>
        <Link href="/for-tutors" className={cn(ctaLinkLayout, outlineCta)}>
          Join as a Tutor
        </Link>
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
    panelArt: "/figma/get-involved/why-work-benefits.png",
  },
  {
    id: "pto",
    title: "Paid Time Off",
    description:
      "Generous PTO and flexible scheduling so you can recharge and show up at your best.",
    cta: "",
    icon: DollarSign,
    panelArt: "/figma/get-involved/why-work-pto.png",
  },
  {
    id: "health",
    title: "Full Health Coverage",
    description:
      "Comprehensive medical, dental, and vision coverage for you and your family.",
    cta: "",
    icon: Hospital,
    panelArt: "/figma/get-involved/why-work-health.png",
  },
  {
    id: "tuition",
    title: "Tuition Benefits",
    description:
      "Invest in your future with tuition reimbursement and professional development support.",
    cta: "",
    icon: School,
    panelArt: "/figma/get-involved/why-work-tuition.png",
  },
] as const

export function GetInvolvedWhyWorkSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [headerHeight, setHeaderHeight] = useState(120)
  const headerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const measure = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    itemRefs.current.forEach((el, i) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i) },
        { threshold: 0, rootMargin: "-25% 0px -25% 0px" }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section id="why-work" className="scroll-mt-24">

      {/* Sticky section header */}
      <div ref={headerRef} className="pb-8">
        <div className="flex flex-col items-center gap-6 sm:items-start md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
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

      {/* Two-column: left scrolls, right sticky just below header */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">

        {/* Left: all items stacked */}
        <div className="pb-[5vh]">
          {WHY_WORK_ITEMS.map((item, i) => {
            const isActive = i === activeIndex
            const Icon = item.icon
            return (
              <div
                key={item.id}
                ref={(el) => { itemRefs.current[i] = el }}
                className="flex flex-col gap-5 py-16 sm:py-20"
              >
                <div className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                  isActive ? "bg-[#007EB8]" : "bg-foreground/20"
                )}>
                  <Icon className="size-5 text-white" strokeWidth={2} />
                </div>
                <p className={cn(
                  "text-pretty text-xl font-bold leading-snug tracking-tight transition-colors duration-300 sm:text-2xl",
                  isActive ? "text-[#007EB8]" : "text-muted-foreground"
                )}>
                  {item.title}
                </p>
                {isActive && (
                  <>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    {item.cta && (
                      <Link href="#" className={cn(ctaLinkLayout, primaryCta, "mt-2 w-fit no-underline")}>
                        {item.cta}
                      </Link>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Right: sticky image pinned just below the sticky header */}
        <div className="hidden md:block" style={{ minHeight: headerHeight + 16 + 400 }}>
          <div className="sticky" style={{ top: headerHeight + 16 }}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
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

const CAREER_LISTINGS = [
  {
    title: "Post Doctoral Fellow",
    location: "Pittsburgh, PA",
    href: "#",
  },
  {
    title: "Post Doctoral Fellow",
    location: "Pittsburgh, PA",
    href: "#",
  },
] as const

export function GetInvolvedCareersSection() {
  return (
    <section id="careers" className="scroll-mt-24 space-y-8 sm:space-y-10">
      <div className="flex flex-col items-center gap-6 sm:items-start md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
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

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
        {CAREER_LISTINGS.map((job, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-3xl bg-[#E8F6EA] px-6 py-7 dark:bg-emerald-950/20 md:px-8 md:py-8"
          >
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#297E43]">
                <Microscope className="size-5 text-white" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xl font-bold leading-tight tracking-tight text-teal-950 dark:text-white sm:text-2xl">
                  {job.title}
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {job.location}
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Link
                href={job.href}
                className="flex items-center gap-1 text-sm font-medium text-[#297E43] hover:underline"
              >
                Learn more <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Start Your Part-Time Tutoring Journey ────────────────────────────────────

export function GetInvolvedTutoringSection() {
  return (
    <section id="tutoring" className="scroll-mt-24 space-y-8 sm:space-y-10">
      <div className="flex flex-col items-center gap-6 sm:items-start md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
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

      {/* Featured card */}
      <div className="overflow-hidden rounded-3xl bg-[#FFF1C7] px-6 py-7 dark:bg-amber-950/20 md:px-8 md:py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-8">
          <div className="flex flex-1 gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center self-start rounded-full bg-[#A27707]">
              <GraduationCap className="size-5 text-white" />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-4">
              <div className="space-y-2">
                <p className="text-pretty text-xl font-bold leading-snug tracking-tight text-[#9A6D00] dark:text-amber-200 sm:text-2xl">
                  Becoming a Tutor at PLUS
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  If you're a college student or looking for flexible work, explore part-time tutoring
                  opportunities with PLUS.
                </p>
              </div>
              <Link
                href="/for-tutors"
                className="inline-flex h-11 w-fit items-center justify-center rounded-full bg-amber-300 px-8 text-base font-medium text-amber-950 transition-colors hover:bg-amber-400 dark:bg-amber-700 dark:text-white dark:hover:bg-amber-600"
              >
                Become a Tutor
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl md:w-72 lg:w-80">
            <Image
              src={forTutorsAssets.experienceSessionPhoto}
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
        <div className="flex flex-col gap-4 rounded-3xl bg-[#FFF1C7] px-6 py-7 dark:bg-amber-950/20 md:px-8 md:py-8">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#A27707]">
              <Heart className="size-5 text-white" />
            </div>
            <div className="space-y-2">
              <p className="text-pretty text-xl font-bold leading-snug tracking-tight text-[#9A6D00] dark:text-amber-200 sm:text-2xl">
                No Prior Experience Needed
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Join our team of motivated tutors! Semester-long virtual positions offer up to 10
                hours/week at $18/hr. Apply now!
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-3xl bg-[#FFF1C7] px-6 py-7 dark:bg-amber-950/20 md:px-8 md:py-8">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#A27707]">
              <BookOpen className="size-5 text-white" />
            </div>
            <div className="space-y-2">
              <p className="text-pretty text-xl font-bold leading-snug tracking-tight text-[#9A6D00] dark:text-amber-200 sm:text-2xl">
                What You'll Do
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section id="partnerships" className="scroll-mt-24 space-y-8 sm:space-y-10">
      <div className="flex flex-col items-center gap-6 sm:items-start md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
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

      {/* Collapsible contact card */}
      <div className="rounded-3xl bg-[#FFE8F6] px-6 py-7 dark:bg-[#FFE8F6]/10 md:px-8 md:py-8">
        {/* Header: icon + title + description */}
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C6009C]">
            <ClipboardList className="size-5 text-white" />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-bold text-[#C6009C] sm:text-2xl">
              Contact Us to Learn More
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              You can book a demo, sign up to join, or reach out with any general questions or
              inquiries by filling out the form below — we&apos;d love to hear from you!
            </p>
          </div>
        </div>

        {/* Learn more toggle — right aligned */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-medium text-[#C6009C] hover:underline"
          >
            Learn more
            <ChevronDown
              className={cn("size-4 transition-transform duration-300", isOpen && "rotate-180")}
            />
          </button>
        </div>

        {/* Expandable: PLUS logo + Google Form */}
        {isOpen && (
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center justify-center rounded-2xl bg-white p-8 dark:bg-card">
              <img
                src="/plus-logo.png"
                alt="PLUS Personalized Learning logo"
                className="h-auto w-40 object-contain"
              />
            </div>
            <div className="overflow-hidden rounded-2xl bg-white dark:bg-card">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSf_placeholder/viewform?embedded=true"
                width="100%"
                height="600"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Contact PLUS form"
                className="block"
              >
                Loading…
              </iframe>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Research Partnership Opportunities ───────────────────────────────────────

export function GetInvolvedResearchSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section id="research-partnerships" className="scroll-mt-24 space-y-8 sm:space-y-10">
      <div className="flex flex-col items-center gap-6 sm:items-start md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
        <div className="w-full space-y-3 md:min-w-0 md:flex-1">
          <h2 className={sectionH2}>Research Partnership Opportunities</h2>
          <p className={sectionLead}>
            Partner with us to advance research and improve learning outcomes for students
          </p>
        </div>
        <img
          alt=""
          src={forTutorsAssets.voicesDecor}
          className={sectionDecorImgClass}
          aria-hidden
        />
      </div>

      {/* Collapsible contact card */}
      <div className="rounded-3xl bg-[#FFEAEA] px-6 py-7 dark:bg-[#FFEAEA]/10 md:px-8 md:py-8">
        {/* Header: icon + title + description */}
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#B44F52]">
            <ClipboardList className="size-5 text-white" />
          </div>
          <div className="space-y-2">
            <p className="text-pretty text-xl font-bold leading-snug tracking-tight text-[#B44F52] sm:text-2xl">
              Contact Us for Research Partnerships
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              You can book a demo, sign up to join, or reach out with any general questions or
              inquiries by filling out the form below — we&apos;d love to hear from you!
            </p>
          </div>
        </div>

        {/* Learn more toggle — right aligned */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-medium text-[#B44F52] hover:underline"
          >
            Learn more
            <ChevronDown
              className={cn("size-4 transition-transform duration-300", isOpen && "rotate-180")}
            />
          </button>
        </div>

        {/* Expandable: PLUS logo + Google Form */}
        {isOpen && (
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center justify-center rounded-2xl bg-white p-8 dark:bg-card">
              <img
                src="/plus-logo.png"
                alt="PLUS Personalized Learning logo"
                className="h-auto w-40 object-contain"
              />
            </div>
            <div className="overflow-hidden rounded-2xl bg-white dark:bg-card">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSf_placeholder/viewform?embedded=true"
                width="100%"
                height="600"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Contact PLUS research form"
                className="block"
              >
                Loading…
              </iframe>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

export function GetInvolvedFinalCTA() {
  return (
    <section className="scroll-mt-24">
      <div className="mx-auto max-w-4xl space-y-6 rounded-3xl bg-white p-8 text-center dark:bg-transparent sm:p-12">
        <h2 className="text-3xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-4xl">
          Get Involved at PLUS
        </h2>
        <p className="text-pretty text-lg text-teal-900/75 dark:text-white/90">
          Be part of our mission to make learning more accessible and impactful
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/get-involved#careers" className={cn(ctaLinkLayout, primaryCta)}>
            Careers at PLUS
          </Link>
          <Link href="/for-tutors" className={cn(ctaLinkLayout, outlineCta)}>
            Join as a Tutor
          </Link>
        </div>
      </div>
    </section>
  )
}
