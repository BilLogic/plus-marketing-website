/**
 * Theme provider for handling light and dark mode using next-themes.
 *
 * This mirrors the recommended setup from shadcn/ui for Next.js apps.
 */
"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * Wraps the application with next-themes' ThemeProvider.
 *
 * @param props - Theme provider props including children and configuration.
 * @returns Themed React node tree.
 */
export const ThemeProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

