import Link from "next/link"
import { Button } from "@/components/ui/button"
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
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="relative flex size-7 items-center justify-center rounded-full bg-primary/10">
              <span className="absolute inset-1.5 rounded-full bg-primary" />
            </span>
            <span className="text-sm font-semibold tracking-tight">PLUS</span>
          </Link>

          {/* Desktop Nav — hidden below md */}
          <DesktopNav className="hidden md:flex" />

          {/* Right side: CTAs + mobile trigger */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Log In
            </Button>
            <Button size="sm" className="rounded-full px-4">
              Try PLUS Demo
            </Button>
            {/* Mobile nav trigger — visible below md */}
            <MobileNav className="md:hidden" />
          </div>
        </div>
      </header>
    </>
  )
}
