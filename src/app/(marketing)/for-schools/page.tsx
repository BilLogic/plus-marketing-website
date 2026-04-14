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
import { marketingSectionStackGap } from "@/lib/marketing-layout"
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
    <div
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-col px-4 pb-16 pt-2 sm:px-6 sm:pb-20 md:pb-24",
        marketingSectionStackGap
      )}
    >
      <SchoolsHeroSection />
      <SchoolsCommunitySection />
      <SchoolsTrainingSection />
      <SchoolsExperienceSection />
      <SchoolsOversightSection />
      <SchoolsSuccessStoriesSection stories={schoolsSuccessStories} />
      <SchoolsRegisterCTA />
    </div>
  )
}

export default ForSchoolsPage
