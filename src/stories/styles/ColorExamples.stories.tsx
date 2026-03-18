import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Styles/Color/Examples",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* ------------------------------------------------------------------ */
/*  Shared UI                                                          */
/* ------------------------------------------------------------------ */

const ModeToggle = ({
  mode,
  setMode,
}: {
  mode: "light" | "dark"
  setMode: (m: "light" | "dark") => void
}) => (
  <div className="flex gap-1 rounded-lg bg-muted p-0.5">
    {(["light", "dark"] as const).map((m) => (
      <button
        key={m}
        onClick={() => setMode(m)}
        className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
          mode === m
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {m}
      </button>
    ))}
  </div>
)

const ThemeShell = ({
  isDark,
  children,
}: {
  isDark: boolean
  children: React.ReactNode
}) => (
  <div className={isDark ? "dark" : ""}>
    <div className="rounded-2xl bg-background p-6 text-foreground ring-1 ring-border transition-colors">
      {children}
    </div>
  </div>
)

const Annotation = ({ tokens, note }: { tokens: string[]; note: string }) => (
  <div className="mt-3 flex flex-wrap items-start gap-x-3 gap-y-1 border-t border-dashed border-border/60 pt-3">
    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
      Tokens used
    </span>
    {tokens.map((t) => (
      <code
        key={t}
        className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-foreground"
      >
        {t}
      </code>
    ))}
    <span className="basis-full text-[10px] italic text-muted-foreground/60">{note}</span>
  </div>
)

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

