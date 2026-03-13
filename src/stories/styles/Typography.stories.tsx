import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Styles/Typography",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Default typography scale and font conventions. */
export const Story: Story = {
  render: () => (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Styles
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight">
            Typography
          </h1>
          <p className="text-sm text-muted-foreground">
            Default font is <strong>DM Sans</strong> for UI and body text, with{" "}
            <strong>Geist Mono</strong> for code.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          <section className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Heading hierarchy
            </h2>
            <div className="space-y-3">
              <p className="text-5xl font-semibold tracking-tight">
                H1 — Hero headline
              </p>
              <p className="text-3xl font-semibold tracking-tight">
                H2 — Section headline
              </p>
              <p className="text-xl font-semibold tracking-tight">H3 — Card title</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Body text
            </h2>
            <div className="max-w-prose space-y-3">
              <p className="text-lg text-muted-foreground">
                Lead paragraph — use this for section intros and above-the-fold
                copy.
              </p>
              <p className="text-base leading-relaxed">
                Standard paragraph — keep line length readable, and prefer semantic
                color tokens for contrast. This is the default body style.
              </p>
              <p className="text-sm text-muted-foreground">
                Small caption — for helper text, metadata, and subtle labels.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Type scales
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-dashed border-border bg-card/40 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Body
                </p>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <li>
                    <strong>body-md</strong> — 1rem / 16px (default paragraph)
                  </li>
                  <li>
                    <strong>body-lg</strong> — 1.125rem / 18px (lead text)
                  </li>
                  <li>
                    <strong>body-sm</strong> — 0.875rem / 14px (captions, meta)
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-dashed border-border bg-card/40 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Headings & display
                </p>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <li>
                    <strong>display-1</strong> — ~40–56px (hero headline)
                  </li>
                  <li>
                    <strong>heading-lg</strong> — 2rem / 32px (section headline)
                  </li>
                  <li>
                    <strong>heading-md</strong> — 1.5rem / 24px (card titles)
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  ),
}

