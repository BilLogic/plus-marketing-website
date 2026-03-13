import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Layout/Grid",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Basic responsive grid: 1-col mobile, 3-col desktop. */
export const BasicGrid: Story = {
  render: () => (
    <div className="w-[min(900px,92vw)] grid grid-cols-1 gap-4 md:grid-cols-3">
      {["Column 1", "Column 2", "Column 3"].map((label) => (
        <div
          key={label}
          className="rounded-lg border border-dashed border-border bg-card/40 p-4"
        >
          <p className="text-sm font-medium">{label}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Stacks on small screens, three-up on desktop.
          </p>
        </div>
      ))}
    </div>
  ),
}

/** Grid items that span columns, useful for hero + side cards. */
export const GridWithGridItems: Story = {
  render: () => (
    <div className="w-[min(900px,92vw)] grid grid-cols-1 gap-4 md:grid-cols-4">
      <div className="rounded-lg border border-dashed border-border bg-card/40 p-4 md:col-span-2">
        <p className="text-sm font-medium">Hero area</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Occupies two columns on desktop.
        </p>
      </div>
      <div className="rounded-lg border border-dashed border-border bg-card/40 p-4">
        <p className="text-sm font-medium">Side card</p>
      </div>
      <div className="rounded-lg border border-dashed border-border bg-card/40 p-4">
        <p className="text-sm font-medium">Side card</p>
      </div>
    </div>
  ),
}

/** Grid areas-like composition using spans and row control. */
export const GridAreas: Story = {
  render: () => (
    <div className="w-[min(900px,92vw)] grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:grid-rows-[auto_minmax(0,1fr)]">
      <div className="rounded-lg border border-dashed border-border bg-card/40 p-4 md:row-span-2">
        <p className="text-sm font-medium">Primary content</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Takes the full height of the grid on desktop.
        </p>
      </div>
      <div className="rounded-lg border border-dashed border-border bg-card/40 p-4">
        <p className="text-sm font-medium">Secondary</p>
      </div>
      <div className="rounded-lg border border-dashed border-border bg-card/40 p-4">
        <p className="text-sm font-medium">Tertiary</p>
      </div>
    </div>
  ),
}

/** A common marketing layout: section header + card grid. */
export const CardGridLayout: Story = {
  render: () => (
    <section className="w-[min(980px,92vw)] rounded-2xl bg-background/60 p-6 ring-1 ring-border/60">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Card grid layout</h2>
          <p className="text-sm text-muted-foreground">
            Use this pattern for feature sections, case studies, or product highlights.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">Tailwind grid + shadcn tokens</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {["Analytics", "Collaboration", "Automation"].map((label) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-card/60 p-4 shadow-sm"
          >
            <p className="text-sm font-medium">{label}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Short supporting copy that explains the value of this feature.
            </p>
          </div>
        ))}
      </div>
    </section>
  ),
}

