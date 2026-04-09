"use client"

import { useState, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  GraduationCap,
  Newspaper,
  School,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  TutorsHeroDecorImg,
} from "@/components/marketing/for-tutors-sections"
import { forTutorsAssets } from "@/components/marketing/for-tutors-assets"
import { forSchoolsAssets } from "@/components/marketing/for-schools-assets"
import { cn } from "@/lib/utils"
import { aboutSectionIds } from "@/lib/plus-footer-ia"

/** Section titles / intros — match `for-tutors-sections.tsx` (Compensation, Experience, etc.). */
const aboutSectionH2 =
  "text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl"

/**
 * Section intros — full width of title column (`md:flex-1`) so long lines fit on one row on
 * wide screens; wrap to multiple lines naturally on narrow viewports.
 */
const aboutSectionLead =
  "w-full max-w-none text-pretty text-lg text-teal-900/75 dark:text-white/90"

/** Final CTA blurb — wider shell (`max-w-4xl`) so copy can stay one line on large viewports. */
const aboutFinalCtaLead =
  "text-pretty text-lg text-teal-900/75 dark:text-white/90"

/** Card titles / body — match Tutors Experience bento cards. */
const aboutCardTitle =
  "text-pretty text-xl font-bold leading-snug tracking-tight text-teal-950 sm:text-2xl"

const aboutCardBody =
  "text-sm leading-relaxed text-teal-900/75 sm:text-base"

/** Beside section titles — same `<img>` sizing as `for-tutors-sections.tsx` section headers. */
const tutorsSectionTitleDecorImgClass =
  "pointer-events-none hidden h-auto w-28 max-w-[140px] shrink-0 opacity-90 select-none md:block md:w-32 md:max-w-[165px] lg:w-36 lg:max-w-[180px]"

function AboutSectionTitleWithDecor({
  decorSrc,
  children,
}: {
  decorSrc: string
  children: ReactNode
}) {
  return (
    <div className="text-center sm:text-left">
      <div className="flex flex-col items-center gap-6 sm:items-start md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-8">
        <div className="w-full space-y-3 md:min-w-0 md:flex-1">{children}</div>
        <img
          alt=""
          src={decorSrc}
          className={tutorsSectionTitleDecorImgClass}
          aria-hidden
        />
      </div>
    </div>
  )
}

/** Same tokens as For Tutors hero — primary + outline (see `for-tutors-sections.tsx`). */
const aboutPagePrimaryCta =
  "h-11 rounded-full border-0 bg-[#A6EDF4] px-8 text-base font-normal text-[#004247] shadow-none transition-opacity hover:bg-[#A6EDF4] hover:opacity-95 hover:text-[#004247] dark:bg-[#A6EDF4] dark:text-[#004247] dark:hover:bg-[#A6EDF4]"

const aboutPageOutlineCta =
  "h-11 rounded-full border-2 border-[#A6EDF4] bg-transparent px-8 text-base font-medium text-teal-950 hover:border-[#A6EDF4] hover:bg-[#A6EDF4]/15 dark:text-white dark:hover:bg-[#A6EDF4]/20"

const aboutPageCtaLinkLayout =
  "inline-flex items-center justify-center whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

function AboutLandingCtaRow({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex flex-wrap items-center justify-center gap-4", className)}
    >
      <Link
        href="/#get-involved"
        className={cn(aboutPageCtaLinkLayout, aboutPagePrimaryCta)}
      >
        Careers at PLUS
      </Link>
      <Link
        href="/for-tutors"
        className={cn(aboutPageCtaLinkLayout, aboutPageOutlineCta)}
      >
        Join as a Tutor
      </Link>
    </div>
  )
}

export function AboutHeroSection() {
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
          About PLUS
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-teal-950 sm:text-5xl">
          Bridging Opportunity Gaps in
          <br />
          Math Education with AI-
          <br />
          Powered Tutoring
        </h1>
      </div>

      <AboutLandingCtaRow className="mt-6 sm:mt-8" />
    </section>
  )
}

/** Same shape as `EXPERIENCE_CARDS` in `for-tutors-sections.tsx` — interactive: one selected, body visible only when selected. */
const FOUNDATION_PILLARS = [
  {
    title: "Community",
    body: "PLUS connects communities and researchers to improve outcomes for all students.",
  },
  {
    title: "Research",
    body:
      "Built on decades of learning science research from CMU and Stanford.",
  },
  {
    title: "Innovation",
    body:
      "Shaping educational technology to deliver innovative, engaging learning experiences.",
  },
] as const

