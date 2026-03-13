import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Styles/Tokens",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* ------------------------------------------------------------------ */
/*  Safelist                                                           */
/* ------------------------------------------------------------------ */

const _s = [
  "bg-primary","bg-primary-foreground","bg-accent","bg-accent-foreground",
  "bg-background","bg-foreground","bg-card","bg-card-foreground",
  "bg-popover","bg-popover-foreground","bg-muted","bg-muted-foreground",
  "bg-secondary","bg-secondary-foreground","bg-destructive","bg-destructive-foreground",
  "bg-border","bg-input","bg-ring",
  "bg-sidebar","bg-sidebar-foreground","bg-sidebar-primary","bg-sidebar-primary-foreground",
  "bg-sidebar-accent","bg-sidebar-accent-foreground","bg-sidebar-border","bg-sidebar-ring",
  "bg-chart-1","bg-chart-2","bg-chart-3","bg-chart-4","bg-chart-5",
  "text-primary","text-primary-foreground","text-accent","text-accent-foreground",
  "text-background","text-foreground","text-card","text-card-foreground",
  "text-popover","text-popover-foreground","text-muted","text-muted-foreground",
  "text-secondary","text-secondary-foreground","text-destructive","text-destructive-foreground",
  "text-border","text-input","text-ring",
  "text-sidebar","text-sidebar-foreground","text-sidebar-primary","text-sidebar-primary-foreground",
  "text-sidebar-accent","text-sidebar-accent-foreground","text-sidebar-border","text-sidebar-ring",
  "text-chart-1","text-chart-2","text-chart-3","text-chart-4","text-chart-5",
  "decoration-primary","decoration-primary-foreground","decoration-accent","decoration-accent-foreground",
  "decoration-background","decoration-foreground","decoration-card","decoration-card-foreground",
  "decoration-muted","decoration-muted-foreground","decoration-secondary","decoration-secondary-foreground",
  "decoration-destructive","decoration-destructive-foreground","decoration-border","decoration-input","decoration-ring",
  "decoration-sidebar","decoration-sidebar-foreground","decoration-sidebar-primary","decoration-sidebar-accent",
  "decoration-chart-1","decoration-chart-2","decoration-chart-3","decoration-chart-4","decoration-chart-5",
  "border-primary","border-primary-foreground","border-accent","border-accent-foreground",
  "border-background","border-foreground","border-card","border-card-foreground",
  "border-muted","border-muted-foreground","border-secondary","border-secondary-foreground",
  "border-destructive","border-destructive-foreground","border-border","border-input","border-ring",
  "border-sidebar","border-sidebar-foreground","border-sidebar-primary","border-sidebar-accent",
  "border-chart-1","border-chart-2","border-chart-3","border-chart-4","border-chart-5",
  "outline-primary","outline-primary-foreground","outline-accent","outline-accent-foreground",
  "outline-background","outline-foreground","outline-muted","outline-muted-foreground",
  "outline-secondary","outline-destructive","outline-border","outline-ring",
  "outline-sidebar","outline-sidebar-primary","outline-sidebar-accent",
  "outline-chart-1","outline-chart-2","outline-chart-3","outline-chart-4","outline-chart-5",
  "ring-primary","ring-primary-foreground","ring-accent","ring-accent-foreground",
  "ring-background","ring-foreground","ring-muted","ring-muted-foreground",
  "ring-secondary","ring-destructive","ring-border","ring-input","ring-ring",
  "ring-sidebar","ring-sidebar-primary","ring-sidebar-accent",
  "ring-chart-1","ring-chart-2","ring-chart-3","ring-chart-4","ring-chart-5",
  "fill-primary","fill-primary-foreground","fill-accent","fill-accent-foreground",
  "fill-background","fill-foreground","fill-muted","fill-muted-foreground",
  "fill-secondary","fill-destructive","fill-border","fill-ring",
  "fill-sidebar","fill-sidebar-primary","fill-sidebar-accent",
  "fill-chart-1","fill-chart-2","fill-chart-3","fill-chart-4","fill-chart-5",
  "stroke-primary","stroke-primary-foreground","stroke-accent","stroke-accent-foreground",
  "stroke-background","stroke-foreground","stroke-muted","stroke-muted-foreground",
  "stroke-secondary","stroke-destructive","stroke-border","stroke-ring",
  "stroke-sidebar","stroke-sidebar-primary","stroke-sidebar-accent",
  "stroke-chart-1","stroke-chart-2","stroke-chart-3","stroke-chart-4","stroke-chart-5",
  "shadow-primary/25","shadow-accent/25","shadow-destructive/25","shadow-muted/25",
  "shadow-secondary/25","shadow-border/25","shadow-ring/25",
  "shadow-chart-1/25","shadow-chart-2/25","shadow-chart-3/25","shadow-chart-4/25","shadow-chart-5/25",
  "shadow-background/25","shadow-foreground/25","shadow-card/25","shadow-popover/25",
  "shadow-sidebar/25","shadow-sidebar-primary/25","shadow-input/25",
  "shadow-primary-foreground/25","shadow-accent-foreground/25","shadow-destructive-foreground/25",
  "shadow-muted-foreground/25","shadow-secondary-foreground/25","shadow-card-foreground/25",
  "shadow-popover-foreground/25","shadow-sidebar-foreground/25","shadow-sidebar-accent/25",
  "shadow-sidebar-accent-foreground/25","shadow-sidebar-primary-foreground/25",
  "shadow-sidebar-border/25","shadow-sidebar-ring/25",
  "accent-primary","accent-accent","accent-destructive","accent-muted",
  "accent-secondary","accent-border","accent-ring","accent-chart-1",
  "caret-primary","caret-accent","caret-destructive","caret-muted",
  "caret-secondary","caret-border","caret-ring","caret-chart-1",
] as const

