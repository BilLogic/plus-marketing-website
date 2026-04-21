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
import { forSchoolsAssets } from "@/components/marketing/for-schools-assets"
import {
  marketingCardContentInsetFromStepRowClass,
  marketingCardIconCircleClass,
  marketingCardLucideGlyphClass,
  marketingCardPaddingClass,
  marketingSectionHeaderDecorAbsoluteClass,
  marketingSectionHeaderDecorImgClass,
  marketingCardStackGapClass,
  marketingFinalCtaButtonRowClass,
  marketingFinalCtaOutlineLinkClass,
  marketingFinalCtaPrimaryLinkClass,
  marketingHeroCtaButtonRowClass,
  marketingHeroCtaOutlineLinkClass,
  marketingHeroCtaPrimaryLinkClass,
  marketingSectionIntroColumnClass,
  marketingSectionLeadColorClass,
  marketingSectionVerticalGapClass,
} from "@/lib/marketing-section-layout"
import { cn } from "@/lib/utils"
import type { JobListing } from "@/lib/notion/types"

// ─── Shared tokens (match about/for-tutors pages) ────────────────────────────

const sectionH2 =
  "text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl"

const sectionLead = cn(
  "w-full max-w-none text-base lg:text-lg",
  marketingSectionLeadColorClass,
)

const sectionHeaderDecorImgClass = cn(
  marketingSectionHeaderDecorImgClass,
  marketingSectionHeaderDecorAbsoluteClass,
)

/** Green careers card CTA — same **size** as impact pills (`h-9` / `px-5 sm:px-8`), not the cyan `marketingFinalCta*` pill. */
const careersGreenContactCtaClass = cn(
  "inline-flex w-fit self-start items-center justify-center whitespace-nowrap no-underline outline-none",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "h-9 sm:h-11 rounded-full border-0 bg-[#4CAB65] px-5 sm:px-8 text-sm sm:text-base font-medium text-white shadow-none transition-opacity hover:opacity-90 dark:bg-[#4CAB65] dark:text-white",
)

/** Partnerships pink CTA — same footprint; not the global cyan primary pill. */
const partnershipsPinkContactCtaClass = cn(
  "inline-flex w-fit self-start items-center justify-center whitespace-nowrap no-underline outline-none",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "h-9 sm:h-11 rounded-full border-0 bg-[#ECA8D3] px-5 sm:px-8 text-sm sm:text-base font-medium text-[#690051] shadow-none transition-opacity hover:opacity-90 dark:bg-[#ECA8D3]/90 dark:text-[#690051]",
)

/** Amber tutoring featured-card CTA — not `marketingFinalCtaPrimaryLinkClass` (that token is the cyan impact pill). */
const tutoringBecomeTutorCardCtaClass = cn(
  "inline-flex w-fit self-start items-center justify-center whitespace-nowrap no-underline outline-none",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "h-9 sm:h-11 rounded-full border-0 bg-[#FFC94B] px-5 sm:px-8 text-sm sm:text-base font-medium text-[#463923] shadow-none transition-opacity hover:opacity-95 dark:bg-[#FFC94B] dark:text-[#463923] dark:hover:opacity-95",
)

/** Learn more row — matches About `AboutSuccessStoriesSection` Read story link (size, arrow, interaction). */
const careersLearnMoreLinkClass =
  "group ml-auto inline-flex cursor-pointer items-center gap-2 text-lg font-medium text-[#297E43] no-underline transition-opacity hover:opacity-90 dark:text-[#297E43]"

