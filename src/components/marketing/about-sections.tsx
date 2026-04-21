"use client"

import {
  type ComponentType,
  type ReactNode,
  type SVGProps,
} from "react"
import type { TeamMember, SuccessStory, NewsItem } from "@/lib/notion/types"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  Calendar,
  GraduationCap,
  Newspaper,
  School,
  Sparkles,
  Trophy,
  Users,
  Zap,
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
import {
  marketingCardIconCircleClass,
  marketingCardIconColumnSpacerClass,
  marketingCardIconTitleRowOffsetClass,
  marketingCardLhAlignedHeaderRowClass,
  marketingCardLucideGlyphClass,
  marketingCardPaddingClass,
  marketingCardStackGapClass,
  marketingCardStepDigitClass,
  marketingSectionHeaderDecorAbsoluteClass,
  marketingSectionHeaderDecorImgClass,
  marketingSectionIntroColumnClass,
  marketingSectionLeadColorClass,
  marketingFinalCtaOutlineLinkClass,
  marketingFinalCtaPrimaryLinkClass,
  marketingHeroCtaButtonRowClass,
  marketingHeroCtaOutlineLinkClass,
  marketingHeroCtaPrimaryLinkClass,
  marketingSectionVerticalGapClass,
  marketingSectionVoicesHeaderDecorImgClass,
} from "@/lib/marketing-section-layout"
import { cn } from "@/lib/utils"
import { aboutSectionIds } from "@/lib/plus-footer-ia"

/** Section titles / intros — match `for-tutors-sections.tsx` (Compensation, Experience, etc.). */
const aboutSectionH2 =
  "text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl"

/** Section intros — same lead color / scale as other marketing pages */
const aboutSectionLead = cn(
  "w-full max-w-none text-base lg:text-lg",
  marketingSectionLeadColorClass,
)

/** Final CTA blurb — wider shell (`max-w-4xl`) so copy can stay one line on large viewports. */
const aboutFinalCtaLead = cn("text-base lg:text-lg", marketingSectionLeadColorClass)

/** Card titles / body — match Tutors Experience bento cards. */
const aboutCardTitle =
  "text-pretty text-lg font-bold leading-snug tracking-tight text-teal-950 sm:text-xl lg:text-2xl"

const aboutCardBody = cn("text-base leading-relaxed", marketingSectionLeadColorClass)

function AboutSectionTitleWithDecor({
  decorSrc,
  children,
}: {
  decorSrc: string
  children: ReactNode
}) {
  const decorImgClass =
    decorSrc === forTutorsAssets.voicesDecor
      ? cn(
          marketingSectionVoicesHeaderDecorImgClass,
          marketingSectionHeaderDecorAbsoluteClass,
        )
      : cn(
          marketingSectionHeaderDecorImgClass,
          marketingSectionHeaderDecorAbsoluteClass,
        )
  return (
    <div className="text-left">
      <div className="relative">
        <div className={marketingSectionIntroColumnClass}>{children}</div>
        <img alt="" src={decorSrc} className={decorImgClass} aria-hidden />
      </div>
    </div>
  )
}

function AboutLandingCtaRow({
  className,
  /** `hero` = static pills (fold); default = same hover as final CTAs elsewhere. */
  variant = "interactive",
}: {
  className?: string
  variant?: "hero" | "interactive"
}) {
  const primaryClass =
    variant === "hero"
      ? marketingHeroCtaPrimaryLinkClass
      : marketingFinalCtaPrimaryLinkClass
  const outlineClass =
    variant === "hero"
      ? marketingHeroCtaOutlineLinkClass
      : marketingFinalCtaOutlineLinkClass
  return (
    <div className={cn(marketingHeroCtaButtonRowClass, className)}>
      <Link href="/get-involved#careers" className={primaryClass}>
        Careers at PLUS
      </Link>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfnLoEbL_irrlGeoW6toMctQ8rstewQ1-PB4h7XwUKZAeXmVg/viewform"
        target="_blank"
        rel="noopener noreferrer"
        className={outlineClass}
      >
        Join as a Tutor
      </a>
    </div>
  )
}

