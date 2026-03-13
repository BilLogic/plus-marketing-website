import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Styles/Elevation",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const shadowScale = [
  { cls: "shadow-sm", label: "shadow-sm", use: "Subtle depth — inputs, small cards" },
  { cls: "shadow", label: "shadow", use: "Default — cards, dropdowns" },
  { cls: "shadow-md", label: "shadow-md", use: "Medium — hover states, floating UI" },
  { cls: "shadow-lg", label: "shadow-lg", use: "Large — modals, popovers" },
  { cls: "shadow-xl", label: "shadow-xl", use: "Extra-large — hero cards, feature callouts" },
  { cls: "shadow-2xl", label: "shadow-2xl", use: "Maximum — premium emphasis only" },
  { cls: "shadow-none", label: "shadow-none", use: "Reset — remove inherited shadows" },
]

const ringPatterns = [
  { cls: "ring-1 ring-border", label: "ring-1 ring-border", use: "Subtle container boundary" },
  { cls: "ring-1 ring-primary/20", label: "ring-1 ring-primary/20", use: "Branded soft highlight" },
  { cls: "ring-2 ring-ring", label: "ring-2 ring-ring", use: "Focus indicator" },
  { cls: "ring-2 ring-destructive", label: "ring-2 ring-destructive", use: "Error state" },
]

const blurScale = [
  { cls: "backdrop-blur-sm", label: "backdrop-blur-sm", use: "Subtle glass effect" },
  { cls: "backdrop-blur", label: "backdrop-blur", use: "Standard glass panels" },
  { cls: "backdrop-blur-md", label: "backdrop-blur-md", use: "Hero glass overlays" },
  { cls: "backdrop-blur-lg", label: "backdrop-blur-lg", use: "Full frosted glass" },
]

/** Shadow, ring, blur, and depth conventions. */
export const Elevation: Story = {
  render: () => (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Styles
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight">
            Elevation &amp; depth
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Shadows, rings, and backdrop blur create visual hierarchy. Use stronger
            elevation sparingly — most content needs only subtle depth cues.
          </p>
        </div>

        {/* Shadow scale */}
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Shadow scale
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            The full Tailwind box-shadow progression from subtle to dramatic.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {shadowScale.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-3 rounded-xl border border-border p-4">
                <div className={`size-16 rounded-xl bg-card ${s.cls}`} />
                <div className="text-center">
                  <code className="text-[10px] font-semibold">{s.label}</code>
                  <p className="mt-0.5 text-[9px] text-muted-foreground">{s.use}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Colored shadows */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Colored shadows
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            Tinted shadows reinforce brand color. Use opacity modifiers to control intensity.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { cls: "shadow-lg shadow-primary/20", label: "shadow-primary/20" },
              { cls: "shadow-lg shadow-accent/20", label: "shadow-accent/20" },
              { cls: "shadow-lg shadow-destructive/20", label: "shadow-destructive/20" },
              { cls: "shadow-lg shadow-foreground/10", label: "shadow-foreground/10" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-3 rounded-xl border border-border p-4">
                <div className={`size-16 rounded-xl bg-card ${s.cls}`} />
                <code className="text-[10px] font-semibold">{s.label}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Ring patterns */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Ring patterns
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            Rings provide lightweight borders that don&apos;t affect layout. Preferred for focus states and highlights.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {ringPatterns.map((r) => (
              <div key={r.label} className="flex flex-col items-center gap-3 p-4">
                <div className={`size-16 rounded-xl bg-card ${r.cls}`} />
                <div className="text-center">
                  <code className="text-[9px] font-semibold">{r.label}</code>
                  <p className="mt-0.5 text-[9px] text-muted-foreground">{r.use}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Backdrop blur */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Backdrop blur (glass)
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            Layer translucent surfaces over images or gradients for glass effects.
          </p>

          <div className="mt-4 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-chart-3/20 p-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {blurScale.map((b) => (
                <div
                  key={b.label}
                  className={`flex flex-col items-center gap-2 rounded-xl border border-white/20 bg-background/40 p-4 ${b.cls}`}
                >
                  <p className="text-xs font-semibold text-foreground">Glass</p>
                  <code className="text-[9px] font-medium text-foreground/70">{b.label}</code>
                  <p className="text-[9px] text-foreground/50">{b.use}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Composition patterns */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Composition patterns
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            Three standard elevation levels used across the marketing site.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <p className="text-xs font-semibold">Base</p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                border + shadow-sm — standard containers, cards
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-md ring-1 ring-border/50">
              <p className="text-xs font-semibold">Floating</p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                shadow-md + ring-1 — hover states, dropdowns, tooltips
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-background/80 p-5 shadow-lg backdrop-blur-md">
              <p className="text-xs font-semibold">Glass</p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                shadow-lg + backdrop-blur-md — layered over imagery
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  ),
}
