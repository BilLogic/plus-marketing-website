import {
  PlusHeroSection,
  PlusImpactStatsSection,
  PlusScienceOfLearningSection,
  PlusSmartTechSection,
  PlusVoicesSection,
} from "@/components/marketing/plus-landing-sections"
import { marketingSectionStackGap } from "@/lib/marketing-layout"
import { cn } from "@/lib/utils"

/** Space between full-bleed hero and the first in-shell section (Impact). */
const homeHeroToImpactSpacing = "pt-8 md:pt-10"

/**
 * Content below the hero stays in the standard marketing column.
 * Hero is rendered outside this shell so its wash can span the full viewport (Figma `1714:1885`).
 */
const homePageShellClassName = cn(
  "mx-auto flex max-w-5xl flex-col px-4 pb-16 sm:px-6 sm:pb-20 md:px-8 md:pb-24",
  homeHeroToImpactSpacing
)

/**
 * Homepage — Figma `1714:1883` (Landing includes Our Awards) → Impact → Smart Tech → Science → Testimonials.
 * Header and footer come from `(marketing)/layout.tsx`.
 */
const Home = () => {
  return (
    <>
      <PlusHeroSection />
      <div className={homePageShellClassName}>
        <PlusImpactStatsSection />
        <div className={cn("mt-16 flex flex-col md:mt-24", marketingSectionStackGap)}>
          <PlusSmartTechSection />
          <PlusScienceOfLearningSection />
          <PlusVoicesSection />
        </div>
      </div>
    </>
  )
}

export default Home
