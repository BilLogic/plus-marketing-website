import Link from "next/link"
import { Instagram } from "lucide-react"
import { FooterNewsletter } from "./footer-newsletter"
import { FooterLinkColumns } from "./footer-link-columns"
import { FooterBottomBar } from "./footer-bottom-bar"

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/plus-tutors",
    icon: (
      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/plus.tutors?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    icon: <Instagram className="size-4" strokeWidth={1.75} aria-hidden />,
  },
]

export function PlusFooter() {
  return (
    <footer className="mt-12 bg-teal-950 text-white">
      <FooterNewsletter />

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          {/* Logo + tagline + social */}
          <div className="flex shrink-0 flex-col gap-4 md:max-w-xs">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/brand/plus-icon-gradient.svg"
                alt=""
                className="size-8"
              />
              <img
                src="/brand/plus-logo-white.svg"
                alt="PLUS"
                className="h-5"
              />
            </Link>
            <p className="text-sm text-white/60">
              Scaling up high-impact math tutoring with technology and training.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 transition-colors hover:text-white"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex-1">
            <FooterLinkColumns />
          </div>
        </div>

        <div className="mt-10">
          <FooterBottomBar />
        </div>
      </div>
    </footer>
  )
}
