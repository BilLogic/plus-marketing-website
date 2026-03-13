import { cn } from "@/lib/utils"

type CultLayoutShellProps = {
  sidebar?: React.ReactNode
  children: React.ReactNode
  className?: string
}

/** Cult UI–inspired layout shell with glowing sidebar and content surface. */
const CultLayoutShell = ({ sidebar, children, className }: CultLayoutShellProps) => {
  return (
    <section
      className={cn(
        "min-h-dvh bg-gradient-to-b from-background via-background to-background/90 py-10",
        className
      )}
    >
      <div className="mx-auto flex max-w-5xl gap-6 px-4 sm:px-6 md:px-8">
        <aside className="hidden w-56 flex-none rounded-3xl border border-border/80 bg-card/90 p-4 text-xs text-muted-foreground shadow-[0_24px_60px_rgba(15,23,42,0.7)] lg:block">
          {sidebar ?? (
            <div className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Navigation
              </p>
              <ul className="space-y-1.5">
                <li className="text-foreground">Overview</li>
                <li>Templates</li>
                <li>Guides</li>
              </ul>
            </div>
          )}
        </aside>
        <main className="flex-1 rounded-3xl border border-border/80 bg-card/95 px-5 py-6 text-sm text-foreground shadow-[0_24px_60px_rgba(15,23,42,0.7)]">
          {children}
        </main>
      </div>
    </section>
  )
}

export { CultLayoutShell }

