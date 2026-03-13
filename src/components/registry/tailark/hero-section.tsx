import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type TailarkHeroSectionProps = {
  className?: string
}

/** Tailark-inspired hero section with split layout and pill toggles. */
const TailarkHeroSection = ({ className }: TailarkHeroSectionProps) => {
  return (
    <section
      className={cn(
        "border-border/60 bg-background/60 py-16 sm:py-20 md:py-24",
        className
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 sm:px-6 md:px-8 md:flex-row md:items-center">
        <div className="space-y-5 md:w-3/5">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-1 py-1 text-xs text-muted-foreground">
            <button className="rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground shadow-sm">
              Marketing
            </button>
            <button className="rounded-full px-3 py-1 text-xs font-medium hover:text-foreground">
              Product
            </button>
            <button className="rounded-full px-3 py-1 text-xs font-medium hover:text-foreground">
              Docs
            </button>
          </div>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Tailark-inspired hero for high-conversion pages.
          </h1>
          <p className="max-w-prose text-sm text-muted-foreground">
            Showcase your product with a clean split layout, pill toggles, and a primary CTA row
            tailored to Tailark-style marketing templates.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" className="rounded-full px-6">
              Start free
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-6">
              Book demo
            </Button>
          </div>
        </div>
        <div className="md:w-2/5">
          <div className="relative aspect-[4/3] rounded-3xl border border-border bg-card/80 shadow-lg shadow-primary/15">
            <div className="absolute inset-x-6 bottom-6 flex items-center justify-between rounded-2xl border border-border/70 bg-background/90 px-4 py-3 text-xs text-muted-foreground">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Variants
                </p>
                <p className="text-xs text-foreground">Hero, pricing, testimonials</p>
              </div>
              <Button size="sm" variant="outline" className="rounded-full px-3">
                Explore blocks
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { TailarkHeroSection }

