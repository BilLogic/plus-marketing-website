/**
 * Shared section layout + lead typography for marketing pages (About, Get Involved,
 * For Schools, For Researchers, For Tutors, Home). Keeps intro→content rhythm and
 * header decors aligned with For Tutors section headers.
 */

import { cn } from "@/lib/utils"

/** Vertical gap between section intro (title + lead) and first content block */
export const marketingSectionVerticalGapClass = "space-y-6 md:space-y-8"

/** Gap between stacked/gridded cards — tighter on mobile, standard from `md` up */
export const marketingCardStackGapClass = "gap-4 md:gap-8"

/** Narrow column shell with consistent intro → cards gap */
export const marketingSectionContentShellClass =
  "mx-auto max-w-5xl space-y-8 min-[1800px]:max-w-7xl min-[1800px]:space-y-10"

/** Title → lead; right padding on md+ reserves space for absolutely positioned decors */
export const marketingSectionIntroColumnClass =
  "w-full space-y-3 md:min-w-0 md:pr-[10rem] lg:pr-[10rem]"

/** Header decors sit out of flow on md+ (hidden below md when paired with `hidden md:block` on the asset) */
export const marketingSectionHeaderDecorAbsoluteClass =
  "md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2"

/** Square decors beside H2 + lead — fixed footprint across marketing sections */
export const marketingSectionHeaderDecorImgClass =
  "pointer-events-none hidden aspect-square w-[96px] shrink-0 object-contain opacity-90 select-none md:block md:w-[110px] lg:w-[124px]"

/** Slightly larger square (e.g. Voices / mission art) */
export const marketingSectionVoicesHeaderDecorImgClass =
  "pointer-events-none hidden aspect-square w-[102px] shrink-0 object-contain opacity-90 select-none md:block md:w-[116px] lg:w-[132px]"

/** Section / hero lead body — matches For Schools “School Community” intro */
export const marketingSectionLeadColorClass =
  "text-pretty text-[#62636C] dark:text-white/90"

/**
 * Standard marketing card inset — **equal** on all sides (`p-5 sm:p-6`). Use on outer shells,
 * inner white panels (success stories, voices), Latest/News amber cards, Get Involved, etc.
 */
export const marketingCardPaddingClass = "p-5 sm:p-6"

/**
 * Top lead for the first header row inside padded marketing cards (Latest, News, success
 * stories, Get Involved, etc.) so `marketingCardIconTitleRowOffsetClass` does not read tight
 * against symmetric `marketingCardPaddingClass`.
 */
export const marketingCardLhHeaderRowLeadPaddingClass = "pt-2 sm:pt-3"

/**
 * Icon + first-line-aligned title row — matches Latest at PLUS / News cards (`gap-3`, title
 * scale). Pair the icon with `marketingCardIconTitleRowOffsetClass` + `marketingCardIconCircleClass`.
 */
export const marketingCardLhAlignedHeaderRowClass = cn(
  "flex items-start gap-3 text-lg font-bold leading-snug tracking-tight sm:text-xl lg:text-2xl",
  marketingCardLhHeaderRowLeadPaddingClass,
)

/**
 * Bottom-of-page “impact” CTA — shell, title, lead, and button row match
 * `TutorsImpactCTA` (For Tutors). Use on For Schools / For Researchers final blocks too.
 */
export const marketingFinalCtaShellClass = cn(
  "mx-auto max-w-5xl space-y-6 rounded-3xl bg-white text-center dark:bg-transparent min-[1800px]:max-w-7xl min-[1800px]:space-y-8",
  marketingCardPaddingClass,
)

export const marketingFinalCtaTitleClass =
  "text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl lg:text-4xl min-[1800px]:text-5xl"

export const marketingFinalCtaLeadClass = cn(
  "w-full max-w-none text-base lg:text-lg min-[1800px]:text-xl",
  marketingSectionLeadColorClass,
)

/** Horizontal gap between paired pill CTAs — heroes + final CTA rows (see `marketingFinalCtaButtonRowClass`). */
export const marketingCtaPillRowGapClass = "gap-3 sm:gap-4"

export const marketingFinalCtaButtonRowClass = cn(
  "mt-8 flex flex-nowrap items-center justify-center",
  marketingCtaPillRowGapClass,
)

/** Hero CTA row (no top margin) — single row on mobile like `TutorsImpactCTA` / final CTAs. */
export const marketingHeroCtaButtonRowClass = cn(
  "flex flex-nowrap items-center justify-center",
  marketingCtaPillRowGapClass,
)