export function AboutFoundationsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  /** Wide column tracks with selected pillar — order stays Community, Research, Innovation (no DOM reorder). */
  const foundationsLgGridCols =
    selectedIndex === 0
      ? "lg:grid-cols-[2fr_1fr_1fr]"
      : selectedIndex === 1
        ? "lg:grid-cols-[1fr_2fr_1fr]"
        : "lg:grid-cols-[1fr_1fr_2fr]"

  const foundationsPhotoSrc =
    selectedIndex === 1
      ? "/figma/about/foundations-research.png"
      : selectedIndex === 2
        ? "/figma/about/foundations-innovation.png"
        : "/figma/about/foundations-community.png"

  const foundationsPhotoAlt =
    selectedIndex === 1
      ? "University campus grounds representing research partnerships and learning science"
      : selectedIndex === 2
        ? "PLUS lesson interface with AI-generated feedback, representing innovation in tutoring technology"
        : "Classroom session with students and teacher, representing community-centered learning"

  return (
    <section
      id={aboutSectionIds.foundations}
      className="scroll-mt-24 space-y-8 sm:space-y-10"
    >
      <AboutSectionTitleWithDecor decorSrc={forTutorsAssets.compensationDecor}>
        <h2 className={aboutSectionH2}>Foundations We Build Upon</h2>
        <p className={aboutSectionLead}>
          Our work is grounded in community, informed by research, and driven by innovation
        </p>
      </AboutSectionTitleWithDecor>

      <ol
        className={cn(
          "mx-auto grid max-w-5xl list-none items-stretch gap-4 p-0 sm:grid-cols-2 sm:gap-6 lg:gap-8",
          foundationsLgGridCols
        )}
      >
        {FOUNDATION_PILLARS.map((pillar, index) => {
          const isSelected = selectedIndex === index
          return (
            <li key={pillar.title} className="flex min-h-0">
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                onMouseEnter={() => setSelectedIndex(index)}
                aria-pressed={isSelected}
                className={cn(
                  /* Colors align with `TutorsCompensationSection` card (sky band + white body). */
                  "flex h-full min-h-0 w-full cursor-default flex-col gap-3 rounded-2xl p-5 text-left transition-colors sm:gap-5 sm:p-6",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isSelected
                    ? "border-2 border-sky-200 bg-sky-100 dark:border-sky-800/50 dark:bg-sky-950/35"
                    : "border-2 border-sky-200 bg-white dark:border-sky-800/50 dark:bg-card"
                )}
              >
                <div
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white",
                    isSelected ? "bg-[#007EB8]" : "bg-[#007EB8]/80"
                  )}
                >
                  {index + 1}
                </div>
                <div className="flex min-h-0 flex-1 flex-col gap-2">
                  <p className="shrink-0 text-pretty text-xl font-bold leading-snug tracking-tight text-[#007EB8] sm:text-2xl dark:text-sky-300">
                    {pillar.title}
                  </p>
                  <div className="flex min-h-0 flex-1 flex-col">
                    {isSelected ? (
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        {pillar.body}
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
            key={foundationsPhotoSrc}
            src={foundationsPhotoSrc}
            alt={foundationsPhotoAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 64rem"
          />
        </div>
      </div>
    </section>
  )
}

type InternMember = {
  name: string
  role: string
  avatarUrl?: string
  avatarClassName?: string
}

const INTERN_TEAM: ReadonlyArray<InternMember> = [
  {
    name: "Erika Xiang",
    role: "Website Designer/Developer Intern",
    avatarUrl: "/figma/about/team-erika-xiang.png",
  },
  {
    name: "Kayla Windust",
    role: "Website Designer/Developer Intern",
    avatarUrl: "/figma/about/team-kayla-windust.png",
    avatarClassName: "scale-110 object-[62%_center]",
  },
  {
    name: "Cassie Ha",
    role: "Product Design Intern",
    avatarUrl: "/figma/about/team-cassie-ha.png",
  },
  {
    name: "Dimple Lin",
    role: "Instructional Design Intern",
    avatarUrl: "/figma/about/team-dimple-lin.png",
  },
  {
    name: "Coco Jiang",
    role: "Instructional Design Intern",
    avatarUrl: "/figma/about/team-coco-jiang.png",
  },
  {
    name: "Collin Wright",
    role: "Instructional Design Intern",
    avatarUrl: "/figma/about/team-collin-wright.png",
  },
]

function TeamMemberCard({
  name,
  role,
  avatarUrl,
  avatarClassName,
}: {
  name: string
  role: string
  avatarUrl: string
  avatarClassName?: string
}) {
  return (
    <article className="overflow-hidden rounded-3xl bg-white dark:bg-card">
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image
          src={avatarUrl}
          alt={`${name} profile photo`}
          fill
          className={cn("object-cover", avatarClassName)}
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-3 bg-[#E8F6EA] px-4 pt-4 pb-6 dark:bg-emerald-950/20">
        <p className="text-xl font-bold leading-tight tracking-tight text-teal-950 dark:text-white sm:text-2xl">
          {name}
        </p>
        <Link
          href="#"
          className="inline-block text-sm font-medium text-[#297E43] underline underline-offset-2"
        >
          LinkedIn
        </Link>
        <p className="text-[1.02rem] leading-snug text-foreground/80 dark:text-white/85">{role}</p>
      </div>
    </article>
  )
}

export function AboutTeamSection() {
  return (
    <section id={aboutSectionIds.team} className="scroll-mt-24 space-y-8 sm:space-y-10">
      <AboutSectionTitleWithDecor decorSrc={forTutorsAssets.experienceDecor}>
        <h2 className={aboutSectionH2}>The PLUS Team</h2>
        <p className={aboutSectionLead}>
          Educators, researchers, and technologists united to close the math opportunity gap
        </p>
      </AboutSectionTitleWithDecor>
      <Accordion
        defaultValue={["interns"]}
        className="space-y-4 sm:space-y-6 lg:space-y-8"
      >
        <AccordionItem value="leadership" className="rounded-2xl bg-[#E8F6EA] px-4 shadow-none dark:bg-emerald-950/25 sm:px-6">
          <AccordionTrigger className="items-center py-4 text-xl font-bold leading-snug tracking-tight text-[#297E43] shadow-none hover:no-underline dark:text-emerald-300 sm:py-5 sm:text-2xl **:data-[slot=accordion-trigger-icon]:size-6 **:data-[slot=accordion-trigger-icon]:text-[#297E43] dark:**:data-[slot=accordion-trigger-icon]:text-emerald-300">
            <span className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#297E43] text-white">
                <Users className="size-5" />
              </span>
              Leadership
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-lg leading-relaxed text-muted-foreground">
            Leadership bios and profiles will appear here as we publish them on the marketing
            site.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="staff" className="rounded-2xl bg-[#E8F6EA] px-4 shadow-none dark:bg-emerald-950/25 sm:px-6">
          <AccordionTrigger className="items-center py-4 text-xl font-bold leading-snug tracking-tight text-[#297E43] shadow-none hover:no-underline dark:text-emerald-300 sm:py-5 sm:text-2xl **:data-[slot=accordion-trigger-icon]:size-6 **:data-[slot=accordion-trigger-icon]:text-[#297E43] dark:**:data-[slot=accordion-trigger-icon]:text-emerald-300">
            <span className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#297E43] text-white">
                <Briefcase className="size-5" />
              </span>
              PLUS Staff
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-lg leading-relaxed text-muted-foreground">
            Staff spotlights and roles will be listed here.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="interns" className="border-0 bg-transparent px-0">
          <AccordionTrigger className="items-center rounded-2xl bg-[#E8F6EA] px-4 py-4 text-lg font-bold tracking-tight text-[#297E43] shadow-none hover:no-underline dark:bg-emerald-950/25 dark:text-emerald-300 sm:px-6 sm:py-5 sm:text-xl **:data-[slot=accordion-trigger-icon]:size-6 **:data-[slot=accordion-trigger-icon]:text-[#297E43] dark:**:data-[slot=accordion-trigger-icon]:text-emerald-300">
            <span className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#297E43] text-white">
                <GraduationCap className="size-5" />
              </span>
              <span className="text-pretty text-xl font-bold leading-snug tracking-tight sm:text-2xl">Current Student Interns</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-0 sm:pt-6 lg:pt-8">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
              {INTERN_TEAM.map((member, i) => (
                <TeamMemberCard
                  key={member.name}
                  name={member.name}
                  role={member.role}
                  avatarUrl={
                    member.avatarUrl ??
                    forSchoolsAssets.avatars[i % forSchoolsAssets.avatars.length]!
                  }
                  avatarClassName={member.avatarClassName}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}

export function AboutLatestSection() {
  return (
    <section id={aboutSectionIds.latest} className="scroll-mt-24 space-y-8 sm:space-y-10">
      <AboutSectionTitleWithDecor decorSrc={forTutorsAssets.certificationDecor}>
        <h2 className={aboutSectionH2}>Latest at PLUS</h2>
        <p className={aboutSectionLead}>
          Stay up to date with the latest news, updates, and opportunities at PLUS
        </p>
      </AboutSectionTitleWithDecor>
      <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-2 lg:grid-rows-2">
        <article className="flex min-h-[280px] flex-col rounded-3xl bg-[#FFF1C7] p-5 dark:bg-amber-950/20 sm:p-6 lg:row-span-2 lg:min-h-0">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#A27707] text-white">
              <Trophy className="size-5" aria-hidden />
            </span>
            <h3 className={cn(aboutCardTitle, "text-[#9A6D00] dark:text-amber-200")}>
              Celebrating Our Datasets Win
            </h3>
          </div>
          <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white">
            <div className="relative min-h-0 flex-1">
              <Image
                src="/figma/about/latest-datasets-win.png"
                alt="Schools Competition Winners graphic"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-2 text-lg font-medium text-[#9A6D00] dark:text-amber-200">
            <span>Read more</span>
            <ArrowRight className="size-6" aria-hidden />
          </div>
        </article>

        <article className="flex flex-col rounded-3xl bg-[#FFF1C7] p-5 dark:bg-amber-950/20 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#A27707] text-white">
              <GraduationCap className="size-5" aria-hidden />
            </span>
            <h3 className={cn(aboutCardTitle, "text-[#9A6D00] dark:text-amber-200")}>
              Teachers Inspire Our Tutoring
            </h3>
          </div>
          <div className="relative mt-4 aspect-[16/8.5] overflow-hidden rounded-2xl bg-muted">
            <Image
              src="/figma/about/latest-teachers-inspire.png"
              alt="Teachers and students in a school setting"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="mt-4 flex items-center justify-end gap-2 text-lg font-medium text-[#9A6D00] dark:text-amber-200">
            <span>Read more</span>
            <ArrowRight className="size-6" aria-hidden />
          </div>
        </article>

        <article className="flex flex-col rounded-3xl bg-[#FFF1C7] p-5 dark:bg-amber-950/20 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#A27707] text-white">
              <School className="size-5" aria-hidden />
            </span>
            <h3 className={cn(aboutCardTitle, "text-[#9A6D00] dark:text-amber-200")}>
              PLUS Expands To 6 New Schools
            </h3>
          </div>
          <div className="relative mt-4 aspect-[16/8.5] overflow-hidden rounded-2xl bg-muted">
            <Image
              src="/figma/about/latest-expands-schools.png"
              alt="Student using a learning tablet in a classroom"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="mt-4 flex items-center justify-end gap-2 text-lg font-medium text-[#9A6D00] dark:text-amber-200">
            <span>Read more</span>
            <ArrowRight className="size-6" aria-hidden />
          </div>
        </article>
      </div>
    </section>
  )
}

const SUCCESS_CARDS = [
  {
    title: "Boosting Confidence in Math",
    icon: Sparkles,
  },
  {
    title: "Empowering Teachers with Data",
    icon: BarChart3,
  },
  {
    title: "Bounding Students Across Schools",
    icon: BookOpen,
  },
] as const

export function AboutSuccessStoriesSection() {
  return (
    <section
      id={aboutSectionIds.successStories}
      className="scroll-mt-24 space-y-8 sm:space-y-10"
    >
      <AboutSectionTitleWithDecor decorSrc={forTutorsAssets.toolkitDecor}>
        <h2 className={aboutSectionH2}>Success Stories at PLUS</h2>
        <p className={aboutSectionLead}>
          Celebrating the students, educators, and innovations making a real impact with PLUS
        </p>
      </AboutSectionTitleWithDecor>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
        {SUCCESS_CARDS.map(({ title, icon: Icon }) => (
          <article
            key={title}
            className="flex min-h-[320px] flex-col rounded-3xl bg-[#FFE8F6] p-4 dark:bg-[#FFE8F6]/15 sm:min-h-[360px] sm:p-5"
          >
            <div className="flex min-h-0 flex-1 flex-col rounded-3xl bg-white p-6 dark:bg-card sm:p-7">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#C6009C] text-white">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className={cn(aboutCardTitle, "mt-4 text-[#C6009C] dark:text-[#C6009C]")}>
                {title}
              </h3>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2 text-lg font-medium text-[#C6009C] dark:text-[#C6009C]">
              <span>Read story</span>
              <ArrowRight className="size-6" aria-hidden />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function AboutFinalCtaSection() {
  return (
    <section id={aboutSectionIds.learnMore} className="scroll-mt-24">
      <div className="mx-auto max-w-4xl space-y-6 rounded-3xl bg-white p-8 text-center dark:bg-transparent sm:p-12">
        <h2 className="text-3xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-4xl">
          Learn More About PLUS
        </h2>
        <p className={aboutFinalCtaLead}>
          Want to contribute? Explore our full-time and part-time tutoring opportunities.
        </p>
        <AboutLandingCtaRow className="mt-8" />
      </div>
    </section>
  )
}
