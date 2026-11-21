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
import { marketingTypography } from "@/lib/marketing-typography"
import { cn } from "@/lib/utils"
import type { JobListing } from "@/lib/notion/types"

// ─── Shared tokens (match about/for-tutors pages) ────────────────────────────

const sectionH2 =
  "text-pretty text-heading-lg text-(--ds-text-accent-teal-bolder) sm:text-heading-xl md:text-heading-xxl"

const sectionLead = cn(
  "w-full max-w-none text-body-lg",
  marketingSectionLeadColorClass,
)

const sectionHeaderDecorImgClass = cn(
  marketingSectionHeaderDecorImgClass,
  marketingSectionHeaderDecorAbsoluteClass,
)

/** Green careers card CTA — same size as impact pills, not the cyan `marketingFinalCta*` pill. */
const careersGreenContactCtaClass = cn(
  "inline-flex w-fit self-start items-center justify-center whitespace-nowrap no-underline outline-none",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "h-9 sm:h-11 rounded-full border-0 bg-(--ds-background-accent-green-bolder) px-5 sm:px-8 text-body-default sm:text-body-lg font-medium text-(--ds-text-inverse) shadow-none transition-opacity hover:opacity-90",
)

/**
 * Form A (schools / research / contact) — embedded inline on the Get Involved
 * Partnerships "Contact Us" spot instead of redirecting out.
 */
const CONTACT_FORM_EMBED_SRC =
  "https://docs.google.com/forms/d/e/1FAIpQLSc0TFyKzbPu5WGHWc13SDQ5aOrUQZgAAC_MMp0hK467OAzjeQ/viewform?embedded=true"

/**
 * Inline Google Form embed. Google Form iframes don't auto-resize to content, so
 * the height is fixed (the iframe scrolls internally if the form is longer).
 */
function GoogleFormEmbed({ title }: { title: string }) {
  return (
    <div className="mt-2 w-full overflow-hidden rounded-2xl bg-(--ds-surface) ring-1 ring-black/5">
      <iframe
        src={CONTACT_FORM_EMBED_SRC}
        title={title}
        loading="lazy"
        className="block h-[720px] w-full border-0"
      >
        Loading…
      </iframe>
    </div>
  )
}

/** Amber tutoring featured-card CTA — not `marketingFinalCtaPrimaryLinkClass` (that token is the cyan impact pill). */
const tutoringBecomeTutorCardCtaClass = cn(
  "inline-flex w-fit self-start items-center justify-center whitespace-nowrap no-underline outline-none",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "h-9 sm:h-11 rounded-full border-0 bg-(--ds-background-accent-yellow-bolder) px-5 sm:px-8 text-body-default sm:text-body-lg font-medium text-(--ds-text-inverse) shadow-none transition-opacity hover:opacity-95",
)

/** Learn more row — matches About `AboutSuccessStoriesSection` Read story link (size, arrow, interaction). */
const careersLearnMoreLinkClass =
  "group ml-auto inline-flex cursor-pointer items-center gap-2 text-body-default font-medium sm:text-body-lg text-(--ds-text-accent-green) no-underline transition-opacity hover:opacity-90"

