import { cn } from "@/lib/utils"
import { marketingTypography } from "@/lib/marketing-typography"

type BunduiStep = {
  title: string
  body?: string
  /** Card style: default (neutral border/card), filled (primary-tinted bg), outlined (primary border). */
  variant?: "default" | "filled" | "outlined"
}

type BunduiHowItWorksSectionProps = {
  steps?: BunduiStep[]
  className?: string
  sectionLabel?: string
  sectionTitle?: string
  sectionDescription?: string
  /** list = vertical stack (default). grid = 4-column grid with first step spanning 2. */
  layout?: "list" | "grid"
  imageSrc?: string
  imageAlt?: string
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
  sectionLabel = "How it works",
  sectionTitle = "From registry blocks to shipped pages.",
  sectionDescription = "Inspired by Bundui \"how it works\" flows with numbered steps and connecting lines.",
  layout = "list",
  imageSrc,
  imageAlt = "",
}: BunduiHowItWorksSectionProps) => {
  const isGrid = layout === "grid"
  return (
    <section
      className={cn(
        "rounded-3xl border border-border/70 bg-background/80 p-5 sm:p-6",
        className
      )}
    >
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {sectionLabel}
        </p>
        <h2 className={marketingTypography.h2}>{sectionTitle}</h2>
        <p className={marketingTypography.lead}>{sectionDescription}</p>
      </header>

      <ol
        className={cn(
          "mt-6",
          isGrid
            ? "grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-8"
            : "space-y-4 sm:space-y-6 lg:space-y-8"
        )}
      >
        {steps.map((step, index) => {
          const variant = step.variant ?? "default"
          const isFilled = variant === "filled"
          const isOutlined = variant === "outlined"
          return (
            <li
              key={step.title}
              className={cn(
                "flex rounded-3xl",
                isGrid
                  ? "flex-col gap-4 p-5 sm:gap-6 sm:p-6"
                  : "flex-row gap-3 rounded-2xl p-4 sm:p-5",
                variant === "default" &&
                  "border border-border/70 bg-card/80 shadow-sm",
                isFilled && "bg-primary/10",
                isOutlined && "border-2 border-primary"
              )}
            >
              <div
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-full font-bold",
                  isGrid ? "size-14 text-2xl" : "mt-0.5 size-7 text-xs font-semibold",
                  variant === "default" &&
                    "bg-primary/10 text-primary",
                  isFilled && "bg-primary text-primary-foreground",
                  isOutlined && "bg-primary text-primary-foreground"
                )}
              >
                {index + 1}
              </div>
              <div className={cn("min-w-0", isGrid ? "space-y-2" : "space-y-1")}>
                <p
                  className={cn(
                    isGrid ? marketingTypography.h3 : "text-sm font-semibold tracking-tight text-foreground",
                    (isFilled || isOutlined) && "text-primary"
                  )}
                >
                  {step.title}
                </p>
                {step.body ? (
                  <p
                    className={cn(
                      isGrid
                        ? cn(marketingTypography.body, "text-muted-foreground")
                        : "text-sm text-muted-foreground"
                    )}
                  >
                    {step.body}
                  </p>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>

      {imageSrc ? (
        <div className="mt-8 overflow-hidden rounded-3xl bg-muted sm:mt-12 lg:mt-16">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-80 w-full object-cover sm:h-96 lg:h-[494px]"
          />
        </div>
      ) : null}
    </section>
  )
}

export { BunduiHowItWorksSection }

