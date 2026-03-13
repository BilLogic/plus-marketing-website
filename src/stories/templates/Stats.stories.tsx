import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BunduiStatsSection } from "@/components/registry/bundui/stats-section"

const meta = {
  title: "Templates/Stats",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Bundui-inspired stats template. */
export const BunduiStats: Story = {
  render: () => (
    <div className="bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <BunduiStatsSection />
      </div>
    </div>
  ),
}

