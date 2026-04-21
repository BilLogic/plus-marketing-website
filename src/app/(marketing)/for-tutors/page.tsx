import type { Metadata } from "next"
import {
  TutorsHeroSection,
  TutorsCompensationSection,
  TutorsExperienceSection,
  TutorsCertificationSection,
  TutorsToolkitSection,
  TutorsTestimonialsSection,
  TutorsImpactCTA,
} from "@/components/marketing/for-tutors-sections"
import { marketingSectionStackGap } from "@/lib/marketing-layout"
import { fetchTutorTestimonials } from "@/lib/notion/queries/success-stories"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "For Tutors",
  description:
    "Join PLUS as a tutor — gain experience, earn compensation, and make a real impact on students' math confidence.",
}

export const revalidate = 3600

/** "For Tutors" landing page — page shell padding/gaps match /for-schools. */
const ForTutorsPage = async () => {
  const tutorStories = await fetchTutorTestimonials()
  return (
    <main className="bg-background text-foreground">
      <TutorsHeroSection />
      <div className={cn("mx-auto flex max-w-5xl flex-col pb-16 pt-14 sm:pb-20 sm:pt-16 md:pb-24 md:pt-20", marketingSectionStackGap)}>
        <TutorsCompensationSection />
        <TutorsExperienceSection />
        <TutorsCertificationSection />
        <TutorsToolkitSection />
        <TutorsTestimonialsSection stories={tutorStories} />
        <TutorsImpactCTA />
      </div>
    </main>
  )
}

export default ForTutorsPage
