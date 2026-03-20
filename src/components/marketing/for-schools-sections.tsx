"use client"

import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { BunduiCtaSection } from "@/components/registry/bundui/cta-section"
import { BunduiHowItWorksSection } from "@/components/registry/bundui/how-it-works-section"
import { BunduiTestimonialsSection } from "@/components/registry/bundui/testimonials-section"
import { cn } from "@/lib/utils"
import { forSchoolsAssets } from "@/components/marketing/for-schools-assets"
import { marketingTypography } from "@/lib/marketing-typography"
import { forSchoolsSectionIds } from "@/lib/plus-footer-ia"

export const SchoolsHeroSection = () => {
  return (
    <section className="relative flex flex-col items-center gap-8 py-8 text-center sm:py-12 lg:py-16">
      <h1 className="flex max-w-3xl flex-col items-center gap-3">
        <span className={marketingTypography.h2}>For schools</span>
        <span className={marketingTypography.h1}>
          Research-driven, AI-powered Support for Every Classroom
        </span>
      </h1>
      <Button>Get Started for Free</Button>
    </section>
  )
}

export const SchoolsCommunitySection = () => {
  return (
    <section
      id={forSchoolsSectionIds.community}
      className="relative space-y-6 sm:space-y-8 lg:space-y-10"
    >
      <div className="space-y-5">
        <h2 className={marketingTypography.h2}>
          Join the PLUS School Community
        </h2>
        <p className={cn(marketingTypography.lead, "max-w-3xl")}>
          We partner with forward-thinking schools to bridge learning gaps. See
          the organizations already making a difference with us.
        </p>
      </div>

      <div className="relative w-full max-w-5xl">
        <Carousel opts={{ align: "center", loop: true }}>
          <CarouselContent className="-ml-4">
            {forSchoolsAssets.partnerLogos.map((src, index) => (
              <CarouselItem
                key={src}
                className="pl-4 sm:basis-1/2 lg:basis-1/4"
                aria-label={`Partner logo ${index + 1}`}
              >
                <div className="relative flex size-44 items-center justify-center overflow-hidden rounded-full bg-muted sm:size-56 lg:size-64">
                  <img
                    alt=""
                    src={src}
                    className="h-full w-full object-contain p-10"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 sm:-left-12" />
          <CarouselNext className="right-0 sm:-right-12" />
        </Carousel>
      </div>

      <img
        alt=""
        src={forSchoolsAssets.decor.community}
        className="pointer-events-none absolute -right-4 -top-6 hidden h-44 w-44 object-cover lg:block"
      />
    </section>
  )
}

/** Benefits content from Figma node 1104-1220. Rendered with Storybook Accordion (components-marketing/Accordion). */
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

export const SchoolsTrainingSection = () => {
  return (
    <section
      id={forSchoolsSectionIds.benefits}
      className="space-y-6 sm:space-y-8 lg:space-y-10"
    >
      <div className="space-y-5">
        <h2 className={marketingTypography.h2}>Benefits of PLUS</h2>
        <p className={cn(marketingTypography.lead, "max-w-3xl")}>
          Here&apos;s how PLUS supports schools and trains tutors to guide students
          to success
        </p>
      </div>

      <Accordion
        defaultValue={[0]}
        className="w-full rounded-xl border border-border/60 bg-card/70"
      >
        {BENEFITS_ITEMS.map((item) => (
          <AccordionItem key={item.id} className="border-border/60 px-5 last:border-b-0 sm:px-6">
            <AccordionTrigger
              className={cn(
                marketingTypography.h3,
                "py-4 text-left hover:no-underline sm:py-5"
              )}
            >
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="pb-5 pt-0 sm:pb-6">
              <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-[1fr_440px] md:items-start">
                <div className="flex flex-col gap-4">
                  <p className={cn(marketingTypography.body, "text-muted-foreground")}>
                    {item.description}
                  </p>
                  {item.cta ? (
                    <Button className="w-fit">{item.cta}</Button>
                  ) : null}
                </div>
                <div className="relative overflow-hidden rounded-3xl bg-muted">
                  <img
                    alt=""
                    src={forSchoolsAssets.images.benefits}
                    className="h-64 w-full object-cover sm:h-72 md:h-[440px]"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

const EXPERIENCE_STEPS = [
  {
    title: "Expert Kickoff",
    body: "We onboard your faculty and send specialists to your campus for a hands-on kickoff, ensuring a seamless integration into your school's daily schedule.",
    variant: "filled" as const,
  },
  {
    title: "1:1 Certified Tutoring",
    variant: "outlined" as const,
  },
  {
    title: "Goal-Driven Monitoring",
    variant: "outlined" as const,
  },
  {
    title: "The Teacher Loop",
    variant: "outlined" as const,
  },
] as const

const experienceStepsForTemplate = EXPERIENCE_STEPS.map((step) => ({
  title: step.title,
  body: "body" in step ? (step as { body?: string }).body : undefined,
  variant: step.variant,
}))

export const SchoolsExperienceSection = () => {
  return (
    <section id={forSchoolsSectionIds.experience}>
      <BunduiHowItWorksSection
        sectionLabel="Experience"
        sectionTitle="Your Day-to-Day Experience with PLUS"
        sectionDescription="A seamless integration designed to support your faculty and accelerate student growth."
        layout="grid"
        steps={experienceStepsForTemplate}
        imageSrc={forSchoolsAssets.images.experience}
        imageAlt=""
      />
    </section>
  )
}

const OVERSIGHT_CARDS = [
  {
    title: "Align with Your Curriculum",
    description:
      "We work with your faculty to tailor lesson strategies that complement your school’s specific learning objectives and standards.",
    cta: "Get training",
    bgColor: "bg-fuchsia-200",
    textColor: "text-fuchsia-800",
    icon: forSchoolsAssets.icons.oversight[0],
    image: forSchoolsAssets.images.benefits,
  },
  {
    title: "Data at Your Fingertips",
    description:
      "Track tutor performance, monitor student progress, and access high-level analytics to measure the ROI of your tutoring initiatives.",
    cta: "Try our demo",
    bgColor: "bg-green-100",
    textColor: "text-green-900",
    icon: forSchoolsAssets.icons.oversight[1],
    image: forSchoolsAssets.images.oversightData,
  },
  {
    title: "Professional Growth & Accountability",
    description:
      "Tutors earn industry-recognized credentials upon completion, ensuring they meet the standards of your institution.",
    cta: "Register your tutors",
    bgColor: "bg-yellow-200",
    textColor: "text-yellow-900",
    icon: forSchoolsAssets.icons.oversight[2],
    image: forSchoolsAssets.images.benefits,
  },
  {
    title: "Works with Any Math Software",
    description:
      "PLUS is designed to be software-agnostic, which means no new software licenses or changes required.",
    cta: "See How it Works",
    bgColor: "bg-blue-200",
    textColor: "text-blue-900",
    icon: forSchoolsAssets.icons.oversight[3],
    image: forSchoolsAssets.images.benefits,
  },
] as const

export const SchoolsOversightSection = () => {
  return (
    <section
      id={forSchoolsSectionIds.oversight}
      className="space-y-6 sm:space-y-8 lg:space-y-10"
    >
      <div className="space-y-5">
        <h2 className={marketingTypography.h2}>
          Maintain Excellence with Robust Oversight
        </h2>
        <p className={cn(marketingTypography.lead, "max-w-3xl")}>
          Ensure high-impact tutoring through data-driven insights and professional
          certification.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
        {OVERSIGHT_CARDS.map((card, index) => (
          <div
            key={card.title}
            className="sticky"
            style={{ top: `${96 + index * 56}px` }}
          >
            <div
              className={cn(
                "flex flex-col gap-6 rounded-3xl p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6",
                card.bgColor
              )}
            >
              <div className="flex max-w-lg flex-col gap-4 sm:gap-5">
                <img alt="" src={card.icon} className="size-12" aria-hidden />
                <h3 className={cn(marketingTypography.h2, card.textColor)}>
                  {card.title}
                </h3>
                <p className={cn(marketingTypography.body, "text-muted-foreground")}>
                  {card.description}
                </p>
                <Button className="w-fit">{card.cta}</Button>
              </div>
              <div className="w-full overflow-hidden rounded-3xl bg-white/30 sm:h-[350px] sm:w-[411px]">
                <img
                  alt=""
                  src={card.image}
                  className="h-64 w-full object-cover sm:h-[350px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const SUCCESS_STORIES = [
  {
    author: "Math Teacher in Oregon",
    avatar: forSchoolsAssets.avatars[0],
    quote:
      '"I love that PLUS Tutoring provides an opportunity for kids to have more help in the classroom. It\'s not just me trying to get to every student but it\'s more specific to their needs. I feel like they get a little bit more out of every day."',
  },
  {
    author: "School District of Lancaster",
    avatar: forSchoolsAssets.avatars[1],
    quote:
      "\"The students' reactions speak for themselves. They look forward to the tutoring sessions. It's not just about math. It's about relationships. It's about building confidence.\"",
  },
  {
    author: "Teacher working with PLUS Tutors",
    avatar: forSchoolsAssets.avatars[2],
    quote:
      '"My students were able to understand concepts more easily than before due to the one-to-one help. My students\' math confidence has also increased!"',
  },
] as const

const successStoryTestimonials = SUCCESS_STORIES.map((story) => ({
  name: story.author,
  role: "Educator",
  company: "PLUS",
  quote: story.quote,
  avatarUrl: story.avatar,
}))

export const SchoolsSuccessStoriesSection = () => {
  return (
    <section id={forSchoolsSectionIds.successStories} className="relative">
      <BunduiTestimonialsSection
        sectionLabel="Success Stories"
        sectionTitle="School Success Stories"
        sectionDescription="Here's what teachers are saying about PLUS."
        testimonials={successStoryTestimonials}
      />
      <img
        alt=""
        src={forSchoolsAssets.decor.successStories}
        className="pointer-events-none absolute -right-3 -top-6 hidden h-40 w-40 object-cover lg:block"
      />
    </section>
  )
}

export const SchoolsRegisterCTA = () => {
  return (
    <section id={forSchoolsSectionIds.register}>
      <BunduiCtaSection
        eyebrow="Get started"
        heading="Register Your Institution"
        body="Want to get started? Sign up to register your organization and provide your tutors access to our full training suite."
        primaryLabel="Sign up"
        secondaryLabel={null}
      />
    </section>
  )
}
