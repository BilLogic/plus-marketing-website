import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TailarkPricingSectionProps = {
  className?: string
}

/** Tailark-inspired pricing section with monthly/yearly toggle. */
const TailarkPricingSection = ({ className }: TailarkPricingSectionProps) => {
  const tiers = [
    { name: "Starter", monthly: "$19", yearly: "$190", highlight: false },
    { name: "Growth", monthly: "$49", yearly: "$490", highlight: true },
    { name: "Scale", monthly: "$99", yearly: "$990", highlight: false },
  ]

  return (
    <section
      className={cn(
        "border-border/60 bg-background/60 py-16 sm:py-20 md:py-24",
        className
      )}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Pricing
          </p>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight">
            Tailark-style plans with a cadence toggle.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Mirror Tailark&apos;s pricing blocks with a simple monthly/yearly switch and a featured
            plan.
          </p>
        </header>

        <Tabs defaultValue="monthly" className="mt-8">
          <div className="flex items-center justify-center">
            <TabsList className="inline-flex rounded-full bg-muted/60 p-1">
              <TabsTrigger
                value="monthly"
                className="rounded-full px-4 data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value="yearly"
                className="rounded-full px-4 data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                Yearly
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monthly" className="mt-8">
            <div className="grid gap-4 md:grid-cols-3">
              {tiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={cn(
                    "border-border/70 bg-card/80",
                    tier.highlight && "border-primary shadow-lg shadow-primary/15"
                  )}
                >
                  <CardHeader>
                    <CardTitle className="flex items-baseline justify-between">
                      <span>{tier.name}</span>
                      <span className="text-xl font-semibold">{tier.monthly}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>Unlimited pages</li>
                      <li>Registry guidance</li>
                      <li>Basic analytics</li>
                    </ul>
                    <Button
                      variant={tier.highlight ? "default" : "outline"}
                      className="w-full rounded-full"
                    >
                      Choose {tier.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="yearly" className="mt-8">
            <div className="grid gap-4 md:grid-cols-3">
              {tiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={cn(
                    "border-border/70 bg-card/80",
                    tier.highlight && "border-primary shadow-lg shadow-primary/15"
                  )}
                >
                  <CardHeader>
                    <CardTitle className="flex items-baseline justify-between">
                      <span>{tier.name}</span>
                      <span className="text-xl font-semibold">{tier.yearly}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>2 months free</li>
                      <li>Priority support</li>
                      <li>Advanced analytics</li>
                    </ul>
                    <Button
                      variant={tier.highlight ? "default" : "outline"}
                      className="w-full rounded-full"
                    >
                      Choose {tier.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export { TailarkPricingSection }

