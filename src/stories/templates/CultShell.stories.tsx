import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { CultLayoutShell } from "@/components/registry/cult/layout-shell"
import { CultCardSurface } from "@/components/registry/cult/card-surface"

const meta = {
  title: "Templates/CultShell",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Cult UI–inspired layout shell composed with glowing card surfaces. */
export const ShellWithCards: Story = {
  render: () => (
    <CultLayoutShell>
      <div className="space-y-4">
        <h1 className="text-lg font-semibold tracking-tight">Cult-style layout shell</h1>
        <p className="text-xs text-muted-foreground">
          Use this for marketing dashboards, editorial landing pages, or storytelling layouts that
          need a stronger point of view.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <CultCardSurface
            title="Hero surface"
            body="A glowing, layered card that can sit alongside a hero or main CTA to highlight key stories."
            badge="Hero"
          />
          <CultCardSurface
            title="Story surface"
            body="Use this surface for narratives, changelogs, or product highlights when you want a cinematic feel."
            badge="Story"
          />
        </div>
      </div>
    </CultLayoutShell>
  ),
}

