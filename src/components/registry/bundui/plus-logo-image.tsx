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

type PlusFooterLogoProps = {
  /** Usually "PLUS" — matches `BunduiFooterSection` `productName`. */
  productName?: string
  className?: string
}

/**
 * Footer: left clip of `plus-logo.png` keeps the colorful mark; wordmark is white HTML
 * (PNG text stays dark, so we don’t use the raster text on teal).
 */
export function PlusFooterLogo({
  productName = "PLUS",
  className,
}: PlusFooterLogoProps) {
  const barH = 36 // h-9 — clip square slightly under full mark width (~28% of 400px asset)
  const scaledFullW = (LOGO_W / LOGO_H) * barH

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className="relative h-9 w-[2.125rem] shrink-0 overflow-hidden rounded-xl sm:w-9"
        aria-hidden
      >
        <img
          src={LOGO_SRC}
          alt=""
          width={LOGO_W}
          height={LOGO_H}
          decoding="async"
          className="pointer-events-none absolute left-0 top-0 max-w-none select-none"
          style={{ height: barH, width: scaledFullW }}
        />
      </div>
      <div className="flex min-w-0 flex-col leading-tight text-white">
        <span className="text-lg font-bold tracking-tight">{productName}</span>
        <span className="text-[11px] font-medium leading-snug text-white/95 sm:text-xs">
          Personalized Learning²
        </span>
      </div>
    </div>
  )
}
