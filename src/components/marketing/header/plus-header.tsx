import Link from "next/link"
import { AnnouncementBar } from "./announcement-bar"
import { DesktopNav } from "./desktop-nav"
import { MobileNav } from "./mobile-nav"

export function PlusHeader() {
  return (
    <>
      <AnnouncementBar
        badge="New"
        message="PLUS app v10 is now live — new features for onboarding, AI Feedback and tutoring workflows."
        linkText="Explore updates"
        linkHref="#"
      />
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/brand/plus-icon-gradient.svg"
              alt=""
              className="size-8"
            />
            <img
              src="/brand/plus-logo-dark.svg"
              alt="PLUS"
              className="h-5"
            />
          </Link>

          {/* Desktop Nav — hidden below md */}
          <DesktopNav className="hidden md:flex" />

          {/* Right side: CTAs + mobile trigger */}
          <div className="flex items-center gap-3">
            <a
              href="https://app.tutors.plus/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex h-9 items-center justify-center rounded-full bg-[#a6edf4] px-5 text-base font-normal text-[#004247] transition-opacity hover:opacity-90 whitespace-nowrap"
            >
              Try PLUS Demo
            </a>
            <a
              href="https://app.tutors.plus/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex h-7 items-center justify-center rounded-lg px-2.5 text-base font-medium text-[#62636c] transition-opacity hover:opacity-60 whitespace-nowrap"
            >
              Log In
            </a>
            {/* Mobile nav trigger — visible below md */}
            <MobileNav className="md:hidden" />
          </div>
        </div>
      </header>
    </>
  )
}
