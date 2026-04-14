import type { CSSProperties } from "react"
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
    href: "/about",
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
    href: "/get-involved",
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

/**
 * Shared width for every desktop nav dropdown: wide enough for the longest label
 * (in `ch`) plus icon, gaps, and padding. Update if nav copy or layout changes.
 */
function getNavDropdownPanelStyle(): CSSProperties {
  let maxChars = 0
  for (const top of NAV_CONFIG) {
    for (const section of top.children ?? []) {
      if (section.heading) {
        maxChars = Math.max(maxChars, section.heading.length)
      }
      for (const item of section.items) {
        const labelLen =
          item.label.length + (item.badge ? item.badge.length + 2 : 0)
        maxChars = Math.max(maxChars, labelLen)
      }
    }
  }
  // 5.25rem ≈ ul padding + link horizontal padding + icon (2rem) + gap (0.75rem)
  return {
    width: `min(calc(${maxChars}ch + 5.25rem), calc(100vw - 2rem))`,
  }
}

/** Stable reference for desktop dropdown panels (same width for every menu). */
export const NAV_DROPDOWN_PANEL_STYLE = getNavDropdownPanelStyle()

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
