import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Styles/Spacing",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const spacingScale = [
  { cls: "1", rem: "0.25rem", px: "4px" },
  { cls: "2", rem: "0.5rem", px: "8px" },
  { cls: "3", rem: "0.75rem", px: "12px" },
  { cls: "4", rem: "1rem", px: "16px" },
  { cls: "5", rem: "1.25rem", px: "20px" },
  { cls: "6", rem: "1.5rem", px: "24px" },
  { cls: "8", rem: "2rem", px: "32px" },
  { cls: "10", rem: "2.5rem", px: "40px" },
  { cls: "12", rem: "3rem", px: "48px" },
  { cls: "16", rem: "4rem", px: "64px" },
  { cls: "20", rem: "5rem", px: "80px" },
  { cls: "24", rem: "6rem", px: "96px" },
  { cls: "32", rem: "8rem", px: "128px" },
  { cls: "40", rem: "10rem", px: "160px" },
  { cls: "48", rem: "12rem", px: "192px" },
  { cls: "64", rem: "16rem", px: "256px" },
  { cls: "80", rem: "20rem", px: "320px" },
  { cls: "96", rem: "24rem", px: "384px" },
]

const gapValues = [
  { cls: "gap-1", label: "4px", desc: "Tight — icon groups, badge clusters" },
  { cls: "gap-2", label: "8px", desc: "Compact — button groups, inline items" },
  { cls: "gap-3", label: "12px", desc: "Default — form fields, list items" },
  { cls: "gap-4", label: "16px", desc: "Standard — card grids, nav items" },
  { cls: "gap-6", label: "24px", desc: "Comfortable — section children, card groups" },
  { cls: "gap-8", label: "32px", desc: "Spacious — section groups, dashboard panels" },
]

const paddingConventions = [
  { element: "Button (sm)", padding: "px-3 py-1.5", value: "12px / 6px" },
  { element: "Button (default)", padding: "px-4 py-2", value: "16px / 8px" },
  { element: "Button (lg)", padding: "px-5 py-2.5", value: "20px / 10px" },
  { element: "Input", padding: "px-3 py-2", value: "12px / 8px" },
  { element: "Card", padding: "p-5 or p-6", value: "20px or 24px" },
  { element: "Dialog content", padding: "p-6", value: "24px" },
  { element: "Section (mobile)", padding: "px-4 py-8", value: "16px / 32px" },
  { element: "Section (desktop)", padding: "px-6 py-16", value: "24px / 64px" },
  { element: "Page container", padding: "px-4 sm:px-6 lg:px-8", value: "16→24→32px" },
]

const containerWidths = [
  { cls: "max-w-sm", px: "384px", use: "Modals, small forms" },
  { cls: "max-w-md", px: "448px", use: "Cards, compact dialogs" },
  { cls: "max-w-lg", px: "512px", use: "Forms, medium dialogs" },
  { cls: "max-w-xl", px: "576px", use: "Content cards, sidebars" },
  { cls: "max-w-2xl", px: "672px", use: "Prose content, articles" },
  { cls: "max-w-3xl", px: "768px", use: "Blog posts, documentation" },
  { cls: "max-w-4xl", px: "896px", use: "Dashboard panels" },
  { cls: "max-w-5xl", px: "1024px", use: "Standard page content" },
  { cls: "max-w-6xl", px: "1152px", use: "Wide page layouts" },
  { cls: "max-w-7xl", px: "1280px", use: "Full-width marketing" },
]

