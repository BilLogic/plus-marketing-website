import type { Metadata, Viewport } from "next"
import Script from "next/script"
import "./globals.css"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { ThemeProvider } from "@/components/theme-provider"
import { dmSans, geistMono } from "./fonts"

export const metadata: Metadata = {
  title: "Plus Marketing",
  description: "Plus marketing website",
}

/** Required for real mobile reflow; without it many browsers keep a ~980px layout width. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

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
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vu47xvrvgo");
          `}
        </Script>
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
      </body>
    </html>
  )
}
