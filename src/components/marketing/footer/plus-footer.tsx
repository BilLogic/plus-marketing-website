import Link from "next/link"
import { FooterNewsletter } from "./footer-newsletter"
import { FooterLinkColumns } from "./footer-link-columns"
import { FooterBottomBar } from "./footer-bottom-bar"

export function PlusFooter() {
  return (
    <footer className="mt-12 bg-teal-950 text-white">
      <FooterNewsletter />

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex flex-col gap-12">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="relative flex size-7 items-center justify-center rounded-md bg-white">
                <span className="absolute inset-1.5 rounded-sm bg-teal-700" />
              </span>
              <span className="text-sm font-semibold tracking-tight">
                PLUS
              </span>
            </Link>
            <p className="max-w-xs text-sm text-white/70">
              Scaling up high-impact math tutoring with technology and training.
            </p>
          </div>

          <FooterLinkColumns />
          <FooterBottomBar />
        </div>
      </div>
    </footer>
  )
}
