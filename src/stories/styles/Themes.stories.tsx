import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Styles/Themes",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

type TokenDef = {
  name: string
  light: string
  dark: string
}

type TokenCategory = {
  label: string
  tokens: TokenDef[]
}

const tokenCategories: TokenCategory[] = [
  {
    label: "Surfaces",
    tokens: [
      { name: "--background", light: "#FFFFFF", dark: "#1E1F24" },
      { name: "--foreground", light: "#1E1F24", dark: "#F9F9FB" },
      { name: "--card", light: "#FCFCFD", dark: "#2A2B31" },
      { name: "--card-foreground", light: "#1E1F24", dark: "#F9F9FB" },
      { name: "--popover", light: "#FFFFFF", dark: "#2A2B31" },
      { name: "--popover-foreground", light: "#1E1F24", dark: "#F9F9FB" },
    ],
  },
  {
    label: "Primary",
    tokens: [
      { name: "--primary", light: "#00BFCC", dark: "#58D4DE" },
      { name: "--primary-foreground", light: "#FFFFFF", dark: "#004248" },
    ],
  },
  {
    label: "Secondary",
    tokens: [
      { name: "--secondary", light: "#EFF0F3", dark: "#3A3B42" },
      { name: "--secondary-foreground", light: "#1E1F24", dark: "#F9F9FB" },
    ],
  },
  {
    label: "Muted",
    tokens: [
      { name: "--muted", light: "#F9F9FB", dark: "#3A3B42" },
      { name: "--muted-foreground", light: "#62636C", dark: "#B9BBC6" },
    ],
  },
  {
    label: "Accent",
    tokens: [
      { name: "--accent", light: "#DD2AB0", dark: "#E48EC6" },
      { name: "--accent-foreground", light: "#FFFFFF", dark: "#690051" },
    ],
  },
  {
    label: "Destructive",
    tokens: [
      { name: "--destructive", light: "#FF9292", dark: "#FCA5A4" },
      { name: "--destructive-foreground", light: "#6A0B19", dark: "#6A0B19" },
    ],
  },
  {
    label: "Borders & Focus",
    tokens: [
      { name: "--border", light: "#E7E8EC", dark: "rgba(255,255,255,0.1)" },
      { name: "--input", light: "#E0E1E6", dark: "rgba(255,255,255,0.15)" },
      { name: "--ring", light: "#00BFCC", dark: "#58D4DE" },
    ],
  },
  {
    label: "Charts",
    tokens: [
      { name: "--chart-1", light: "#4DC1FF", dark: "#7FCBF8" },
      { name: "--chart-2", light: "#4CAB65", dark: "#68B97A" },
      { name: "--chart-3", light: "#FFC94B", dark: "#FED084" },
      { name: "--chart-4", light: "#FF9292", dark: "#FCA5A4" },
      { name: "--chart-5", light: "#DD2AB0", dark: "#ECA8D3" },
    ],
  },
  {
    label: "Sidebar",
    tokens: [
      { name: "--sidebar", light: "#F9F9FB", dark: "#2A2B31" },
      { name: "--sidebar-foreground", light: "#1E1F24", dark: "#F9F9FB" },
      { name: "--sidebar-primary", light: "#00BFCC", dark: "#58D4DE" },
      { name: "--sidebar-primary-fg", light: "#FFFFFF", dark: "#004248" },
      { name: "--sidebar-accent", light: "#EFFBFC", dark: "#3A3B42" },
      { name: "--sidebar-accent-fg", light: "#004248", dark: "#F9F9FB" },
      { name: "--sidebar-border", light: "#E7E8EC", dark: "rgba(255,255,255,0.1)" },
      { name: "--sidebar-ring", light: "#00BFCC", dark: "#58D4DE" },
    ],
  },
]

const Swatch = ({ color, size = "size-6" }: { color: string; size?: string }) => (
  <div
    className={`${size} shrink-0 rounded ring-1 ring-black/10`}
    style={{ backgroundColor: color }}
    title={color}
  />
)

