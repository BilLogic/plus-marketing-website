import {
  PlusAnnouncementBar,
  PlusHeroSection,
  PlusImpactStatsSection,
  PlusMotivationSection,
  PlusOutcomesStrip,
  PlusVoicesSection,
  PlusToolkitSection,
  PlusToolkitMetricsSection,
  PlusAwardsSection,
  PlusResearchSection,
} from "@/components/marketing/plus-landing-sections"
import { BunduiNavbar } from "@/components/registry/bundui/navbar"
import { BunduiFooterSection } from "@/components/registry/bundui/footer-section"

/** Root PLUS marketing landing page mirroring tutors.plus sections and content. */
const Home = () => {
  return (
    <main className="bg-background text-foreground">
      <PlusAnnouncementBar />
      <BunduiNavbar />
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-4 pb-16 pt-6 sm:px-6 sm:pb-20 md:px-8 md:pb-24">
        <PlusHeroSection />
        <PlusImpactStatsSection />
        <PlusMotivationSection />
        <PlusOutcomesStrip />
        <PlusVoicesSection />
        <PlusToolkitSection />
        <PlusToolkitMetricsSection />
        <PlusAwardsSection />
        <PlusResearchSection />
      </div>
      <BunduiFooterSection productName="PLUS" />
    </main>
  )
}

export default Home

