import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type BunduiFooterSectionProps = {
  productName?: string
  className?: string
}

/** Bundui-inspired marketing footer with compact navigation and CTA. */
const BunduiFooterSection = ({
  productName = "Plus",
  className,
}: BunduiFooterSectionProps) => {
  return (
    <footer
      className={cn(
        "border-t border-border/60 bg-background/80 px-6 py-8 sm:px-10 sm:py-10",
        className
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-tight">{productName}</p>
          <p className="max-w-sm text-xs text-muted-foreground sm:text-sm">
            Registry-first marketing sites built from shadcn/ui, Bundui, Tailark, and Cult UI
            components.
          </p>
          <p className="text-[11px] text-muted-foreground">
            Layout inspired by Bundui marketing footers, adapted to Plus tokens.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 text-sm md:items-end">
          <nav className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground sm:text-sm">
            <a href="#" className="hover:text-foreground">
              Overview
            </a>
            <a href="#" className="hover:text-foreground">
              Templates
            </a>
            <a href="#" className="hover:text-foreground">
              Pricing
            </a>
            <a href="#" className="hover:text-foreground">
              Changelog
            </a>
          </nav>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Start free</Button>
            <Button size="sm" variant="outline">
              Book a demo
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { BunduiFooterSection }

