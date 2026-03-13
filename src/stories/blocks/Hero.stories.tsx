import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TailarkHeroSection } from "@/components/registry/tailark/hero-section"

const meta = {
  title: "Templates/Hero",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Baseline marketing hero built from existing components and layout tokens. */
export const BaseHero: Story = {
  render: () => (
    <section className="border-border/60 bg-background/60 py-16 sm:py-20 md:py-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 sm:px-6 md:px-8 md:flex-row md:items-center">
        <div className="space-y-4 md:w-3/5">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Launch faster with Plus
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            A marketing hero built from tokens, not pixels.
          </h1>
          <p className="max-w-prose text-sm text-muted-foreground">
            Compose heroes from reusable blocks and components so every page stays on-brand,
            accessible, and easy to iterate.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg">Get started</Button>
            <Button size="lg" variant="outline">
              Talk to sales
            </Button>
            <p className="text-xs text-muted-foreground">No credit card required.</p>
          </div>
        </div>
        <div className="md:w-2/5">
          <div className="aspect-[4/3] rounded-3xl border border-border bg-card/70 shadow-lg shadow-primary/10" />
        </div>
      </div>
    </section>
  ),
}

/** Comparison between Base and Tailark hero patterns. */
export const Comparison: Story = {
  render: () => (
    <Tabs defaultValue="base">
      <TabsList variant="line" className="mx-auto mb-4 flex w-full max-w-5xl justify-start px-4 sm:px-6 md:px-8">
        <TabsTrigger value="base">Base (shadcn)</TabsTrigger>
        <TabsTrigger value="tailark">Tailark</TabsTrigger>
      </TabsList>
      <TabsContent value="base">
        <BaseHero />
      </TabsContent>
      <TabsContent value="tailark">
        <TailarkHeroSection />
      </TabsContent>
    </Tabs>
  ),
}

