import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Styles/Overview",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const sections = [
  {
    title: "Tokens",
    description: "Semantic color tokens, full palette, and usage examples. Every token × every Tailwind utility documented.",
    path: "Styles/Tokens",
  },
  {
    title: "Typography",
    description: "DM Sans type scale, heading hierarchy, body text, and font conventions.",
    path: "Styles/Typography",
  },
  {
    title: "Elevation",
    description: "Shadow scale, colored shadows, rings, backdrop blur, and glass patterns.",
    path: "Styles/Elevation",
  },
  {
    title: "Transitions",
    description: "CSS transition tokens — duration scale, easing curves, transition properties, and keyframe animations.",
    path: "Styles/Transitions",
  },
  {
    title: "Shape",
    description: "Border radius scale, side-specific radius, and usage patterns per component category.",
    path: "Styles/Shape",
  },
  {
    title: "Icons",
    description: "Lucide React conventions — size scale, color patterns, feedback icons, and common icon reference.",
    path: "Styles/Icons",
  },
]

/** Index page for the Styles design foundations. */
export const Guide: Story = {
  name: "Guide",
  render: () => (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Styles
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight">
            Design foundations
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Static design tokens and CSS-level primitives that define how the
            marketing site looks at rest. These are the building blocks that
            every component and template builds upon.
          </p>
          <p className="text-[11px] text-muted-foreground/60">
            For interactive animated components (Framer Motion), see the{" "}
            <strong>Effects</strong> section.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-border p-5 transition-colors hover:border-primary/30 hover:bg-primary/[0.02]"
            >
              <p className="text-sm font-semibold tracking-tight">{s.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <p className="mt-2 text-[10px] font-medium text-primary">{s.path}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}
