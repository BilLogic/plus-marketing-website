import { marketingTypography } from "@/lib/marketing-typography"
import { cn } from "@/lib/utils"
import { RESEARCH_GENRE_TAGS } from "@/lib/research/research-genres"

/** Figma PLUS-website-IA `1730:2012` — shared by `/research` and For Researchers → Research Index. */
export const riFg = {
  title: "text-[#004247]",
  bodyMuted: "text-[#62636c]",
  borderHairline: "border-[#ecedf0]",
  borderCard: "border-[#e7e8ec]/80",
  shellBg: "bg-white",
  /** Toolbar rows inside shell — white; grey reserved for search + selects only. */
  shellRow: "bg-white",
  allActive: "bg-[#ffc75e] text-white shadow-none",
  tagStudentBg: "bg-[#fff7f7] text-[#c05053]",
  tagGenAiBg: "bg-[#e0f5fe] text-[#0080b4]",
  tagTutorBg: "bg-[#f4fbf6] text-[#007d49]",
  cardSurface: "bg-white",
  linkTeal: "text-[#004247]",
} as const

/** Same responsive scale as marketing section descriptions — all Research Index copy + controls. */
export const riIndexCopy = marketingTypography.sectionLead

/**
 * Smaller caption scale — genre filter tags, Year/Conference labels + menus, card topic chips,
 * and publication meta (dates, venue, authors).
 */
export const riIndexMetaCopy =
  "font-sans text-xs leading-snug tracking-normal sm:text-sm"

/**
 * Research Index page `<h1>` — same scale as For Researchers `sectionHeaderH2` / Schools section titles.
 * (`text-lg` → `sm:text-2xl` → `md:text-3xl`; color from `riFg.title`.)
 */
export const riPageTitleCn = cn(
  "font-sans text-pretty text-lg font-bold tracking-tight sm:text-2xl md:text-3xl",
  riFg.title
)

/** Genre / “All” filter chips in the index shell. */
export const riFilterTagButtonCn = cn(
  "inline-flex min-h-7 items-center justify-center rounded-full px-2.5 py-1 font-medium transition-colors",
  riIndexMetaCopy
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
  "inline-flex items-center gap-2.5 font-sans font-normal text-[#027f89] transition-opacity hover:opacity-90",
  riIndexCopy
)

/** Embedded For Researchers preview — smaller link matching `riIndexMetaCopy`. */
export const riSeeAllPublicationsLinkMetaClass = cn(
  "inline-flex items-center gap-2.5 font-sans font-normal text-[#027f89] transition-opacity hover:opacity-90",
  riIndexMetaCopy
)

/** Card topic chips — `font-sans` maps to DM Sans via `next/font` + `@theme` (`src/app/fonts.ts`). */
export function riGenrePillClass(genre: string): string {
  switch (genre) {
    case "Student learning":
      return cn("font-sans font-normal", riFg.tagStudentBg)
    case "Gen AI":
      return cn("font-sans font-normal", riFg.tagGenAiBg)
    case "Tutor training":
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
    case "Student learning":
      return "bg-[#c05053] text-white shadow-none"
    case "Gen AI":
      return "bg-[#0080b4] text-white shadow-none"
    case "Tutor training":
      return "bg-[#007d49] text-white shadow-none"
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
    case "Student learning":
      return cn(riFg.tagStudentBg, "hover:brightness-[0.98]")
    case "Gen AI":
      return cn(riFg.tagGenAiBg, "hover:brightness-[0.98]")
    case "Tutor training":
      return cn(riFg.tagTutorBg, "hover:brightness-[0.98]")
    default:
      return "bg-muted text-muted-foreground"
  }
}

/** Dropdown triggers — compact type for Year / Conference. */
export const riSelectTriggerCn = cn(
  "h-auto min-h-8 w-full rounded-full border-0 bg-[#f9f9fb]/80 px-2.5 py-1.5 font-medium data-[size=sm]:h-auto data-[size=sm]:min-h-8 sm:min-h-9",
  riIndexMetaCopy,
  riFg.bodyMuted,
  "shadow-none focus:ring-0 focus-visible:ring-1 focus-visible:ring-[#004247]/20"
)

/** Options inside the index Year / Conference menus. */
export const riSelectItemCn = cn(
  "py-1.5 focus:text-[#62636c] data-highlighted:text-[#62636c]",
  riIndexMetaCopy,
  riFg.bodyMuted
)
