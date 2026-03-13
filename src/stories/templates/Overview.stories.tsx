import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Templates/Overview",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Overview of page-level templates and where they come from. */
export const Story: Story = {
  render: () => (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Templates
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight">
            Page templates overview
          </h1>
          <p className="text-sm text-muted-foreground">
            Templates are opinionated compositions of blocks wired for specific use
            cases like marketing home, pricing, or feature pages.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card/60 p-4 shadow-sm">
            <p className="text-sm font-semibold">Marketing home</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Hero + logo cloud + features + testimonials + pricing.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-4 shadow-sm">
            <p className="text-sm font-semibold">Pricing page</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Pricing grid, FAQ, and conversion-focused CTAs.
            </p>
          </div>
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          As we ingest Tailark, Cult UI, and Bundui examples, concrete templates will be
          added under <code>Templates/*</code> with links back to their underlying blocks
          and components.
        </p>
      </div>
    </div>
  ),
}

