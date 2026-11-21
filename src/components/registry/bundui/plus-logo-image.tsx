import { cn } from "@/lib/utils"

type PlusLogoImageProps = {
  className?: string
}

const ALT = "PLUS"

const LOGO_SRC = "/brand/plus-lockup-colored-32.svg"
const LOGO_W = 89
const LOGO_H = 32

/** Committed asset: `public/brand/plus-lockup-colored-32.svg` (89×32). Plain `<img>` so Storybook + Netlify static don’t rely on `next/image`. */
export function PlusLogoImage({ className }: PlusLogoImageProps) {
  return (
    <img
      src={LOGO_SRC}
      alt={ALT}
      width={LOGO_W}
      height={LOGO_H}
      decoding="async"
      fetchPriority="high"
      className={cn(
        "h-8 w-auto",
        className
      )}
    />
  )
}

const FOOTER_LOGO_SRC = "/brand/plus-lockup-colored-dark-32.svg"

/** Committed asset: `public/brand/plus-lockup-colored-dark-32.svg` (89×32). */
export function PlusFooterLogoImage({ className }: { className?: string }) {
  return (
    <img
      src={FOOTER_LOGO_SRC}
      alt={ALT}
      width={LOGO_W}
      height={LOGO_H}
      decoding="async"
      className={cn(
        "h-8 w-auto",
        className
      )}
    />
  )
}
