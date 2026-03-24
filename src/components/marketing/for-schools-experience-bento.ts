import type { DayToDayExperienceStep } from "@/components/marketing/day-to-day-experience-section"
import { forSchoolsAssets } from "@/components/marketing/for-schools-assets"

/** Figma 1206:1373 — copy + hero image per bento step. */
export const EXPERIENCE_BENTO_STEPS: readonly DayToDayExperienceStep[] = [
  {
    title: "Expert Kickoff",
    body: "We onboard your faculty and send specialists to your campus for a hands-on kickoff, ensuring a seamless integration into your school's daily schedule.",
    imageSrc: forSchoolsAssets.experienceBentoHeroes[0],
    imageAlt:
      "Group of educators together outdoors in front of a modern glass building.",
  },
  {
    title: "1:1 Certified Tutoring",
    body: "Students are paired with certified tutors who have mastered evidence-based engagement strategies for consistent, high-impact individual learning.",
    imageSrc: forSchoolsAssets.experienceBentoHeroes[1],
    imageAlt: "",
    heroOverlayNumber: 2,
  },
  {
    title: "Goal-Driven Monitoring",
    body: "Tutors set specific targets for every student, using real-time data to monitor progress and adjust instruction to meet individual learning gaps.",
    imageSrc: forSchoolsAssets.experienceBentoHeroes[2],
    imageAlt: "",
    heroOverlayNumber: 3,
  },
  {
    title: "The Teacher Loop",
    body: "We share session insights and host regular debriefs with your staff to align tutoring outcomes with your classroom goals and identify areas for growth.",
    imageSrc: forSchoolsAssets.experienceBentoHeroes[3],
    imageAlt: "Weekly student attendance chart showing joined and absent segments.",
    heroImageClassName:
      "absolute left-[0.01%] top-[-0.03%] h-[113.91%] w-full max-w-none object-cover object-top",
  },
]
