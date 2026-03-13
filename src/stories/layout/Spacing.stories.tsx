import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Layout/Spacing",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const primitiveSteps = [
  { name: "space-1", rem: "0.25rem", px: "4px" },
  { name: "space-2", rem: "0.5rem", px: "8px" },
  { name: "space-3", rem: "0.75rem", px: "12px" },
  { name: "space-4", rem: "1rem", px: "16px" },
  { name: "space-5", rem: "1.5rem", px: "24px" },
  { name: "space-6", rem: "2rem", px: "32px" },
  { name: "space-7", rem: "2.5rem", px: "40px" },
  { name: "space-8", rem: "3rem", px: "48px" },
  { name: "space-9", rem: "4rem", px: "64px" },
  { name: "space-10", rem: "5rem", px: "80px" },
]

const sectionVariants = [
  {
    label: "Section 400",
    classes: "py-10 sm:py-12 md:py-16",
    approxToken: "section-y-400",
  },
  {
    label: "Section 600",
    classes: "py-14 sm:py-16 md:py-20",
    approxToken: "section-y-600",
  },
  {
    label: "Section 800",
    classes: "py-16 sm:py-20 md:py-24",
    approxToken: "section-y-800",
  },
]

/** Spacing primitives and semantic patterns for sections, stacks, and grids. */
export const Story: Story = {
  render: () => (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-10">
        <header className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Layout
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight">
            Spacing system
          </h1>
          <p className="text-sm text-muted-foreground">
            A single primitive scale underpins semantic spacing tokens for sections, stacks, and
            grids across breakpoints.
          </p>
        </header>

        {/* Primitive ladder */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Primitives
          </h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {primitiveSteps.map((step) => (
              <div
                key={step.name}
                className="flex items-center justify-between rounded-lg border border-dashed border-border bg-card/40 px-3 py-2"
              >
                <span className="text-sm font-medium">{step.name}</span>
                <span className="text-xs text-muted-foreground">
                  {step.rem} · {step.px}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section padding semantics */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Section padding presets
          </h2>
          <div className="space-y-6">
            {sectionVariants.map((variant) => (
              <section
                key={variant.label}
                className={`border border-dashed border-border bg-background/60 ${variant.classes}`}
              >
                <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {variant.label}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Tailwind classes {variant.classes} &mdash; semantic token{" "}
                    <code>{variant.approxToken}</code>.
                  </p>
                </div>
              </section>
            ))}
          </div>
        </section>

        {/* Stack gaps */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Stack gaps
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "stack-xs", gapClass: "gap-2" },
              { label: "stack-md", gapClass: "gap-4" },
              { label: "stack-lg", gapClass: "gap-6" },
            ].map((stack) => (
              <div
                key={stack.label}
                className="rounded-xl border border-dashed border-border bg-card/40 p-4"
              >
                <p className="text-sm font-medium">{stack.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Implemented with <code>{stack.gapClass}</code>.
                </p>
                <div className={`mt-3 flex flex-col ${stack.gapClass}`}>
                  <div className="h-7 rounded-md bg-muted" />
                  <div className="h-7 rounded-md bg-muted" />
                  <div className="h-7 rounded-md bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  ),
}

