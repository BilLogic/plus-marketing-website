import type { ReactNode } from "react"

/**
 * Shared shell for the legal pages, so Terms and Privacy stay visually
 * consistent and neither drifts into bespoke layout.
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:py-28">
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated {updated}</p>
      <div className="mt-10 flex flex-col gap-8 text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:mb-2 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </div>
  )
}