export function AboutHeroSection() {
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
          About PLUS
        </p>
        <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-teal-950 sm:text-4xl md:text-5xl">
          Bridging Opportunity Gaps in
          <br />
          Math Education with AI-
          <br />
          Powered Tutoring
        </h1>
      </div>

      <AboutLandingCtaRow variant="hero" className="max-sm:relative max-sm:z-[2]" />
    </section>
  )
}

/** Our Mission pillar headings — same scale as foundation pillars; color matches icon circles. */
const aboutMissionPillarTitle =
  "text-pretty text-lg font-bold leading-snug tracking-tight text-[#a6554d] sm:text-xl lg:text-2xl dark:text-[#c97d73]"

const aboutMissionBulletList =
  "space-y-2.5 text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg"

const MISSION_MAP_SRC = "/figma/about/mission-eastern-us-map.png"

const MissionBulletList = ({ items }: { items: readonly string[] }) => (
  <ul className={aboutMissionBulletList}>
    {items.map((text) => (
      <li key={text} className="flex gap-3">
        <span
          className="mt-2 size-1.5 shrink-0 rounded-full bg-[#FCA5A4]"
          aria-hidden
        />
        <span>{text}</span>
      </li>
    ))}
  </ul>
)

const MissionPillarBlock = ({
  icon: Icon,
  title,
  items,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  items: readonly string[]
}) => (
  <div className="space-y-4 sm:space-y-5">
    <span
      className={cn(
        marketingCardIconCircleClass,
        "bg-[#a6554d] text-white dark:bg-[#c97d73]",
      )}
    >
      <Icon className={marketingCardLucideGlyphClass} aria-hidden />
    </span>
    <h3 className={aboutMissionPillarTitle}>{title}</h3>
    <MissionBulletList items={items} />
  </div>
)

export function AboutMissionSection() {
  return (
    <section
      id={aboutSectionIds.mission}
      className={cn("scroll-mt-24", marketingSectionVerticalGapClass)}
    >
      <AboutSectionTitleWithDecor decorSrc={forTutorsAssets.voicesDecor}>
        <h2 className={aboutSectionH2}>Our Mission</h2>
        <p className={aboutSectionLead}>
          16M+ underserved U.S. students need tutoring. We double middle school math learning.
        </p>
      </AboutSectionTitleWithDecor>

      <div
        className={cn(
          "grid items-start lg:grid-cols-2 lg:gap-x-12 lg:gap-y-12",
          marketingCardStackGapClass,
        )}
      >
        <MissionPillarBlock
          icon={Users}
          title="A Growing Crisis"
          items={[
            "16M+ U.S. students lack high-impact tutoring",
            "Many are from underserved, low-income communities",
          ]}
        />

        <div className="flex w-full shrink-0 justify-center leading-none">
          <Image
            src={MISSION_MAP_SRC}
            alt="Hand-drawn map of the Eastern United States with PLUS program location markers"
            width={837}
            height={966}
            className="m-0 block h-auto w-full max-w-[min(100%,14rem)] object-contain object-top align-top sm:max-w-[min(100%,16rem)] md:max-w-[min(100%,18rem)] lg:max-w-[min(100%,18rem)]"
            sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
          />
        </div>

        <MissionPillarBlock
          icon={School}
          title="A Smarter Solution"
          items={[
            "PLUS is a hybrid human–AI tutoring program",
            "Doubles middle school math learning",
            "Personalized support matches each student",
          ]}
        />

        <MissionPillarBlock
          icon={GraduationCap}
          title="Proven Impact"
          items={[
            "Serving 10+ schools across PA, NY, OR, and WV",
            "Nearly 5,000 students helped since 2018",
            "Technology developed with Carnegie Mellon & Stanford",
          ]}
        />
      </div>
    </section>
  )
}