/** Tailwind spacing scale, gap utilities, padding conventions, and container widths. */
export const Spacing: Story = {
  render: () => (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Styles
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight">
            Spacing
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Tailwind&apos;s spacing scale drives all padding, margin, gap, and
            sizing utilities. Use consistent values to maintain visual rhythm
            across components and layouts.
          </p>
        </div>

        {/* Spacing scale */}
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Spacing scale
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            Core values used for padding, margin, width, height, and gap.
          </p>

          <div className="mt-4 space-y-1.5">
            {spacingScale.map((s) => (
              <div key={s.cls} className="flex items-center gap-4">
                <code className="w-10 shrink-0 text-right font-mono text-[11px] font-medium text-foreground">
                  {s.cls}
                </code>
                <div className="relative h-5 flex-1">
                  <div
                    className="absolute inset-y-0 left-0 rounded-sm bg-primary/80"
                    style={{ width: s.px }}
                  />
                </div>
                <span className="w-16 shrink-0 text-right font-mono text-[10px] text-muted-foreground">
                  {s.rem}
                </span>
                <span className="w-12 shrink-0 text-right text-[10px] text-muted-foreground/60">
                  {s.px}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Gap utilities */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Gap utilities
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            Use <code className="rounded bg-muted px-1 py-0.5 text-[10px]">gap-*</code> with
            flex and grid layouts. Our most common range is gap-2 to gap-6.
          </p>

          <div className="mt-4 space-y-4">
            {gapValues.map((g) => (
              <div key={g.cls} className="flex items-start gap-4">
                <code className="w-16 shrink-0 pt-1 text-[11px] font-medium">
                  {g.cls}
                </code>
                <div className={`flex ${g.cls}`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="size-6 rounded-md bg-primary/20 ring-1 ring-primary/30"
                    />
                  ))}
                </div>
                <span className="pt-1 text-[10px] text-muted-foreground">
                  {g.label} — {g.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Padding & margin conventions */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Padding conventions
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            Recommended padding for each component type. Use these as defaults.
          </p>

          <div className="mt-4 rounded-2xl ring-1 ring-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Element
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Classes
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {paddingConventions.map((p) => (
                  <tr
                    key={p.element}
                    className="border-b border-border/40 last:border-0"
                  >
                    <td className="px-5 py-3 text-xs font-medium">
                      {p.element}
                    </td>
                    <td className="px-5 py-3">
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] font-medium">
                        {p.padding}
                      </code>
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">
                      {p.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Container widths */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Container widths
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            Use max-width utilities to constrain content for readability.
            Standard page content uses max-w-5xl or max-w-6xl.
          </p>

          <div className="mt-4 space-y-2">
            {containerWidths.map((c) => (
              <div key={c.cls} className="flex items-center gap-4">
                <code className="w-24 shrink-0 font-mono text-[11px] font-medium">
                  {c.cls}
                </code>
                <div className="relative h-4 flex-1">
                  <div
                    className="absolute inset-y-0 left-0 rounded-sm bg-accent/30 ring-1 ring-accent/40"
                    style={{
                      width: `min(${c.px}, 100%)`,
                    }}
                  />
                </div>
                <span className="w-14 shrink-0 text-right font-mono text-[10px] text-muted-foreground">
                  {c.px}
                </span>
                <span className="hidden w-40 shrink-0 text-[10px] text-muted-foreground/60 lg:block">
                  {c.use}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Responsive spacing */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Responsive patterns
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            Spacing increases at breakpoints. Use responsive prefixes for
            progressive enhancement.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border p-5">
              <p className="text-xs font-semibold">Page padding</p>
              <code className="mt-2 block rounded bg-muted px-2 py-1.5 font-mono text-[10px]">
                px-4 sm:px-6 lg:px-8
              </code>
              <p className="mt-2 text-[10px] text-muted-foreground">
                16px → 24px → 32px as viewport widens
              </p>
            </div>
            <div className="rounded-xl border border-border p-5">
              <p className="text-xs font-semibold">Section vertical</p>
              <code className="mt-2 block rounded bg-muted px-2 py-1.5 font-mono text-[10px]">
                py-8 sm:py-12 lg:py-16
              </code>
              <p className="mt-2 text-[10px] text-muted-foreground">
                32px → 48px → 64px between major sections
              </p>
            </div>
            <div className="rounded-xl border border-border p-5">
              <p className="text-xs font-semibold">Grid gap</p>
              <code className="mt-2 block rounded bg-muted px-2 py-1.5 font-mono text-[10px]">
                gap-4 sm:gap-6 lg:gap-8
              </code>
              <p className="mt-2 text-[10px] text-muted-foreground">
                16px → 24px → 32px for card grids
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  ),
}
