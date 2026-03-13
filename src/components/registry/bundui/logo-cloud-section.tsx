import { cn } from "@/lib/utils"

type BunduiLogoCloudSectionProps = {
  heading?: string
  logos?: string[]
  className?: string
}

/** Bundui-inspired logo cloud showing trusted-by brands. */
const BunduiLogoCloudSection = ({
  heading = "Trusted by product-obsessed teams.",
  logos = ["Northwind", "Orbit", "Lumen", "Helio", "Sundial", "Kinetic"],
  className,
}: BunduiLogoCloudSectionProps) => {
  return (
    <section
      className={cn(
        "rounded-3xl border border-border/70 bg-card/60 px-6 py-8 sm:px-10 sm:py-10",
        className
      )}
    >
      <div className="space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Logo cloud
        </p>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-sm text-sm font-medium text-muted-foreground sm:text-base">
            {heading}
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground sm:grid-cols-3 md:grid-cols-6">
            {logos.map((logo) => (
              <div
                key={logo}
                className="flex items-center justify-center rounded-xl border border-border/50 bg-background/40 px-3 py-2 text-xs font-medium tracking-tight"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground">
          Inspired by Bundui logo cloud sections. Swap these out for real logos per project.
        </p>
      </div>
    </section>
  )
}

export { BunduiLogoCloudSection }

