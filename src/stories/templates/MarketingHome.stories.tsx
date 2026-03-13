import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const meta = {
  title: "Templates/MarketingHome",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Opinionated marketing home template composed from hero + feature + pricing-style sections. */
export const BaseMarketingHome: Story = {
  render: () => (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="border-b border-border/60 bg-background/60 py-16 sm:py-20 md:py-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 sm:px-6 md:px-8 md:flex-row md:items-center">
          <div className="space-y-4 md:w-3/5">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Plus marketing template
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Ship a world-class marketing site in days, not weeks.
            </h1>
            <p className="max-w-prose text-sm text-muted-foreground">
              Built from reusable blocks and components so design, content, and experimentation stay
              in sync.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg">Get started</Button>
              <Button size="lg" variant="outline">
                Talk to sales
              </Button>
            </div>
          </div>
          <div className="md:w-2/5">
            <div className="aspect-[4/3] rounded-3xl border border-border bg-card/70 shadow-lg shadow-primary/10" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border/60 bg-background/60 py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <header className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Features
            </p>
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Built from composable sections, not one-off pages.
            </h2>
          </header>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Blocks library", "Registry-first", "Token driven"].map((title) => (
              <Card key={title} className="bg-card/70">
                <CardHeader>
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Connect shadcn, Tailark, Cult UI, and Bundui patterns into a single marketing
                    system.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing-style callout */}
      <section className="bg-background/60 py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <div className="grid gap-6 md:grid-cols-[2fr,1fr] md:items-center">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Pricing
              </p>
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                Start with the marketing essentials, grow into full funnels.
              </h2>
              <p className="text-sm text-muted-foreground">
                Swap block variants from different registries to experiment with layouts, copy, and
                visual emphasis without rebuilding pages from scratch.
              </p>
            </div>
            <Card className="bg-card/70">
              <CardHeader>
                <CardTitle className="flex items-baseline justify-between">
                  <span>Plus Starter</span>
                  <span className="text-xl font-semibold">$19</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <ul className="space-y-1">
                  <li>All marketing blocks</li>
                  <li>Registry integration guidance</li>
                  <li>Basic analytics</li>
                </ul>
                <Button className="w-full">Choose plan</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  ),
}