/** Icon disc + title — flush to card top padding; `items-center` aligns title with the 48px circle (careers, tutoring, partnerships). */
const getInvolvedDiscTitleRowClass = "flex w-full shrink-0 items-center gap-3"

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function GetInvolvedHeroSection() {
  return (
    <section className="relative mx-auto w-full max-w-7xl min-w-0 overflow-hidden flex flex-col justify-center min-h-[380px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[530px] pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14">
      {/** Same four-corner hero art + breakpoints as `AboutHeroSection`. */}
      <TutorsHeroDecorImg
        src={forSchoolsAssets.heroDecor[0]}
        className="hidden lg:block lg:max-w-[110px] xl:max-w-[130px] left-[10%] top-[18%] min-[1800px]:left-[4%]"
      />
      <TutorsHeroDecorImg
        src={forSchoolsAssets.heroDecor[1]}
        className="hidden lg:block lg:max-w-[110px] xl:max-w-[130px] left-[5%] top-[54%] min-[1800px]:left-[0%]"
      />
      <TutorsHeroDecorImg
        src={forSchoolsAssets.heroDecor[2]}
        className="hidden lg:block lg:max-w-[110px] xl:max-w-[130px] right-[10%] top-[18%] min-[1800px]:right-[4%]"
      />
      <TutorsHeroDecorImg
        src={forSchoolsAssets.heroDecor[3]}
        className="hidden lg:block lg:max-w-[110px] xl:max-w-[130px] right-[5%] top-[54%] min-[1800px]:right-[0%]"
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 text-center sm:gap-8 sm:px-6 min-[1800px]:max-w-5xl">
        <h1 className="flex flex-col items-center gap-3 sm:gap-4">
          <span className="text-heading-lg text-(--ds-text-accent-teal-bolder) sm:text-heading-xl">
            Get Involved
          </span>
          <span className={cn(marketingTypography.heroH1, "max-w-prose")}>
            Join PLUS and Make a Lasting Difference in Education
          </span>
        </h1>
        <div className={marketingHeroCtaButtonRowClass}>
          <Link href="/get-involved#careers" className={marketingHeroCtaPrimaryLinkClass}>
            Careers at PLUS
          </Link>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfnLoEbL_irrlGeoW6toMctQ8rstewQ1-PB4h7XwUKZAeXmVg/viewform"
            data-cta-location="hero"
            target="_blank"
            rel="noopener noreferrer"
            className={marketingHeroCtaOutlineLinkClass}
          >
            Join as a Tutor
          </a>
        </div>
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
    cta: "Learn More",
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

/** Copy column — full width when stacked (`max-md`); shares row with art from `md` up. */
const whyWorkZigzagTextColClass = cn(
  "flex w-full min-w-0 flex-col items-start gap-[18px]",
  "max-md:max-w-[min(36rem,100%)] max-md:self-start",
  "md:min-w-0 md:flex-1 md:basis-0 md:max-w-[min(28rem,52%)]",
  "lg:w-[473px] lg:max-w-[473px] lg:flex-none lg:basis-auto min-[1800px]:w-[560px] min-[1800px]:max-w-[560px]",
)

function WhyWorkZigzagPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full min-w-0">
      <div className="relative w-full overflow-hidden rounded-(--ds-radius-xxl) bg-muted/30">
        <div className="relative aspect-[556/472] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element -- public static asset; parity with ImpactRowPhoto */}
          <img alt={alt} src={src} className="absolute inset-0 size-full object-cover" />
        </div>
      </div>
    </div>
  )
}

