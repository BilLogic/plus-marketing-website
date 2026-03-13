import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BunduiFooterSection } from "@/components/registry/bundui/footer-section"

const meta = {
  title: "Templates/Footer",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Bundui-inspired marketing footer template. */
export const BunduiFooter: Story = {
  render: () => (
    <div className="bg-background pt-10">
      <BunduiFooterSection />
    </div>
  ),
}

