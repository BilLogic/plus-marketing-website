/**
 * PLUS marketing footer IA + in-page anchors.
 * Column titles match primary nav. Sub-links map to /for-schools and /for-tutors sections (see IDs below).
 *
 * Anchor strings must match `id` on the corresponding `<section>` elements.
 */

export type PlusFooterLink = {
  label: string
  href: string
}

export type PlusFooterColumn = {
  id: string
  title: string
  links: readonly PlusFooterLink[]
}

/** Sections on /for-schools — IDs on `for-schools-sections.tsx` */
export const forSchoolsSectionIds = {
  community: "school-community",
  benefits: "benefits-of-plus",
  experience: "day-to-day-experience",
  oversight: "oversight",
  successStories: "success-stories",
  register: "register-your-institution",
} as const

/** Sections on `/about` — IDs on `about-sections.tsx` */
export const aboutSectionIds = {
  foundations: "about-foundations",
  team: "about-team",
  latest: "about-latest",
  successStories: "about-success-stories",
  learnMore: "about-learn-more",
} as const

/** Sections on /for-tutors — IDs on `for-tutors-sections.tsx` */
export const forTutorsSectionIds = {
  compensation: "compensation",
  experience: "tutoring-experience",
  certification: "certification",
  toolkit: "tutor-toolkit",
  impact: "make-an-impact",
} as const

const fs = forSchoolsSectionIds
const ft = forTutorsSectionIds
const ab = aboutSectionIds

export const PLUS_FOOTER_COLUMNS: readonly PlusFooterColumn[] = [
  {
    id: "about",
    title: "About",
    links: [
      { label: "Our story", href: `/about#${ab.foundations}` },
      { label: "Our team", href: `/about#${ab.team}` },
      { label: "News", href: `/about#${ab.latest}` },
      { label: "Success stories", href: `/about#${ab.successStories}` },
    ],
  },
  {
    id: "for-schools",
    title: "For schools",
    links: [
      {
        label: "Join the PLUS School Community",
        href: `/for-schools#${fs.community}`,
      },
      { label: "Benefits of PLUS", href: `/for-schools#${fs.benefits}` },
      {
        label: "Your Day-to-Day Experience with PLUS",
        href: `/for-schools#${fs.experience}`,
      },
      {
        label: "Maintain Excellence with Robust Oversight",
        href: `/for-schools#${fs.oversight}`,
      },
      { label: "School Success Stories", href: `/for-schools#${fs.successStories}` },
      {
        label: "Register Your Institution",
        href: `/for-schools#${fs.register}`,
      },
    ],
  },
  {
    id: "for-tutors",
    title: "For tutors",
    links: [
      {
        label: "Every hour counts",
        href: `/for-tutors#${ft.compensation}`,
      },
      {
        label: "What Tutoring at PLUS Looks Like",
        href: `/for-tutors#${ft.experience}`,
      },
      {
        label: "Earn Certification & Digital Badges",
        href: `/for-tutors#${ft.certification}`,
      },
      { label: "Your Tutor Toolkit", href: `/for-tutors#${ft.toolkit}` },
      { label: "Ready to Make an Impact?", href: `/for-tutors#${ft.impact}` },
    ],
  },
  {
    id: "for-researchers",
    title: "For researchers",
    links: [
      { label: "Data access", href: "#" },
      { label: "Analytics & monitoring tools", href: "#" },
      { label: "Publications", href: "#" },
    ],
  },
  {
    id: "get-involved",
    title: "Get involved",
    links: [
      { label: "Careers", href: "#" },
      { label: "Partnerships & collaborations", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
] as const
