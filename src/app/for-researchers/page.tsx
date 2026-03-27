import { BunduiFooterSection } from "@/components/registry/bundui/footer-section"
import { BunduiNavbar } from "@/components/registry/bundui/navbar"
import {
  ResearchersGridSection,
  ResearchersHeroSection,
  ResearchCollaborateCtaSection,
  ResearchHighlightsSection,
  ResearchIndexSection,
  ResearchPartnersSection,
  ResearchSuccessStoriesSection,
} from "@/components/marketing/for-researchers-sections"

const ForResearchersPage = () => {
  return (
    <main className="bg-background text-foreground">
      <BunduiNavbar />
      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 pb-16 pt-2 sm:px-6 sm:pb-20 md:gap-24 md:px-8 md:pb-24">
        <ResearchersHeroSection />
        <ResearchPartnersSection />
        <ResearchHighlightsSection />
        <ResearchIndexSection />
        <ResearchersGridSection />
        <ResearchSuccessStoriesSection />
        <ResearchCollaborateCtaSection />
      </div>
      <BunduiFooterSection productName="PLUS" />
    </main>
  )
}

export default ForResearchersPage
