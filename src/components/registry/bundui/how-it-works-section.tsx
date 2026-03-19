import { cn } from "@/lib/utils"

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
        "rounded-3xl border border-border/70 bg-background/80 px-6 py-10 sm:px-10 sm:py-12",
        className
      )}
    >
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {sectionLabel}
        </p>
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {sectionTitle}
        </h2>
        <p className="text-sm text-muted-foreground">
          {sectionDescription}
        </p>
      </header>

      <ol
        className={cn(
          "mt-6",
          isGrid
            ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]"
            : "space-y-4"
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
                  ? "flex-col gap-5 p-6"
                  : "flex-row gap-3 rounded-2xl p-4",
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
                    "font-semibold tracking-tight text-foreground",
                    isGrid ? "text-xl sm:text-2xl" : "text-sm",
                    (isFilled || isOutlined) && "text-primary"
                  )}
                >
                  {step.title}
                </p>
                {step.body ? (
                  <p
                    className={cn(
                      "text-muted-foreground",
                      isGrid ? "text-sm sm:text-base" : "text-xs"
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
        <div className="mt-10 overflow-hidden rounded-3xl bg-muted">
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

