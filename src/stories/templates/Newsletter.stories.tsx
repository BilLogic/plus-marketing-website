import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BunduiNewsletterSection } from "@/components/registry/bundui/newsletter-section"

const meta = {
  title: "Templates/Newsletter",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Bundui-inspired newsletter capture block ready to drop into marketing pages. */
export const BunduiNewsletter: Story = {
  render: () => (
    <div className="bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <BunduiNewsletterSection />
      </div>
    </div>
  ),
}

