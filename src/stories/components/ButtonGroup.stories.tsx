import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "@/components/ui/button"

/** Logical grouping of related buttons for marketing CTAs. */
const meta = {
  title: "components-marketing/ButtonGroup",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

/** Primary and secondary CTA buttons displayed side-by-side. */
export const PrimarySecondary: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="lg">Get started</Button>
      <Button size="lg" variant="outline">
        Talk to sales
      </Button>
    </div>
  ),
}

/** Three-option button group for switching pricing cadence. */
export const PricingCadence: Story = {
  render: () => (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card/60 p-1 text-xs">
      <Button size="sm" variant="default" className="rounded-full px-3">
        Monthly
      </Button>
      <Button size="sm" variant="ghost" className="rounded-full px-3">
        Quarterly
      </Button>
      <Button size="sm" variant="ghost" className="rounded-full px-3">
        Yearly
      </Button>
    </div>
  ),
}

