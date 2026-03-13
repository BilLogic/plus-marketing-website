import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type BunduiNavbarProps = {
  productName?: string
  className?: string
}

/** Bundui-inspired marketing navbar with pill-shaped border and floating appearance. */
const BunduiNavbar = ({ productName = "Plus", className }: BunduiNavbarProps) => {
  return (
    <header className={cn("flex justify-center px-4 pt-4 sm:px-6 sm:pt-6", className)}>
      <div className="flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border border-border/70 bg-background/80 px-4 py-2 shadow-sm backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="size-6 rounded-full bg-primary/10">
            <span className="relative block size-full">
              <span className="absolute inset-1 rounded-full bg-primary/80" />
            </span>
          </span>
          <span className="text-sm font-medium tracking-tight">{productName}</span>
        </div>
        <nav className="hidden items-center gap-4 text-xs text-muted-foreground sm:flex sm:text-sm">
          <a href="#" className="hover:text-foreground">
            Features
          </a>
          <a href="#" className="hover:text-foreground">
            Templates
          </a>
          <a href="#" className="hover:text-foreground">
            Pricing
          </a>
          <a href="#" className="hover:text-foreground">
            Docs
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Log in
          </Button>
          <Button size="sm">Get started</Button>
        </div>
      </div>
    </header>
  )
}

export { BunduiNavbar }

