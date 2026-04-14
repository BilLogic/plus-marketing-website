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
    <>
      <SchoolsHeroSection />
      <div
        className={cn(
          "mx-auto flex max-w-5xl flex-col px-4 pb-16 pt-8 sm:px-6 sm:pb-20 md:px-8 md:pb-24 md:pt-10",
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
