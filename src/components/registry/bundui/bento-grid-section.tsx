import { cn } from "@/lib/utils"

type BunduiBentoItem = {
  title: string
  body: string
  span?: string
}

type BunduiBentoGridSectionProps = {
  items?: BunduiBentoItem[]
  className?: string
}

/** Bundui-inspired bento grid for mixed content layouts. */
const BunduiBentoGridSection = ({
  items = [
    {
      title: "Registry blocks",
      body: "Pull from Bundui, Tailark, and Cult UI in one place.",
      span: "md:col-span-2",
    },
    {
      title: "Design tokens",
      body: "Keep typography and color consistent across registries.",
    },
    {
      title: "Templates",
      body: "Start from ready-made hero, pricing, and CTA pages.",
    },
    {
      title: "Storybook",
      body: "Preview every block in isolation before shipping.",
      span: "md:col-span-2",
    },
  ],
  className,
}: BunduiBentoGridSectionProps) => {
  return (
    <section
      className={cn(
        "rounded-3xl border border-border/70 bg-background/80 px-6 py-10 sm:px-10 sm:py-12",
        className
      )}
    >
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Layout
        </p>
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Bento grid for showing the system.
        </h2>
        <p className="text-sm text-muted-foreground">
          Inspired by Bundui bento grids with asymmetric tiles.
        </p>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className={cn(
              "rounded-2xl border border-border/70 bg-card/80 p-5 text-sm shadow-sm",
              item.span
            )}
          >
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-xs text-muted-foreground">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export { BunduiBentoGridSection }

