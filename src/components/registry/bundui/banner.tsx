import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type BunduiBannerProps = {
  label?: string
  description?: string
  className?: string
}

/** Bundui-inspired announcement banner for new features or launches. */
const BunduiBanner = ({
  label = "New",
  description = "Plus now ships with Bundui, Tailark, and Cult UI marketing templates.",
  className,
}: BunduiBannerProps) => {
  return (
    <section className={cn("px-4 sm:px-6", className)}>
      <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-full border border-border/70 bg-card/80 px-3 py-2 text-xs shadow-sm sm:text-sm">
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
          <span className="h-1 w-1 rounded-full bg-primary" />
          {label}
        </span>
        <p className="flex-1 text-muted-foreground">{description}</p>
        <Button size="sm" variant="ghost" className="px-2 text-xs">
          View changelog
        </Button>
      </div>
    </section>
  )
}

export { BunduiBanner }

