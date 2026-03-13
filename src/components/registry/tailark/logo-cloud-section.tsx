import { cn } from "@/lib/utils"

type TailarkLogoCloudSectionProps = {
  logos?: string[]
  className?: string
}

/** Tailark-inspired logo cloud with inline badges. */
const TailarkLogoCloudSection = ({
  logos = ["Northwind", "Helio", "Orbit", "Sundial", "Kinetic", "Lumen"],
  className,
}: TailarkLogoCloudSectionProps) => {
  return (
    <section
      className={cn(
        "border-border/60 bg-background/60 py-12 sm:py-16",
        className
      )}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="max-w-sm text-xs text-muted-foreground sm:text-sm">
            Trusted by teams who use Tailark blocks and Plus templates to keep marketing and product
            in sync.
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground sm:grid-cols-3 md:grid-cols-6">
            {logos.map((logo) => (
              <div
                key={logo}
                className="flex items-center justify-center rounded-full border border-border/60 bg-card/80 px-3 py-1.5 font-medium"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { TailarkLogoCloudSection }

