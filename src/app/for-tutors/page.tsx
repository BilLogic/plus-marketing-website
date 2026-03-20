import { BunduiNavbar } from "@/components/registry/bundui/navbar"
import { BunduiFooterSection } from "@/components/registry/bundui/footer-section"
import {
  TutorsHeroSection,
  TutorsCompensationSection,
  TutorsExperienceSection,
  TutorsCertificationSection,
  TutorsToolkitSection,
  TutorsImpactCTA,
} from "@/components/marketing/for-tutors-sections"

/** "For Tutors" landing page — content matches Figma node 1224-1920. */
const ForTutorsPage = () => {
  return (
    <main className="bg-background text-foreground">
      <BunduiNavbar />
      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 pb-16 pt-2 sm:px-6 sm:pb-20 md:gap-24 md:px-8 md:pb-24">
        <TutorsHeroSection />
        <TutorsCompensationSection />
        <TutorsExperienceSection />
        <TutorsCertificationSection />
        <TutorsToolkitSection />
        <TutorsImpactCTA />
      </div>
      <BunduiFooterSection productName="PLUS" />
    </main>
  )
}

export default ForTutorsPage
