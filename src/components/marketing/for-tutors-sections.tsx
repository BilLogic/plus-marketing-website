"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { forTutorsSectionIds } from "@/lib/plus-footer-ia"
import { marketingTypography } from "@/lib/marketing-typography"

const HERO_HEADLINE_CLASS = marketingTypography.heroH1
const HERO_LEAD_CLASS = cn(marketingTypography.lead, "text-center")

/**
 * Hero section for the "For Tutors" page.
 * "Teach What Matters and Earn What You Deserve"
 */
export const TutorsHeroSection = () => {
  return (
    <section className="relative flex flex-col items-center gap-10 px-6 py-16 text-center sm:px-10 sm:py-20">
      <div className="flex max-w-3xl flex-col items-center gap-5">
        <h1 className={HERO_HEADLINE_CLASS}>
          Teach What Matters and Earn What You Deserve
        </h1>
        <p className={HERO_LEAD_CLASS}>
          Join 500+ tutors supporting 5,000+ students. Earn while you learn and
          teach!
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button className="h-11 rounded-full bg-teal-300 px-8 text-base text-teal-950 hover:bg-teal-200">
          Check Our Demo
        </Button>
        <Button
          variant="outline"
          className="h-11 rounded-full border-teal-900 px-8 text-base text-teal-950 hover:bg-teal-50"
        >
          Become a Tutor
        </Button>
      </div>
      {/* Image placeholder with play button overlay */}
      <div className="relative h-64 w-full max-w-3xl overflow-hidden rounded-3xl bg-muted sm:h-80 md:h-96">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <svg
              className="ml-1 size-6 text-teal-900"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  )
}

/** Data for the compensation stats cards. */
const COMPENSATION_STATS = [
  {
    stat: "$18/hr",
    label: "starting pay for tutors",
    description:
      "Paid for training, tutoring, and reflection time.",
  },
  {
    stat: "2–10 hrs",
    label: "per week",
    description:
      "Flexible weekly commitment and schedule on your time.",
  },
  {
    stat: "Free Training",
    label: "for all tutors",
    description:
      "Access PLUS training lessons and get AI-powered feedback.",
  },
] as const

/**
 * "Every hour counts" compensation section with stat cards.
 */
