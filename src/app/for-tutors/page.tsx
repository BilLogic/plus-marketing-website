import { BunduiNavbar } from "@/components/registry/bundui/navbar"
import { BunduiFooterSection } from "@/components/registry/bundui/footer-section"
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
      <BunduiNavbar />
      {/* Same as for-schools: max-w-5xl, px-4 sm:px-6 lg:px-8; gap-8 sm:gap-12 lg:gap-16; py per breakpoint */}
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-8 pt-8 sm:gap-12 sm:px-6 sm:pb-12 sm:pt-12 lg:gap-16 lg:px-8 lg:pb-16 lg:pt-16">
        <TutorsHeroSection />
        <TutorsCompensationSection />
        <TutorsExperienceSection />
        <TutorsCertificationSection />
        <TutorsToolkitSection />
        <TutorsTestimonialsSection />
        <TutorsImpactCTA />
      </div>
      <BunduiFooterSection productName="PLUS" />
    </main>
  )
}

export default ForTutorsPage
