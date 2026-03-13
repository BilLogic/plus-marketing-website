import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type TailarkFeature = {
  label: string
  title: string
  body: string
}

type TailarkFeatureSectionProps = {
  features?: TailarkFeature[]
  className?: string
}

/** Tailark-inspired feature section with three-column layout and subtle dividers. */
const TailarkFeatureSection = ({
  features = [
    {
      label: "Sections",
      title: "Hero, pricing, and more.",
      body: "Start from Tailark-ready sections for your most important marketing pages.",
    },
    {
      label: "Patterns",
      title: "Built on shadcn/ui.",
      body: "Compose features using primitives you already rely on in product UI.",
    },
    {
      label: "Tokens",
      title: "On-brand by default.",
      body: "Map Tailark layouts to Plus tokens so typography and color stay consistent.",
    },
  ],
  className,
}: TailarkFeatureSectionProps) => {
  return (
    <section
      className={cn(
        "border-border/60 bg-background/60 py-16 sm:py-20 md:py-24",
        className
      )}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Features
            </p>
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Tailark-style feature section for marketing pages.
            </h2>
            <p className="text-sm text-muted-foreground">
              Use this when you want a clean three-column feature grid that still feels distinct
              from Bundui layouts.
            </p>
          </div>
          <Button size="sm" variant="outline" className="rounded-full px-4">
            View Tailark blocks
          </Button>
        </header>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-border/70 bg-card/80 p-5 text-sm shadow-sm"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {feature.label}
              </p>
              <h3 className="mt-2 text-sm font-semibold tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-xs text-muted-foreground">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export { TailarkFeatureSection }

