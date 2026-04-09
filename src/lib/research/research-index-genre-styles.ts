import type { ResearchGenreTag } from "@/lib/research/research-genres"

/**
 * `/for-researchers` research index — genre chip colors (Storybook: Components/Badge → Research genre tags).
 * Student learning: rose/red (`#c05053`, `#ffeaea` — matches highlights study cards).
 * Gen AI: blue scale (distinct from teal nav).
 * Tutor training: green (`#007d49` — matches success-story accent on same page).
 */
export function researchGenreBadgeClassName(tag: string): string {
  switch (tag) {
    case "Student learning":
      return "border-[#c05053]/50 bg-[#ffeaea] text-[#c05053]"
    case "Gen AI":
      return "border-blue-600/45 bg-blue-50 text-blue-950 dark:border-blue-500/40 dark:bg-blue-950/35 dark:text-blue-100"
    case "Tutor training":
      return "border-[#007d49]/50 bg-emerald-50 text-[#007d49] dark:border-emerald-500/45 dark:bg-emerald-950/30 dark:text-emerald-100"
    default:
      return "border-border bg-muted/40 text-foreground"
  }
}

export function researchGenreFilterChipClassName(
  tag: ResearchGenreTag,
  selected: boolean
): string {
  if (selected) {
    switch (tag) {
      case "Student learning":
        return "border-[#c05053]/55 bg-[#ffeaea] text-[#c05053] shadow-sm hover:bg-[#ffeaea] hover:text-[#c05053]"
      case "Gen AI":
        return "border-blue-600/50 bg-blue-50 text-blue-950 shadow-sm hover:bg-blue-50 hover:text-blue-950 dark:bg-blue-950/35 dark:text-blue-50 dark:hover:bg-blue-950/35"
      case "Tutor training":
        return "border-[#007d49]/55 bg-emerald-50 text-[#007d49] shadow-sm hover:bg-emerald-50 hover:text-[#007d49] dark:border-emerald-500/50 dark:bg-emerald-950/30 dark:text-emerald-100 dark:hover:bg-emerald-950/30"
    }
  }
  switch (tag) {
    case "Student learning":
      return "border-[#c05053]/20 bg-background text-[#c05053]/85 hover:bg-[#ffeaea]/50 hover:text-[#c05053]"
    case "Gen AI":
      return "border-blue-600/20 bg-background text-blue-900/85 hover:bg-blue-50/70 hover:text-blue-950 dark:text-blue-200/90"
    case "Tutor training":
      return "border-[#007d49]/22 bg-background text-[#007d49]/85 hover:bg-emerald-50/60 hover:text-[#007d49] dark:text-emerald-200/90"
  }
}
