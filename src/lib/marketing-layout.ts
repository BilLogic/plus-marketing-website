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
export const marketingShellPadX = "px-8 sm:px-14"
