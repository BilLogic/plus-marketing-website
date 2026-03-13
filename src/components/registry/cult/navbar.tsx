import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CultNavbarProps = {
  className?: string
}

/** Cult UI–inspired floating navbar with glow and pill links. */
const CultNavbar = ({ className }: CultNavbarProps) => {
  return (
    <header className={cn("flex justify-center px-4 pt-6 sm:px-6", className)}>
      <div className="relative flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border border-border/80 bg-card/95 px-4 py-2 text-xs shadow-[0_24px_60px_rgba(15,23,42,0.7)]">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex size-7 items-center justify-center rounded-full bg-primary/15">
            <span className="absolute inset-[3px] rounded-full bg-primary" />
          </span>
          <span className="text-sm font-semibold tracking-tight">Plus</span>
        </div>
        <nav className="hidden items-center gap-1 text-xs sm:flex sm:text-sm">
          <button className="rounded-full bg-background px-3 py-1 text-foreground">
            Overview
          </button>
          <button className="rounded-full px-3 py-1 text-muted-foreground hover:text-foreground">
            Templates
          </button>
          <button className="rounded-full px-3 py-1 text-muted-foreground hover:text-foreground">
            Components
          </button>
          <button className="rounded-full px-3 py-1 text-muted-foreground hover:text-foreground">
            Pricing
          </button>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Log in
          </Button>
          <Button size="sm" className="rounded-full px-4">
            Get started
          </Button>
        </div>
      </div>
    </header>
  )
}

export { CultNavbar }

