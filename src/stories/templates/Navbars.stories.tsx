import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BunduiNavbar } from "@/components/registry/bundui/navbar"

const meta = {
  title: "Templates/Navbars",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Bundui navbar overridden to match Figma PLUS website IA (node 1360-2170): logo, About / For schools / For tutors / For researchers / Get involved, Tutor Login CTA.",
      },
    },
  },
} satisfies Meta<typeof BunduiNavbar>

export default meta

type Story = StoryObj<typeof BunduiNavbar>

/** White background, PLUS logo image, nav links, CTA (no shadow). */
export const BunduiNavbarTemplate: Story = {
  render: () => (
    <div className="min-h-[200px] bg-background pb-8">
      <BunduiNavbar />
      <div className="mx-auto max-w-5xl px-4 pt-6 text-base text-muted-foreground">
        Scroll to see sticky behavior.
      </div>
    </div>
  ),
}


