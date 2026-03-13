import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type CultCardSurfaceProps = {
  title: string
  body: string
  badge?: string
  className?: string
}

/** Cult UI–inspired elevated card surface with glow and layered background. */
const CultCardSurface = ({
  title,
  body,
  badge,
  className,
}: CultCardSurfaceProps) => {
  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 shadow-[0_24px_60px_rgba(15,23,42,0.7)] before:pointer-events-none before:absolute before:-inset-px before:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_55%)]",
        className
      )}
    >
      <CardHeader className="relative flex items-start justify-between gap-2 border-b border-border/40 bg-gradient-to-b from-background/40 to-background/5">
        <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
          {title}
        </CardTitle>
        {badge ? (
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
            {badge}
          </span>
        ) : null}
      </CardHeader>
      <CardContent className="relative py-4 text-xs text-muted-foreground">
        {body}
      </CardContent>
      <CardFooter className="relative flex items-center justify-between border-t border-border/40 bg-background/60 text-[11px] text-muted-foreground">
        <span>Inspired by Cult UI surfaces.</span>
        <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-[10px] text-primary">
          +
        </span>
      </CardFooter>
    </Card>
  )
}

export { CultCardSurface }

