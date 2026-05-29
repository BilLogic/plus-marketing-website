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
  external?: boolean
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
          { label: "Publications", href: "/publications", icon: FileText },
          { label: "News", href: "/about/news", icon: Newspaper },
          {
            label: "Media Kit",
            href: "https://plus-tutors.notion.site/brand-guidelines",
            icon: Image,
            external: true,
          },
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

/** Shared markup/classes for desktop nav + homepage “Learn more” dropdown panels. */
export const navDropdownHoverOpenDelayMs = 50
export const navDropdownHoverCloseDelayMs = 150
/** Triggers open on hover — default cursor (items inside keep `cursor-pointer`). */
export const navDropdownTriggerClass = "cursor-default"
export const navDropdownListClass = "grid grid-cols-1 gap-1 p-2"
export const navDropdownItemClass =
  "flex w-full cursor-pointer select-none items-center gap-3 rounded-md p-3 leading-none no-underline outline-none transition-all hover:bg-muted focus:bg-muted! data-[highlighted]:bg-muted! focus:text-foreground! data-[highlighted]:text-foreground! not-data-[variant=destructive]:focus:**:text-foreground! data-[highlighted]:**:text-foreground! focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 [&_svg]:text-muted-foreground focus:[&_svg]:text-muted-foreground! data-[highlighted]:[&_svg]:text-muted-foreground!"
export const navDropdownIconWrapClass =
  "flex size-8 shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/50"
export const navDropdownIconClass = "size-4 text-muted-foreground"
/** Body grey (`--foreground` / `--popover-foreground` = #62636C) — matches top nav dropdown labels. */
export const navDropdownLabelClass = "text-sm font-medium text-foreground"
export const navDropdownContentClass =
  "min-w-0 w-auto rounded-lg bg-popover p-0 text-popover-foreground shadow ring-1 ring-foreground/10"

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
    { label: "Publications", href: "/publications" },
    { label: "News", href: "/about/news" },
    {
      label: "Media Kit",
      href: "https://plus-tutors.notion.site/brand-guidelines",
      external: true,
    },
  ],
  getInvolved: [
    { label: "Careers", href: "#" },
    { label: "Partnerships", href: "#" },
  ],
}
