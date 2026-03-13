import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BunduiBanner } from "@/components/registry/bundui/banner"

const meta = {
  title: "Templates/Banners",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Bundui-inspired announcement banner template. */
export const BunduiBannerTemplate: Story = {
  render: () => (
    <div className="bg-background py-6">
      <BunduiBanner />
    </div>
  ),
}

