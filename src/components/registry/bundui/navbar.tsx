"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { PlusLogoMark } from "@/components/registry/bundui/plus-logo-mark"

/** Nav links matching PLUS website IA (Figma). */
const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "For schools", href: "/for-schools" },
  { label: "For tutors", href: "/for-tutors" },
  { label: "For researchers", href: "/#research" },
  { label: "Get involved", href: "/#get-involved" },
] as const

type BunduiNavbarProps = {
  className?: string
}

/**
 * Bundui navbar: white background, PLUS logo image, CTA #A6EDF4 / #004247 (no shadow), nav left-aligned.
 */
const BunduiNavbar = ({ className }: BunduiNavbarProps) => {
  return (
    <header
      className={cn("sticky top-0 z-40 bg-background font-sans", className)}
      role="banner"
    >
      <div className="flex justify-center px-4 py-3 sm:px-6">
        <div className="flex w-full max-w-5xl items-center gap-10">
          <Link
            href="/"
            className="flex shrink-0 bg-transparent transition-opacity hover:opacity-90"
            aria-label="PLUS home"
          >
            <PlusLogoMark className="h-10 w-auto max-w-[200px]" title="PLUS Personalized Learning²" />
          </Link>

          {/* Nav links — left-aligned toward logo, more space between links */}
          <nav
            className="hidden items-center gap-8 text-base text-muted-foreground md:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="leading-relaxed transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA: bg #A6EDF4, text and arrow #004247, not bold */}
          <Link
            href="/for-tutors"
            className="ml-auto flex shrink-0 items-center gap-3 rounded-full px-4 py-2 text-base font-normal transition-opacity hover:opacity-95"
            style={{ backgroundColor: "#A6EDF4", color: "#004247" }}
          >
            <ArrowLeft className="size-4" aria-hidden style={{ color: "#004247" }} />
            Tutor Login
          </Link>
        </div>
      </div>
    </header>
  )
}

export { BunduiNavbar }
