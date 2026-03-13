import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { TailarkFeatureSection } from "@/components/registry/tailark/feature-section"

const meta = {
  title: "Templates/FeaturesTailark",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Tailark-inspired feature section template. */
export const TailarkFeatures: Story = {
  render: () => <TailarkFeatureSection />,
}

