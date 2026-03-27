"use client"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { marketingTypography } from "@/lib/marketing-typography"
import { forResearchersSectionIds } from "@/lib/plus-footer-ia"
import { forResearchersAssets } from "@/components/marketing/for-researchers-assets"

const RESEARCH_HIGHLIGHT_TOPICS = [
  {
    title: "Student Learning",
    description:
      "Examining scalable tutoring solutions to support diverse math learners.",
    icon: forResearchersAssets.highlights.studentLearningIcon,
    featured: true,
  },
  {
    title: "Gen AI",
    description: "",
    icon: forResearchersAssets.highlights.genAiIcon,
    featured: false,
  },
  {
    title: "Tutor Training",
    description: "",
    icon: forResearchersAssets.highlights.tutorTrainingIcon,
    featured: false,
  },
] as const

const RESEARCH_STUDIES = [
  "The Neglected 15%: Positive Effects of Hybrid Human-AI Tutoring Among Students with Disabilities",
  "Predicting Long-Term Student Outcomes from Short-Term EdTech Log Data",
] as const

const RESEARCHERS = [
  { name: "Dr. Ken Koedinger", role: "Principal Investigator, Professor @HCII", org: "Carnegie Mellon University" },
  { name: "Dr. Emma Brunskill", role: "Professor @CSD", org: "Stanford University" },
  { name: "Dr. Vincent Aleven", role: "Professor @HCII", org: "Carnegie Mellon University" },
  { name: "Dr. Lee Branstetter", role: "Professor @Heinz", org: "Carnegie Mellon University" },
  { name: "Dr. Danielle Thomas", role: "Research Lead, Systems Scientist @HCII", org: "Carnegie Mellon University" },
  { name: "Dr. Ashish Gurung", role: "Post-Doctoral Researcher", org: "Carnegie Mellon University" },
  { name: "Conrad Borchers", role: "Graduate Researcher", org: "Carnegie Mellon University" },
  { name: "Elizabeth McLaughlin", role: "Research Scientist", org: "Carnegie Mellon University" },
  { name: "Clara Brandt", role: "Learning Experience Researcher", org: "Carnegie Mellon University" },
  { name: "Marie Cynthia Abijuru Kamikazi", role: "Research Associate", org: "Carnegie Mellon University" },
] as const

const RESEARCH_SUCCESS_STORIES = [
  { title: "Story 1 Title", icon: forResearchersAssets.successStories.icon1 },
  { title: "Story 2 Title", icon: forResearchersAssets.successStories.icon2 },
] as const

const RESEARCH_SECTION_H2 =
  "text-pretty text-lg font-bold tracking-tight text-teal-950 sm:text-2xl md:text-3xl"
const RESEARCH_SECTION_LEAD =
  "text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg"

/** Matches the right-side character sizing rhythm used in our section headers. */
const RESEARCH_SECTION_DECOR =
  "pointer-events-none h-[clamp(4.5rem,18vw,10.9375rem)] w-[clamp(3.75rem,24vw,12rem)] shrink-0 object-contain sm:h-32 sm:w-[7.25rem] md:h-40 md:w-36 lg:h-[175px] lg:w-[193px]"

