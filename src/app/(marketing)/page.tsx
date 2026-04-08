import {
  PlusHeroSection,
  PlusImpactStatsSection,
  PlusScienceOfLearningSection,
  PlusSmartTechSection,
  PlusVoicesSection,
  PlusAwardsSection,
} from "@/components/marketing/plus-landing-sections"
import { marketingSectionStackGap } from "@/lib/marketing-layout"
import { cn } from "@/lib/utils"

/** Tighter gap from hero → first content block so the Impact headline sits closer under the fold peek. */
const homeHeroToImpactGap = "gap-8 md:gap-10"

/**
 * `pt-0` so the hero can align to the viewport fold (hero handles its own padding).
 * Below the hero/impact pair, spacing matches other marketing pages via `marketingSectionStackGap`.
 */
const homePageShellClassName = cn(
  "mx-auto flex max-w-5xl flex-col px-4 pb-16 pt-0 sm:px-6 sm:pb-20 md:px-8 md:pb-24"
)

/**
 * Homepage — Figma Content `1576:1784` (Landing → Impact 2×2 → Smart Tech → Science → Testimonials → Awards).
 * Header and footer come from `(marketing)/layout.tsx`.
 */
const Home = () => {
  return (
    <div className={homePageShellClassName}>
      <div className={cn("flex flex-col", homeHeroToImpactGap)}>
        <PlusHeroSection />
        <PlusImpactStatsSection />
      </div>
      <div className={cn("mt-16 flex flex-col md:mt-24", marketingSectionStackGap)}>
        <PlusSmartTechSection />
        <PlusScienceOfLearningSection />
        <PlusVoicesSection />
        <PlusAwardsSection />
      </div>
    </div>
  )
}

export default Home
