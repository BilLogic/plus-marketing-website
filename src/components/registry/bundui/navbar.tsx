"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { plusNavCtaLinkClassName } from "@/components/ui/button"
import { PlusLogoImage } from "@/components/registry/bundui/plus-logo-image"

/** Nav links matching PLUS website IA (Figma). */
const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "For schools", href: "/for-schools" },
  { label: "For tutors", href: "/for-tutors" },
  { label: "For researchers", href: "/for-researchers" },
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
            <PlusLogoImage />
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

          <Link
            href="/for-tutors"
            className={cn(plusNavCtaLinkClassName, "ml-auto shrink-0")}
          >
            <ArrowLeft className="size-4" aria-hidden />
            Tutor Login
          </Link>
        </div>
      </div>
    </header>
  )
}

export { BunduiNavbar }
