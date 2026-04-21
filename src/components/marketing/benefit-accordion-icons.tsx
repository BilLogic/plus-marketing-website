import { marketingCardIconAssetFrameClass } from "@/lib/marketing-section-layout"
import { cn } from "@/lib/utils"

/**
 * Figma 1379:2340 — benefit row icons (viewBox 58×58; CSS frame matches shared card icon diameter).
 * Circle uses `currentColor` so closed rows can use `text-muted-foreground` and open panels use the marketing ochre accent.
 */
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
      <path
        d="M29 16.5V41.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.25 20.25H25.875C24.7147 20.25 23.6019 20.7109 22.7814 21.5314C21.9609 22.3519 21.5 23.4647 21.5 24.625C21.5 25.7853 21.9609 26.8981 22.7814 27.7186C23.6019 28.5391 24.7147 29 25.875 29H32.125C33.2853 29 34.3981 29.4609 35.2186 30.2814C36.0391 31.1019 36.5 32.2147 36.5 33.375C36.5 34.5353 36.0391 35.6481 35.2186 36.4686C34.3981 37.2891 33.2853 37.75 32.125 37.75H21.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      <path
        d="M20.25 24L27.75 31.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 31.5L26.5 24L29 20.25"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 20.25H31.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.75 16.5H24"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M41.5 41.5L35.25 29L29 41.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.5 36.5H39"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      <path
        d="M29 30.25V16.5L39 21.5L29 26.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.7009 26.7774C40.366 28.8275 40.4283 31.0256 39.8802 33.1102C39.332 35.1947 38.1967 37.0779 36.6091 38.5357C35.0215 39.9935 33.0485 40.9646 30.9249 41.3334C28.8013 41.7022 26.6165 41.4532 24.6303 40.616C22.6441 39.7788 20.9403 38.3887 19.7215 36.611C18.5026 34.8333 17.8201 32.7429 17.7551 30.5885C17.6901 28.4341 18.2454 26.3064 19.3549 24.4585C20.4643 22.6106 22.0813 21.1202 24.0134 20.1649"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.003 26.4963C23.3766 27.3301 22.9688 28.3074 22.8168 29.3391C22.6647 30.3708 22.7733 31.4241 23.1325 32.4031C23.4917 33.3822 24.0902 34.2558 24.8734 34.9443C25.6566 35.6328 26.5997 36.1145 27.6166 36.3453C28.6336 36.5761 29.6922 36.5488 30.6959 36.2658C31.6996 35.9828 32.6166 35.4532 33.3632 34.7252C34.1099 33.9972 34.6625 33.0939 34.9708 32.0976C35.279 31.1014 35.333 30.0438 35.128 29.0213"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
