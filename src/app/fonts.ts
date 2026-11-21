import localFont from "next/font/local"

/**
 * Google Sans Flex – rounded ends are built into the file (ROND 100).
 */
export const googleSansFlex = localFont({
  src: "./fonts/GoogleSansFlex-Latin-ROND100.woff2",
  weight: "400 600",
  style: "normal",
  display: "swap",
  variable: "--font-sans",
  adjustFontFallback: false,
  fallback: ["Google Sans Flex Fallback", "sans-serif"],
})
