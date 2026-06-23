/**
 * Static copy for `/for-schools` Benefits section (Figma 1104:1220).
 * Kept in a hook-free module so SSR and client bundles share one source (avoids hydration drift).
 */
export const FOR_SCHOOLS_BENEFITS_ITEMS = [
  {
    id: "free-for-all",
    title: "Affordable for Every District",
    description:
      "High-impact tutoring shouldn't be out of reach. PLUS is built to fit district budgets, putting our full suite of AI-driven training and feedback tools within reach of every school.",
    cta: "See If Your School Qualifies",
    ctaHref:
      "https://docs.google.com/forms/d/e/1FAIpQLSc0TFyKzbPu5WGHWc13SDQ5aOrUQZgAAC_MMp0hK467OAzjeQ/viewform",
  },
  {
    id: "multilingual-support",
    title: "Reach Every Learner",
    description:
      "Engage your diverse student body with lessons available in both English and Spanish.",
    cta: "",
  },
  {
    id: "goal-setting",
    title: "More Practice, Faster Mastery",
    description:
      "Tutors set weekly math goals with students and reward them for hitting them — driving a 25% increase in time spent practicing and a 40% increase in skill mastery.",
    cta: "",
  },
  {
    id: "human-ai",
    title: "Human + AI Tutoring, on Your Terms",
    description:
      "You set the scope and sequence; our AI targets the students who'll benefit most based on their math-software performance — so support lands where it counts.",
    cta: "",
  },
] as const

export type ForSchoolsBenefitId = (typeof FOR_SCHOOLS_BENEFITS_ITEMS)[number]["id"]