export function AboutFoundationsSection() {
  return (
    <section
      id={aboutSectionIds.foundations}
      className={cn("scroll-mt-24", marketingSectionVerticalGapClass)}
    >
      <AboutSectionTitleWithDecor decorSrc={forTutorsAssets.compensationDecor}>
        <h2 className={aboutSectionH2}>Foundations We Build Upon</h2>
        <p className={aboutSectionLead}>
          Our work is grounded in community, informed by research, and driven by innovation.
        </p>
      </AboutSectionTitleWithDecor>

      {/* Bento grid: Community (left, tall) + Research/Innovation (right, stacked) */}
      <div
        className={cn(
          "mx-auto grid max-w-5xl grid-cols-1 items-stretch md:grid-cols-2",
          marketingCardStackGapClass,
        )}
      >

        {/* Community — left large card: fills full height of the right column */}
        <div className="flex flex-col overflow-hidden rounded-[30px] bg-[#E4F5FF] dark:bg-sky-950/40">
          {/* Content row: circle | title + description */}
          <div
            className={cn(
              latestCardTitleRowClass,
              "px-5 pt-5 sm:px-6 sm:pt-6",
            )}
          >
            <div
              className={cn(
                marketingCardIconCircleClass,
                "shrink-0 bg-[#007EB8] text-[#E4F5FF]",
                marketingCardStepDigitClass,
              )}
            >
              1
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <p
                className={cn(
                  "text-lg font-bold leading-snug tracking-tight text-[#007EB8] sm:text-xl lg:text-2xl dark:text-sky-300",
                  latestCardTitleWithIconAlignClass,
                )}
              >
                Community
              </p>
              <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                PLUS connects communities and researchers to improve student outcomes.
              </p>
            </div>
          </div>
          {/* Image row: invisible spacer (aligns with circle) + image extending to card edge */}
          <div className="mt-[22px] flex flex-1 gap-3 pl-5 sm:pl-6">
            <div className={marketingCardIconColumnSpacerClass} aria-hidden />
            <div className="relative min-h-[260px] flex-1">
              <Image
                src="/figma/about/foundations-community.avif"
                alt="Classroom session with students and teacher, representing community-centered learning"
                fill
                className="rounded-tl-[22px] object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Right column: Research + Innovation stacked */}
        <div className={cn("flex flex-col", marketingCardStackGapClass)}>

          {/* Research */}
          <div className="flex flex-col overflow-hidden rounded-[30px] bg-[#E4F5FF] dark:bg-sky-950/40">
            <div
              className={cn(
                latestCardTitleRowClass,
                "px-5 pt-5 sm:px-6 sm:pt-6",
              )}
            >
              <div
                className={cn(
                  marketingCardIconCircleClass,
                  "shrink-0 bg-[#007EB8] text-white",
                  marketingCardStepDigitClass,
                )}
              >
                2
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <p
                  className={cn(
                    "text-lg font-bold leading-snug tracking-tight text-[#007EB8] sm:text-xl lg:text-2xl dark:text-sky-300",
                    latestCardTitleWithIconAlignClass,
                  )}
                >
                  Research
                </p>
                <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                  Built on decades of learning science research from CMU and Stanford.
                </p>
              </div>
            </div>
            <div className="mt-[22px] flex gap-3 pl-5 sm:pl-6">
              <div className={marketingCardIconColumnSpacerClass} aria-hidden />
              <div className="relative aspect-[2/1] flex-1">
                <Image
                  src="/figma/about/foundations-research.png"
                  alt="University campus grounds representing research partnerships and learning science"
                  fill
                  className="rounded-tl-[22px] object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Innovation */}
          <div className="flex flex-col overflow-hidden rounded-[30px] bg-[#E4F5FF] dark:bg-sky-950/40">
            <div
              className={cn(
                latestCardTitleRowClass,
                "px-5 pt-5 sm:px-6 sm:pt-6",
              )}
            >
              <div
                className={cn(
                  marketingCardIconCircleClass,
                  "shrink-0 bg-[#007EB8] text-white",
                  marketingCardStepDigitClass,
                )}
              >
                3
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <p
                  className={cn(
                    "text-lg font-bold leading-snug tracking-tight text-[#007EB8] sm:text-xl lg:text-2xl dark:text-sky-300",
                    latestCardTitleWithIconAlignClass,
                  )}
                >
                  Innovation
                </p>
                <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                  Shaping educational technology to deliver innovative, engaging learning experiences.
                </p>
              </div>
            </div>
            <div className="mt-[22px] flex gap-3 pl-5 sm:pl-6">
              <div className={marketingCardIconColumnSpacerClass} aria-hidden />
              <div className="relative aspect-[2/1] flex-1">
                <Image
                  src="/figma/about/foundations-innovation.avif"
                  alt="PLUS lesson interface with AI-generated feedback, representing innovation in tutoring technology"
                  fill
                  className="rounded-tl-[22px] object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

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
  institution,
  avatarUrl,
  avatarClassName,
  linkedIn,
  googleScholar,
}: {
  name: string
  role: string
  institution?: string | null
  avatarUrl?: string
  avatarClassName?: string
  linkedIn?: string | null
  googleScholar?: string | null
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[30px] bg-[#E8F6EA] dark:bg-emerald-950/20">
      <div className="relative aspect-square w-full overflow-hidden">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`${name} profile photo`}
            fill
            className={cn("object-cover", avatarClassName)}
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-base font-bold text-[#297E43] sm:text-lg">
            {initials}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 px-2 pt-3 pb-4 sm:px-3 sm:pt-4 sm:pb-5 sm:gap-3.5">
        <div className="text-xs font-bold leading-tight tracking-tight text-teal-950 dark:text-white sm:text-sm lg:text-base">
          {name}
        </div>
        {(googleScholar || linkedIn) ? (
          <div className="flex flex-col gap-0.5 text-[10px] font-medium leading-tight text-[#297E43] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-1.5 sm:gap-y-0 sm:text-xs">
            {googleScholar ? (
              <Link
                href={googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                Google Scholar
              </Link>
            ) : null}
            {googleScholar && linkedIn ? (
              <span className="hidden sm:inline text-[#297E43]/50 select-none" aria-hidden>|</span>
            ) : null}
            {linkedIn ? (
              <Link
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                LinkedIn
              </Link>
            ) : null}
          </div>
        ) : null}
        <div className="text-[10px] leading-tight text-foreground/80 dark:text-white/85 sm:text-xs">{role}</div>
        {institution ? (
          <div className="text-[10px] leading-tight text-foreground/80 dark:text-white/85 sm:text-xs">{institution}</div>
        ) : null}
      </div>
    </article>
  )
}

const triggerCls =
  "cursor-pointer items-center text-lg font-bold leading-snug tracking-tight text-[#297E43] shadow-none hover:no-underline focus-visible:ring-0 focus-visible:border-transparent dark:text-emerald-300 sm:text-xl lg:text-2xl **:data-[slot=accordion-trigger-icon]:size-6 **:data-[slot=accordion-trigger-icon]:text-[#297E43] dark:**:data-[slot=accordion-trigger-icon]:text-emerald-300"

const memberGrid = "grid gap-2 grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 sm:gap-3 lg:gap-4 [&>*]:min-w-0"

// Custom display order for leadership cards (matched by first name / first+last-initial).
const LEADERSHIP_ORDER = [
  "Ken", "Emma", "Vincent", "Shivang", "Lee",
  "Danielle", "Erin", "Alex", "Steve F", "Steve R",
]

function leadershipSortKey(name: string): number {
  const lower = name.toLowerCase()
  for (let i = 0; i < LEADERSHIP_ORDER.length; i++) {
    const token = LEADERSHIP_ORDER[i]!.toLowerCase()
    // "Steve F" / "Steve R" → match by first name + last initial
    if (token.includes(" ")) {
      const [first, initial] = token.split(" ")
      if (lower.startsWith(first!) && lower.includes(` ${initial!}`)) return i
    } else {
      // Match by first name anywhere in the name string (handles "Dr. Ken …")
      const parts = lower.split(" ")
      if (parts.includes(token)) return i
    }
  }
  return LEADERSHIP_ORDER.length
}

export function AboutTeamSection({ members = [] }: { members?: TeamMember[] }) {
  const leadership = members
    .filter((m) => m.affiliation === "Leadership")
    .sort((a, b) => leadershipSortKey(a.name) - leadershipSortKey(b.name))
  const staff = members.filter((m) => m.affiliation === "PLUS Staff")
  const notionStudents = members.filter(
    (m) =>
      m.affiliation === "Student Intern" ||
      m.affiliation === "Independent Study Student"
  )

  return (
    <section id={aboutSectionIds.team} className={cn("scroll-mt-24", marketingSectionVerticalGapClass)}>
      <AboutSectionTitleWithDecor decorSrc={forTutorsAssets.experienceDecor}>
        <h2 className={aboutSectionH2}>The PLUS Team</h2>
        <p className={aboutSectionLead}>
          Educators, researchers, and technologists united to close the math opportunity gap.
        </p>
      </AboutSectionTitleWithDecor>
      <Accordion
        multiple
        className="space-y-4 sm:space-y-6 lg:space-y-8"
      >
        <AccordionItem value="leadership" className="border-0 bg-transparent px-0">
          <AccordionTrigger
            className={cn(
              triggerCls,
              "rounded-[30px] bg-[#E8F6EA] dark:bg-emerald-950/25",
              marketingCardPaddingClass,
            )}
          >
            <span className="flex items-center gap-3">
              <span
                className={cn(marketingCardIconCircleClass, "bg-[#297E43] text-white")}
              >
                <Users className={marketingCardLucideGlyphClass} />
              </span>
              Leadership
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-0 sm:pt-3 lg:pt-4">
            {leadership.length > 0 ? (
              <div className={memberGrid}>
                {leadership.map((m) => (
                  <TeamMemberCard
                    key={m.id}
                    name={m.name}
                    role={m.title1 ?? m.affiliation}
                    institution={m.title2}
                    avatarUrl={m.picture ?? undefined}
                    linkedIn={m.linkedIn}
                    googleScholar={m.googleScholar}
                  />
                ))}
              </div>
            ) : (
              <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                Leadership bios and profiles will appear here as we publish them on the marketing site.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="staff" className="border-0 bg-transparent px-0">
          <AccordionTrigger
            className={cn(
              triggerCls,
              "rounded-[30px] bg-[#E8F6EA] dark:bg-emerald-950/25",
              marketingCardPaddingClass,
            )}
          >
            <span className="flex items-center gap-3">
              <span
                className={cn(marketingCardIconCircleClass, "bg-[#297E43] text-white")}
              >
                <Briefcase className={marketingCardLucideGlyphClass} />
              </span>
              PLUS Staff
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-0 sm:pt-3 lg:pt-4">
            {staff.length > 0 ? (
              <div className={memberGrid}>
                {staff.map((m) => (
                  <TeamMemberCard
                    key={m.id}
                    name={m.name}
                    role={m.title1 ?? m.affiliation}
                    institution={m.title2}
                    avatarUrl={m.picture ?? undefined}
                    linkedIn={m.linkedIn}
                    googleScholar={m.googleScholar}
                  />
                ))}
              </div>
            ) : (
              <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                Staff spotlights and roles will be listed here.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="interns" className="border-0 bg-transparent px-0">
          <AccordionTrigger
            className={cn(
              triggerCls,
              "rounded-[30px] bg-[#E8F6EA] dark:bg-emerald-950/25",
              marketingCardPaddingClass,
            )}
          >
            <span className="flex items-center gap-3">
              <span
                className={cn(marketingCardIconCircleClass, "bg-[#297E43] text-white")}
              >
                <GraduationCap className={marketingCardLucideGlyphClass} />
              </span>
              Current Student Interns
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-0 sm:pt-3 lg:pt-4">
            <div className={memberGrid}>
              {notionStudents.length > 0
                ? notionStudents.map((m) => (
                    <TeamMemberCard
                      key={m.id}
                      name={m.name}
                      role={m.title1 ?? m.affiliation}
                      avatarUrl={m.picture ?? undefined}
                      linkedIn={m.linkedIn}
                    />
                  ))
                : INTERN_TEAM.map((member, i) => (
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

const latestReadMoreLinkClass =
  "group mt-4 ml-auto inline-flex cursor-pointer items-center gap-2 text-lg font-medium text-[#9A6D00] no-underline transition-opacity hover:opacity-90 dark:text-amber-200"

/**
 * Icon top flush with card padding (`items-start`). Title gets `pt` so the **first line’s**
 * vertical center matches the 48px disc — multi-line titles no longer pull the icon down.
 */
const latestCardTitleRowClass = "flex w-full shrink-0 items-start gap-3"

/** Centers first text line with `marketingCardIconCircleClass` (48px); clamp avoids negative padding when `1lh` > 48px. */
const latestCardTitleWithIconAlignClass =
  "pt-[max(0px,calc((48px-1lh)/2))]"

const latestCardHeaderIconClass = cn(marketingCardIconCircleClass, "bg-[#A27707] text-white")

const NEWS_CATEGORY_ICON: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "Media Coverage": Newspaper,
  "Events": Calendar,
  "Partnerships": Users,
  "Research": BarChart3,
  "Product Update": Zap,
  "Others": BookOpen,
}

/** Single news card — used for both featured (large) and secondary (small) slots. */
function LatestNewsCard({
  item,
  large = false,
}: {
  item: NewsItem
  large?: boolean
}) {
  const Icon = NEWS_CATEGORY_ICON[item.category] ?? Trophy
  const href = item.externalLink ?? "/about/news"
  const rawBlurb = item.marketingBlurb ?? item.summary
  const blurb = rawBlurb?.startsWith("(TBD") ? null : rawBlurb

  return (
    <article
      className={cn(
        "flex flex-col rounded-[30px] bg-[#FFF1C7] dark:bg-amber-950/20",
        marketingCardPaddingClass,
        large && "w-full",
      )}
    >
      <div className={latestCardTitleRowClass}>
        <span className={latestCardHeaderIconClass}>
          <Icon className={marketingCardLucideGlyphClass} aria-hidden />
        </span>
        <h3
          className={cn(
            aboutCardTitle,
            latestCardTitleWithIconAlignClass,
            "min-w-0 flex-1 text-[#9A6D00] dark:text-amber-200",
          )}
        >
          {item.title}
        </h3>
      </div>
      {item.featuredImage ? (
        <div
          className={cn(
            "relative mt-4 overflow-hidden rounded-2xl bg-muted",
            large ? "min-h-[280px] flex-1 sm:min-h-[360px] lg:min-h-[420px]" : "aspect-[16/8.5]",
          )}
        >
          <Image
            src={item.featuredImage}
            alt={item.title}
            fill
            className="object-cover"
            sizes={large ? "100vw" : "(max-width: 640px) 100vw, 50vw"}
          />
        </div>
      ) : blurb ? (
        <p
          className={cn(
            aboutCardBody,
            "mt-4 text-pretty dark:text-amber-100/90",
            large && "flex-1",
          )}
        >
          {blurb}
        </p>
      ) : null}
      <Link
        href={href}
        className={latestReadMoreLinkClass}
        aria-label={`Read more about ${item.title}`}
        {...(item.externalLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span>Read more</span>
        <ArrowRight className="size-6 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </article>
  )
}

export function AboutLatestSection({ news = [] }: { news?: NewsItem[] }) {
  const hasNotionData = news.length > 0
  // Featured item first (or most recent), up to 3 total
  const items = hasNotionData
    ? [...news].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)).slice(0, 3)
    : null

  return (
    <section id={aboutSectionIds.latest} className={cn("scroll-mt-24", marketingSectionVerticalGapClass)}>
      <AboutSectionTitleWithDecor decorSrc={forTutorsAssets.certificationDecor}>
        <h2 className={aboutSectionH2}>Latest at PLUS</h2>
        <p className={aboutSectionLead}>
          Stay up to date with the latest news, updates, and opportunities at PLUS.
        </p>
      </AboutSectionTitleWithDecor>

      {items ? (
        <div className={cn("flex flex-col", marketingCardStackGapClass)}>
          {items.map((item) => (
            <LatestNewsCard key={item.id} item={item} large />
          ))}
        </div>
      ) : (
        /* Placeholder — shown when no Notion data is available */
        <div className={cn("flex flex-col", marketingCardStackGapClass)}>
          <article
            className={cn(
              "flex w-full flex-col rounded-[30px] bg-[#FFF1C7] dark:bg-amber-950/20",
              marketingCardPaddingClass,
            )}
          >
            <div className={latestCardTitleRowClass}>
              <span className={latestCardHeaderIconClass}>
                <Trophy className={marketingCardLucideGlyphClass} aria-hidden />
              </span>
              <h3
                className={cn(
                  aboutCardTitle,
                  latestCardTitleWithIconAlignClass,
                  "min-w-0 flex-1 text-[#9A6D00] dark:text-amber-200",
                )}
              >
                Celebrating Our Datasets Win
              </h3>
            </div>
            <div className="relative mt-4 min-h-[280px] flex-1 overflow-hidden rounded-2xl bg-muted sm:min-h-[360px] lg:min-h-[420px]">
              <Image
                src="/figma/about/latest-datasets-win.png"
                alt="Schools Competition Winners graphic"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <Link href="/about/news" className={latestReadMoreLinkClass} aria-label="Read more about Celebrating Our Datasets Win">
              <span>Read more</span>
              <ArrowRight className="size-6 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </article>
          <div className={cn("grid grid-cols-1 sm:grid-cols-2", marketingCardStackGapClass)}>
            <article
              className={cn(
                "flex flex-col rounded-[30px] bg-[#FFF1C7] dark:bg-amber-950/20",
                marketingCardPaddingClass,
              )}
            >
              <div className={latestCardTitleRowClass}>
                <span className={latestCardHeaderIconClass}>
                  <GraduationCap className={marketingCardLucideGlyphClass} aria-hidden />
                </span>
                <h3
                  className={cn(
                    aboutCardTitle,
                    latestCardTitleWithIconAlignClass,
                    "min-w-0 flex-1 text-[#9A6D00] dark:text-amber-200",
                  )}
                >
                  Teachers Inspire Our Tutoring
                </h3>
              </div>
              <div className="relative mt-4 aspect-[16/8.5] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src="/figma/about/latest-teachers-inspire.png"
                  alt="Teachers and students in a school setting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <Link href="/about/news" className={latestReadMoreLinkClass} aria-label="Read more about Teachers Inspire Our Tutoring">
                <span>Read more</span>
                <ArrowRight className="size-6 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </article>
            <article
              className={cn(
                "flex flex-col rounded-[30px] bg-[#FFF1C7] dark:bg-amber-950/20",
                marketingCardPaddingClass,
              )}
            >
              <div className={latestCardTitleRowClass}>
                <span className={latestCardHeaderIconClass}>
                  <School className={marketingCardLucideGlyphClass} aria-hidden />
                </span>
                <h3
                  className={cn(
                    aboutCardTitle,
                    latestCardTitleWithIconAlignClass,
                    "min-w-0 flex-1 text-[#9A6D00] dark:text-amber-200",
                  )}
                >
                  PLUS Expands To 6 New Schools
                </h3>
              </div>
              <div className="relative mt-4 aspect-[16/8.5] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src="/figma/about/latest-expands-schools.png"
                  alt="Student using a learning tablet in a classroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <Link href="/about/news" className={latestReadMoreLinkClass} aria-label="Read more about PLUS Expands To 6 New Schools">
                <span>Read more</span>
                <ArrowRight className="size-6 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </article>
          </div>
        </div>
      )}
    </section>
  )
}

const successStoryReadLinkClass =
  "group mt-4 ml-auto inline-flex cursor-pointer items-center gap-2 text-lg font-medium text-[#C6009C] no-underline transition-opacity hover:opacity-90 dark:text-[#C6009C]"

/** Quote lines aligned with homepage testimonials (`PlusVoicesSection`). */
const SUCCESS_CARDS = [
  {
    title: "Boosting Confidence in Math",
    icon: Sparkles,
    quoteLead:
      "Tutoring has affected me and it made me realize if I didn't get the help I needed I would still be struggling. But it made me see",
    quoteHighlight: "math differently in a good way",
    quoteTail: ".",
  },
  {
    title: "Empowering Teachers with Data",
    icon: BarChart3,
    quoteLead:
      "My students were able to understand concepts more easily than before due to the",
    quoteHighlight: "one-to-one help",
    quoteTail: ". My students' math confidence has also increased!",
  },
  {
    title: "Bounding Students Across Schools",
    icon: BookOpen,
    quoteLead:
      "The students' reactions speak for themselves. They look forward to the tutoring sessions. It's not just about math. It's about relationships. It's about",
    quoteHighlight: "building confidence",
    quoteTail: ".",
  },
] as const

const CATEGORY_ICON: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Schools: School,
  Tutors: GraduationCap,
  Researchers: BarChart3,
  Foundations: BookOpen,
}

export function AboutSuccessStoriesSection({ stories = [] }: { stories?: SuccessStory[] }) {
  const hasNotionData = stories.length > 0
  return (
    <section
      id={aboutSectionIds.successStories}
      className={cn("scroll-mt-24", marketingSectionVerticalGapClass)}
    >
      <AboutSectionTitleWithDecor decorSrc={forTutorsAssets.toolkitDecor}>
        <h2 className={aboutSectionH2}>Success Stories at PLUS</h2>
        <p className={aboutSectionLead}>
          Celebrating the students, educators, and innovations making a real impact with PLUS.
        </p>
      </AboutSectionTitleWithDecor>
      <div className={cn("flex flex-col", marketingCardStackGapClass)}>
        {hasNotionData
          ? stories.slice(0, 3).map((story) => {
              const Icon = CATEGORY_ICON[story.category] ?? Sparkles
              return (
                <article
                  key={story.id}
                  className={cn(
                    "flex h-full flex-col rounded-[30px] bg-[#FFE8F6] dark:bg-[#FFE8F6]/15",
                    marketingCardPaddingClass,
                  )}
                >
                  <div
                    className={cn(
                      "flex min-h-0 flex-1 flex-col rounded-3xl bg-white dark:bg-card",
                      marketingCardPaddingClass,
                    )}
                  >
                    <div className={marketingCardLhAlignedHeaderRowClass}>
                      <span
                        className={cn(
                          marketingCardIconTitleRowOffsetClass,
                          marketingCardIconCircleClass,
                          "shrink-0 bg-[#C6009C] text-white",
                        )}
                      >
                        <Icon className={marketingCardLucideGlyphClass} aria-hidden />
                      </span>
                      <h3 className={cn(aboutCardTitle, "min-w-0 flex-1 text-[#C6009C] dark:text-[#C6009C]")}>
                        {story.title}
                      </h3>
                    </div>
                    {story.quote ? (
                      <p className={cn(aboutCardBody, "mt-4 min-h-0 flex-1 text-pretty italic text-muted-foreground")}>
                        &ldquo;{story.quote}&rdquo;
                        {story.quoteAttribution && (
                          <span className="mt-2 block not-italic font-medium text-[#C6009C]/80 dark:text-[#C6009C]/80">
                            — {story.quoteAttribution}
                          </span>
                        )}
                      </p>
                    ) : (
                      <p className={cn(aboutCardBody, "mt-4 min-h-0 flex-1 text-pretty text-muted-foreground")}>
                        {story.summary}
                      </p>
                    )}
                  </div>
                  <Link
                    href="/success-stories"
                    className={successStoryReadLinkClass}
                    aria-label={`Read story: ${story.title}`}
                  >
                    <span>Read story</span>
                    <ArrowRight className="size-6 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </article>
              )
            })
          : SUCCESS_CARDS.map(({ title, icon: Icon, quoteLead, quoteHighlight, quoteTail }) => (
              <article
                key={title}
                className={cn(
                  "flex h-full flex-col rounded-[30px] bg-[#FFE8F6] dark:bg-[#FFE8F6]/15",
                  marketingCardPaddingClass,
                )}
              >
                <div
                  className={cn(
                    "flex min-h-0 flex-1 flex-col rounded-3xl bg-white dark:bg-card",
                    marketingCardPaddingClass,
                  )}
                >
                  <div className={marketingCardLhAlignedHeaderRowClass}>
                    <span
                      className={cn(
                        marketingCardIconTitleRowOffsetClass,
                        marketingCardIconCircleClass,
                        "shrink-0 bg-[#C6009C] text-white",
                      )}
                    >
                      <Icon className={marketingCardLucideGlyphClass} aria-hidden />
                    </span>
                    <h3 className={cn(aboutCardTitle, "min-w-0 flex-1 text-[#C6009C] dark:text-[#C6009C]")}>
                      {title}
                    </h3>
                  </div>
                  <p className={cn(aboutCardBody, "mt-4 min-h-0 flex-1 text-pretty italic text-muted-foreground")}>
                    &ldquo;{quoteLead}{" "}
                    <strong className="font-bold italic text-[#C6009C] dark:text-[#C6009C]">{quoteHighlight}</strong>
                    {quoteTail}&rdquo;
                  </p>
                </div>
                <Link
                  href="/success-stories"
                  className={successStoryReadLinkClass}
                  aria-label={`Read story: ${title}`}
                >
                  <span>Read story</span>
                  <ArrowRight className="size-6 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
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
        <h2 className="text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl lg:text-4xl">
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
