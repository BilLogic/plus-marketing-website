import type { Metadata } from "next"

import {
  SchoolsHeroSection,
  SchoolsCommunitySection,
  SchoolsTrainingSection,
  SchoolsExperienceSection,
  SchoolsOversightSection,
  SchoolsSuccessStoriesSection,
  SchoolsRegisterCTA,
} from "@/components/marketing/for-schools-sections"
import { marketingSectionStackGap, marketingShellNegatePadX } from "@/lib/marketing-layout"
import {
  fetchSuccessStories,
  selectSuccessStoriesForSchoolsPage,
} from "@/lib/notion/queries/success-stories"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "For Schools",
  description:
    "PLUS tutoring for schools — research-backed, AI-powered math support for every classroom.",
}

export const revalidate = 300

const ForSchoolsPage = async () => {
  const schoolsSuccessStories = selectSuccessStoriesForSchoolsPage(
    await fetchSuccessStories()
  )

  return (
    <>
      {/* Break hero out of layout horizontal padding — same shell pattern as homepage (`page.tsx`). */}
      <div className={marketingShellNegatePadX}>
        <SchoolsHeroSection />
      </div>
      <div
        className={cn(
          "mx-auto flex w-full min-w-0 max-w-5xl flex-col pb-16 pt-14 sm:pb-20 sm:pt-16 md:pb-24 md:pt-20 min-[1800px]:max-w-7xl min-[1800px]:pb-32 min-[1800px]:pt-24",
          marketingSectionStackGap
        )}
      >
        <SchoolsCommunitySection />
        <SchoolsTrainingSection />
        <SchoolsExperienceSection />
        <SchoolsOversightSection />
        <SchoolsSuccessStoriesSection stories={schoolsSuccessStories} />
        <SchoolsRegisterCTA />
      </div>
    </>
  )
}

export default ForSchoolsPage
