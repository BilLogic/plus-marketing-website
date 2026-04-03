"use client"

import { useReducedMotion } from "framer-motion"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  ScrollAccordion,
  type ScrollAccordionItem,
} from "@/components/ui/scroll-accordion"
import { DayToDayExperienceSection } from "@/components/marketing/day-to-day-experience-section"
import { EXPERIENCE_BENTO_STEPS } from "@/components/marketing/for-schools-experience-bento"
import { cn } from "@/lib/utils"
import { BenefitsAccordionIcon } from "@/components/marketing/benefit-accordion-icons"
import { forSchoolsAssets } from "@/components/marketing/for-schools-assets"
import { marketingTypography } from "@/lib/marketing-typography"
import { forSchoolsSectionIds } from "@/lib/plus-footer-ia"

/** Match `for-tutors-sections` typography colors for headings and supporting text. */
const schoolsSectionH2 =
  "text-2xl font-bold tracking-tight text-teal-950 sm:text-3xl"
const schoolsSectionLead = "max-w-3xl text-lg text-muted-foreground"

export const SchoolsHeroSection = () => {
  return (
    <section className="relative flex min-h-[calc(100svh-5.5rem)] flex-col justify-center">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-4 py-12 text-center sm:gap-10 sm:px-6 sm:py-16 md:py-20">
        <h1 className="flex flex-col items-center gap-3 sm:gap-4">
          <span className="text-2xl font-semibold text-teal-900 sm:text-3xl">
            For schools
          </span>
          <span
            className={cn(
              marketingTypography.h1,
              "max-w-prose text-balance text-teal-950"
            )}
          >
            Research-driven, AI-powered Support for Every Classroom
          </span>
        </h1>
        <Button variant="plusNavCta" size="navCta">
          Get Started for Free
        </Button>
      </div>
    </section>
  )
}

