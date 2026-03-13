import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type BunduiFeature = {
  label: string
  title: string
  body: string
}

type BunduiFeatureSectionProps = {
  features?: BunduiFeature[]
  className?: string
}

/** Bundui-inspired feature section for highlighting product capabilities. */
const BunduiFeatureSection = ({
  features = [
    {
      label: "Registry-first",
      title: "Compose from known patterns.",
      body: "Start from Bundui, Tailark, and Cult UI blocks instead of blank canvases.",
    },
    {
      label: "Storybook-native",
      title: "Docs that match production.",
      body: "Every block has a Storybook story so marketing and engineering stay aligned.",
    },
    {
      label: "Token-driven",
      title: "Change the theme, not the code.",
      body: "Use OKLCH tokens to evolve your brand without rewriting components.",
    },
  ],
  className,
}: BunduiFeatureSectionProps) => {
  return (
    <section
      className={cn(
        "rounded-3xl border border-border/70 bg-background/80 px-6 py-10 sm:px-10 sm:py-12",
        className
      )}
    >
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Features
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Opinionated blocks for marketing teams.
          </h2>
          <p className="text-sm text-muted-foreground">
            Adapted from Bundui promotional/feature sections with a three-column grid.
          </p>
        </div>
        <Button size="sm" variant="outline">
          Explore templates
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
    </section>
  )
}

export { BunduiFeatureSection }

