import {
  PlusHeroSection,
  PlusImpactStatsSection,
  PlusScienceOfLearningSection,
  PlusSmartTechSection,
  PlusVoicesSection,
  PlusAwardsSection,
} from "@/components/marketing/plus-landing-sections"

/**
 * Same section gap as `for-schools/page.tsx` (`gap-16` / `md:gap-24`).
 * `pt-0` so the hero can align to the viewport fold (hero handles its own padding).
 */
const homeSectionsClassName =
  "mx-auto flex max-w-5xl flex-col gap-16 px-4 pb-16 pt-0 sm:px-6 sm:pb-20 md:gap-24 md:px-8 md:pb-24"

/**
 * Homepage — Figma Content `1576:1784` (Landing → Impact 2×2 → Smart Tech → Science → Testimonials → Awards).
 * Header and footer come from `(marketing)/layout.tsx`.
 */
const Home = () => {
  return (
    <div className={homeSectionsClassName}>
      <PlusHeroSection />
      <PlusImpactStatsSection />
      <PlusSmartTechSection />
      <PlusScienceOfLearningSection />
      <PlusVoicesSection />
      <PlusAwardsSection />
    </div>
  )
}

export default Home