/** Icon disc + title — flush to card top padding; `items-center` aligns title with the 48px circle (careers, tutoring, partnerships). */
const getInvolvedDiscTitleRowClass = "flex w-full shrink-0 items-center gap-3"

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function GetInvolvedHeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-6 overflow-hidden pt-8 pb-8 text-center min-h-[380px] sm:gap-8 sm:min-h-[440px] sm:pt-10 sm:pb-10 md:min-h-[500px] md:pt-12 md:pb-12 lg:min-h-[530px] lg:pt-14 lg:pb-14">
      <TutorsHeroDecorImg
        src={forSchoolsAssets.heroDecor[0]}
        className="max-w-[72px] sm:max-w-[130px] md:max-w-[150px] left-4 top-1/2 -translate-y-1/2 sm:left-6"
      />
      <TutorsHeroDecorImg
        src={forSchoolsAssets.heroDecor[1]}
        className="bottom-4 left-[16%] sm:bottom-6"
      />
      <TutorsHeroDecorImg
        src={forSchoolsAssets.heroDecor[2]}
        className="right-4 top-1/2 -translate-y-1/2 sm:right-6"
      />
      <TutorsHeroDecorImg
        src={forSchoolsAssets.heroDecor[3]}
        className="bottom-4 right-[16%] sm:bottom-6"
      />

      <div className="relative z-[1] flex max-w-3xl flex-col items-center gap-3 sm:gap-4 md:gap-5">
        <p className="text-2xl font-semibold text-teal-900 sm:text-3xl">
          Get Involved
        </p>
        <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-teal-950 sm:text-4xl md:text-5xl">
          Join PLUS and Make a Lasting Difference in Education
        </h1>
      </div>

      <div className={marketingHeroCtaButtonRowClass}>
        <Link href="/get-involved#careers" className={marketingHeroCtaPrimaryLinkClass}>
          Careers at PLUS
        </Link>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfnLoEbL_irrlGeoW6toMctQ8rstewQ1-PB4h7XwUKZAeXmVg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className={marketingHeroCtaOutlineLinkClass}
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
    <section id="why-work" className={cn("scroll-mt-24", marketingSectionVerticalGapClass)}>
      <div className="text-left">
        <div className="relative">
          <div
            className={cn(
              marketingSectionIntroColumnClass,
              "sm:space-y-1",
            )}
          >
            <h2 className={sectionH2}>Why Work at PLUS?</h2>
            <p className={sectionLead}>
              Join a team shaping the future of personalized learning. Become part of PLUS.
            </p>
          </div>
          <img
            alt=""
            src={forTutorsAssets.compensationDecor}
            className={sectionHeaderDecorImgClass}
            aria-hidden
          />
        </div>
      </div>

      {/* Phone: full list — light blue card per item */}
      <div className={cn("flex flex-col sm:hidden", marketingCardStackGapClass)}>
        {WHY_WORK_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <article
              key={item.id}
              className={cn(
                "flex flex-col gap-4 rounded-[30px] bg-sky-100 dark:bg-sky-950/35",
                marketingCardPaddingClass,
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(marketingCardIconCircleClass, "shrink-0 bg-[#007EB8] text-white")}
                  aria-hidden
                >
                  <Icon
                    className={cn(marketingCardLucideGlyphClass, "text-white")}
                    strokeWidth={2}
                  />
                </span>
                <div className="flex min-w-0 flex-col gap-3">
                  <h3 className="pt-[calc((3rem-1lh)/2)] text-pretty text-lg font-bold leading-tight tracking-tight text-[#007EB8] sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
                    {item.description}
                  </p>
                  {item.cta ? (
                    <Link
                      href="https://www.cmu.edu/hr/benefits/staff.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(marketingFinalCtaPrimaryLinkClass, "mt-1 w-fit")}
                    >
                      {item.cta}
                    </Link>
                  ) : null}
                </div>
              </div>
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
      <div
        className={cn(
          "hidden grid-cols-1 sm:grid md:grid-cols-2",
          marketingCardStackGapClass,
        )}
      >

        <div className="pb-[5vh]">
          {WHY_WORK_ITEMS.map((item, i) => {
            const isActive = i === activeIndex
            const Icon = item.icon
            return (
              <div
                key={item.id}
                ref={(el) => { itemRefs.current[i] = el }}
                className="py-10 sm:py-14 md:py-16 lg:py-20"
              >
                <div className="flex flex-col gap-5">
                  <div
                    className={cn(
                      marketingCardIconCircleClass,
                      "shrink-0 transition-colors duration-300",
                      isActive ? "bg-[#007EB8]" : "bg-foreground/20",
                    )}
                  >
                    <Icon
                      className={cn(marketingCardLucideGlyphClass, "text-white")}
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p
                      className={cn(
                        "text-pretty text-lg font-bold leading-tight tracking-tight transition-colors duration-300 sm:text-xl lg:text-2xl",
                        isActive ? "text-[#007EB8]" : "text-muted-foreground",
                      )}
                    >
                      {item.title}
                    </p>
                    {isActive ? (
                      <p className="text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
                        {item.description}
                      </p>
                    ) : null}
                    {isActive && item.cta ? (
                      <Link
                        href="https://www.cmu.edu/hr/benefits/staff.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(marketingFinalCtaPrimaryLinkClass, "mt-1 w-fit")}
                      >
                        {item.cta}
                      </Link>
                    ) : null}
                  </div>
                </div>
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
    <section id="careers" className={cn("scroll-mt-24", marketingSectionVerticalGapClass)}>
      <div className="text-left">
        <div className="relative">
          <div className={marketingSectionIntroColumnClass}>
            <h2 className={sectionH2}>Explore Career Opportunities</h2>
            <p className={sectionLead}>
              Educators, researchers, and technologists united to close the math opportunity gap.
            </p>
          </div>
          <img
            alt=""
            src={forTutorsAssets.experienceDecor}
            className={sectionHeaderDecorImgClass}
            aria-hidden
          />
        </div>
      </div>

      <div className={cn("flex flex-col", marketingCardStackGapClass)}>
      {listings.length === 0 ? (
        <div className={cn("rounded-[30px] bg-[#E8F6EA] dark:bg-emerald-950/20", marketingCardPaddingClass)}>
          <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">No open jobs at this time. Check back soon!</p>
        </div>
      ) : (
      <div className={cn("flex flex-col", marketingCardStackGapClass)}>
        {listings.map((job) => (
          <div
            key={job.id}
            className={cn(
              "flex flex-col gap-3 rounded-[30px] bg-[#E8F6EA] dark:bg-emerald-950/20",
              marketingCardPaddingClass,
            )}
          >
            <div className={getInvolvedDiscTitleRowClass}>
              <span
                className={cn(marketingCardIconCircleClass, "bg-[#297E43]")}
              >
                <Microscope
                  className={cn(marketingCardLucideGlyphClass, "text-white")}
                  aria-hidden
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold leading-tight tracking-tight text-[#297E43] sm:text-xl lg:text-2xl">
                  {job.title}
                </p>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground lg:text-lg">
                  {job.location}
                </p>
              </div>
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
        className={cn("rounded-[30px] bg-[#E8F6EA] dark:bg-emerald-950/20", marketingCardPaddingClass)}
      >
        <div className="flex items-start gap-3">
          <span className={cn(marketingCardIconCircleClass, "shrink-0 bg-[#297E43]")}>
            <FileText className={cn(marketingCardLucideGlyphClass, "text-white")} aria-hidden />
          </span>
          <div className="flex min-w-0 flex-col gap-3">
            <p className="pt-[calc((3rem-1lh)/2)] text-pretty text-lg font-bold leading-tight tracking-tight text-[#297E43] sm:text-xl lg:text-2xl">
              Don&apos;t See a Role That Fits?
            </p>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
              Interested in joining us? Fill out the form below with any job-related questions.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc0TFyKzbPu5WGHWc13SDQ5aOrUQZgAAC_MMp0hK467OAzjeQ/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(careersGreenContactCtaClass, "mt-1")}
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
    <section id="tutoring" className={cn("scroll-mt-24", marketingSectionVerticalGapClass)}>
      <div className="text-left">
        <div className="relative">
          <div className={marketingSectionIntroColumnClass}>
            <h2 className={sectionH2}>Start Your Part-Time Tutoring Journey</h2>
            <p className={sectionLead}>
              Support students&apos; learning in flexible part-time roles that make a difference every
              day.
            </p>
          </div>
          <img
            alt=""
            src={forTutorsAssets.certificationDecor}
            className={sectionHeaderDecorImgClass}
            aria-hidden
          />
        </div>
      </div>

      <div className={cn("flex flex-col", marketingCardStackGapClass)}>
      {/* Featured card */}
      <div
        className={cn(
          "overflow-hidden rounded-[30px] bg-[#FFF1C7] dark:bg-amber-950/20",
          marketingCardPaddingClass,
        )}
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-stretch md:gap-8">
          <div className="flex min-h-0 w-full flex-col justify-between gap-4 md:gap-6">
            <div className="flex flex-col gap-1">
              <div className={getInvolvedDiscTitleRowClass}>
                <span className={cn(marketingCardIconCircleClass, "bg-[#A27707]")}>
                  <GraduationCap
                    className={cn(marketingCardLucideGlyphClass, "text-white")}
                    aria-hidden
                  />
                </span>
                <p className="min-w-0 flex-1 text-pretty text-lg font-bold leading-snug tracking-tight text-[#9A6D00] dark:text-amber-200 sm:text-xl lg:text-2xl">
                  Becoming a Tutor at PLUS
                </p>
              </div>
              <p
                className={cn(
                  "text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg",
                  marketingCardContentInsetFromStepRowClass,
                )}
              >
                If you&apos;re a college student or looking for flexible work, explore part-time tutoring
                opportunities with PLUS.
              </p>
            </div>
            <div
              className={cn(
                "flex shrink-0 justify-start md:pt-0",
                marketingCardContentInsetFromStepRowClass,
              )}
            >
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfnLoEbL_irrlGeoW6toMctQ8rstewQ1-PB4h7XwUKZAeXmVg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className={tutoringBecomeTutorCardCtaClass}
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
      <div className={cn("grid sm:grid-cols-2", marketingCardStackGapClass)}>
        <div
          className={cn(
            "rounded-[30px] bg-[#FFF1C7] dark:bg-amber-950/20",
            marketingCardPaddingClass,
          )}
        >
          <div className={getInvolvedDiscTitleRowClass}>
            <span className={cn(marketingCardIconCircleClass, "bg-[#A27707]")}>
              <Heart
                className={cn(marketingCardLucideGlyphClass, "text-white")}
                aria-hidden
              />
            </span>
            <p className="min-w-0 flex-1 text-pretty text-lg font-bold leading-snug tracking-tight text-[#9A6D00] dark:text-amber-200 sm:text-xl lg:text-2xl">
              No Prior Experience Needed
            </p>
          </div>
          <p
            className={cn(
              "mt-1 text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg",
              marketingCardContentInsetFromStepRowClass,
            )}
          >
            Join our team of motivated tutors! Semester-long virtual positions offer up to 10
            hours/week at $18/hr. Apply now!
          </p>
        </div>
        <div
          className={cn(
            "rounded-[30px] bg-[#FFF1C7] dark:bg-amber-950/20",
            marketingCardPaddingClass,
          )}
        >
          <div className={getInvolvedDiscTitleRowClass}>
            <span className={cn(marketingCardIconCircleClass, "bg-[#A27707]")}>
              <BookOpen
                className={cn(marketingCardLucideGlyphClass, "text-white")}
                aria-hidden
              />
            </span>
            <p className="min-w-0 flex-1 text-pretty text-lg font-bold leading-snug tracking-tight text-[#9A6D00] dark:text-amber-200 sm:text-xl lg:text-2xl">
              What You&apos;ll Do
            </p>
          </div>
          <p
            className={cn(
              "mt-1 text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg",
              marketingCardContentInsetFromStepRowClass,
            )}
          >
            Get PLUS training while math tutoring 1–4 middle school students. Mostly virtual, with
            some in-person opportunities.
          </p>
        </div>
      </div>
      </div>
    </section>
  )
}

// ─── Building Partnerships with PLUS ─────────────────────────────────────────

export function GetInvolvedPartnershipsSection() {
  return (
    <section id="partnerships" className={cn("scroll-mt-24", marketingSectionVerticalGapClass)}>
      <div className="text-left">
        <div className="relative">
          <div className={marketingSectionIntroColumnClass}>
            <h2 className={sectionH2}>Building Partnerships with PLUS</h2>
            <p className={sectionLead}>
              Collaborate to create programs and initiatives that expand access to quality education.
            </p>
          </div>
          <img
            alt=""
            src={forTutorsAssets.toolkitDecor}
            className={sectionHeaderDecorImgClass}
            aria-hidden
          />
        </div>
      </div>

      <div
        className={cn(
          "rounded-[30px] bg-[#fdf0f6] dark:bg-[#fdf0f6]/[0.08]",
          marketingCardPaddingClass,
        )}
      >
        <div className="flex items-start gap-3">
          <span className={cn(marketingCardIconCircleClass, "shrink-0 bg-[#C6009C]")}>
            <FileText className={cn(marketingCardLucideGlyphClass, "text-white")} aria-hidden />
          </span>
          <div className="flex min-w-0 flex-col gap-3">
            <p className="pt-[calc((3rem-1lh)/2)] text-pretty text-lg font-bold text-[#C6009C] sm:text-xl lg:text-2xl dark:text-[#e879a9]">
              Contact Us to Learn More
            </p>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
              Book a demo, explore joining a program, or reach out with general questions about
              partnerships — we&apos;d love to hear from you.
            </p>
            <div id="partnerships-contact-form" className="mt-1 scroll-mt-24">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc0TFyKzbPu5WGHWc13SDQ5aOrUQZgAAC_MMp0hK467OAzjeQ/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className={partnershipsPinkContactCtaClass}
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

// ─── Final CTA ────────────────────────────────────────────────────────────────

export function GetInvolvedFinalCTA() {
  return (
    <section className="scroll-mt-24">
      <div
        className={cn(
          "mx-auto max-w-4xl space-y-6 rounded-3xl bg-white text-center dark:bg-transparent",
          marketingCardPaddingClass,
        )}
      >
        <h2 className="text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl lg:text-4xl">
          Get Involved at PLUS
        </h2>
        <p className={cn("text-pretty text-base lg:text-lg", marketingSectionLeadColorClass)}>
          Be part of our mission to make learning more accessible and impactful.
        </p>
        <div className={marketingFinalCtaButtonRowClass}>
          <Link href="/get-involved#careers" className={marketingFinalCtaPrimaryLinkClass}>
            Careers at PLUS
          </Link>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfnLoEbL_irrlGeoW6toMctQ8rstewQ1-PB4h7XwUKZAeXmVg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className={marketingFinalCtaOutlineLinkClass}
          >
            Join as a Tutor
          </a>
        </div>
      </div>
    </section>
  )
}
