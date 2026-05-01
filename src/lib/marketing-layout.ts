/**
 * Vertical gap between stacked marketing `<section>` siblings in the standard
 * `mx-auto max-w-5xl flex flex-col` page shell. Used by the homepage and
 * for-schools / for-tutors / for-researchers so section rhythm stays aligned.
 */
export const marketingSectionStackGap = "gap-16 md:gap-32"

/**
 * Horizontal padding applied once at the marketing layout level — wraps all
 * page body content (below nav, above footer). Individual page shells must NOT
 * add their own px-* to avoid doubling.
 *
 * Desktop (lg+): sections use `max-w-5xl mx-auto` for centering so extra
 * outer padding is skipped.
 */
export const marketingShellPadX = "px-8 sm:px-14 min-[1800px]:px-20"

/**
 * Negates `marketingShellPadX` applied by `(marketing)/layout.tsx` — use once per page
 * for a viewport-edge band (e.g. heroes with full-width wash — see homepage).
 */
export const marketingShellNegatePadX =
  "-mx-8 sm:-mx-14 min-[1800px]:-mx-20"

/**
 * Extra-wide screen shell expansion. Keeps existing mobile/tablet/desktop widths
 * while widening content only at very large viewport sizes.
 */
export const marketingWideShell = "min-[1800px]:max-w-7xl"

/**
 * Inset marketing shell for list + article views (`/about/news`, `/success-stories`,
 * `/about/news/[id]`, `/success-stories/[id]`).
 * Horizontal inset comes from `(marketing)/layout` (`marketingShellPadX`). Vertical padding
 * matches `/for-schools` / `/for-tutors` body shells (`pb-16 pt-14 sm:… md:… min-[1800px]:…`).
 */
export const marketingListingShellClass =
  "mx-auto flex w-full min-w-0 max-w-5xl flex-col gap-10 pb-16 pt-14 sm:gap-12 sm:pb-20 sm:pt-16 md:pb-24 md:pt-20 min-[1800px]:max-w-7xl min-[1800px]:gap-20 min-[1800px]:pb-32 min-[1800px]:pt-24"

/**
 * Slightly increase type scale only for very large displays so page content does
 * not feel too small relative to viewport size.
 */
export const marketingWideTypeScale = "min-[1800px]:text-[1.0625rem]"

/** Shared footer content track used by newsletter and lower footer sections. */
export const marketingFooterInnerShell =
  "mx-auto max-w-7xl px-6 sm:px-10 min-[1800px]:max-w-[1360px] min-[1800px]:px-0"
