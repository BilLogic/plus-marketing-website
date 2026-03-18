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
    title: "Color Palette",
    description: "Plus brand hues (Figma-derived) and standard Tailwind hues with light/dark preview.",
    path: "Styles/Color/Tokens",
  },
  {
    title: "Semantic Tokens",
    description: "Every semantic token paired with every Tailwind color utility — bg, text, border, ring, fill, stroke, and more.",
    path: "Styles/Color",
  },
  {
    title: "Typography",
    description: "DM Sans type scale, heading hierarchy, body text, and font conventions.",
    path: "Styles/Typography",
  },
  {
    title: "Spacing",
    description: "Tailwind spacing scale, gap utilities, padding conventions, container widths, and responsive patterns.",
    path: "Styles/Spacing",
  },
  {
    title: "Themes",
    description: "Light and dark mode token mapping, live side-by-side comparison, and implementation guide.",
    path: "Styles/Themes",
  },
  {
    title: "Elevation",
    description: "Shadow scale, colored shadows, rings, backdrop blur, and glass patterns.",
    path: "Styles/Elevation",
  },
  {
    title: "Motion",
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
          <div className="flex items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Styles
            </p>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
              {sections.length} sections
            </span>
          </div>
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
          {sections.map((s, i) => (
            <div
              key={s.title}
              className="group rounded-xl border border-border p-5 transition-colors hover:border-primary/30 hover:bg-primary/[0.02]"
            >
              <div className="flex items-center gap-2">
                <div className="h-4 w-1 rounded-full bg-primary/40 transition-colors group-hover:bg-primary" />
                <p className="text-sm font-semibold tracking-tight">{s.title}</p>
              </div>
              <p className="mt-1.5 pl-3 text-xs leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <p className="mt-2 pl-3 text-[10px] font-medium text-primary">{s.path}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}