export function GetInvolvedWhyWorkSection() {
  return (
    <section id="why-work" className={cn("scroll-mt-24", marketingSectionVerticalGapClass)}>
      <div className="relative w-full text-left">
        <div className="relative">
          <div className={cn(marketingSectionIntroColumnClass, "sm:space-y-1")}>
            <h2 className={sectionH2}>Why Work at PLUS?</h2>
            <p className={sectionLead}>
              Join our full-time staff team shaping the future of personalized learning. The
              benefits below are for full-time staff roles, not tutoring positions.
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

      <div className="mx-auto flex w-full max-w-[1122px] flex-col space-y-10 md:space-y-12 lg:space-y-16 min-[1800px]:max-w-[1400px] min-[1800px]:space-y-20">
        {WHY_WORK_ITEMS.map((item, i) => {
          const Icon = item.icon
          /** From `md` up: zigzag via flex order. Below `md`: stacked copy → photo. */
          const imageOnLeftWide = i % 2 === 1
          const copyCol = (
            <div
              className={cn(
                whyWorkZigzagTextColClass,
                "shrink-0",
                imageOnLeftWide ? "md:order-2" : "md:order-1",
              )}
            >
              <span
                className={cn(
                  marketingCardIconCircleClass,
                  "shrink-0 bg-(--ds-background-accent-blue-bolder) text-(--ds-text-inverse)",
                )}
                aria-hidden
              >
                <Icon
                  className={cn(marketingCardLucideGlyphClass, "text-(--ds-text-inverse)")}
                  strokeWidth={2}
                />
              </span>
              <p
                className={cn(
                  "text-pretty text-heading-sm text-(--ds-text-accent-blue) sm:text-heading-md lg:text-heading-lg",
                )}
              >
                {item.title}
              </p>
              <p className={sectionLead}>{item.description}</p>
              {item.cta ? (
                <Link
                  href="https://www.cmu.edu/hr/benefits/staff.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(marketingHeroCtaPrimaryLinkClass, "w-fit self-start")}
                >
                  {item.cta}
                </Link>
              ) : null}
            </div>
          )
          const photoCol = (
            <div
              className={cn(
                "w-full min-w-0 shrink-0",
                "max-md:mx-auto max-md:max-w-[min(36rem,100%)]",
                "md:max-w-[min(320px,44%)] md:basis-[min(320px,44%)]",
                "lg:min-w-0 lg:max-w-[556px] lg:flex-1 lg:basis-0 min-[1800px]:max-w-[680px]",
                imageOnLeftWide ? "md:order-1" : "md:order-2",
              )}
            >
              <WhyWorkZigzagPhoto src={item.panelArt} alt={item.title} />
            </div>
          )
          return (
            <div
              key={item.id}
              className={cn(
                "flex w-full flex-col items-stretch gap-6 sm:gap-8",
                "md:flex-row md:items-center md:justify-between md:gap-5 lg:gap-8 xl:gap-[93px]",
              )}
            >
              {copyCol}
              {photoCol}
            </div>
          )
        })}
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
        <div className={cn("rounded-(--ds-radius-xxl) bg-(--ds-background-accent-green-subtler)", marketingCardPaddingClass)}>
          <p className="text-body-lg text-muted-foreground">No open jobs at this time. Check back soon!</p>
        </div>
      ) : (
      <div className={cn("flex flex-col", marketingCardStackGapClass)}>
        {listings.map((job) => (
          <div
            key={job.id}
            className={cn(
              "flex flex-col gap-3 rounded-(--ds-radius-xxl) bg-(--ds-background-accent-green-subtler)",
              marketingCardPaddingClass,
            )}
          >
            <div className={getInvolvedDiscTitleRowClass}>
              <span
                className={cn(marketingCardIconCircleClass, "bg-(--ds-background-accent-green-bolder)")}
              >
                <Microscope
                  className={cn(marketingCardLucideGlyphClass, "text-(--ds-text-inverse)")}
                  aria-hidden
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-heading-sm text-(--ds-text-accent-green) sm:text-heading-md lg:text-heading-lg">
                  {job.title}
                </p>
                <p className="mt-1 text-body-lg text-muted-foreground">
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
                <span>Learn More</span>
                <ArrowRight
                  className="size-5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
      )}

      <div
        className={cn("rounded-(--ds-radius-xxl) bg-(--ds-background-accent-green-subtler)", marketingCardPaddingClass)}
      >
        <div className="flex items-start gap-3">
          <span className={cn(marketingCardIconCircleClass, "shrink-0 bg-(--ds-background-accent-green-bolder)")}>
            <FileText className={cn(marketingCardLucideGlyphClass, "text-(--ds-text-inverse)")} aria-hidden />
          </span>
          <div className="flex min-w-0 flex-col gap-3">
            <p className="pt-[calc((3rem-1lh)/2)] text-pretty text-heading-sm text-(--ds-text-accent-green) sm:text-heading-md lg:text-heading-lg">
              Don&apos;t See a Role That Fits?
            </p>
            <p className="text-pretty text-body-lg text-muted-foreground">
              Interested in joining us? Reach out with any job-related questions.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc0TFyKzbPu5WGHWc13SDQ5aOrUQZgAAC_MMp0hK467OAzjeQ/viewform?usp=header"
              data-cta-location="card"
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
          "overflow-hidden rounded-(--ds-radius-xxl) bg-(--ds-background-accent-yellow-subtler)",
          marketingCardPaddingClass,
        )}
      >
        <div className="grid gap-6 md:grid-cols-2 md:items-stretch md:gap-8">
          <div className="flex min-h-0 w-full flex-col justify-between gap-4 md:gap-6">
            <div className="flex flex-col gap-1">
              <div className={getInvolvedDiscTitleRowClass}>
                <span className={cn(marketingCardIconCircleClass, "bg-(--ds-background-accent-yellow-bolder)")}>
                  <GraduationCap
                    className={cn(marketingCardLucideGlyphClass, "text-(--ds-text-inverse)")}
                    aria-hidden
                  />
                </span>
                <p className="min-w-0 flex-1 text-pretty text-heading-sm text-(--ds-text-accent-yellow) sm:text-heading-md lg:text-heading-lg">
                  Becoming a Tutor at PLUS
                </p>
              </div>
              <p
                className={cn(
                  "text-pretty text-body-lg text-muted-foreground",
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
                data-cta-location="card"
                target="_blank"
                rel="noopener noreferrer"
                className={tutoringBecomeTutorCardCtaClass}
              >
                Become a Tutor
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:aspect-[16/9]">
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
            "rounded-(--ds-radius-xxl) bg-(--ds-background-accent-yellow-subtler)",
            marketingCardPaddingClass,
          )}
        >
          <div className={getInvolvedDiscTitleRowClass}>
            <span className={cn(marketingCardIconCircleClass, "bg-(--ds-background-accent-yellow-bolder)")}>
              <Heart
                className={cn(marketingCardLucideGlyphClass, "text-(--ds-text-inverse)")}
                aria-hidden
              />
            </span>
            <p className="min-w-0 flex-1 text-pretty text-heading-sm text-(--ds-text-accent-yellow) sm:text-heading-md lg:text-heading-lg">
              No Prior Experience Needed
            </p>
          </div>
          <p
            className={cn(
              "mt-1 text-pretty text-body-lg text-muted-foreground",
              marketingCardContentInsetFromStepRowClass,
            )}
          >
            Join our team of motivated tutors! Semester-long virtual positions offer up to 10
            hours/week at $18+. Apply now!
          </p>
        </div>
        <div
          className={cn(
            "rounded-(--ds-radius-xxl) bg-(--ds-background-accent-yellow-subtler)",
            marketingCardPaddingClass,
          )}
        >
          <div className={getInvolvedDiscTitleRowClass}>
            <span className={cn(marketingCardIconCircleClass, "bg-(--ds-background-accent-yellow-bolder)")}>
              <BookOpen
                className={cn(marketingCardLucideGlyphClass, "text-(--ds-text-inverse)")}
                aria-hidden
              />
            </span>
            <p className="min-w-0 flex-1 text-pretty text-heading-sm text-(--ds-text-accent-yellow) sm:text-heading-md lg:text-heading-lg">
              What You&apos;ll Do
            </p>
          </div>
          <p
            className={cn(
              "mt-1 text-pretty text-body-lg text-muted-foreground",
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
          "rounded-(--ds-radius-xxl) bg-(--ds-background-accent-magenta-subtler)",
          marketingCardPaddingClass,
        )}
      >
        <div className="flex items-start gap-3">
          <span className={cn(marketingCardIconCircleClass, "shrink-0 bg-(--ds-background-accent-magenta-bolder)")}>
            <FileText className={cn(marketingCardLucideGlyphClass, "text-(--ds-text-inverse)")} aria-hidden />
          </span>
          <div className="flex min-w-0 flex-col gap-3">
            <p className="pt-[calc((3rem-1lh)/2)] text-pretty text-heading-sm text-(--ds-text-accent-magenta) sm:text-heading-md lg:text-heading-lg">
              Contact Us to Learn More
            </p>
            <p className="text-pretty text-body-lg text-muted-foreground">
              Book a demo, explore joining a program, or reach out with general questions about
              partnerships — we&apos;d love to hear from you.
            </p>
          </div>
        </div>
        <div id="partnerships-contact-form" className="mt-4 scroll-mt-24">
          <GoogleFormEmbed title="Partnerships inquiry form" />
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
          "mx-auto max-w-4xl space-y-6 rounded-(--ds-radius-xl) bg-(--ds-surface) text-center",
          marketingCardPaddingClass,
        )}
      >
        <h2 className="text-heading-lg text-(--ds-text-accent-teal-bolder) sm:text-heading-xl lg:text-heading-xxl">
          Get Involved at PLUS
        </h2>
        <p className={cn("text-pretty text-body-lg", marketingSectionLeadColorClass)}>
          Be part of our mission to make learning more accessible and impactful.
        </p>
        <div className={marketingFinalCtaButtonRowClass}>
          <Link href="/get-involved#careers" className={marketingFinalCtaPrimaryLinkClass}>
            Careers at PLUS
          </Link>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfnLoEbL_irrlGeoW6toMctQ8rstewQ1-PB4h7XwUKZAeXmVg/viewform"
            data-cta-location="final_cta"
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
