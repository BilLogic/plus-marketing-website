import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Layout/Section",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    padding: {
      control: { type: "select" },
      options: [400, 600, 800],
      description: "Vertical padding in pixels (approximate)",
    },
  },
  args: {
    padding: 800,
  },
} satisfies Meta<{ padding: 400 | 600 | 800 }>

export default meta
type Story = StoryObj<typeof meta>

const paddingClass = (padding: 400 | 600 | 800) => {
  if (padding === 400) return "py-10 sm:py-12 md:py-16"
  if (padding === 600) return "py-14 sm:py-16 md:py-20"
  return "py-16 sm:py-20 md:py-24"
}

/** Standard marketing section wrapper with consistent padding and max-width. */
export const StorySection: Story = {
  render: () => (
    <section className={`border-border/60 bg-background/60 ${paddingClass(800)}`}>
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 sm:px-6 md:px-8">
        <header className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Section label
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Consistent section padding keeps the page feeling intentional.
          </h2>
          <p className="text-sm text-muted-foreground">
            This pattern is the baseline for heroes, feature rows, testimonials, and more.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {["Left column", "Middle column", "Right column"].map((label) => (
            <div
              key={label}
              className="rounded-xl border border-dashed border-border bg-card/40 p-4"
            >
              <p className="text-sm font-medium">{label}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Use this for feature bullets, metrics, or supporting content.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
}

