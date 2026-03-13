import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BunduiBlogSection } from "@/components/registry/bundui/blog-section"

const meta = {
  title: "Templates/Blog",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Bundui-inspired blog listing template. */
export const BunduiBlog: Story = {
  render: () => (
    <div className="bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <BunduiBlogSection />
      </div>
    </div>
  ),
}

