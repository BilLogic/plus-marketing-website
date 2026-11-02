import { Noto_Sans, Noto_Sans_Mono, Noto_Serif } from "next/font/google"

/**
 * The marketing site shares the PLUS product type pairing: Noto Sans for
 * everything, Noto Serif for page titles only, Noto Sans Mono for code.
 * Each font is loaded via next/font (self-hosted, subset) and exposed as a
 * CSS variable that `globals.css` maps into the Tailwind theme.
 */

/** Noto Sans – headings, body, nav, buttons, labels. */
export const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

/** Noto Serif – page titles only (`font-serif`). */
export const notoSerif = Noto_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: ["600"],
  variable: "--font-serif",
})

/** Noto Sans Mono – code and tabular numeric data. */
export const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono",
})