/** Light and dark mode token mapping, live comparison, and implementation guide. */
export const Themes: Story = {
  render: () => {
    const [highlight, setHighlight] = useState<string | null>(null)

    return (
      <div className="min-h-dvh bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Styles
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight">
              Themes
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The design system supports light and dark modes through semantic
              CSS custom properties. Tokens are defined in{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-[11px] font-medium">
                globals.css
              </code>{" "}
              under <code className="rounded bg-muted px-1.5 py-0.5 text-[11px] font-medium">:root</code> (light) and{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-[11px] font-medium">.dark</code> (dark).
            </p>
          </div>

          {/* Token comparison table */}
          <section className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Token comparison
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground/70">
              Every semantic token with its resolved value in each mode.
            </p>

            <div className="mt-4 rounded-2xl ring-1 ring-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Token
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Light
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Dark
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tokenCategories.map((cat) => (
                    <>
                      <tr key={`cat-${cat.label}`}>
                        <td
                          colSpan={3}
                          className="border-t border-border bg-muted/30 px-5 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                          {cat.label}
                        </td>
                      </tr>
                      {cat.tokens.map((t) => (
                        <tr
                          key={t.name}
                          className={`border-b border-border/30 transition-colors ${
                            highlight === t.name ? "bg-primary/5" : "hover:bg-muted/20"
                          }`}
                          onMouseEnter={() => setHighlight(t.name)}
                          onMouseLeave={() => setHighlight(null)}
                        >
                          <td className="px-5 py-2.5">
                            <code className="font-mono text-[11px] font-medium">
                              {t.name}
                            </code>
                          </td>
                          <td className="px-5 py-2.5">
                            <div className="flex items-center gap-2">
                              <Swatch color={t.light} />
                              <code className="font-mono text-[10px] text-muted-foreground">
                                {t.light}
                              </code>
                            </div>
                          </td>
                          <td className="px-5 py-2.5">
                            <div className="flex items-center gap-2">
                              <Swatch color={t.dark} />
                              <code className="font-mono text-[10px] text-muted-foreground">
                                {t.dark}
                              </code>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Live comparison */}
          <section className="mt-12">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Live comparison
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground/70">
              The same card rendered in both modes side-by-side.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {/* Light */}
              <div className="rounded-2xl bg-[#FFFFFF] p-5 text-[#1E1F24] ring-1 ring-[#E7E8EC]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#62636C]">
                  Light mode
                </p>
                <div className="mt-3 rounded-xl border border-[#E7E8EC] bg-[#FCFCFD] p-4">
                  <p className="text-sm font-semibold text-[#1E1F24]">Dashboard</p>
                  <p className="mt-1 text-xs text-[#62636C]">
                    Your workspace overview and recent activity.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="rounded-md bg-[#00BFCC] px-3 py-1.5 text-xs font-medium text-white">
                      Primary
                    </button>
                    <button className="rounded-md bg-[#EFF0F3] px-3 py-1.5 text-xs font-medium text-[#1E1F24]">
                      Secondary
                    </button>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="rounded-full bg-[#DD2AB0] px-2 py-0.5 text-[10px] font-medium text-white">
                      Accent
                    </span>
                    <span className="rounded-full bg-[#FF9292] px-2 py-0.5 text-[10px] font-medium text-[#6A0B19]">
                      Destructive
                    </span>
                  </div>
                </div>
              </div>

              {/* Dark */}
              <div className="rounded-2xl bg-[#1E1F24] p-5 text-[#F9F9FB] ring-1 ring-[rgba(255,255,255,0.1)]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#B9BBC6]">
                  Dark mode
                </p>
                <div className="mt-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#2A2B31] p-4">
                  <p className="text-sm font-semibold text-[#F9F9FB]">Dashboard</p>
                  <p className="mt-1 text-xs text-[#B9BBC6]">
                    Your workspace overview and recent activity.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="rounded-md bg-[#58D4DE] px-3 py-1.5 text-xs font-medium text-[#004248]">
                      Primary
                    </button>
                    <button className="rounded-md bg-[#3A3B42] px-3 py-1.5 text-xs font-medium text-[#F9F9FB]">
                      Secondary
                    </button>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="rounded-full bg-[#E48EC6] px-2 py-0.5 text-[10px] font-medium text-[#690051]">
                      Accent
                    </span>
                    <span className="rounded-full bg-[#FCA5A4] px-2 py-0.5 text-[10px] font-medium text-[#6A0B19]">
                      Destructive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Implementation guide */}
          <section className="mt-12">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Implementation
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground/70">
              How themes work and best practices for using them.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border p-5">
                <p className="text-xs font-semibold">How it works</p>
                <div className="mt-3 space-y-2 text-[11px] text-muted-foreground">
                  <p>
                    Tokens are CSS custom properties defined in{" "}
                    <code className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">globals.css</code>.
                  </p>
                  <p>
                    Light values live on <code className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">:root</code>.
                    Dark values live on <code className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">.dark</code>.
                  </p>
                  <p>
                    Toggling dark mode adds the <code className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">.dark</code> class
                    to a parent element. All semantic tokens automatically resolve to dark values.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border p-5">
                <p className="text-xs font-semibold">Best practices</p>
                <ul className="mt-3 space-y-1.5 text-[11px] text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    Always use semantic tokens (bg-background, text-foreground) — never hardcode hex values
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    Test both modes when building new components
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    Use opacity modifiers (bg-primary/10) instead of creating new tokens
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    Borders use rgba() in dark mode — avoid mixing with solid border tokens
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-border p-5">
              <p className="text-xs font-semibold">Usage example</p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-muted px-4 py-3 font-mono text-[11px] text-foreground">
{`// Toggle dark mode on the root element
document.documentElement.classList.toggle("dark")

// Components automatically adapt — no changes needed
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">
    Works in both modes
  </button>
</div>`}
              </pre>
            </div>
          </section>
        </div>
      </div>
    )
  },
}