export const SchoolsCommunitySection = () => {
  const reduceMotion = useReducedMotion()
  const [marqueePaused, setMarqueePaused] = useState(false)
  const partnerLogos = forSchoolsAssets.partnerLogos

  const logoCell = (src: string, index: number, keySuffix: string) => (
    <div
      key={`${src}-${keySuffix}`}
      className="relative flex size-48 shrink-0 items-center justify-center sm:size-64 lg:size-72"
      aria-hidden={index >= partnerLogos.length ? true : undefined}
    >
      <img alt="" src={src} className="h-full w-full object-contain p-6 sm:p-8" />
    </div>
  )

  return (
    <section
      id={forSchoolsSectionIds.community}
      className="relative space-y-6 sm:space-y-8 lg:space-y-10"
    >
      {/*
        Text + character in one row; `items-center` vertically centers the mascot with the
        heading + lead block (see Benefits / Day-to-Day sections).
      */}
      <div className="flex w-full flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        <div className="min-w-0 flex-1 basis-0 space-y-3 sm:space-y-4 md:space-y-5">
          <h2 className="text-pretty text-lg font-bold tracking-tight text-teal-950 sm:text-2xl md:text-3xl">
            Join the PLUS School Community
          </h2>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            We partner with forward-thinking schools to bridge learning gaps. See
            the organizations already making a difference with us.
          </p>
        </div>
        <img
          alt=""
          src={forSchoolsAssets.decor.community}
          className="pointer-events-none h-[clamp(4.5rem,18vw,10.9375rem)] w-[clamp(3.75rem,24vw,12rem)] shrink-0 object-contain sm:h-32 sm:w-[7.25rem] md:h-40 md:w-36 lg:h-[175px] lg:w-[193px]"
          aria-hidden
        />
      </div>

      <div
        role="region"
        aria-label="Partner school logos"
        className="relative w-full max-w-5xl"
        onMouseEnter={() => setMarqueePaused(true)}
        onMouseLeave={() => setMarqueePaused(false)}
        onFocusCapture={() => setMarqueePaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setMarqueePaused(false)
          }
        }}
      >
        {reduceMotion ? (
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {partnerLogos.map((src, index) => logoCell(src, index, `static-${index}`))}
          </div>
        ) : (
          <div className="overflow-hidden">
            <div
              className="partner-marquee-track flex w-max items-center gap-6 sm:gap-8"
              style={{
                animationPlayState: marqueePaused ? "paused" : "running",
              }}
            >
              {[...partnerLogos, ...partnerLogos].map((src, index) =>
                logoCell(src, index, `marquee-${index}`)
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/**
 * Benefits — Figma 1379:2340 / 1104-1220. Icons: `BenefitsAccordionIcon`; panel art from IA export.
 */
const BENEFITS_ITEMS = [
  {
    id: "free-for-all",
    title: "Free for All",
    description:
      "High-quality education shouldn't be gated. Access our full suite of AI-driven training and feedback tools at no cost to your district.",
    cta: "See if your school qualifies",
  },
  {
    id: "multilingual-support",
    title: "Multilingual Support",
    description:
      "Support your diverse student body with lessons available in both English and Spanish.",
    cta: "",
  },
  {
    id: "goal-setting",
    title: "Goal Setting with Students",
    description:
      "Tutors set weekly math goals with students and reward them for meeting their goals. By using this goal-setting method, there is a 25% increase in time spent practicing and a 40% increase in skill mastery.",
    cta: "",
  },
  {
    id: "human-ai",
    title: "Human + AI Tutoring Model",
    description:
      "We allow teachers to select the scope and sequence of what is taught. We also determine which students get taught by looking at their past performance on math software.",
    cta: "",
  },
] as const

const BENEFITS_SCROLL_ITEMS: readonly ScrollAccordionItem[] = BENEFITS_ITEMS.map(
  (item, index) => ({
    value: item.id,
    /**
     * Closed: Figma 1102:1050 row (min-h 58px); title uses `marketingTypography.h2` + muted.
     * Open: label is sr-only; visible title lives in panel (1104:1183) to avoid duplicate text.
     */
    title: ({ isOpen }) =>
      isOpen ? (
        <span className="sr-only">{item.title}</span>
      ) : (
        <span className="flex min-h-[58px] w-full max-w-[min(100%,445px)] items-center gap-[25px] text-left">
          <BenefitsAccordionIcon index={index} tone="muted" />
          <span
            className={cn(
              marketingTypography.h2,
              "min-w-0 text-pretty text-muted-foreground"
            )}
          >
            {item.title}
          </span>
        </span>
      ),
    children: (
      /* Open panel — Figma 1104:1183; title + icon use marketing ochre when expanded. */
      <div className="flex w-full flex-row items-start justify-between gap-3 sm:gap-5 md:gap-8 lg:gap-10">
        <div className="flex min-w-0 flex-1 basis-0 flex-col gap-10 sm:gap-14 md:gap-[75px]">
          <div className="flex max-w-[min(100%,445px)] flex-col items-start gap-[25px]">
            <BenefitsAccordionIcon index={index} tone="accent" />
            <h2
              className={cn(
                marketingTypography.h2,
                "text-pretty text-[#a56d1e]"
              )}
            >
              {item.title}
            </h2>
            <p className={cn(marketingTypography.lead, "text-pretty max-w-none")}>
              {item.description}
            </p>
          </div>
          {item.cta ? (
            <Button
              variant="plusNavCta"
              size="navCta"
              className="h-[45px] w-full max-w-[277px] rounded-full px-10 text-base font-normal"
            >
              {item.cta}
            </Button>
          ) : null}
        </div>
        <div className="relative aspect-square w-[clamp(11rem,42vw,27.5rem)] max-w-[440px] shrink-0 overflow-hidden rounded-[38px] bg-muted">
          {item.id === "goal-setting" ? (
            <img
              alt=""
              src={forSchoolsAssets.benefitsPanelArt[index]}
              className="pointer-events-none absolute top-[-52.82%] left-[0.07%] h-[158.64%] w-[235.4%] max-w-none select-none"
              decoding="async"
            />
          ) : (
            <img
              alt=""
              src={
                forSchoolsAssets.benefitsPanelArt[index] ??
                forSchoolsAssets.images.benefits
              }
              className="pointer-events-none absolute inset-0 size-full object-cover select-none"
              decoding="async"
            />
          )}
        </div>
      </div>
    ),
  })
)

export const SchoolsTrainingSection = () => {
  return (
    <section
      id={forSchoolsSectionIds.benefits}
      className="space-y-6 sm:space-y-8 lg:space-y-10"
    >
      {/*
        Figma 1379:2340 — copy + division mascot; mascot centered with heading + lead.
      */}
      <div className="flex w-full flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        <div className="min-w-0 flex-1 basis-0 space-y-3 sm:space-y-4 md:space-y-5">
          <h2 className="text-pretty text-lg font-bold tracking-tight text-teal-950 sm:text-2xl md:text-3xl">
            Benefits of PLUS
          </h2>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Here&apos;s how PLUS supports schools and trains tutors to guide students
            to success
          </p>
        </div>
        <img
          alt=""
          src={forSchoolsAssets.mathDecor.division}
          className="pointer-events-none h-[clamp(4.5rem,18vw,10.9375rem)] w-[clamp(3.75rem,24vw,12rem)] shrink-0 object-contain sm:h-32 sm:w-[7.25rem] md:h-40 md:w-36 lg:h-[247px] lg:w-[222px]"
          aria-hidden
        />
      </div>

      <ScrollAccordion
        items={BENEFITS_SCROLL_ITEMS}
        hideTriggerChevron
        viewportSwitchThresholdPx={72}
        viewportSwitchCooldownMs={420}
        centerActiveInViewport
        centerActiveCooldownMs={520}
        centerActiveOffsetPx={-36}
        className="w-full"
        itemClassName="px-4 py-1 sm:px-6 md:px-8 lg:px-[50px]"
        triggerClassName="items-center py-4 hover:no-underline sm:py-5 aria-expanded:py-2.5"
      />
    </section>
  )
}

export const SchoolsExperienceSection = () => {
  return (
    <section
      id={forSchoolsSectionIds.experience}
      className="space-y-6 sm:space-y-8 lg:space-y-10"
    >
      <DayToDayExperienceSection steps={EXPERIENCE_BENTO_STEPS} />
    </section>
  )
}

/**
 * Robust Oversight — Figma 1379:2361. Card: overflow-clip px 38 py 30 (symmetric horizontal inset).
 * Inner row: CSS Grid (1fr + 360px) so the image column’s right edge aligns with the padded
 * content box—symmetric 38px card inset on both sides.
 * Left 553×260; icon + 25px gap + copy max 456.
 */
const OVERSIGHT_CARD_FRAME =
  "flex w-full max-w-[1122px] flex-col overflow-clip rounded-[30px] px-[38px] py-[30px]"
/** md: two columns — text block max 553px in first column; image exactly 360px in second. */
const OVERSIGHT_CARD_ROW =
  "grid w-full min-w-0 grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_360px] md:items-center md:gap-x-0 md:gap-y-0"
/** 58px icon + 25px = 83px to copy column (Figma). */
const OVERSIGHT_LEFT =
  "flex w-full min-w-0 shrink-0 flex-row items-start gap-[25px] md:h-[260px] md:max-w-[553px]"
const OVERSIGHT_COPY =
  "flex min-w-0 w-full max-w-[456px] flex-1 flex-col justify-between md:h-[260px]"
const OVERSIGHT_TITLE_BODY = "flex w-full flex-col gap-4"
/** Title stacks with section headers (no fixed height — was sized for legacy text-4xl titles). */
const OVERSIGHT_TITLE_WRAP = "flex w-full items-start"
/** Slightly smaller than Figma 411×350 so inset matches text; aspect preserved. */
const OVERSIGHT_IMAGE =
  "relative aspect-[411/350] w-full max-w-[360px] shrink-0 overflow-hidden rounded-[30px] bg-background/20 md:w-full md:max-w-none"
const OVERSIGHT_IMG =
  "pointer-events-none absolute inset-0 size-full max-w-none rounded-[30px] object-cover"

const OVERSIGHT_CARDS = [
  {
    title: "Align with Your Curriculum",
    description:
      "We work with your faculty to tailor lesson strategies that complement your school’s specific learning objectives and standards.",
    cta: "Get training",
    bgColor: "bg-fuchsia-200",
    titleColor: "text-fuchsia-900",
    icon: forSchoolsAssets.icons.oversight[0],
    image: forSchoolsAssets.oversightCardImages[0],
    imageLayout: "default" as const,
  },
  {
    title: "Data at Your Fingertips",
    description:
      "Track tutor performance, monitor student progress, and access high-level analytics to measure the ROI of your tutoring initiatives.",
    cta: "Try our demo",
    bgColor: "bg-green-100",
    titleColor: "text-green-900",
    icon: forSchoolsAssets.icons.oversight[1],
    image: forSchoolsAssets.oversightCardImages[1],
    imageLayout: "dashboard" as const,
  },
  {
    title: "Professional Growth & Accountability",
    description:
      "Tutors earn industry-recognized credentials upon completion, ensuring they meet the standards of your institution.",
    cta: "Register your tutors",
    bgColor: "bg-yellow-200",
    titleColor: "text-yellow-900",
    icon: forSchoolsAssets.icons.oversight[2],
    image: forSchoolsAssets.oversightCardImages[2],
    imageLayout: "default" as const,
  },
  {
    title: "Works with Any Math Software",
    /** Renders as two lines so “Software” stays off the first line (clear of the image). */
    titleLines: ["Works with Any Math", "Software"] as const,
    description:
      "PLUS is designed to be software-agnostic, which means no new software licenses or changes required.",
    cta: "See How it Works",
    bgColor: "bg-blue-200",
    titleColor: "text-blue-900",
    icon: forSchoolsAssets.icons.oversight[3],
    image: forSchoolsAssets.oversightCardImages[3],
    imageLayout: "default" as const,
  },
] as const

export const SchoolsOversightSection = () => {
  return (
    <section
      id={forSchoolsSectionIds.oversight}
      className="space-y-8 sm:space-y-10 lg:space-y-12"
    >
      {/*
        Title + lead — same typography as Benefits / Community / Join sections.
      */}
      <div className="flex w-full flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        <div className="min-w-0 flex-1 basis-0 space-y-3 sm:space-y-4 md:space-y-5">
          <h2 className="text-pretty text-lg font-bold tracking-tight text-teal-950 sm:text-2xl md:text-3xl">
            Maintain Excellence with Robust Oversight
          </h2>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Ensure high-impact tutoring through data-driven insights and professional
            certification.
          </p>
        </div>
        <img
          alt=""
          src={forSchoolsAssets.mathDecor.equal}
          className="pointer-events-none h-[clamp(4.5rem,18vw,10.9375rem)] w-[clamp(3.75rem,24vw,12rem)] shrink-0 object-contain sm:h-32 sm:w-[7.25rem] md:h-40 md:w-36 lg:h-[247px] lg:w-[222px]"
          aria-hidden
        />
      </div>

      {/*
        Figma 1379:2359 — large vertical gaps; sticky stack with rising z-index. Each card’s
        sticky `top` increases by step so a band of the cards below stays visible (deck effect).
      */}
      <div className="mx-auto flex w-full max-w-[1122px] flex-col gap-20 sm:gap-28 lg:gap-[160px]">
        {OVERSIGHT_CARDS.map((card, index) => {
          // Sticky top steps by 1.5rem per card (~24px) so underlying cards peek above.
          const stackTop = `calc(4.5rem + ${index * 1.5}rem)`
          return (
            <div
              key={card.title}
              className="sticky"
              style={{ top: stackTop, zIndex: index + 1 }}
            >
              <article className={cn(OVERSIGHT_CARD_FRAME, card.bgColor)}>
                {/*
                  Grid row: padded content box; icon column starts at left padding, image column is
                  exactly 360px wide at the right padding (symmetric 38px card inset).
                */}
                <div className={OVERSIGHT_CARD_ROW}>
                  <div className={OVERSIGHT_LEFT}>
                    <img
                      alt=""
                      src={card.icon}
                      className="size-[58px] shrink-0"
                      width={58}
                      height={58}
                      aria-hidden
                    />
                    <div className={OVERSIGHT_COPY}>
                      <div className={OVERSIGHT_TITLE_BODY}>
                        <div className={OVERSIGHT_TITLE_WRAP}>
                          <h3
                            className={cn(
                              "text-lg font-bold leading-tight tracking-tight sm:text-2xl md:text-3xl",
                              !("titleLines" in card && card.titleLines) && "text-pretty",
                              card.titleColor
                            )}
                          >
                            {"titleLines" in card && card.titleLines ? (
                              <span className="flex flex-col gap-0">
                                {/*
                                  Stack like natural wrap: flex + inherited tight leading matches
                                  other cards (e.g. “Professional Growth & Accountability”).
                                */}
                                <span className="sm:whitespace-nowrap">
                                  {card.titleLines[0]}
                                </span>
                                <span>{card.titleLines[1]}</span>
                              </span>
                            ) : (
                              card.title
                            )}
                          </h3>
                        </div>
                        <p
                          className={cn(
                            marketingTypography.lead,
                            "max-w-none text-pretty text-xl leading-normal"
                          )}
                        >
                          {card.description}
                        </p>
                      </div>
                      <Button
                        variant="plusNavCta"
                        size="navCta"
                        className="h-[45px] min-h-[45px] w-fit rounded-full px-10 text-base font-normal"
                      >
                        {card.cta}
                      </Button>
                    </div>
                  </div>

                  <div className={cn(OVERSIGHT_IMAGE, "mx-auto md:mx-0")}>
                    <img
                      alt=""
                      src={card.image}
                      className={cn(
                        OVERSIGHT_IMG,
                        card.imageLayout === "dashboard" &&
                          "object-[32%_center] md:object-[28%_center]"
                      )}
                      decoding="async"
                      aria-hidden
                    />
                  </div>
                </div>
              </article>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/**
 * Figma 1379:2428 — mint outer card, white quote panel.
 * Type: Styles/Typography — `h3` for attribution; `body` + muted for quote; semibold `text-teal-950` for emphasis.
 */
const SUCCESS_STORY_CARD =
  "flex flex-col gap-[25px] overflow-hidden rounded-[30px] bg-[#f4fbf6] p-[15px]"
/** Same white panel size on every card; quote is centered inside (Figma ~364px → responsive fixed height). */
const SUCCESS_STORY_QUOTE_PANEL =
  "flex h-[280px] flex-col items-center justify-center overflow-y-auto rounded-[30px] bg-white px-5 py-6 sm:h-[300px] sm:px-6 lg:h-[320px]"

type SuccessStoryQuotePart = { text: string; emphasis?: boolean }

const SUCCESS_STORIES: readonly {
  author: string
  avatar: string
  parts: readonly SuccessStoryQuotePart[]
}[] = [
  {
    author: "Math Teacher in Oregon",
    avatar: forSchoolsAssets.successStories.avatars[0],
    parts: [
      {
        text: '"I love that PLUS Tutoring provides an opportunity for kids to have more help in the classroom. ',
      },
      {
        text: "It's not just me trying to get to every student but it's more specific to their needs.",
        emphasis: true,
      },
      {
        text: ' I feel like they get a little bit more out of every day."',
      },
    ],
  },
  {
    author: "School District of Lancaster",
    avatar: forSchoolsAssets.successStories.avatars[1],
    parts: [
      {
        text: "\"The students' reactions speak for themselves. They look forward to the tutoring sessions. It's not just about math. It's about relationships. ",
      },
      {
        text: "It's about building confidence.",
        emphasis: true,
      },
      { text: '"' },
    ],
  },
  {
    author: "Teacher working with PLUS Tutors",
    avatar: forSchoolsAssets.successStories.avatars[2],
    parts: [
      {
        text: '"My students were able to understand concepts more easily than before due to the ',
      },
      { text: "one-to-one help.", emphasis: true },
      {
        text: " My students' math confidence has also increased!\"",
      },
    ],
  },
] as const

export const SchoolsSuccessStoriesSection = () => {
  return (
    <section
      id={forSchoolsSectionIds.successStories}
      className="space-y-10 sm:space-y-12 lg:space-y-14"
    >
      {/*
        Left-aligned title + lead; mascot right, vertically centered with that block (matches
        Benefits / Community section headers).
      */}
      <div className="mx-auto flex w-full max-w-[1124px] flex-col gap-10 sm:gap-12 lg:gap-14">
        <div className="flex w-full flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <div className="min-w-0 flex-1 basis-0 space-y-3 text-left sm:space-y-4 md:space-y-5">
            <h2 className="text-pretty text-lg font-bold tracking-tight text-teal-950 sm:text-2xl md:text-3xl">
              School Success Stories
            </h2>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              Here&apos;s what teachers are saying about PLUS.
            </p>
          </div>
          <img
            alt=""
            src={forSchoolsAssets.successStories.headerDecor}
            className="pointer-events-none h-[clamp(4.5rem,18vw,9.375rem)] w-auto shrink-0 object-contain sm:h-32 md:h-36 lg:h-[150px] lg:w-[165px]"
            aria-hidden
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
          {SUCCESS_STORIES.map((story) => (
            <article
              key={story.author}
              className={cn(SUCCESS_STORY_CARD, "max-w-[480px] md:max-w-none")}
            >
              <div className="flex w-full shrink-0 items-end gap-[19px]">
                <div className="relative size-[62px] shrink-0 overflow-hidden rounded-full bg-muted">
                  <img
                    alt=""
                    src={story.avatar}
                    className="size-full object-cover"
                    decoding="async"
                  />
                </div>
                <p
                  className={cn(
                    marketingTypography.h3,
                    "min-w-0 flex-1 text-pretty text-[#007d49]"
                  )}
                >
                  {story.author}
                </p>
              </div>
              <div className={SUCCESS_STORY_QUOTE_PANEL}>
                <blockquote
                  className={cn(
                    marketingTypography.body,
                    "mx-auto max-w-[22rem] text-center text-pretty text-muted-foreground"
                  )}
                >
                  {story.parts.map((part, i) =>
                    part.emphasis ? (
                      <strong
                        key={i}
                        className="font-semibold text-teal-950"
                      >
                        {part.text}
                      </strong>
                    ) : (
                      <span key={i}>{part.text}</span>
                    )
                  )}
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Register — Figma 1379:2453 shell (white card, centered stack). Title + lead match other For
 * Schools section headers (Benefits, Success Stories, etc.).
 */
const REGISTER_CTA_CARD =
  "mx-auto w-full max-w-[1022px] overflow-hidden rounded-[30px] bg-white p-8 sm:p-10 md:p-[50px]"

export const SchoolsRegisterCTA = () => {
  return (
    <section id={forSchoolsSectionIds.register} className="scroll-mt-24">
      <div className={REGISTER_CTA_CARD}>
        <div className="flex flex-col items-center gap-12 md:gap-14 lg:gap-[60px]">
          <div className="mx-auto w-full max-w-[49rem] space-y-3 text-center sm:space-y-4 md:space-y-5">
            <h2 className="text-pretty text-lg font-bold tracking-tight text-teal-950 sm:text-2xl md:text-3xl">
              Register Your Institution
            </h2>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              Want to get started? Sign up to register your organization and provide your tutors
              access to our full training suite.
            </p>
          </div>
          <Button
            type="button"
            variant="plusNavCta"
            size="navCta"
            className="h-[45px] min-h-[45px] rounded-full px-10 text-base font-normal"
          >
            Sign up
          </Button>
        </div>
      </div>
    </section>
  )
}
