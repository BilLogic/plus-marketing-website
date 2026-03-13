import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Styles/Shape",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const radiusScale = [
  { cls: "rounded-none", token: "--radius: 0", label: "rounded-none", px: "0px" },
  { cls: "rounded-sm", token: "--radius-sm", label: "rounded-sm", px: "calc(radius × 0.6)" },
  { cls: "rounded", token: "default 0.25rem", label: "rounded", px: "4px" },
  { cls: "rounded-md", token: "--radius-md", label: "rounded-md", px: "calc(radius × 0.8)" },
  { cls: "rounded-lg", token: "--radius-lg", label: "rounded-lg", px: "var(--radius)" },
  { cls: "rounded-xl", token: "--radius-xl", label: "rounded-xl", px: "calc(radius × 1.4)" },
  { cls: "rounded-2xl", token: "--radius-2xl", label: "rounded-2xl", px: "calc(radius × 1.8)" },
  { cls: "rounded-3xl", token: "--radius-3xl", label: "rounded-3xl", px: "calc(radius × 2.2)" },
  { cls: "rounded-4xl", token: "--radius-4xl", label: "rounded-4xl", px: "calc(radius × 2.6)" },
  { cls: "rounded-full", token: "9999px", label: "rounded-full", px: "9999px" },
]

const usagePatterns = [
  { category: "Controls", items: [
    { cls: "rounded-md", label: "Buttons", desc: "Default button radius" },
    { cls: "rounded-lg", label: "Inputs", desc: "Text fields, selects, textareas" },
    { cls: "rounded-full", label: "Pills / badges", desc: "Tags, status indicators" },
  ]},
  { category: "Containers", items: [
    { cls: "rounded-xl", label: "Small cards", desc: "Compact content cards" },
    { cls: "rounded-2xl", label: "Primary cards", desc: "Pricing cards, feature cards" },
    { cls: "rounded-3xl", label: "Hero containers", desc: "Large marketing sections" },
  ]},
  { category: "Media", items: [
    { cls: "rounded-lg", label: "Thumbnails", desc: "Small images, icons" },
    { cls: "rounded-2xl", label: "Screenshots", desc: "Product screenshots, videos" },
    { cls: "rounded-full", label: "Avatars", desc: "User photos, team members" },
  ]},
]

/** Border radius tokens, scale, and usage conventions. */
export const Shape: Story = {
  render: () => (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Styles
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight">Shape</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Border radius tokens create consistent roundness across all components.
            The base radius (<code>--radius: 0.625rem</code>) is defined in globals.css
            and all other steps are derived from it.
          </p>
        </div>

        {/* Radius scale */}
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Radius scale
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            Full progression from sharp to circular. Hover for the token value.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {radiusScale.map((r) => (
              <div key={r.label} className="flex flex-col items-center gap-2 p-3" title={r.token}>
                <div className={`size-14 bg-primary/15 ring-2 ring-primary/30 ${r.cls}`} />
                <code className="text-[10px] font-semibold">{r.label}</code>
                <span className="text-[9px] text-muted-foreground">{r.px}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Side-specific radius */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Side-specific radius
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            Apply radius to specific corners or sides.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { cls: "rounded-t-2xl", label: "rounded-t-2xl" },
              { cls: "rounded-b-2xl", label: "rounded-b-2xl" },
              { cls: "rounded-l-2xl", label: "rounded-l-2xl" },
              { cls: "rounded-r-2xl", label: "rounded-r-2xl" },
              { cls: "rounded-tl-2xl", label: "rounded-tl-2xl" },
              { cls: "rounded-tr-2xl", label: "rounded-tr-2xl" },
              { cls: "rounded-bl-2xl", label: "rounded-bl-2xl" },
              { cls: "rounded-br-2xl", label: "rounded-br-2xl" },
            ].map((r) => (
              <div key={r.label} className="flex flex-col items-center gap-2 p-3">
                <div className={`size-12 bg-primary/15 ring-2 ring-primary/30 ${r.cls}`} />
                <code className="text-[9px] font-medium">{r.label}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Usage patterns */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Usage patterns
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            Recommended radius for each component category.
          </p>

          <div className="mt-4 space-y-6">
            {usagePatterns.map((cat) => (
              <div key={cat.category}>
                <h3 className="text-xs font-semibold">{cat.category}</h3>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  {cat.items.map((item) => (
                    <div key={item.label} className="flex items-start gap-3 rounded-lg border border-border/50 p-3">
                      <div className={`size-10 shrink-0 bg-muted ${item.cls}`} />
                      <div>
                        <p className="text-[11px] font-semibold">{item.label}</p>
                        <code className="text-[9px] text-muted-foreground">{item.cls}</code>
                        <p className="mt-0.5 text-[9px] text-muted-foreground/70">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  ),
}
