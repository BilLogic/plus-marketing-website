import {
  TutorsHeroSection,
  TutorsCompensationSection,
  TutorsExperienceSection,
  TutorsCertificationSection,
  TutorsToolkitSection,
  TutorsTestimonialsSection,
  TutorsImpactCTA,
} from "@/components/marketing/for-tutors-sections"

/** "For Tutors" landing page — page shell padding/gaps match /for-schools. */
const ForTutorsPage = () => {
  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-14 px-4 pb-8 pt-0 sm:gap-20 sm:px-6 sm:pb-12 sm:pt-0 lg:gap-28 lg:px-8 lg:pb-16 lg:pt-0">
        <TutorsHeroSection />
        <TutorsCompensationSection />
        <TutorsExperienceSection />
        <TutorsCertificationSection />
        <TutorsToolkitSection />
        <TutorsTestimonialsSection />
        <TutorsImpactCTA />
      </div>
    </main>
  )
}

export default ForTutorsPage
