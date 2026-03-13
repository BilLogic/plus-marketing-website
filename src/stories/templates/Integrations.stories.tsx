import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BunduiIntegrationsSection } from "@/components/registry/bundui/integrations-section"

const meta = {
  title: "Templates/Integrations",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Bundui-inspired integrations template. */
export const BunduiIntegrations: Story = {
  render: () => (
    <div className="bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <BunduiIntegrationsSection />
      </div>
    </div>
  ),
}