export const ResearchersHeroSection = () => {
  return (
    <section className="relative flex flex-col items-center gap-10 overflow-hidden px-6 py-16 text-center sm:px-10 sm:py-20">
      <img
        alt=""
        src={forResearchersAssets.heroDecor.division}
        className="pointer-events-none absolute left-0 top-4 hidden h-24 w-24 object-contain sm:block md:h-36 md:w-36"
        aria-hidden
      />
      <img
        alt=""
        src={forResearchersAssets.heroDecor.multiplication}
        className="pointer-events-none absolute left-6 bottom-0 hidden h-24 w-24 object-contain sm:block md:h-36 md:w-36"
        aria-hidden
      />
      <img
        alt=""
        src={forResearchersAssets.heroDecor.equal}
        className="pointer-events-none absolute right-0 bottom-2 hidden h-24 w-24 object-contain sm:block md:h-36 md:w-36"
        aria-hidden
      />

      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center sm:gap-10">
        <h1 className="flex flex-col items-center gap-3 sm:gap-4">
          <span className="text-2xl font-semibold text-teal-900 sm:text-3xl">
            For researchers
          </span>
          <span
            className={cn(
              marketingTypography.h1,
              "max-w-prose text-balance font-bold text-teal-950"
            )}
          >
            Pioneering Lab Research, Socio-Technical Support for Every Learning
            Environment
          </span>
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="plusNavCta" size="navCta" className="h-[45px] min-h-[45px] px-10">
            Our publications
          </Button>
          <Button
            variant="outline"
            size="navCta"
            className="h-[45px] min-h-[45px] rounded-full border-cyan-700 px-10 text-[#004247]"
          >
            Our researchers
          </Button>
        </div>
      </div>
    </section>
  )
}

const ResearchersSectionHeader = ({
  title,
  description,
  decor,
}: {
  title: string
  description: string
  decor: string
}) => (
  <div className="flex w-full flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
    <div className="min-w-0 flex-1 basis-0 space-y-3 sm:space-y-4 md:space-y-5">
      <h2 className={RESEARCH_SECTION_H2}>
        {title}
      </h2>
      <p className={RESEARCH_SECTION_LEAD}>
        {description}
      </p>
    </div>
    <img
      alt=""
      src={decor}
      className={cn(RESEARCH_SECTION_DECOR, "hidden md:block")}
      aria-hidden
    />
  </div>
)

export const ResearchPartnersSection = () => {
  return (
    <section id={forResearchersSectionIds.partners} className="space-y-10 px-6 sm:px-10">
      <ResearchersSectionHeader
        title="Our Research Partners"
        description="A strategic alliance of world-class universities and industry leaders committed to rigorous learning engineering at scale."
        decor={forResearchersAssets.partners.decor}
      />
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        {forResearchersAssets.partners.logos.map((logo) => (
          <div key={logo} className="flex items-center justify-center rounded-3xl bg-white p-4">
            <img alt="" src={logo} className="h-24 w-full object-contain md:h-32" aria-hidden />
          </div>
        ))}
      </div>
    </section>
  )
}

