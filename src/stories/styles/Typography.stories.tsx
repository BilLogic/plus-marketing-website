import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { marketingTypography } from "@/lib/marketing-typography"

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
              <p className={marketingTypography.h1}>H1 — Hero headline</p>
              <p className={marketingTypography.h2}>H2 — Section headline</p>
              <p className={marketingTypography.h3}>H3 — Card title</p>
              <p className="text-sm text-muted-foreground">
                For Schools — Robust Oversight cards use{" "}
                <code className="text-xs">marketingTypography.h2</code> on an{" "}
                <code className="text-xs">{"<h3>"}</code> (section headline stays{" "}
                <code className="text-xs">{"<h2>"}</code>).
              </p>
              <p className="text-pretty text-lg font-bold leading-snug tracking-tight text-[#d31998] sm:text-xl">
                Dense card / bento title — <code className="text-xs">text-lg</code>{" "}
                default, <code className="text-xs">sm:text-xl</code> (Day-to-Day
                Experience, For Schools).
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Body text
            </h2>
            <div className="max-w-prose space-y-3">
              <p className={marketingTypography.lead}>
                Lead paragraph — use this for section intros and above-the-fold
                copy.
              </p>
              <p className={marketingTypography.body}>
                Standard paragraph — keep line length readable, and prefer semantic
                color tokens for contrast. This is the default body style.
              </p>
              <p className="text-sm text-muted-foreground">
                Small caption — for helper text, metadata, and subtle labels.
              </p>
              <p className="text-sm text-muted-foreground">
                Testimonial cards (e.g. For Schools — School Success Stories): attribution uses{" "}
                <code className="text-xs">marketingTypography.h3</code> with a brand color; quote
                uses <code className="text-xs">marketingTypography.body</code> +{" "}
                <code className="text-xs">text-muted-foreground</code>, with{" "}
                <code className="text-xs">strong</code> as{" "}
                <code className="text-xs">font-semibold text-teal-950</code> (matches section
                headers).
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

