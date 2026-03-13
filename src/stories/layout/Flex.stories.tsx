import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Layout/Flex",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Flex patterns used for marketing headers and CTAs. */
export const StoryFlex: Story = {
  render: () => (
    <div className="w-[min(900px,92vw)] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card/60 p-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Space-between row</p>
          <p className="text-xs text-muted-foreground">
            Primary on the left, secondary on the right. Collapses into a column on small screens.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-muted px-2 py-1">Pill</span>
          <span className="rounded-full bg-muted px-2 py-1">Pill</span>
          <span className="rounded-full bg-muted px-2 py-1">Pill</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-dashed border-border bg-card/40 p-4 sm:flex-row sm:items-center">
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium">Stacked on mobile, row on desktop</p>
          <p className="text-xs text-muted-foreground">
            Use <code>flex-col sm:flex-row</code> for responsive rows that stack gracefully.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
            Primary action
          </button>
          <button className="rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium">
            Secondary
          </button>
        </div>
      </div>
    </div>
  ),
}

