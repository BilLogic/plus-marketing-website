import type { Metadata, Viewport } from "next"
import { GoogleAnalytics } from "@next/third-parties/google"
import Script from "next/script"
import "./globals.css"
import { ClarityTagger } from "@/components/analytics/clarity-tagger"
import { FirstAudienceTracker } from "@/components/analytics/first-audience-tracker"
import { OutboundClickTracker } from "@/components/analytics/outbound-click-tracker"
import { ScrollDepthTracker } from "@/components/analytics/scroll-depth-tracker"
import { WebVitals } from "@/components/analytics/web-vitals"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { ThemeProvider } from "@/components/theme-provider"
import { dmSans, geistMono } from "./fonts"

export const metadata: Metadata = {
  metadataBase: new URL("https://tutors.plus"),
  title: {
    default: "PLUS | Personalized Learning & Scalable Tutoring Solutions",
    template: "%s | PLUS",
  },
  description:
    "PLUS pairs research-backed tutoring with AI-powered coaching to bridge opportunity gaps in math education — for schools, tutors, and researchers.",
  openGraph: {
    siteName: "PLUS",
    type: "website",
    url: "https://tutors.plus",
  },
}

/** Required for real mobile reflow; without it many browsers keep a ~980px layout width. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

/**
 * Analytics fire only on Netlify production deploys — never on localhost,
 * deploy previews, or branch deploys. IDs come from env (`NEXT_PUBLIC_*` is
 * inlined at build time; a missing var silently disables that tag).
 *
 * The gate must be a `NEXT_PUBLIC_*` var, set per-context in `netlify.toml`.
 * Netlify's own `CONTEXT` is build-only and never inlined, so this layout —
 * a Server Component — saw it undefined whenever a page re-rendered at request
 * time via ISR, silently dropping both tags on every `revalidate` route.
 */
const isProductionDeploy =
  process.env.NEXT_PUBLIC_DEPLOY_CONTEXT === "production"
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="min-h-0">
      <head>
        {process.env.NEXT_PUBLIC_FIGMA_HTML_CAPTURE === "1" ? (
          <Script
            src="https://mcp.figma.com/mcp/html-to-design/capture.js"
            strategy="afterInteractive"
          />
        ) : null}
        {isProductionDeploy && clarityId ? (
          <Script id="clarity-script" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        ) : null}
      </head>
      <body
        className={`${dmSans.variable} ${geistMono.variable} min-h-0 bg-background antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          forcedTheme="light"
          disableTransitionOnChange
        >
          {children}
          <ScrollToTopButton />
        </ThemeProvider>
        <OutboundClickTracker />
        <ClarityTagger />
        <FirstAudienceTracker />
        <ScrollDepthTracker />
        <WebVitals />
        {isProductionDeploy && gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  )
}
