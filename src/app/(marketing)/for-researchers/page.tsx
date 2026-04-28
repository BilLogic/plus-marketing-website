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
import { marketingSectionStackGap } from "@/lib/marketing-layout"
import { fetchResearchPapers } from "@/lib/notion/queries/research"
import {
  fetchSuccessStories,
  selectSuccessStoriesForResearchersPage,
} from "@/lib/notion/queries/success-stories"
import { fetchResearchTeamMembers } from "@/lib/notion/queries/team"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "For Researchers",
  description:
    "PLUS research partners, highlights, index, and team — lab research and learning science.",
}

/** ISR — keep in sync with deployed Netlify builds and Notion-backed content. */
export const revalidate = 300

/** Same page shell as `for-schools/page.tsx` — vertical rhythm + max width. */
const ForResearchersPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ highlights?: string | string[] }>
}) => {
  const sp = searchParams ? await searchParams : {}
  const highlightsParam = sp.highlights
  const openAllHighlightAccordions =
    highlightsParam === "all" ||
    (Array.isArray(highlightsParam) && highlightsParam.includes("all"))

  const allPapers = await fetchResearchPapers()
  const indexPreview = allPapers.slice(0, 20)
  const researchTeam = await fetchResearchTeamMembers()
  const researchSuccessStories = selectSuccessStoriesForResearchersPage(
    await fetchSuccessStories()
  )

  return (
    <>
      <ResearchersHeroSection />
      <div
        className={cn(
          "mx-auto flex max-w-5xl flex-col pb-16 pt-8 sm:pb-20 md:pb-24 md:pt-10 min-[1800px]:max-w-7xl min-[1800px]:pb-32 min-[1800px]:pt-14",
          marketingSectionStackGap
        )}
      >
        <ResearchHighlightsSection
          papers={allPapers}
          openAllAccordions={openAllHighlightAccordions}
        />
        <ResearchPartnersSection />
        <ResearchIndexSection
          papers={indexPreview}
          totalCount={allPapers.length}
          filterSourcePapers={allPapers}
        />
        <ResearchersGridSection members={researchTeam} />
        <ResearchSuccessStoriesSection stories={researchSuccessStories} />
        <ResearchCollaborateCtaSection />
      </div>
    </>
  )
}

export default ForResearchersPage
