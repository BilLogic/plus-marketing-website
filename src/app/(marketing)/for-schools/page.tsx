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
import { cn } from "@/lib/utils"

const ForSchoolsPage = () => {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-5xl flex-col px-4 pb-16 pt-2 sm:px-6 sm:pb-20 md:px-8 md:pb-24",
        marketingSectionStackGap
      )}
    >
      <SchoolsHeroSection />
      <SchoolsCommunitySection />
      <SchoolsTrainingSection />
      <SchoolsExperienceSection />
      <SchoolsOversightSection />
      <SchoolsSuccessStoriesSection />
      <SchoolsRegisterCTA />
    </div>
  )
}

export default ForSchoolsPage
