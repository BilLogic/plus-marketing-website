import { cn } from "@/lib/utils"

type BunduiIntegration = {
  name: string
  category: string
}

type BunduiIntegrationsSectionProps = {
  integrations?: BunduiIntegration[]
  className?: string
}

/** Bundui-inspired integrations section showing compatible tools. */
const BunduiIntegrationsSection = ({
  integrations = [
    { name: "Figma", category: "Design" },
    { name: "Notion", category: "Docs" },
    { name: "Supabase", category: "Data" },
    { name: "Storybook", category: "UI" },
  ],
  className,
}: BunduiIntegrationsSectionProps) => {
  return (
    <section
      className={cn(
        "rounded-3xl border border-border/70 bg-card/80 px-6 py-10 sm:px-10 sm:py-12",
        className
      )}
    >
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Integrations
        </p>
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Works with your existing tools.
        </h2>
        <p className="text-sm text-muted-foreground">
          Inspired by Bundui integrations layouts with simple pill-like tiles grouped by category.
        </p>
      </header>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {integrations.map((integration) => (
          <article
            key={integration.name}
            className="rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-xs shadow-sm"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {integration.category}
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">{integration.name}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export { BunduiIntegrationsSection }