/**
 * Primary pill for **page heroes only** — same default look as `marketingFinalCtaPrimaryLinkClass`
 * but no hover opacity / color shift (focus ring unchanged).
 */
export const marketingHeroCtaPrimaryLinkClass = cn(
  "inline-flex items-center justify-center whitespace-nowrap no-underline outline-none",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "h-9 sm:h-11 rounded-full border-0 bg-[#A6EDF4] px-5 sm:px-8 text-sm sm:text-base font-normal text-[#004247] shadow-none min-[1800px]:h-12 min-[1800px]:px-9 min-[1800px]:text-lg",
  "hover:bg-[#A6EDF4] hover:text-[#004247] dark:bg-[#A6EDF4] dark:text-[#004247] dark:hover:bg-[#A6EDF4] dark:hover:text-[#004247]",
)

/** Primary pill — matches `TutorsImpactCTA` “Try the Demo” button (use on `<a>` or `<Link>`). */
export const marketingFinalCtaPrimaryLinkClass = cn(
  "inline-flex items-center justify-center whitespace-nowrap no-underline outline-none",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "h-9 sm:h-11 rounded-full border-0 bg-[#A6EDF4] px-5 sm:px-8 text-sm sm:text-base font-normal text-[#004247] shadow-none transition-opacity hover:bg-[#A6EDF4] hover:opacity-95 hover:text-[#004247] dark:bg-[#A6EDF4] dark:text-[#004247] dark:hover:bg-[#A6EDF4] min-[1800px]:h-12 min-[1800px]:px-9 min-[1800px]:text-lg",
)

/** Outline pill — matches `TutorsImpactCTA` “Become a Tutor” button. */
export const marketingFinalCtaOutlineLinkClass = cn(
  "inline-flex items-center justify-center whitespace-nowrap no-underline outline-none",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "h-9 sm:h-11 rounded-full border-2 border-[#A6EDF4] bg-transparent px-5 sm:px-8 text-sm sm:text-base font-medium text-teal-950 hover:border-[#A6EDF4] hover:bg-[#A6EDF4]/15 dark:text-white dark:hover:bg-[#A6EDF4]/20 min-[1800px]:h-12 min-[1800px]:px-9 min-[1800px]:text-lg",
)

/**
 * Outline pill in **page heroes** — same token as `marketingFinalCtaOutlineLinkClass` so hover
 * (teal wash) matches bottom-of-page CTAs like “Get Involved at PLUS”.
 */
export const marketingHeroCtaOutlineLinkClass = marketingFinalCtaOutlineLinkClass

/**
 * Pixel diameter for marketing card icon circles, matching frames, and `Image` width/height.
 * Keep in sync with `marketingCardIconCircleClass` / `marketingCardIconTitleRowOffsetClass`.
 */
export const MARKETING_CARD_ICON_DIAMETER_PX = 48

/**
 * Card-row circular badge — step numbers + Lucide icons (home, about, tutors, schools, etc.).
 */
export const marketingCardIconCircleClass =
  "flex size-[48px] shrink-0 items-center justify-center rounded-full min-[1800px]:size-[56px]"

/** Step number (1, 2, 3…) inside `marketingCardIconCircleClass` */
export const marketingCardStepDigitClass =
  "text-[26px] font-bold leading-none tabular-nums min-[1800px]:text-[30px]"

/** Lucide icon inside `marketingCardIconCircleClass` */
export const marketingCardLucideGlyphClass = "size-6 min-[1800px]:size-7"

/**
 * Horizontal inset for copy/images under a row of circle + `gap-3` (0.75rem) + title.
 */
export const marketingCardContentInsetFromStepRowClass =
  "pl-[calc(48px+0.75rem)] min-[1800px]:pl-[calc(56px+0.75rem)]"

/** Width-only spacer under stacked titles (e.g. Foundations bento image rows). */
export const marketingCardIconColumnSpacerClass = "w-[48px] shrink-0 min-[1800px]:w-[56px]"

/**
 * Square footprint for rasters / inline SVGs / avatars — **same outer size** as
 * `marketingCardIconCircleClass` (48px) so every “disc” reads at one scale.
 */
export const marketingCardIconAssetFrameClass = "size-[48px] shrink-0 min-[1800px]:size-[56px]"

/**
 * Vertically center the icon circle with the first line of an adjacent title (`1lh` vs circle height).
 */
export const marketingCardIconTitleRowOffsetClass =
  "mt-[calc((1lh-48px)/2)] min-[1800px]:mt-[calc((1lh-56px)/2)]"
