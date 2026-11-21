import { marketingTypography } from "@/lib/marketing-typography"
import { cn } from "@/lib/utils"
import { RESEARCH_GENRE_TAGS } from "@/lib/research/research-genres"

/** Shared color roles for /publications and the For Researchers Research Index. */
export const riFg = {
  title: "text-(--ds-text-accent-teal-bolder)",
  bodyMuted: "text-(--ds-text-subtle)",
  borderHairline: "border-(--ds-border)",
  borderCard: "border-(--ds-border)",
  shellBg: "bg-(--ds-surface)",
  /** Toolbar rows inside shell — white; grey reserved for search + selects only. */
  shellRow: "bg-(--ds-surface)",
  allActive: "bg-(--ds-background-accent-yellow-bolder) text-(--ds-text-inverse) shadow-none",
  tagStudentBg: "bg-(--ds-background-accent-red-subtler) text-(--ds-text-accent-red)",
  tagGenAiBg: "bg-(--ds-background-accent-blue-subtler) text-(--ds-text-accent-blue)",
  tagTutorBg: "bg-(--ds-background-accent-green-subtler) text-(--ds-text-accent-green)",
  cardSurface: "bg-(--ds-surface)",
  linkTeal: "text-(--ds-link)",
} as const

/** Same responsive scale as marketing section descriptions — all Research Index copy + controls. */
export const riIndexCopy = marketingTypography.sectionLead

/**
 * Smaller caption scale — genre filter tags, Year/Conference labels + menus, card topic chips,
 * and publication meta (dates, venue, authors).
 */
export const riIndexMetaCopy = "font-sans text-body-sm sm:text-body-default"

/**
 * Research Index page `<h1>` — same scale as For Researchers `sectionHeaderH2` / Schools section titles.
 * (`text-heading-sm` → `sm:text-heading-lg` → `md:text-heading-xl`; color from `riFg.title`.)
 */
export const riPageTitleCn = cn(
  "font-sans text-pretty text-heading-sm sm:text-heading-lg md:text-heading-xl",
  riFg.title
)

/** Genre / “All” filter chips in the index shell. */
export const riFilterTagButtonCn = cn(
  "inline-flex min-h-7 items-center justify-center rounded-full px-2.5 py-1 font-medium transition-colors",
  riIndexMetaCopy,
  "leading-none"
)

/** “Tags” row label (margin below). */
export const riFilterLabelCn = cn(
  "mb-2 font-medium",
  riIndexMetaCopy,
  riFg.bodyMuted
)

/** Year / Conference field labels (no extra margin). */
export const riFilterFieldLabelCn = cn("font-medium", riIndexMetaCopy, riFg.bodyMuted)

/** “See all publications” — same type scale as index body; teal link color. */
export const riSeeAllPublicationsLinkClass = cn(
  "group inline-flex items-center gap-2.5 font-sans font-normal text-(--ds-link) transition-opacity hover:opacity-90",
  riIndexCopy
)

/** Embedded For Researchers preview — smaller link matching `riIndexMetaCopy`. */
export const riSeeAllPublicationsLinkMetaClass = cn(
  "group inline-flex items-center gap-2.5 font-sans font-medium text-(--ds-link) transition-opacity hover:opacity-90",
  riIndexMetaCopy
)

/** Card topic chips — `font-sans` maps to Noto Sans via `next/font` + `@theme` (`src/app/fonts.ts`). */
export function riGenrePillClass(genre: string): string {
  switch (genre) {
    case "Student Learning":
      return cn("font-sans font-normal", riFg.tagStudentBg)
    case "Gen AI":
      return cn("font-sans font-normal", riFg.tagGenAiBg)
    case "Tutor Training":
      return cn("font-sans font-normal", riFg.tagTutorBg)
    default:
      return cn("font-sans font-normal", "bg-muted text-muted-foreground")
  }
}

/** Selected genre filter — solid accent (same as inactive text color) + white label; no shadow. */
function riGenreFilterPillActiveClass(
  genre: (typeof RESEARCH_GENRE_TAGS)[number]
): string {
  switch (genre) {
    case "Student Learning":
      return "bg-(--ds-background-accent-red-bolder) text-(--ds-text-inverse) shadow-none"
    case "Gen AI":
      return "bg-(--ds-background-accent-blue-bolder) text-(--ds-text-inverse) shadow-none"
    case "Tutor Training":
      return "bg-(--ds-background-accent-green-bolder) text-(--ds-text-inverse) shadow-none"
  }
}

export function riGenreFilterPillClass(
  genre: (typeof RESEARCH_GENRE_TAGS)[number],
  active: boolean
): string {
  if (active) {
    return riGenreFilterPillActiveClass(genre)
  }
  switch (genre) {
    case "Student Learning":
      return cn(riFg.tagStudentBg, "hover:brightness-[0.98]")
    case "Gen AI":
      return cn(riFg.tagGenAiBg, "hover:brightness-[0.98]")
    case "Tutor Training":
      return cn(riFg.tagTutorBg, "hover:brightness-[0.98]")
    default:
      return "bg-muted text-muted-foreground"
  }
}

/** Dropdown triggers — compact type for Year / Conference. */
export const riSelectTriggerCn = cn(
  "h-auto min-h-11 w-full rounded-full border-0 bg-(--ds-background-neutral) px-2.5 py-1.5 font-medium data-[size=sm]:h-auto data-[size=sm]:min-h-11 sm:min-h-9 sm:data-[size=sm]:min-h-9",
  riIndexMetaCopy,
  riFg.bodyMuted,
  "shadow-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-ring"
)

/** Options inside the index Year / Conference menus. */
export const riSelectItemCn = cn(
  "py-1.5 focus:text-(--ds-text-subtle) data-highlighted:text-(--ds-text-subtle)",
  riIndexMetaCopy,
  riFg.bodyMuted
)
