import Link from "next/link"

import { PlusFooterLogoImage } from "@/components/registry/bundui/plus-logo-image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  PLUS_FOOTER_COLUMNS,
  type PlusFooterLink,
} from "@/lib/plus-footer-ia"

type BunduiFooterSectionProps = {
  productName?: string
  className?: string
}

function FooterNavLink({ link }: { link: PlusFooterLink }) {
  const className =
    "text-white/80 underline decoration-white/30 underline-offset-2 transition-colors hover:text-white hover:decoration-white"

  if (link.href === "#") {
    return (
      <a href="#" className={className}>
        {link.label}
      </a>
    )
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  )
}

/**
 * PLUS marketing footer — IA from `PLUS_FOOTER_COLUMNS` (align with nav + Figma ~1206-1372).
 * Newsletter strip, wordmark, five audience columns, bottom bar.
 */
const BunduiFooterSection = ({
  productName = "PLUS",
  className,
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
            <Button
              type="submit"
              variant="plusNavCta"
              size="navCta"
              className="shrink-0"
            >
              Sign up
            </Button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-5xl py-10 sm:py-12 lg:py-16">
        <div className="flex flex-col gap-10 sm:gap-12">
          <Link
            href="/"
            className="flex w-fit items-center transition-opacity hover:opacity-90"
            aria-label={`${productName} home`}
          >
            <PlusFooterLogoImage />
          </Link>

          <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3 sm:gap-8 md:grid-cols-5 lg:gap-8">
            {PLUS_FOOTER_COLUMNS.map((column) => (
              <div key={column.id}>
                <p className="text-sm font-semibold tracking-tight text-white">
                  {column.title}
                </p>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={`${column.id}-${link.label}`}>
                      <FooterNavLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>LET&apos;S CONNECT!</p>
            <p>Carnegie Mellon University</p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#"
                className="underline decoration-white/30 underline-offset-2 hover:text-white"
              >
                Media kit
              </a>
              <a
                href="#"
                className="underline decoration-white/30 underline-offset-2 hover:text-white"
              >
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
