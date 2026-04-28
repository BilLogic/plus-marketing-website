import { marketingCardIconAssetFrameClass } from "@/lib/marketing-section-layout"
import { cn } from "@/lib/utils"

/**
 * Figma 1379:2340 / 1104:1220 — benefit row icons (viewBox 58×58; frame matches card icon diameter).
 * Circle uses `currentColor` so inactive rows use `text-muted-foreground` and active rows use ochre.
 * — Free for all: slashed dollar (no-cost) per IA.
 * — Multilingual / goal / human+AI: Lucide-based glyphs (languages, target) + original multi-sparkle for human+AI.
 */
const G = 1.42
const SW = 2.5 / G

function BenefitIcon1({ className }: { className?: string }) {
  return (
    <svg
      className={cn("block select-none", marketingCardIconAssetFrameClass, className)}
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="29" cy="29" r="29" fill="currentColor" />
      <g
        transform={`translate(${29 - 12 * G} ${29 - 12 * G}) scale(${G})`}
        stroke="white"
        strokeWidth={SW}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        {/* Slashed “no cost” mark — outer stroke matches disc (`currentColor`), inner white */}
        <line
          x1="5"
          x2="19"
          y1="19"
          y2="5"
          stroke="currentColor"
          strokeWidth={SW * 2.35}
          strokeLinecap="round"
        />
        <line x1="5" x2="19" y1="19" y2="5" stroke="white" strokeWidth={SW} strokeLinecap="round" />
      </g>
    </svg>
  )
}

function BenefitIcon2({ className }: { className?: string }) {
  return (
    <svg
      className={cn("block select-none", marketingCardIconAssetFrameClass, className)}
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="29" cy="29" r="29" fill="currentColor" />
      <g
        transform={`translate(${29 - 12 * G} ${29 - 12 * G}) scale(${G})`}
        stroke="white"
        strokeWidth={SW}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m5 8 6 6" />
        <path d="m4 14 6-6 2-3" />
        <path d="M2 5h12" />
        <path d="M7 2h1" />
        <path d="m22 22-5-10-5 10" />
        <path d="M14 18h6" />
      </g>
    </svg>
  )
}

function BenefitIcon3({ className }: { className?: string }) {
  return (
    <svg
      className={cn("block select-none", marketingCardIconAssetFrameClass, className)}
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="29" cy="29" r="29" fill="currentColor" />
      <g
        transform={`translate(${29 - 12 * G} ${29 - 12 * G}) scale(${G})`}
        stroke="white"
        strokeWidth={SW}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </g>
    </svg>
  )
}

function BenefitIcon4({ className }: { className?: string }) {
  return (
    <svg
      className={cn("block select-none", marketingCardIconAssetFrameClass, className)}
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="29" cy="29" r="29" fill="currentColor" />
      <path
        d="M27.7694 17.5174C27.8229 17.2307 27.9751 16.9717 28.1995 16.7853C28.4239 16.599 28.7064 16.4969 28.9981 16.4969C29.2898 16.4969 29.5723 16.599 29.7967 16.7853C30.0211 16.9717 30.1733 17.2307 30.2269 17.5174L31.5406 24.4649C31.6339 24.9589 31.874 25.4132 32.2294 25.7687C32.5848 26.1241 33.0392 26.3641 33.5331 26.4574L40.4806 27.7712C40.7674 27.8248 41.0263 27.9769 41.2127 28.2013C41.3991 28.4257 41.5011 28.7082 41.5011 28.9999C41.5011 29.2916 41.3991 29.5742 41.2127 29.7986C41.0263 30.023 40.7674 30.1751 40.4806 30.2287L33.5331 31.5424C33.0392 31.6357 32.5848 31.8758 32.2294 32.2312C31.874 32.5867 31.6339 33.041 31.5406 33.5349L30.2269 40.4824C30.1733 40.7692 30.0211 41.0282 29.7967 41.2145C29.5723 41.4009 29.2898 41.5029 28.9981 41.5029C28.7064 41.5029 28.4239 41.4009 28.1995 41.2145C27.9751 41.0282 27.8229 40.7692 27.7694 40.4824L26.4556 33.5349C26.3623 33.041 26.1223 32.5867 25.7668 32.2312C25.4114 31.8758 24.957 31.6357 24.4631 31.5424L17.5156 30.2287C17.2289 30.1751 16.9699 30.023 16.7835 29.7986C16.5971 29.5742 16.4951 29.2916 16.4951 28.9999C16.4951 28.7082 16.5971 28.4257 16.7835 28.2013C16.9699 27.9769 17.2289 27.8248 17.5156 27.7712L24.4631 26.4574C24.957 26.3641 25.4114 26.1241 25.7668 25.7687C26.1223 25.4132 26.3623 24.9589 26.4556 24.4649L27.7694 17.5174Z"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39 16.5V21.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M41.5 19H36.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 41.5C20.3807 41.5 21.3807 40.3807 21.5 39C21.5 37.6193 20.3807 36.5 19 36.5C17.6193 36.5 16.5 37.6193 16.5 39C16.5 40.3807 17.6193 41.5 19 41.5Z"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const BENEFIT_ICONS = [BenefitIcon1, BenefitIcon2, BenefitIcon3, BenefitIcon4] as const

export type BenefitsAccordionIconTone = "muted" | "accent"

export function BenefitsAccordionIcon({
  index,
  tone,
  className,
}: {
  index: number
  tone: BenefitsAccordionIconTone
  className?: string
}) {
  const Icon = BENEFIT_ICONS[index]
  if (!Icon) return null
  return (
    <Icon
      className={cn(
        tone === "muted" ? "text-muted-foreground" : "text-[#a56d1e]",
        className
      )}
    />
  )
}
