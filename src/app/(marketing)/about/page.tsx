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
import { marketingSectionStackGap } from "@/lib/marketing-layout"
import { fetchTeamMembers } from "@/lib/notion/queries/team"
import { fetchSuccessStories } from "@/lib/notion/queries/success-stories"
import { fetchNews } from "@/lib/notion/queries/news"
import { cn } from "@/lib/utils"

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
      <AboutHeroSection />
      <div className={cn("mx-auto flex max-w-5xl flex-col pb-16 pt-14 sm:pb-20 sm:pt-16 md:pb-24 md:pt-20 min-[1800px]:max-w-7xl min-[1800px]:pb-32 min-[1800px]:pt-24", marketingSectionStackGap)}>
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
