/**
 * Static copy for `/for-schools` Benefits section (Figma 1104:1220).
 * Kept in a hook-free module so SSR and client bundles share one source (avoids hydration drift).
 */
export const FOR_SCHOOLS_BENEFITS_ITEMS = [
  {
    id: "free-for-all",
    title: "Free for All",
    description:
      "High-quality education shouldn't be gated. Access our full suite of AI-driven training and feedback tools at no cost to your district.",
    cta: "See if your school qualifies",
  },
  {
    id: "multilingual-support",
    title: "Multilingual Support",
    description:
      "Support your diverse student body with lessons available in both English and Spanish.",
    cta: "",
  },
  {
    id: "goal-setting",
    title: "Goal Setting with Students",
    description:
      "Tutors set weekly math goals with students and reward them for meeting their goals. By using this goal-setting method, there is a 25% increase in time spent practicing and a 40% increase in skill mastery.",
    cta: "",
  },
  {
    id: "human-ai",
    title: "Human + AI Tutoring Model",
    description:
      "We allow teachers to select the scope and sequence of what is taught. We also determine which students would benefit most from tutoring based on prior performance in math software.",
    cta: "",
  },
] as const

export type ForSchoolsBenefitId = (typeof FOR_SCHOOLS_BENEFITS_ITEMS)[number]["id"]
