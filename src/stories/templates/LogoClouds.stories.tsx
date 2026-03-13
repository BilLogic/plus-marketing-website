import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BunduiLogoCloudSection } from "@/components/registry/bundui/logo-cloud-section"

const meta = {
  title: "Templates/LogoClouds",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Bundui-inspired logo cloud template for social proof sections. */
export const BunduiLogoCloud: Story = {
  render: () => (
    <div className="bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <BunduiLogoCloudSection />
      </div>
    </div>
  ),
}

