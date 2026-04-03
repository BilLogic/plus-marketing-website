import type { Metadata } from "next"

import {
  ResearchersGridSection,
  ResearchersHeroSection,
  ResearchCollaborateCtaSection,
  ResearchHighlightsSection,
  ResearchIndexSection,
  ResearchPartnersSection,
  ResearchSuccessStoriesSection,
} from "@/components/marketing/for-researchers-sections"
import { fetchResearchPapers } from "@/lib/notion/queries/research"
import { fetchResearchTeamMembers } from "@/lib/notion/queries/team"

export const metadata: Metadata = {
  title: "For Researchers",
  description:
    "PLUS research partners, highlights, index, and team — lab research and learning science.",
}

/** ISR — keep in sync with deployed Netlify builds and Notion-backed content. */
export const revalidate = 300

/** Same page shell as `for-schools/page.tsx` — vertical rhythm + max width. */
const ForResearchersPage = async () => {
  const allPapers = await fetchResearchPapers()
  const indexPreview = allPapers.slice(0, 20)
  const researchTeam = await fetchResearchTeamMembers()

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 pb-16 pt-2 sm:px-6 sm:pb-20 md:gap-24 md:px-8 md:pb-24">
      <ResearchersHeroSection />
      <ResearchPartnersSection />
      <ResearchHighlightsSection />
      <ResearchIndexSection papers={indexPreview} totalCount={allPapers.length} />
      <ResearchersGridSection members={researchTeam} />
      <ResearchSuccessStoriesSection />
      <ResearchCollaborateCtaSection />
    </div>
  )
}

export default ForResearchersPage