export const ResearchHighlightsSection = () => {
  return (
    <section id={forResearchersSectionIds.highlights} className="space-y-10 px-6 sm:px-10">
      <ResearchersSectionHeader
        title="Our Latest Research Highlights"
        description="Explore our most recent findings in generative artificial intelligence, tutor training, and student learning."
        decor={forResearchersAssets.highlights.decor}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr_1fr]">
        {RESEARCH_HIGHLIGHT_TOPICS.map((topic) => (
          <article
            key={topic.title}
            className={cn(
              "rounded-[30px] border-2 border-[#c05053] bg-white px-6 py-7",
              topic.featured && "border-transparent bg-[#ffeaea]"
            )}
          >
            <div className="space-y-3">
              <img alt="" src={topic.icon} className="size-[58px]" aria-hidden />
              <h3 className={cn(marketingTypography.h3, "font-bold text-[#c05053]")}>
                {topic.title}
              </h3>
              {topic.description ? (
                <p className={cn(marketingTypography.body, "text-muted-foreground")}>
                  {topic.description}
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {RESEARCH_STUDIES.map((study) => (
          <article
            key={study}
            className="rounded-[30px] border-2 border-[#c05053] bg-white px-6 py-8"
          >
            <h4 className={cn(marketingTypography.h3, "font-bold leading-snug text-[#c05053]")}>
              {study}
            </h4>
            <div className="mt-6 flex items-center justify-end gap-2 text-[#c05053]">
              <span className="text-base">Read study</span>
              <span aria-hidden>→</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export const ResearchIndexSection = () => {
  return (
    <section id={forResearchersSectionIds.index} className="space-y-10 px-6 sm:px-10">
      <ResearchersSectionHeader
        title="Research Index"
        description="Explore the full archive of PLUS research"
        decor={forResearchersAssets.index.decor}
      />
      <div className="flex items-center gap-2 rounded-full border-2 border-muted-foreground/60 px-5 py-3">
        <Search className="size-5 text-muted-foreground" />
        <span className="text-lg text-muted-foreground">Search studies</span>
      </div>
      <div className="overflow-hidden rounded-[30px]">
        <img alt="" src={forResearchersAssets.index.placeholder} className="h-[260px] w-full object-cover md:h-[426px]" aria-hidden />
      </div>
    </section>
  )
}

export const ResearchersGridSection = () => {
  return (
    <section id={forResearchersSectionIds.researchers} className="space-y-10 px-6 sm:px-10">
      <ResearchersSectionHeader
        title="Our Researchers"
        description="Meet our team who are driving evidence-based breakthroughs in learning science, HCI, and artificial intelligence."
        decor={forResearchersAssets.researchers.decor}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {RESEARCHERS.map((researcher) => (
          <article key={researcher.name} className="overflow-hidden rounded-[30px] bg-[#e0f5fe]">
            <img
              alt=""
              src={forResearchersAssets.researchers.fallbackPhoto}
              className="h-64 w-full object-cover"
              aria-hidden
            />
            <div className="space-y-2 p-5">
              <h3 className={cn(marketingTypography.h3, "font-bold text-teal-950")}>
                {researcher.name}
              </h3>
              <p className="text-sm text-sky-700 underline">Google Scholar | LinkedIn</p>
              <p className={cn(marketingTypography.body, "text-teal-950")}>{researcher.role}</p>
              <p className={cn(marketingTypography.body, "text-teal-950")}>{researcher.org}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export const ResearchSuccessStoriesSection = () => {
  return (
    <section id={forResearchersSectionIds.successStories} className="space-y-10 px-6 sm:px-10">
      <ResearchersSectionHeader
        title="Research Success Story"
        description="Here's what researchers are saying about PLUS."
        decor={forResearchersAssets.successStories.decor}
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {RESEARCH_SUCCESS_STORIES.map((story) => (
          <article key={story.title} className="rounded-[30px] bg-[#f4fbf6] p-[15px]">
            <div className="flex h-[360px] items-center rounded-[30px] bg-white px-7">
              <div className="space-y-2">
                <img alt="" src={story.icon} className="size-[58px]" aria-hidden />
                <h3 className={cn(marketingTypography.h3, "font-bold text-[#007d49]")}>
                  {story.title}
                </h3>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-end gap-2 text-[#007d49]">
              <span>Read story</span>
              <span aria-hidden>→</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export const ResearchCollaborateCtaSection = () => {
  return (
    <section id={forResearchersSectionIds.collaborate} className="scroll-mt-24">
      <div className="mx-auto w-full max-w-[1022px] overflow-hidden rounded-[30px] bg-white p-8 sm:p-10 md:p-[50px]">
        <div className="flex flex-col items-center gap-12 md:gap-14 lg:gap-[60px]">
          <div className="mx-auto w-full max-w-[49rem] space-y-3 text-center sm:space-y-4 md:space-y-5">
            <h2 className={cn(marketingTypography.h2, "text-pretty font-bold text-teal-950")}>
              Conduct Research with Us
            </h2>
            <p className={cn(marketingTypography.body, "text-pretty text-muted-foreground")}>
              Want to get involved? Reach out if you are interested in conducting research with us.
            </p>
          </div>
          <Button
            type="button"
            variant="plusNavCta"
            size="navCta"
            className="h-[45px] min-h-[45px] rounded-full px-10 text-base font-normal"
          >
            Reach out
          </Button>
        </div>
      </div>
    </section>
  )
}
