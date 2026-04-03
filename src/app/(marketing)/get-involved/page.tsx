import type { Metadata } from "next"
import {
  GetInvolvedHeroSection,
  GetInvolvedWhyWorkSection,
  GetInvolvedCareersSection,
  GetInvolvedTutoringSection,
  GetInvolvedPartnershipsSection,
  GetInvolvedResearchSection,
  GetInvolvedFinalCTA,
} from "@/components/marketing/get-involved-sections"

export const metadata: Metadata = {
  title: "Get Involved — PLUS",
  description:
    "Join PLUS as a tutor, staff member, or partner. Explore careers, tutoring opportunities, and research collaborations.",
}

const GetInvolvedPage = () => {
  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-14 px-4 pb-8 pt-8 sm:gap-20 sm:px-6 sm:pb-12 sm:pt-12 lg:gap-28 lg:px-8 lg:pb-16 lg:pt-16">
        <GetInvolvedHeroSection />
        <GetInvolvedWhyWorkSection />
        <GetInvolvedCareersSection />
        <GetInvolvedTutoringSection />
        <GetInvolvedPartnershipsSection />
        <GetInvolvedResearchSection />
        <GetInvolvedFinalCTA />
      </div>
    </main>
  )
}

export default GetInvolvedPage
