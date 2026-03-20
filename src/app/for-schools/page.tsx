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
      {/* Page: max-w-5xl, px-4 sm:px-6 lg:px-8; between sections gap-8 sm:gap-12 lg:gap-16 */}
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-8 pt-8 sm:gap-12 sm:px-6 sm:pb-12 sm:pt-12 lg:gap-16 lg:px-8 lg:pb-16 lg:pt-16">
        <SchoolsHeroSection />
        <SchoolsCommunitySection />
        <SchoolsTrainingSection />
        <SchoolsExperienceSection />
        <SchoolsOversightSection />
        <SchoolsSuccessStoriesSection />
        <SchoolsRegisterCTA />
      </div>
      <BunduiFooterSection
        productName="PLUS"
        newsletterButtonStyle="default"
      />
    </main>
  )
}

export default ForSchoolsPage
