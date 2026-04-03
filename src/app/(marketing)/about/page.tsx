import type { Metadata } from "next"

import {
  AboutHeroSection,
  AboutFoundationsSection,
  AboutTeamSection,
  AboutLatestSection,
  AboutSuccessStoriesSection,
  AboutFinalCtaSection,
} from "@/components/marketing/about-sections"

export const metadata: Metadata = {
  title: "About PLUS",
  description:
    "Bridging opportunity gaps in math education with AI-powered tutoring. Meet our team, values, and latest updates.",
}

/** About PLUS — mission, team, news, and success stories. */
const AboutPage = () => {
  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-14 px-4 pb-8 pt-8 sm:gap-20 sm:px-6 sm:pb-12 sm:pt-12 lg:gap-28 lg:px-8 lg:pb-16 lg:pt-16">
        <AboutHeroSection />
        <AboutFoundationsSection />
        <AboutTeamSection />
        <AboutLatestSection />
        <AboutSuccessStoriesSection />
        <AboutFinalCtaSection />
      </div>
    </main>
  )
}

export default AboutPage
