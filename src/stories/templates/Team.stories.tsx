import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BunduiTeamSection } from "@/components/registry/bundui/team-section"

const meta = {
  title: "Templates/Team",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Bundui-inspired team section template. */
export const BunduiTeam: Story = {
  render: () => (
    <div className="bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <BunduiTeamSection />
      </div>
    </div>
  ),
}

