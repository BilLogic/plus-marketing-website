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
          { label: "Our Story", href: "/about#foundations", icon: BookOpen },
          { label: "Our Team", href: "/about#team", icon: Users },
          { label: "Latest Updates", href: "/about#latest", icon: Newspaper },
          { label: "Success Stories", href: "/about#success-stories", icon: Trophy },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    children: [
      {
        items: [
          { label: "For Schools", href: "/for-schools", icon: School },
          { label: "For Tutors", href: "/for-tutors", icon: GraduationCap },
          { label: "For Researchers", href: "/for-researchers", icon: FileText },
        ],
      },
    ],
  },
  {
    label: "Resources",
    children: [
      {
        items: [
          { label: "Publications", href: "/research", icon: FileText },
          { label: "News", href: "/about/news", icon: Newspaper },
          { label: "Media Kit", href: "/media-kit", icon: Image },
        ],
      },
    ],
  },
  {
    label: "Get Involved",
    children: [
      {
        items: [
          { label: "Careers", href: "/get-involved#careers", icon: Briefcase },
          { label: "Partnerships", href: "/get-involved#partnerships", icon: Handshake },
        ],
      },
    ],
  },
]

export const FOOTER_LINKS = {
  about: [
    { label: "Our Story", href: "/about#foundations" },
    { label: "Our Team", href: "/about#team" },
    { label: "Latest Updates", href: "/about#latest" },
    { label: "Success Stories", href: "/about#success-stories" },
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
