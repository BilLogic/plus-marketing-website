import { DM_Sans, Geist_Mono } from "next/font/google"

/**
 * DM Sans – primary sans-serif font for the marketing site.
 * Loaded via next/font to get local optimization and font subsetting.
 * Exposes a CSS variable that we map into our design tokens.
 */
export const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

/**
 * Geist Mono – monospace font for code and numeric data.
 * Also exposed as a CSS variable for token mapping.
 */
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
})

