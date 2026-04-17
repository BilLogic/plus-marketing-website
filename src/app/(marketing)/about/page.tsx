import type { Metadata } from "next"

import {
  AboutHeroSection,
  AboutMissionSection,
  AboutFoundationsSection,
  AboutTeamSection,
  AboutLatestSection,
  AboutSuccessStoriesSection,
  AboutFinalCtaSection,
} from "@/components/marketing/about-sections"
import { fetchTeamMembers } from "@/lib/notion/queries/team"
import { fetchSuccessStories } from "@/lib/notion/queries/success-stories"
import { fetchNews } from "@/lib/notion/queries/news"

export const metadata: Metadata = {
  title: "About PLUS",
  description:
    "Bridging opportunity gaps in math education with AI-powered tutoring. Meet our team, values, and latest updates.",
}

export const revalidate = 3600

/** About PLUS — mission, team, news, and success stories. */
const AboutPage = async () => {
  const [teamMembers, successStories, newsItems] = await Promise.all([
    fetchTeamMembers(),
    fetchSuccessStories(),
    fetchNews(),
  ])
  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-24 pb-8 pt-14 sm:gap-16 sm:pb-12 sm:pt-0 md:gap-20 lg:gap-24 lg:pb-16 lg:pt-0 xl:gap-28">
        <AboutHeroSection />
        <AboutMissionSection />
        <AboutFoundationsSection />
        <AboutLatestSection news={newsItems} />
        <AboutTeamSection members={teamMembers} />
        <AboutSuccessStoriesSection stories={successStories} />
        <AboutFinalCtaSection />
      </div>
    </main>
  )
}

export default AboutPage
