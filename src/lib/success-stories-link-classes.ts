import { cn } from "@/lib/utils"

/** Pink story CTA — matches “Read story” on `/success-stories` (color + opacity hover + `group` for arrow). */
export const successStoriesPinkCtaLinkClass =
  "group inline-flex cursor-pointer items-center gap-2 text-lg font-medium text-[#C6009C] no-underline transition-opacity hover:opacity-90 dark:text-[#C6009C]"

/** Icon size + motion — shared by “Read story” (`ArrowRight`) and “Back…” (`ArrowLeft`). */
export const successStoriesReadStoryArrowClass =
  "size-7 shrink-0 text-current transition-transform group-hover:translate-x-0.5"

export const successStoriesBackArrowClass =
  "size-7 shrink-0 text-current transition-transform group-hover:-translate-x-0.5"

/** “Read story” row on listing cards — CTA + card alignment. */
export const successStoriesReadStoryLinkClass = cn(
  successStoriesPinkCtaLinkClass,
  "ml-auto mt-4",
)

/** Back link on story detail — same CTA look; vertical gap comes from `marketingListingShellClass`. */
export const successStoriesBackToIndexLinkClass = successStoriesPinkCtaLinkClass
