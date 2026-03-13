import { cn } from "@/lib/utils"

type BunduiStep = {
  title: string
  body: string
}

type BunduiHowItWorksSectionProps = {
  steps?: BunduiStep[]
  className?: string
}

/** Bundui-inspired "How it works" timeline section. */
const BunduiHowItWorksSection = ({
  steps = [
    {
      title: "Connect your registries",
      body: "Wire in shadcn/ui, Bundui, Tailark, and Cult UI using the Plus registry tooling.",
    },
    {
      title: "Compose templates in Storybook",
      body: "Build heroes, pricing, and marketing surfaces as Storybook templates.",
    },
    {
      title: "Ship to production",
      body: "Move from documented templates to live pages with minimal rework.",
    },
  ],
  className,
}: BunduiHowItWorksSectionProps) => {
  return (
    <section
      className={cn(
        "rounded-3xl border border-border/70 bg-background/80 px-6 py-10 sm:px-10 sm:py-12",
        className
      )}
    >
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          How it works
        </p>
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          From registry blocks to shipped pages.
        </h2>
        <p className="text-sm text-muted-foreground">
          Inspired by Bundui "how it works" flows with numbered steps and connecting lines.
        </p>
      </header>

      <ol className="mt-6 space-y-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="flex gap-3 rounded-2xl border border-border/70 bg-card/80 p-4 text-sm shadow-sm"
          >
            <div className="mt-0.5 flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {index + 1}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">{step.title}</p>
              <p className="text-xs text-muted-foreground">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export { BunduiHowItWorksSection }

