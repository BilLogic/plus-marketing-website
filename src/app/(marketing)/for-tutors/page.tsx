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
import { fetchTutorTestimonials } from "@/lib/notion/queries/success-stories"

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
      <div className="mx-auto flex max-w-5xl flex-col gap-24 px-4 pb-8 pt-14 sm:gap-16 sm:px-6 sm:pb-12 sm:pt-0 md:gap-20 lg:gap-24 lg:px-8 lg:pb-16 lg:pt-0 xl:gap-28">
        <TutorsHeroSection />
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
