import {
  BookOpen,
  Users,
  Newspaper,
  Trophy,
  FileText,
  Megaphone,
  Image,
} from "lucide-react"

export type NavDropdownItem = {
  label: string
  href: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string
}

export type NavDropdownSection = {
  heading?: string
  items: NavDropdownItem[]
}

export type NavItem = {
  label: string
  href?: string
  children?: NavDropdownSection[]
}

export const NAV_CONFIG: NavItem[] = [
  {
    label: "About",
    children: [
      {
        items: [
          { label: "Our Story", href: "/about", description: "Learn about PLUS's mission", icon: BookOpen },
          { label: "Our Team", href: "/about/team", description: "Meet the people behind PLUS", icon: Users },
          { label: "News", href: "/about/news", description: "Latest updates and coverage", icon: Newspaper },
          { label: "Success Stories", href: "/success-stories", description: "Impact across schools and communities", icon: Trophy },
        ],
      },
    ],
  },
  { label: "For Schools", href: "/for-schools" },
  { label: "For Tutors", href: "/for-tutors" },
  { label: "For Researchers", href: "/research" },
  {
    label: "Resources",
    children: [
      {
        items: [
          { label: "Research Papers", href: "/research", description: "Browse our publications", icon: FileText },
          { label: "News", href: "/about/news", description: "Updates and media coverage", icon: Megaphone },
          { label: "Media Kit", href: "/media-kit", description: "Press assets and logos", icon: Image },
        ],
      },
    ],
  },
]

export const FOOTER_LINKS = {
  about: [
    { label: "Our Story", href: "/about" },
    { label: "Our Team", href: "/about/team" },
    { label: "News", href: "/about/news" },
    { label: "Success Stories", href: "/success-stories" },
  ],
  forSchools: [
    { label: "Program Onboarding & Training", href: "/for-schools" },
    { label: "Program Oversight & Tutor Quality", href: "/for-schools" },
  ],
  forTutors: [
    { label: "Training & Growth", href: "/for-tutors" },
    { label: "In-Session Support Tools", href: "/for-tutors" },
  ],
  research: [
    { label: "Publications", href: "/research" },
    { label: "Data Access", href: "/research" },
    { label: "Analytics & Monitoring", href: "/research" },
  ],
  getInvolved: [
    { label: "Careers", href: "#" },
    { label: "Partnerships", href: "#" },
  ],
}
