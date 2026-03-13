import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { TailarkLogoCloudSection } from "@/components/registry/tailark/logo-cloud-section"

const meta = {
  title: "Templates/LogoCloudsTailark",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Tailark-inspired logo cloud template. */
export const TailarkLogoClouds: Story = {
  render: () => <TailarkLogoCloudSection />,
}

