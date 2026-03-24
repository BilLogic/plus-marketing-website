import { BunduiNavbar } from "@/components/registry/bundui/navbar"
import { BunduiFooterSection } from "@/components/registry/bundui/footer-section"
import {
  SchoolsHeroSection,
  SchoolsCommunitySection,
  SchoolsTrainingSection,
  SchoolsExperienceSection,
  SchoolsOversightSection,
  SchoolsSuccessStoriesSection,
  SchoolsRegisterCTA,
} from "@/components/marketing/for-schools-sections"

/** "For Schools" landing page — content matches Figma node 1206-1260. */
const ForSchoolsPage = () => {
  return (
    <main className="bg-background text-foreground">
      <BunduiNavbar />
      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 pb-16 pt-2 sm:px-6 sm:pb-20 md:gap-24 md:px-8 md:pb-24">
        <SchoolsHeroSection />
        <SchoolsCommunitySection />
        <SchoolsTrainingSection />
        <SchoolsExperienceSection />
        <SchoolsOversightSection />
        <SchoolsSuccessStoriesSection />
        <SchoolsRegisterCTA />
      </div>
      <BunduiFooterSection productName="PLUS" />
    </main>
  )
}

export default ForSchoolsPage
