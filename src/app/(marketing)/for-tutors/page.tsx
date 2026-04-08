import {
  TutorsHeroSection,
  TutorsCompensationSection,
  TutorsExperienceSection,
  TutorsCertificationSection,
  TutorsToolkitSection,
  TutorsImpactCTA,
} from "@/components/marketing/for-tutors-sections"
import { marketingSectionStackGap } from "@/lib/marketing-layout"
import { cn } from "@/lib/utils"

const ForTutorsPage = () => {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-5xl flex-col px-4 pb-16 pt-2 sm:px-6 sm:pb-20 md:px-8 md:pb-24",
        marketingSectionStackGap
      )}
    >
      <TutorsHeroSection />
      <TutorsCompensationSection />
      <TutorsExperienceSection />
      <TutorsCertificationSection />
      <TutorsToolkitSection />
      <TutorsImpactCTA />
    </div>
  )
}

export default ForTutorsPage
