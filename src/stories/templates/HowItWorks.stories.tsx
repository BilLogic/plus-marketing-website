import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BunduiHowItWorksSection } from "@/components/registry/bundui/how-it-works-section"

const meta = {
  title: "Templates/HowItWorks",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Bundui-inspired “How it works” template. */
export const BunduiHowItWorks: Story = {
  render: () => (
    <div className="bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <BunduiHowItWorksSection />
      </div>
    </div>
  ),
}