/* ------------------------------------------------------------------ */
/*  Token groups                                                       */
/* ------------------------------------------------------------------ */

type TokenGroup = {
  id: string
  label: string
  description: string
  tokens: string[]
}

const tokenGroups: TokenGroup[] = [
  {
    id: "primary",
    label: "Primary (Teal)",
    description: "Main brand color for CTAs, links, and focus rings.",
    tokens: ["primary", "primary-foreground"],
  },
  {
    id: "accent",
    label: "Accent (Magenta)",
    description: "Secondary brand highlight for badges, tags, and emphasis.",
    tokens: ["accent", "accent-foreground"],
  },
  {
    id: "background",
    label: "Background / Foreground",
    description: "Page-level surfaces and primary text color.",
    tokens: ["background", "foreground"],
  },
  {
    id: "card",
    label: "Card",
    description: "Elevated content containers.",
    tokens: ["card", "card-foreground"],
  },
  {
    id: "popover",
    label: "Popover",
    description: "Floating overlays — dropdowns, tooltips, command menus.",
    tokens: ["popover", "popover-foreground"],
  },
  {
    id: "muted",
    label: "Muted",
    description: "Subdued surfaces and secondary text.",
    tokens: ["muted", "muted-foreground"],
  },
  {
    id: "secondary",
    label: "Secondary",
    description: "Low-emphasis buttons and alternating content blocks.",
    tokens: ["secondary", "secondary-foreground"],
  },
  {
    id: "destructive",
    label: "Destructive (Red)",
    description: "Irreversible or dangerous actions.",
    tokens: ["destructive", "destructive-foreground"],
  },
  {
    id: "border",
    label: "Border / Input / Ring",
    description: "Structural dividers, form borders, and focus outlines.",
    tokens: ["border", "input", "ring"],
  },
  {
    id: "sidebar",
    label: "Sidebar",
    description: "Navigation panel surfaces, highlights, and actions.",
    tokens: [
      "sidebar", "sidebar-foreground",
      "sidebar-primary", "sidebar-primary-foreground",
      "sidebar-accent", "sidebar-accent-foreground",
      "sidebar-border", "sidebar-ring",
    ],
  },
  {
    id: "charts",
    label: "Charts",
    description: "Data visualization: blue, green, yellow, red, magenta.",
    tokens: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
  },
]

/* ------------------------------------------------------------------ */
/*  Compact utility renderers (for the per-token strip)                */
/* ------------------------------------------------------------------ */

type CompactUtility = {
  label: string
  render: (token: string) => React.ReactNode
  cls: (token: string) => string
}

