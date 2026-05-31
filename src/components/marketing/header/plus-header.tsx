import Link from "next/link"
import { AnnouncementBar } from "./announcement-bar"
import { DesktopNav } from "./desktop-nav"
import { MobileNav } from "./mobile-nav"
import { fetchBanner } from "@/lib/notion/queries/banner"

export async function PlusHeader() {
  const banner = await fetchBanner()

  return (
    <>
      {banner && (
        <AnnouncementBar
          badge={banner.badge ?? undefined}
          message={banner.message}
          linkText={banner.linkText ?? undefined}
          linkHref={banner.linkHref ?? undefined}
        />
      )}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-20 min-[1800px]:h-16 min-[1800px]:max-w-none min-[1800px]:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 lg:justify-self-start">
            <img
              src="/brand/plus-icon-gradient.svg"
              alt=""
              className="size-8 min-[1800px]:size-9"
            />
            <img
              src="/brand/plus-logo-dark.svg"
              alt="PLUS"
              className="h-5 min-[1800px]:h-6"
            />
          </Link>

          {/* Desktop Nav — hidden below lg (tablet uses mobile menu) */}
          <DesktopNav className="hidden lg:flex lg:justify-self-center" />

          {/* Right side: CTAs + mobile trigger */}
          <div className="flex items-center gap-3 lg:justify-self-end">
            <a
              href="https://app.tutors.plus/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex h-9 items-center justify-center rounded-full bg-[#a6edf4] px-5 text-base font-medium text-[#004247] transition-opacity hover:opacity-90 whitespace-nowrap min-[1800px]:h-10 min-[1800px]:px-6 min-[1800px]:text-lg"
            >
              Try PLUS Demo
            </a>
            <a
              href="https://app.tutors.plus/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex h-7 items-center justify-center rounded-lg px-2.5 text-base font-medium text-[#62636c] transition-opacity hover:opacity-60 whitespace-nowrap min-[1800px]:h-8 min-[1800px]:text-lg"
            >
              Log In
            </a>
            {/* Mobile nav — visible below lg (incl. tablet ~768px) */}
            <MobileNav className="lg:hidden" />
          </div>
        </div>
      </header>
    </>
  )
}
