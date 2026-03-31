import {
  TutorsHeroSection,
  TutorsCompensationSection,
  TutorsExperienceSection,
  TutorsCertificationSection,
  TutorsToolkitSection,
  TutorsImpactCTA,
} from "@/components/marketing/for-tutors-sections"

const ForTutorsPage = () => {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 pb-16 pt-2 sm:px-6 sm:pb-20 md:gap-24 md:px-8 md:pb-24">
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