const compactUtilities: CompactUtility[] = [
  {
    label: "bg",
    render: (t) => <div className={`size-8 rounded ring-1 ring-black/10 bg-${t}`} />,
    cls: (t) => `bg-${t}`,
  },
  {
    label: "text",
    render: (t) => (
      <div className="flex size-8 items-center justify-center rounded bg-muted/50">
        <span className={`text-xs font-bold text-${t}`}>Aa</span>
      </div>
    ),
    cls: (t) => `text-${t}`,
  },
  {
    label: "decoration",
    render: (t) => (
      <div className="flex size-8 items-center justify-center rounded bg-muted/50">
        <span className={`text-[10px] text-foreground underline decoration-2 decoration-${t}`}>Ab</span>
      </div>
    ),
    cls: (t) => `decoration-${t}`,
  },
  {
    label: "border",
    render: (t) => <div className={`size-8 rounded border-2 bg-transparent border-${t}`} />,
    cls: (t) => `border-${t}`,
  },
  {
    label: "outline",
    render: (t) => <div className={`size-6 rounded outline-2 outline-offset-2 outline-${t}`} />,
    cls: (t) => `outline-${t}`,
  },
  {
    label: "shadow",
    render: (t) => <div className={`size-8 rounded bg-background shadow-lg shadow-${t}/25`} />,
    cls: (t) => `shadow-${t}/25`,
  },
  {
    label: "ring",
    render: (t) => <div className={`size-8 rounded ring-2 ring-${t}`} />,
    cls: (t) => `ring-${t}`,
  },
  {
    label: "accent",
    render: (t) => (
      <div className="flex size-8 items-center justify-center">
        <input type="checkbox" defaultChecked className={`accent-${t}`} />
      </div>
    ),
    cls: (t) => `accent-${t}`,
  },
  {
    label: "caret",
    render: (t) => (
      <div className="flex size-8 items-center justify-center">
        <div className={`h-5 w-0.5 rounded-full bg-${t}`} title="caret indicator" />
      </div>
    ),
    cls: (t) => `caret-${t}`,
  },
  {
    label: "fill",
    render: (t) => (
      <svg viewBox="0 0 24 24" className={`size-7 fill-${t}`}>
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    cls: (t) => `fill-${t}`,
  },
  {
    label: "stroke",
    render: (t) => (
      <svg viewBox="0 0 24 24" className={`size-7 fill-none stroke-2 stroke-${t}`}>
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    cls: (t) => `stroke-${t}`,
  },
]

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

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-muted px-1.5 py-0.5 text-[11px] font-medium text-foreground">
    {children}
  </code>
)

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

/** Plus semantic token system — every token × every utility. */
export const Semantics: Story = {
  render: () => {
    const [mode, setMode] = useState<"light" | "dark">("light")
    const isDark = mode === "dark"

    return (
      <div className="min-h-dvh bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-6 py-10">
          {/* Header */}
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Styles / Color
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight">
              Semantic tokens
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Every semantic token paired with every Tailwind color utility.
              Tokens are defined in <Code>globals.css</Code> and adapt
              between light and dark modes.
            </p>
          </div>

          <div className="mt-6">
            <ModeToggle mode={mode} setMode={setMode} />
          </div>

          {/* Utility legend */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
            <span className="font-semibold uppercase tracking-wider">Columns:</span>
            {compactUtilities.map((u) => (
              <span key={u.label}>{u.label}-*</span>
            ))}
          </div>

          {/* Token groups */}
          <div className={isDark ? "dark" : ""}>
            <div className="mt-4 rounded-2xl bg-background text-foreground ring-1 ring-border transition-colors">
              {tokenGroups.map((group, gi) => (
                <div
                  key={group.id}
                  className={`px-6 py-5 ${gi < tokenGroups.length - 1 ? "border-b border-border/50" : ""}`}
                >
                  {/* Group header */}
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-sm font-semibold tracking-tight">
                      {group.label}
                    </h3>
                    <span className="text-[11px] text-muted-foreground">
                      {group.description}
                    </span>
                  </div>

                  {/* Token × utility grid */}
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="w-44 pb-1.5 pr-3 text-left text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                            Token
                          </th>
                          {compactUtilities.map((u) => (
                            <th
                              key={u.label}
                              className="pb-1.5 text-center text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/60"
                            >
                              {u.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {group.tokens.map((token) => (
                          <tr key={token}>
                            <td className="py-1.5 pr-3 align-middle">
                              <code className="whitespace-nowrap text-[10px] font-medium text-foreground">
                                {token}
                              </code>
                              <span className="ml-1.5 text-[9px] text-muted-foreground/50">
                                --{token}
                              </span>
                            </td>
                            {compactUtilities.map((u) => (
                              <td
                                key={u.label}
                                className="py-1.5 align-middle"
                                title={u.cls(token)}
                              >
                                <div className="flex justify-center">
                                  {u.render(token)}
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
}
