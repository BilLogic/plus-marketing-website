import type { Metadata } from "next"
import {
  GetInvolvedHeroSection,
  GetInvolvedWhyWorkSection,
  GetInvolvedCareersSection,
  GetInvolvedTutoringSection,
  GetInvolvedPartnershipsSection,
  GetInvolvedFinalCTA,
} from "@/components/marketing/get-involved-sections"

export const metadata: Metadata = {
  title: "Get Involved — PLUS",
  description:
    "Join PLUS as a tutor, staff member, or partner. Explore careers, tutoring opportunities, and partnerships.",
}

const GetInvolvedPage = () => {
  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-24 px-4 pb-8 pt-14 sm:gap-16 sm:px-6 sm:pb-12 sm:pt-0 md:gap-20 lg:gap-24 lg:px-8 lg:pb-16 lg:pt-0 xl:gap-28">
        <GetInvolvedHeroSection />
        <GetInvolvedWhyWorkSection />
        <GetInvolvedCareersSection />
        <GetInvolvedTutoringSection />
        <GetInvolvedPartnershipsSection />
        <GetInvolvedFinalCTA />
      </div>
    </main>
  )
}

export default GetInvolvedPage
