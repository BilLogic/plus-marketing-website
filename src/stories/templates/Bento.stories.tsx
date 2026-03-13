import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BunduiBentoGridSection } from "@/components/registry/bundui/bento-grid-section"

const meta = {
  title: "Templates/Bento",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Bundui-inspired bento grid layout template. */
export const BunduiBento: Story = {
  render: () => (
    <div className="bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <BunduiBentoGridSection />
      </div>
    </div>
  ),
}

