import type { Metadata } from "next"
import {
  GetInvolvedHeroSection,
  GetInvolvedWhyWorkSection,
  GetInvolvedCareersSection,
  GetInvolvedTutoringSection,
  GetInvolvedPartnershipsSection,
  GetInvolvedFinalCTA,
} from "@/components/marketing/get-involved-sections"
import { marketingSectionStackGap } from "@/lib/marketing-layout"
import { cn } from "@/lib/utils"
// TODO: import { fetchJobListings } from "@/lib/notion/queries/jobs" when Notion DB is ready

export const metadata: Metadata = {
  title: "Get Involved — PLUS",
  description:
    "Join PLUS as a tutor, staff member, or partner. Explore careers, tutoring opportunities, and partnerships.",
}

const GetInvolvedPage = async () => {
  // TODO: const jobs = await fetchJobListings()
  // Pass jobs={jobs} to GetInvolvedCareersSection once the Notion query is wired up.
  return (
    <>
      <GetInvolvedHeroSection />
      <div
        className={cn(
          "mx-auto flex max-w-5xl flex-col pb-16 pt-14 sm:pb-20 sm:pt-16 md:pb-24 md:pt-20 min-[1800px]:max-w-7xl min-[1800px]:pb-32 min-[1800px]:pt-24",
          marketingSectionStackGap,
        )}
      >
        <GetInvolvedWhyWorkSection />
        <GetInvolvedCareersSection />
        <GetInvolvedTutoringSection />
        <GetInvolvedPartnershipsSection />
        <GetInvolvedFinalCTA />
      </div>
    </>
  )
}

export default GetInvolvedPage
