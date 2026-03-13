"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

/**
 * Hero section for the "For Schools" page.
 * "Research-driven, AI-powered Support for Every Classroom"
 */
export const SchoolsHeroSection = () => {
  return (
    <section className="relative flex flex-col items-center gap-10 px-6 py-16 text-center sm:px-10 sm:py-20">
      <div className="flex max-w-3xl flex-col items-center gap-7">
        <p className="text-xl font-semibold text-teal-900 sm:text-2xl">
          For schools
        </p>
        <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-teal-950 sm:text-4xl md:text-5xl">
          Research-driven, AI-powered Support for Every Classroom
        </h1>
      </div>
      <Button className="h-11 rounded-full bg-teal-300 px-10 text-base text-teal-950 hover:bg-teal-200">
        Get Started for Free
      </Button>
    </section>
  )
}

/**
 * Partner school community section with placeholder logo circles.
 */
export const SchoolsCommunitySection = () => {
  return (
    <section className="space-y-10 px-6 sm:px-10">
      <div className="space-y-5">
        <h2 className="text-2xl font-bold tracking-tight text-teal-950 sm:text-3xl md:text-[40px]">
          Join the PLUS School Community
        </h2>
        <p className="max-w-3xl text-lg text-muted-foreground">
          We partner with forward-thinking schools to bridge learning gaps. See
          the organizations already making a difference with us.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-8 sm:gap-12">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex size-40 items-center justify-center rounded-full bg-muted sm:size-56 md:size-64"
          >
            <span className="text-xs text-muted-foreground">Partner {i}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/** Data for the training accordion items. */
const TRAINING_ITEMS = [
  {
    id: "free-for-all",
    title: "Free for All",
    description:
      "High-quality education shouldn't be gated. Access our full suite of AI-driven training and feedback tools at no cost to your district.",
  },
  {
    id: "multilingual-support",
    title: "Multilingual Support",
    description:
      "Our platform supports multiple languages so every tutor and student can communicate effectively regardless of their native language.",
  },
  {
    id: "scenario-based-training",
    title: "Scenario-Based Training",
    description:
      "Tutors practice with realistic classroom scenarios that build confidence and instructional expertise before working with students.",
  },
  {
    id: "ai-powered-feedback",
    title: "AI-Powered Tutor Feedback",
    description:
      "Intelligent feedback systems help tutors continuously improve their teaching strategies with actionable, data-driven insights.",
  },
] as const

/**
 * Program Onboarding & Training section with an accordion.
 * [NEW COMPONENT PATTERN]: Custom accordion with side image — uses existing
 * Accordion primitives but the expanded layout (text + image side-by-side)
 * is a new pattern not in the component library.
 */
export const SchoolsTrainingSection = () => {
  return (
    <section className="space-y-10 px-6 sm:px-10">
      <div className="space-y-5">
        <h2 className="text-2xl font-bold tracking-tight text-teal-950 sm:text-3xl md:text-[40px]">
          Program Onboarding &amp; Training
        </h2>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Here&apos;s how PLUS supports schools and trains tutors to guide
          students to success
        </p>
      </div>

      <Accordion defaultValue={["free-for-all"]}>
        {TRAINING_ITEMS.map((item) => (
          <AccordionItem key={item.id} value={item.id} className="border-b-0 py-4">
            <AccordionTrigger className="text-xl font-semibold text-muted-foreground hover:text-teal-950 hover:no-underline data-[panel-open]:text-teal-950 sm:text-2xl">
              <div className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-100">
                  <span className="size-3 rounded-full bg-teal-700" />
                </span>
                {item.title}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-6 pt-4 md:flex-row md:items-start md:justify-between">
                <p className="max-w-md text-base text-muted-foreground">
                  {item.description}
                </p>
                <div className="h-64 w-full max-w-md rounded-3xl bg-muted md:h-80 md:w-96" />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

/** Data for the day-to-day experience bento cards. */
const EXPERIENCE_STEPS = [
  {
    number: 1,
    title: "Expert Kickoff",
    description:
      "We onboard your faculty and send specialists to your campus for a hands-on kickoff, ensuring a seamless integration into your school's daily schedule.",
    variant: "filled" as const,
    bgColor: "bg-fuchsia-200",
    textColor: "text-fuchsia-800",
    numberBg: "bg-fuchsia-800",
  },
  {
    number: 2,
    title: "1:1 Certified Tutoring",
    description: "",
    variant: "outlined" as const,
    borderColor: "border-yellow-900",
    textColor: "text-yellow-900",
    numberBg: "bg-yellow-900",
  },
  {
    number: 3,
    title: "Goal-Driven Monitoring",
    description: "",
    variant: "outlined" as const,
    borderColor: "border-green-900",
    textColor: "text-green-900",
    numberBg: "bg-green-900",
  },
  {
    number: 4,
    title: "The Teacher Loop",
    description: "",
    variant: "outlined" as const,
    borderColor: "border-blue-900",
    textColor: "text-blue-900",
    numberBg: "bg-blue-900",
  },
] as const

/**
 * "Your Day-to-Day Experience with PLUS" section.
 * [NEW COMPONENT PATTERN]: Numbered process bento cards — a horizontal
 * layout with a featured first card (filled bg) and outlined step cards.
 * Built with existing Card primitives but the numbered-step visual pattern is new.
 */
export const SchoolsExperienceSection = () => {
  return (
    <section className="space-y-10 px-6 sm:px-10">
      <div className="space-y-5">
        <h2 className="text-2xl font-bold tracking-tight text-teal-950 sm:text-3xl md:text-[40px]">
          Your Day-to-Day Experience with PLUS
        </h2>
        <p className="max-w-3xl text-lg text-muted-foreground">
          A seamless integration designed to support your faculty and accelerate
          student growth.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {EXPERIENCE_STEPS.map((step) => (
          <div
            key={step.number}
            className={cn(
              "flex flex-col gap-5 rounded-3xl p-5",
              step.variant === "filled"
                ? `${step.bgColor}`
                : `border-2 ${step.borderColor}`
            )}
          >
            <span
              className={cn(
                "flex size-12 items-center justify-center rounded-full text-lg font-bold text-white",
                step.numberBg
              )}
            >
              {step.number}
            </span>
            <h3
              className={cn("text-xl font-bold sm:text-2xl", step.textColor)}
            >
              {step.title}
            </h3>
            {step.description && (
              <p className={cn("text-sm", step.textColor)}>
                {step.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Large image placeholder below the cards */}
      <div className="h-80 w-full overflow-hidden rounded-3xl bg-muted sm:h-96 lg:h-[494px]" />
    </section>
  )
}

/** Data for the oversight stacking cards. */
const OVERSIGHT_CARDS = [
  {
    title: "Align with Your Curriculum",
    description:
      "We work with your faculty to tailor lesson strategies that complement your school's specific learning objectives and standards.",
    cta: "Get training",
    bgColor: "bg-fuchsia-200",
    textColor: "text-fuchsia-800",
  },
  {
    title: "Data at Your Fingertips",
    description:
      "Track tutor performance, monitor student progress, and access high-level analytics to measure the ROI of your tutoring initiatives.",
    cta: "Try our demo",
    bgColor: "bg-green-100",
    textColor: "text-green-900",
  },
  {
    title: "Professional Growth & Accountability",
    description:
      "Tutors earn industry-recognized credentials upon completion, ensuring they meet the standards of your institution.",
    cta: "Register your tutors",
    bgColor: "bg-yellow-200",
    textColor: "text-yellow-900",
  },
  {
    title: "Works with Any Math Software",
    description:
      "PLUS is designed to be software-agnostic, which means no new software licenses or changes required.",
    cta: "See How it Works",
    bgColor: "bg-blue-200",
    textColor: "text-blue-900",
  },
] as const

/**
 * "Maintain Excellence with Robust Oversight" section with stacking cards.
 * [NEW COMPONENT PATTERN]: Sticky stacking cards — cards that stack on top
 * of each other as user scrolls (CSS sticky positioning). This scroll-driven
 * layout pattern is not in the current component library.
 */
export const SchoolsOversightSection = () => {
  return (
    <section className="space-y-10 px-6 sm:px-10">
      <div className="space-y-5">
        <h2 className="text-2xl font-bold tracking-tight text-teal-950 sm:text-3xl md:text-[40px]">
          Maintain Excellence with Robust Oversight
        </h2>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Ensure high-impact tutoring through data-driven insights and
          professional certification.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {OVERSIGHT_CARDS.map((card, index) => (
          <div
            key={card.title}
            className="sticky"
            style={{ top: `${80 + index * 40}px` }}
          >
            <div
              className={cn(
                "flex flex-col gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10",
                card.bgColor
              )}
            >
              <div className="flex max-w-md flex-col gap-4">
                <span className="flex size-12 items-center justify-center rounded-full bg-white/30">
                  <span className="size-3 rounded-full bg-current" />
                </span>
                <h3
                  className={cn(
                    "text-xl font-semibold sm:text-2xl",
                    card.textColor
                  )}
                >
                  {card.title}
                </h3>
                <p className={cn("text-sm leading-relaxed", card.textColor)}>
                  {card.description}
                </p>
                <Button className="h-11 w-fit rounded-full bg-teal-300 px-8 text-teal-950 hover:bg-teal-200">
                  {card.cta}
                </Button>
              </div>
              <div className="h-56 w-full rounded-3xl bg-white/20 sm:h-72 sm:w-80 md:w-96" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * "Register Your Institution" CTA section.
 */
export const SchoolsRegisterCTA = () => {
  return (
    <section className="rounded-3xl bg-white p-10 text-center sm:p-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
        <h2 className="text-3xl font-bold tracking-tight text-teal-950 sm:text-4xl md:text-5xl">
          Register Your Institution
        </h2>
        <p className="text-lg text-muted-foreground">
          Want to get started? Sign up to register your organization and provide
          your tutors access to our full training suite
        </p>
        <Button className="h-11 rounded-full bg-teal-300 px-10 text-base text-teal-950 hover:bg-teal-200">
          Sign up
        </Button>
      </div>
    </section>
  )
}
