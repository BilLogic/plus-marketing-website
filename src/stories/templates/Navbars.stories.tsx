import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BunduiNavbar } from "@/components/registry/bundui/navbar"

const meta = {
  title: "Templates/Navbars",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Bundui-inspired marketing navbar template with floating pill layout. */
export const BunduiNavbarTemplate: Story = {
  render: () => (
    <div className="bg-background pb-8">
      <BunduiNavbar />
    </div>
  ),
}

