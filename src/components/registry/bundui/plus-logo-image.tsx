import { cn } from "@/lib/utils"

type PlusLogoImageProps = {
  className?: string
}

const ALT = "PLUS Personalized Learning²"

const LOGO_SRC = "/plus-logo.png"
const LOGO_W = 400
const LOGO_H = 160

/** Committed asset: `public/plus-logo.png` (400×160). Plain `<img>` so Storybook + Netlify static don’t rely on `next/image`. */
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
        "h-10 w-auto max-w-[min(100%,280px)] object-contain object-left",
        className
      )}
    />
  )
}

const FOOTER_LOGO_SRC = "/plus-logo-white.png"

/** Full white wordmark for dark footer — `public/plus-logo-white.png` (400×160). */
export function PlusFooterLogoImage({ className }: { className?: string }) {
  return (
    <img
      src={FOOTER_LOGO_SRC}
      alt={ALT}
      width={LOGO_W}
      height={LOGO_H}
      decoding="async"
      className={cn(
        "h-9 w-auto max-w-[min(100%,280px)] object-contain object-left sm:h-10",
        className
      )}
    />
  )
}
