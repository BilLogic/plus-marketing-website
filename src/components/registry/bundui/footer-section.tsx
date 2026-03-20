import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export type FooterNewsletterButtonStyle = "marketing" | "default"

type BunduiFooterSectionProps = {
  productName?: string
  className?: string
  /** Marketing = teal pill CTA; default = Storybook default Button (e.g. For Schools). */
  newsletterButtonStyle?: FooterNewsletterButtonStyle
}

/**
 * PLUS marketing footer aligned with Figma IA (node ~1206-1372): newsletter strip,
 * logo, audience columns (About, For Schools, For Tutors, For Researchers, Get Involved),
 * bottom bar (LET'S CONNECT, CMU, legal links).
 */
const BunduiFooterSection = ({
  productName = "PLUS",
  className,
  newsletterButtonStyle = "marketing",
}: BunduiFooterSectionProps) => {
  return (
    <footer
      className={cn(
        "mt-12 bg-teal-950 text-white",
        "px-4 pb-8 pt-0 sm:px-6 lg:px-8 lg:pb-12",
        className
      )}
    >
      {/* Newsletter strip */}
      <div className="border-b border-white/10 py-5 sm:py-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold">Join our newsletter!</p>
          <form className="flex w-full max-w-2xl flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            <Input
              type="email"
              name="email"
              placeholder="Your email"
              aria-label="Email for newsletter"
              className="h-10 flex-1 rounded-full border-white/30 bg-transparent text-white placeholder:text-white/50"
            />
            {newsletterButtonStyle === "default" ? (
              <Button type="submit" className="shrink-0">
                Sign up
              </Button>
            ) : (
              <Button
                type="submit"
                className="h-10 shrink-0 rounded-full bg-teal-300 px-6 text-teal-950 hover:bg-teal-200"
              >
                Sign up
              </Button>
            )}
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-5xl py-10 sm:py-12 lg:py-16">
        <div className="flex flex-col gap-10 sm:gap-12">
          <Link href="/" className="flex w-fit items-center gap-2">
            <span className="relative flex size-7 items-center justify-center rounded-md bg-white">
              <span className="absolute inset-1.5 rounded-sm bg-teal-700" />
            </span>
            <span className="text-sm font-semibold tracking-tight">{productName}</span>
          </Link>

          <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3 sm:gap-8 md:grid-cols-5 lg:gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">About</p>
              <ul className="mt-3 space-y-2 text-white/80">
                <li>
                  <a href="#" className="underline hover:text-white">
                    Our story
                  </a>
                </li>
                <li>
                  <a href="#" className="underline hover:text-white">
                    Our team
                  </a>
                </li>
                <li>
                  <a href="#" className="underline hover:text-white">
                    News
                  </a>
                </li>
                <li>
                  <a href="#" className="underline hover:text-white">
                    Success stories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">For Schools</p>
              <ul className="mt-3 space-y-2 text-white/80">
                <li>
                  <Link href="/for-schools" className="hover:text-white">
                    Program Onboarding &amp; Training
                  </Link>
                </li>
                <li>
                  <Link href="/for-schools" className="hover:text-white">
                    Program Oversight &amp; Tutor Quality
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">For Tutors</p>
              <ul className="mt-3 space-y-2 text-white/80">
                <li>
                  <Link href="/for-tutors" className="underline hover:text-white">
                    Training &amp; growth
                  </Link>
                </li>
                <li>
                  <Link href="/for-tutors" className="underline hover:text-white">
                    In session support tools
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">For Researchers</p>
              <ul className="mt-3 space-y-2 text-white/80">
                <li>
                  <a href="#" className="underline hover:text-white">
                    Data access
                  </a>
                </li>
                <li>
                  <a href="#" className="underline hover:text-white">
                    Analytics &amp; monitoring tools
                  </a>
                </li>
                <li>
                  <a href="#" className="underline hover:text-white">
                    Publications
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">Get Involved</p>
              <ul className="mt-3 space-y-2 text-white/80">
                <li>
                  <a href="#" className="underline hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="underline hover:text-white">
                    Partnerships &amp; Collaborations
                  </a>
                </li>
                <li>
                  <a href="#" className="underline hover:text-white">
                    Publications
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>LET&apos;S CONNECT!</p>
            <p>Carnegie Mellon University</p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#" className="underline hover:text-white">
                Media kit
              </a>
              <a href="#" className="underline hover:text-white">
                Release notes
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { BunduiFooterSection }
