import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BunduiFooterSection } from "@/components/registry/bundui/footer-section"

const meta = {
  title: "Templates/Footer",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "PLUS footer IA lives in `src/lib/plus-footer-ia.ts` (column titles match primary nav). Figma reference ~1206-1372.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** PLUS footer — Figma IA (~1206-1372): newsletter (nav-style `plusNavCta` pill), logo, columns, bottom bar. */
export const BunduiFooter: Story = {
  render: () => (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-muted-foreground">
        <p>Page content placeholder — scroll to footer.</p>
      </div>
      <BunduiFooterSection productName="PLUS" />
    </div>
  ),
}

