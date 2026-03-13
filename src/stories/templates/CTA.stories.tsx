import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BunduiCtaSection } from "@/components/registry/bundui/cta-section"

const meta = {
  title: "Templates/CTA",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Bundui-inspired CTA template composed from Plus tokens. */
export const BunduiCta: Story = {
  render: () => (
    <div className="bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <BunduiCtaSection />
      </div>
    </div>
  ),
}

