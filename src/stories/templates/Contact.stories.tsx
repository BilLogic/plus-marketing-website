import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BunduiContactSection } from "@/components/registry/bundui/contact-section"

const meta = {
  title: "Templates/Contact",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Bundui-inspired contact template. */
export const BunduiContact: Story = {
  render: () => (
    <div className="bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <BunduiContactSection />
      </div>
    </div>
  ),
}

