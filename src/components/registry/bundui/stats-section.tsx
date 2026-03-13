import { cn } from "@/lib/utils"

type BunduiStat = {
  label: string
  value: string
  hint?: string
}

type BunduiStatsSectionProps = {
  stats?: BunduiStat[]
  className?: string
}

/** Bundui-inspired stats section for key marketing metrics. */
const BunduiStatsSection = ({
  stats = [
    { label: "Time to launch", value: "3x faster", hint: "vs previous redesigns" },
    { label: "Blocks reused", value: "42+", hint: "across marketing pages" },
    { label: "Experiment velocity", value: "+68%", hint: "lift in weekly tests" },
  ],
  className,
}: BunduiStatsSectionProps) => {
  return (
    <section
      className={cn(
        "rounded-3xl border border-border/70 bg-background/80 px-6 py-10 sm:px-10 sm:py-12",
        className
      )}
    >
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Stats
        </p>
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Marketing outcomes from registry-first workflows.
        </h2>
        <p className="text-sm text-muted-foreground">
          Adapted from Bundui stats sections with pill-shaped metric cards.
        </p>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-border/70 bg-card/80 px-4 py-5 text-sm shadow-sm"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-foreground">
              {stat.value}
            </p>
            {stat.hint ? (
              <p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}

export { BunduiStatsSection }

