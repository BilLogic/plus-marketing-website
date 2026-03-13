import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PlusButton } from "@/components/plus/button"
import { PlusCard } from "@/components/plus/card"
import { CultCardSurface } from "@/components/registry/cult/card-surface"

/** Comparison between base shadcn card and Plus-branded variant. */
const meta = {
  title: "components-marketing/Card Plus Comparison",
  tags: ["autodocs"],
} satisfies Meta<typeof PlusCard>

export default meta
type Story = StoryObj<typeof meta>

/** Overview of Card surfaces across registries. */
export const Overview: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Base (shadcn)
        </p>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Base card</CardTitle>
            <CardDescription>Neutral surface for generic content.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Use this for standard cards like tables, settings, and low-emphasis blocks.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Plus (customized)
        </p>
        <PlusCard className="max-w-sm">
          <CardHeader>
            <CardTitle>Plus card</CardTitle>
            <CardDescription>Ready for more opinionated marketing surfaces.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Today this mirrors the base card; over time it will incorporate Plus-specific styling
              and registry-informed patterns.
            </p>
          </CardContent>
        </PlusCard>
      </div>
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Cult UI (registry)
        </p>
        <CultCardSurface
          title="Glow surface"
          body="Elevated, glow-heavy cards inspired by Cult UI. Use for hero-adjacent feature callouts and focused content."
          badge="Featured"
        />
      </div>
    </div>
  ),
}

/** Side-by-side comparison of base vs Plus card. */
export const Comparison: Story = {
  render: () => (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Base (shadcn)
        </p>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              Straight from the shadcn registry with our tokens.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Use this for simple informational content and neutral cards.
            </p>
          </CardContent>
          <CardFooter>
            <PlusButton size="sm">Primary action</PlusButton>
          </CardFooter>
        </Card>
      </div>
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Plus (customized)
        </p>
        <PlusCard className="max-w-sm">
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              For now, Plus matches base exactly until we complete registry consolidation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Once registry scanning is complete, this becomes the place to layer in Plus-specific styling.
            </p>
          </CardContent>
          <CardFooter>
            <PlusButton size="sm">Primary action</PlusButton>
          </CardFooter>
        </PlusCard>
      </div>
    </div>
  ),
}

