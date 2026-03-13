import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BunduiCookieConsent } from "@/components/registry/bundui/cookie-consent"

const meta = {
  title: "Templates/CookieConsent",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Bundui-inspired cookie consent bar template with granular toggles. */
export const BunduiCookieConsentTemplate: Story = {
  render: () => (
    <div className="relative min-h-dvh bg-background">
      <div className="mx-auto max-w-5xl px-4 pt-10 text-sm text-muted-foreground sm:px-6 md:px-8">
        <p>
          Cookie consent appears fixed to the bottom of the viewport so it can be previewed
          alongside page content.
        </p>
      </div>
      <BunduiCookieConsent />
    </div>
  ),
}