/** Real-world UI compositions demonstrating semantic color usage. */
export const Examples: Story = {
  render: () => {
    const [mode, setMode] = useState<"light" | "dark">("light")
    const isDark = mode === "dark"

    return (
      <div className="min-h-dvh bg-background text-foreground">
        <div className="mx-auto max-w-5xl space-y-10 px-6 py-10">
          <header className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Styles / Color
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight">
              Usage examples
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Real UI compositions showing how semantic tokens combine to create
              consistent interfaces. Each example annotates which tokens are used
              and why, making this a reference for both designers and engineers.
            </p>
          </header>

          <ModeToggle mode={mode} setMode={setMode} />

          {/* 1. Hero CTA strip */}
          <section>
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Hero call-to-action
            </h2>
            <p className="mb-4 text-[11px] text-muted-foreground/70">
              Primary button draws focus; ghost button provides an alternative path.
            </p>
            <ThemeShell isDark={isDark}>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold tracking-tight">
                  Ship faster with Plus
                </h3>
                <p className="max-w-md text-sm text-muted-foreground">
                  The modern marketing platform for teams that move quickly.
                  Start free, scale when ready.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20">
                    Start free trial
                  </button>
                  <button className="rounded-lg border border-primary/30 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/5">
                    View pricing
                  </button>
                  <button className="px-3 py-2.5 text-sm text-muted-foreground underline decoration-muted-foreground/30 hover:text-foreground">
                    Watch demo
                  </button>
                </div>
              </div>
              <Annotation
                tokens={["bg-primary", "text-primary-foreground", "shadow-primary/20", "text-primary", "text-muted-foreground"]}
                note="Primary solid for main CTA, outline variant for secondary, muted for tertiary."
              />
            </ThemeShell>
          </section>

          {/* 2. Pricing cards */}
          <section>
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Pricing cards
            </h2>
            <p className="mb-4 text-[11px] text-muted-foreground/70">
              Card surfaces with accent badge to highlight the recommended tier.
            </p>
            <ThemeShell isDark={isDark}>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { tier: "Starter", price: "$0", badge: null },
                  { tier: "Pro", price: "$29", badge: "Most popular" },
                  { tier: "Enterprise", price: "Custom", badge: null },
                ].map((plan) => (
                  <div
                    key={plan.tier}
                    className={`relative rounded-xl border p-5 ${
                      plan.badge
                        ? "border-primary bg-primary/[0.03] ring-1 ring-primary/20"
                        : "border-border bg-card"
                    }`}
                  >
                    {plan.badge && (
                      <span className="absolute -top-2.5 left-4 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold text-accent-foreground">
                        {plan.badge}
                      </span>
                    )}
                    <p className="text-sm font-semibold text-card-foreground">{plan.tier}</p>
                    <p className="mt-1 text-2xl font-bold tracking-tight">{plan.price}</p>
                    <p className="mt-1 text-xs text-muted-foreground">per month</p>
                    <button
                      className={`mt-4 w-full rounded-lg py-2 text-xs font-medium ${
                        plan.badge
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      Get started
                    </button>
                  </div>
                ))}
              </div>
              <Annotation
                tokens={["bg-card", "border-border", "bg-primary/[0.03]", "ring-primary/20", "bg-accent", "text-accent-foreground", "bg-secondary"]}
                note="Featured tier gets a tinted primary surface + accent badge. Non-featured uses card + secondary button."
              />
            </ThemeShell>
          </section>

          {/* 3. Form with validation states */}
          <section>
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Form with validation
            </h2>
            <p className="mb-4 text-[11px] text-muted-foreground/70">
              Input fields showing normal, focus, and error states.
            </p>
            <ThemeShell isDark={isDark}>
              <div className="max-w-sm space-y-4">
                <div>
                  <label className="text-xs font-medium text-foreground">Email</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="mt-1.5 block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground caret-primary placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    We&apos;ll never share your email.
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Password</label>
                  <input
                    type="password"
                    defaultValue="tooshort"
                    className="mt-1.5 block w-full rounded-lg border-2 border-destructive bg-background px-3 py-2 text-sm text-foreground caret-destructive focus:outline-none focus:ring-2 focus:ring-destructive/30"
                  />
                  <p className="mt-1 text-[11px] text-destructive">
                    Password must be at least 8 characters.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="accent-primary" id="terms-ex" />
                  <label htmlFor="terms-ex" className="text-xs text-muted-foreground">
                    I agree to the terms of service
                  </label>
                </div>
                <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground">
                  Create account
                </button>
              </div>
              <Annotation
                tokens={["border-input", "caret-primary", "ring-ring/30", "border-destructive", "text-destructive", "accent-primary"]}
                note="Default inputs use border/input. Error state switches to destructive. Caret and checkbox accent match primary."
              />
            </ThemeShell>
          </section>

          {/* 4. Notification banner */}
          <section>
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Notification banners
            </h2>
            <p className="mb-4 text-[11px] text-muted-foreground/70">
              Feedback messages using tinted backgrounds from each semantic role.
            </p>
            <ThemeShell isDark={isDark}>
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-lg bg-primary/10 px-4 py-3">
                  <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 fill-primary">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-primary">Update available</p>
                    <p className="text-[11px] text-muted-foreground">A new version is ready to install.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-destructive/10 px-4 py-3">
                  <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 fill-destructive">
                    <path d="M12 2L2 20h20L12 2z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-destructive">Payment failed</p>
                    <p className="text-[11px] text-muted-foreground">Please update your billing information.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-accent/10 px-4 py-3">
                  <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 fill-accent">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-accent">New feature</p>
                    <p className="text-[11px] text-muted-foreground">Try the redesigned analytics dashboard.</p>
                  </div>
                </div>
              </div>
              <Annotation
                tokens={["bg-primary/10", "fill-primary", "text-primary", "bg-destructive/10", "fill-destructive", "bg-accent/10", "fill-accent"]}
                note="Each role gets a 10% tinted background + matching fill for the icon + semantic text color for the title."
              />
            </ThemeShell>
          </section>

          {/* 5. Dashboard metrics with charts */}
          <section>
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Dashboard metrics
            </h2>
            <p className="mb-4 text-[11px] text-muted-foreground/70">
              Chart tokens provide distinct, accessible data colors for metrics.
            </p>
            <ThemeShell isDark={isDark}>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Mini bar chart */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-semibold text-card-foreground">Weekly revenue</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">Last 7 days</p>
                  <div className="mt-4 flex items-end gap-1.5">
                    {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-chart-1"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>
                </div>
                {/* Donut legend */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-semibold text-card-foreground">Traffic sources</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">This month</p>
                  <div className="mt-4 flex items-center gap-4">
                    <svg viewBox="0 0 36 36" className="size-20">
                      <circle cx="18" cy="18" r="14" fill="none" strokeWidth="5"
                        className="stroke-chart-1" strokeDasharray="30 70" strokeDashoffset="0" />
                      <circle cx="18" cy="18" r="14" fill="none" strokeWidth="5"
                        className="stroke-chart-2" strokeDasharray="25 75" strokeDashoffset="-30" />
                      <circle cx="18" cy="18" r="14" fill="none" strokeWidth="5"
                        className="stroke-chart-3" strokeDasharray="20 80" strokeDashoffset="-55" />
                      <circle cx="18" cy="18" r="14" fill="none" strokeWidth="5"
                        className="stroke-chart-4" strokeDasharray="15 85" strokeDashoffset="-75" />
                      <circle cx="18" cy="18" r="14" fill="none" strokeWidth="5"
                        className="stroke-chart-5" strokeDasharray="10 90" strokeDashoffset="-90" />
                    </svg>
                    <div className="space-y-1.5">
                      {[
                        { color: "bg-chart-1", label: "Organic", pct: "30%" },
                        { color: "bg-chart-2", label: "Paid", pct: "25%" },
                        { color: "bg-chart-3", label: "Social", pct: "20%" },
                        { color: "bg-chart-4", label: "Email", pct: "15%" },
                        { color: "bg-chart-5", label: "Referral", pct: "10%" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2">
                          <div className={`size-2 rounded-full ${item.color}`} />
                          <span className="text-[10px] text-muted-foreground">
                            {item.label} — {item.pct}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Annotation
                tokens={["bg-chart-1…5", "stroke-chart-1…5", "bg-card", "border-border"]}
                note="Charts use 5 sequential data colors. Card surface elevates the widget from the page."
              />
            </ThemeShell>
          </section>

          {/* 6. Sidebar navigation */}
          <section>
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              App shell with sidebar
            </h2>
            <p className="mb-4 text-[11px] text-muted-foreground/70">
              Dedicated sidebar tokens keep navigation visually distinct from content.
            </p>
            <ThemeShell isDark={isDark}>
              <div className="flex overflow-hidden rounded-xl border border-border">
                {/* Sidebar */}
                <div className="w-48 shrink-0 border-r border-sidebar-border bg-sidebar p-3">
                  <p className="text-[11px] font-bold text-sidebar-foreground tracking-wide">
                    WORKSPACE
                  </p>
                  <nav className="mt-3 space-y-0.5">
                    <div className="rounded-md bg-sidebar-accent px-3 py-1.5 text-[11px] font-medium text-sidebar-accent-foreground">
                      Dashboard
                    </div>
                    <div className="rounded-md px-3 py-1.5 text-[11px] text-sidebar-foreground/70 hover:bg-sidebar-accent/50">
                      Analytics
                    </div>
                    <div className="rounded-md px-3 py-1.5 text-[11px] text-sidebar-foreground/70 hover:bg-sidebar-accent/50">
                      Campaigns
                    </div>
                    <div className="rounded-md px-3 py-1.5 text-[11px] text-sidebar-foreground/70 hover:bg-sidebar-accent/50">
                      Settings
                    </div>
                  </nav>
                  <div className="mt-6 rounded-lg bg-sidebar-primary px-3 py-2 text-center text-[10px] font-semibold text-sidebar-primary-foreground">
                    Upgrade to Pro
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 bg-background p-5">
                  <p className="text-sm font-semibold">Dashboard</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Overview of your workspace metrics.
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      { label: "Views", value: "12.4k" },
                      { label: "Signups", value: "843" },
                      { label: "Revenue", value: "$9.2k" },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-lg bg-muted p-3">
                        <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                        <p className="mt-0.5 text-lg font-bold tracking-tight">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Annotation
                tokens={["bg-sidebar", "bg-sidebar-accent", "bg-sidebar-primary", "text-sidebar-foreground", "border-sidebar-border", "bg-muted"]}
                note="Sidebar tokens create a visually separate navigation panel. Content area uses standard bg/muted tokens."
              />
            </ThemeShell>
          </section>

          {/* 7. Button spectrum */}
          <section>
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Button variants
            </h2>
            <p className="mb-4 text-[11px] text-muted-foreground/70">
              Full spectrum of button styles from high to low emphasis.
            </p>
            <ThemeShell isDark={isDark}>
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <button className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-md shadow-primary/20">
                    Primary
                  </button>
                  <button className="rounded-lg bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground">
                    Secondary
                  </button>
                  <button className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-foreground">
                    Outline
                  </button>
                  <button className="rounded-lg px-4 py-2 text-xs font-medium text-primary hover:bg-primary/5">
                    Ghost
                  </button>
                  <button className="rounded-lg bg-destructive px-4 py-2 text-xs font-medium text-destructive-foreground">
                    Destructive
                  </button>
                  <button className="rounded-lg bg-accent px-4 py-2 text-xs font-medium text-accent-foreground">
                    Accent
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                    Info badge
                  </span>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent">
                    Promo badge
                  </span>
                  <span className="rounded-full bg-destructive/10 px-3 py-1 text-[11px] font-medium text-destructive">
                    Error badge
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground">
                    Neutral badge
                  </span>
                </div>
              </div>
              <Annotation
                tokens={["bg-primary", "bg-secondary", "border-border", "bg-destructive", "bg-accent", "bg-*/10"]}
                note="Hierarchy: primary (solid) > secondary > outline > ghost. Tinted backgrounds (10% opacity) for soft badges."
              />
            </ThemeShell>
          </section>

          {/* 8. Colored shadows and rings */}
          <section>
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Shadows, rings &amp; outlines
            </h2>
            <p className="mb-4 text-[11px] text-muted-foreground/70">
              Tinted shadows and focus rings add depth while reinforcing brand color.
            </p>
            <ThemeShell isDark={isDark}>
              <div className="flex flex-wrap items-start gap-5">
                <div className="rounded-xl bg-card p-4 shadow-lg shadow-primary/25">
                  <p className="text-xs font-semibold">Tinted shadow</p>
                  <p className="text-[10px] text-muted-foreground">shadow-primary/25</p>
                </div>
                <div className="rounded-xl bg-card p-4 ring-2 ring-primary">
                  <p className="text-xs font-semibold">Focus ring</p>
                  <p className="text-[10px] text-muted-foreground">ring-primary</p>
                </div>
                <div className="rounded-xl bg-card p-4 outline-2 outline-offset-2 outline-accent">
                  <p className="text-xs font-semibold">Outline</p>
                  <p className="text-[10px] text-muted-foreground">outline-accent</p>
                </div>
                <div className="rounded-xl bg-card p-4 ring-2 ring-destructive">
                  <p className="text-xs font-semibold">Error ring</p>
                  <p className="text-[10px] text-muted-foreground">ring-destructive</p>
                </div>
              </div>
              <Annotation
                tokens={["shadow-primary/25", "ring-primary", "outline-accent", "ring-destructive"]}
                note="Use opacity modifiers (/25, /30) for subtle branded shadows. Solid rings for focus and error states."
              />
            </ThemeShell>
          </section>
        </div>
      </div>
    )
  },
}
