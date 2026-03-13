import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TailarkPricingSection } from "@/components/registry/tailark/pricing-section"

const meta = {
  title: "Templates/Pricing",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

const BasePricingGridSection = () => (
  <section className="border-border/60 bg-background/60 py-16 sm:py-20 md:py-24">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Pricing
        </p>
        <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight">
          Choose a plan that grows with you.
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Built from shared tokens so pricing stays consistent across pages and experiments.
        </p>
      </header>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { name: "Starter", price: "$19", highlight: false },
          { name: "Growth", price: "$49", highlight: true },
          { name: "Scale", price: "$99", highlight: false },
        ].map((tier) => (
          <Card
            key={tier.name}
            className={tier.highlight ? "border-primary shadow-lg shadow-primary/10" : ""}
          >
            <CardHeader>
              <CardTitle className="flex items-baseline justify-between">
                <span>{tier.name}</span>
                <span className="text-xl font-semibold">{tier.price}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Unlimited projects</li>
                <li>Email support</li>
                <li>Advanced analytics</li>
              </ul>
              <Button variant={tier.highlight ? "default" : "outline"} className="w-full">
                Choose {tier.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
)

/** Simple three-tier pricing grid for marketing pages. */
export const BasePricingGrid: Story = {
  render: () => <BasePricingGridSection />,
}

/** Comparison between Base and Tailark pricing patterns. */
export const Comparison: Story = {
  render: () => (
    <Tabs defaultValue="base">
      <TabsList variant="line" className="mx-auto mb-4 flex w-full max-w-5xl justify-start px-4 sm:px-6 md:px-8">
        <TabsTrigger value="base">Base (shadcn)</TabsTrigger>
        <TabsTrigger value="tailark">Tailark</TabsTrigger>
      </TabsList>
      <TabsContent value="base">
        <BasePricingGridSection />
      </TabsContent>
      <TabsContent value="tailark">
        <TailarkPricingSection />
      </TabsContent>
    </Tabs>
  ),
}

