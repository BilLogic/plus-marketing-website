import {
  BookOpen,
  Users,
  Newspaper,
  Trophy,
  FileText,
  Image,
  GraduationCap,
  School,
  Handshake,
  Briefcase,
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
  {
    label: "Solutions",
    children: [
      {
        items: [
          { label: "For Schools", href: "/for-schools", description: "Program onboarding, training, and oversight", icon: School },
          { label: "For Tutors", href: "/for-tutors", description: "Training, growth, and in-session support", icon: GraduationCap },
          { label: "For Researchers", href: "/for-researchers", description: "Partners, team, and how to collaborate", icon: FileText },
        ],
      },
    ],
  },
  {
    label: "Resources",
    children: [
      {
        items: [
          { label: "Publications", href: "/research", description: "Browse 40+ peer-reviewed papers", icon: FileText },
          { label: "News", href: "/about/news", description: "Updates and media coverage", icon: Newspaper },
          { label: "Media Kit", href: "/media-kit", description: "Press assets, logos, and brand guidelines", icon: Image },
        ],
      },
    ],
  },
  {
    label: "Get Involved",
    children: [
      {
        items: [
          { label: "Careers", href: "#", description: "Join the PLUS team", icon: Briefcase },
          { label: "Partnerships", href: "#", description: "Collaborate with us", icon: Handshake },
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
  solutions: [
    { label: "For Schools", href: "/for-schools" },
    { label: "For Tutors", href: "/for-tutors" },
    { label: "For Researchers", href: "/for-researchers" },
  ],
  resources: [
    { label: "Publications", href: "/research" },
    { label: "News", href: "/about/news" },
    { label: "Media Kit", href: "/media-kit" },
  ],
  getInvolved: [
    { label: "Careers", href: "#" },
    { label: "Partnerships", href: "#" },
  ],
}
