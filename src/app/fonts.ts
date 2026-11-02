import { Noto_Sans, Noto_Sans_Mono } from "next/font/google"

/**
 * The marketing site uses the PLUS product fonts: Noto Sans for everything,
 * Noto Sans Mono for code. Each font is loaded via next/font (self-hosted,
 * subset) and exposed as a CSS variable that `globals.css` maps into the
 * Tailwind theme.
 */

/** Noto Sans – titles, headings, body, nav, buttons, labels. */
export const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

/** Noto Sans Mono – code and tabular numeric data. */
export const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono",
})