export const TutorsCompensationSection = () => {
  return (
    <section
      id={forTutorsSectionIds.compensation}
      className="space-y-10 px-6 sm:px-10"
    >
      <h2 className={cn(marketingTypography.h2, "max-w-2xl font-bold text-teal-950")}>
        Every hour counts. Get paid for training, tutoring, and reflection
      </h2>
      <div className="grid gap-5 sm:grid-cols-3">
        {COMPENSATION_STATS.map((item) => (
          <Card key={item.stat} className="border-border/70">
            <CardHeader className="pb-2">
              <CardTitle className={cn(marketingTypography.h3, "font-bold text-teal-950")}>
                {item.stat}
              </CardTitle>
              <p className={cn(marketingTypography.body, "text-sm text-muted-foreground")}>
                {item.label}
              </p>
            </CardHeader>
            <CardContent>
              <p className={cn(marketingTypography.body, "text-muted-foreground")}>
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

/** Data for the tutoring experience items. */
const TUTORING_STEPS = [
  {
    title: "Build Bonds",
    description:
      "Begin each session by connecting with your students.",
    color: "bg-teal-100 text-teal-900",
    iconBg: "bg-teal-700",
  },
  {
    title: "1:1 Support",
    description:
      "Provide focused, personalized math help during each session.",
    color: "bg-fuchsia-100 text-fuchsia-800",
    iconBg: "bg-fuchsia-700",
  },
  {
    title: "Reflect & Grow",
    description:
      "Review your session and build on your teaching skills.",
    color: "bg-yellow-100 text-yellow-900",
    iconBg: "bg-yellow-700",
  },
] as const

/**
 * "What Tutoring at PLUS Looks Like" section.
 */
export const TutorsExperienceSection = () => {
  return (
    <section
      id={forTutorsSectionIds.experience}
      className="space-y-10 px-6 sm:px-10"
    >
      <h2 className={cn(marketingTypography.h2, "font-bold text-teal-950")}>
        What Tutoring at PLUS Looks Like
      </h2>
      <div className="grid gap-5 sm:grid-cols-3">
        {TUTORING_STEPS.map((step) => (
          <div key={step.title} className="flex flex-col gap-4">
            <span
              className={cn(
                "flex size-12 items-center justify-center rounded-full",
                step.iconBg
              )}
            >
              <span className="size-3 rounded-full bg-white" />
            </span>
            <h3 className={cn(marketingTypography.h3, "font-bold text-teal-950")}>
              {step.title}
            </h3>
            <p className={cn(marketingTypography.body, "text-muted-foreground")}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
      {/* Image placeholder area */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="h-56 rounded-3xl bg-muted sm:h-72" />
        <div className="h-56 rounded-3xl bg-muted sm:h-72" />
      </div>
    </section>
  )
}

/**
 * "Earn Certification & Digital Badges" section.
 * [NEW COMPONENT PATTERN]: Badge preview card — a visual card showing a
 * "My Badge" / credential preview. Not in the existing component library.
 */
export const TutorsCertificationSection = () => {
  return (
    <section
      id={forTutorsSectionIds.certification}
      className="space-y-10 px-6 sm:px-10"
    >
      <h2 className={cn(marketingTypography.h2, "font-bold text-teal-950")}>
        Earn Certification &amp; Digital Badges
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: description */}
        <Card className="border-teal-200 bg-teal-50/50">
          <CardContent className="space-y-4 pt-6">
            <h3 className={cn(marketingTypography.h3, "font-bold text-teal-950")}>
              Tutor Certification &amp; Digital Badges
            </h3>
            <p className={cn(marketingTypography.body, "text-muted-foreground")}>
              Complete all training to earn stackable badges for your resume and
              social media.
            </p>
            <p className={cn(marketingTypography.body, "text-muted-foreground")}>
              Make findability immediately with Contact card archives.
            </p>
            <Button
              variant="outline"
              className="rounded-full border-teal-900 text-teal-950 hover:bg-teal-100"
            >
              Register now
            </Button>
          </CardContent>
        </Card>

        {/* Right: badge preview */}
        <Card className="border-border/70">
          <CardContent className="flex flex-col items-center gap-4 pt-6 text-center">
            <span className="text-sm text-muted-foreground">My Badge</span>
            <div className="flex size-20 items-center justify-center rounded-full bg-teal-100">
              <span className="text-2xl">🏅</span>
            </div>
            <div>
              <p className={cn(marketingTypography.h3, "font-bold text-teal-950")}>
                Certified Tutor
              </p>
              <p className={cn(marketingTypography.body, "text-muted-foreground")}>
                for completing all training lessons
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-teal-900"
            >
              View My Badge
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

/** Data for the tutor toolkit bento cards. */
const TOOLKIT_CARDS = [
  {
    title: "AI-Powered Teaching Insights",
    subtitle: "Narrowing Opportunity Gaps",
    description:
      "Using AI insights, you will pinpoint learning challenges, providing the students exactly what they need, when they need it. Using AI technology and researched backed methods to help student excel in math.",
    span: "md:col-span-2",
    bgColor: "bg-teal-100",
  },
  {
    title: "All-in-One Toolkit",
    subtitle: "",
    description: "",
    span: "",
    bgColor: "bg-teal-50",
  },
  {
    title: "Student Progress At A Glance",
    subtitle: "",
    description: "",
    span: "",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Ongoing Tracking",
    subtitle: "",
    description: "",
    span: "",
    bgColor: "bg-green-100",
  },
  {
    title: "Works With Many Math Platforms",
    subtitle: "",
    description: "",
    span: "",
    bgColor: "bg-fuchsia-100",
  },
] as const

/**
 * "Your Tutor Toolkit" bento grid section.
 * [NEW COMPONENT PATTERN]: Tutor toolkit bento grid — a responsive bento
 * layout with mixed-size colored cards. Uses basic Card but the
 * bento grid sizing pattern is new.
 */
export const TutorsToolkitSection = () => {
  return (
    <section
      id={forTutorsSectionIds.toolkit}
      className="space-y-10 px-6 sm:px-10"
    >
      <h2 className={cn(marketingTypography.h2, "font-bold text-teal-950")}>
        Your Tutor Toolkit
      </h2>
      <div className="grid gap-5 md:grid-cols-3">
        {TOOLKIT_CARDS.map((card) => (
          <div
            key={card.title}
            className={cn(
              "flex flex-col gap-3 rounded-3xl p-6",
              card.bgColor,
              card.span
            )}
          >
            {card.subtitle && (
              <Badge variant="secondary" className="w-fit text-xs">
                {card.subtitle}
              </Badge>
            )}
            <h3 className={cn(marketingTypography.h3, "font-bold text-teal-950")}>
              {card.title}
            </h3>
            {card.description && (
              <p className={cn(marketingTypography.body, "text-muted-foreground")}>
                {card.description}
              </p>
            )}
            {/* Image placeholder */}
            <div className="mt-auto h-32 rounded-2xl bg-white/50" />
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * "Ready to Make an Impact?" CTA section.
 */
export const TutorsImpactCTA = () => {
  return (
    <section
      id={forTutorsSectionIds.impact}
      className="rounded-3xl bg-white p-10 text-center sm:p-16"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
        <h2 className={cn(marketingTypography.h2, "font-bold text-teal-950 sm:text-4xl")}>
          Ready to Make an Impact?
        </h2>
        <p className={marketingTypography.lead}>
          Join a community of tutors committed to growth, equity, and meaningful
          math mentorship.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button className="h-11 rounded-full bg-teal-300 px-8 text-base text-teal-950 hover:bg-teal-200">
            Check Our Demo
          </Button>
          <Button
            variant="outline"
            className="h-11 rounded-full border-teal-900 px-8 text-base text-teal-950 hover:bg-teal-50"
          >
            Become a Tutor
          </Button>
        </div>
      </div>
    </section>
  )
}
