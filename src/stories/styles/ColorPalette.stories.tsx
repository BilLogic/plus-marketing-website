import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Styles/Tokens/Palette",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Plus brand palette.
 * Custom (Figma-derived) hues override Tailwind defaults in globals.css.
 * Standard Tailwind hues are preserved as-is.
 */
const plusBrandHues = [
  {
    name: "Teal",
    role: "Primary",
    steps: {
      50: "#F8FEFE", 100: "#EFFBFC", 200: "#D7F9FC", 300: "#BEF5F9",
      400: "#A5EDF3", 500: "#87E3EB", 600: "#58D4DE", 700: "#00BFCC",
      800: "#00B3C0", 900: "#007F89", 950: "#004248",
    },
  },
  {
    name: "Blue",
    role: "Info",
    steps: {
      50: "#FBFDFF", 100: "#F2FAFF", 200: "#E4F5FF", 300: "#D1EFFF",
      400: "#BBE7FF", 500: "#A1DBFE", 600: "#7FCBF8", 700: "#4DC1FF",
      800: "#40B6F3", 900: "#007EB8", 950: "#00395D",
    },
  },
  {
    name: "Green",
    role: "Success",
    steps: {
      50: "#FBFEFB", 100: "#F5FBF6", 200: "#E8F6EA", 300: "#DAF0DD",
      400: "#C8E8CD", 500: "#B2DDB9", 600: "#94CE9F", 700: "#68B97A",
      800: "#4CAB65", 900: "#297E43", 950: "#213C27",
    },
  },
  {
    name: "Yellow",
    role: "Warning",
    steps: {
      50: "#FEFDFB", 100: "#FFFAEC", 200: "#FFF1C7", 300: "#FFE8AB",
      400: "#FFDC8C", 500: "#FED084", 600: "#EBC077", 700: "#D9A852",
      800: "#FFC94B", 900: "#9D6E00", 950: "#463923",
    },
  },
  {
    name: "Red",
    role: "Destructive",
    steps: {
      50: "#FFFCFC", 100: "#FFF7F7", 200: "#FFEAEA", 300: "#FFD9D8",
      400: "#FFCAC9", 500: "#FFBAB8", 600: "#FCA5A4", 700: "#F48889",
      800: "#FF9292", 900: "#B44F52", 950: "#6A0B19",
    },
  },
  {
    name: "Fuchsia",
    role: "Accent (Magenta)",
    steps: {
      50: "#FFFCFE", 100: "#FFF7FC", 200: "#FFE8F6", 300: "#FEDAF0",
      400: "#FACCE8", 500: "#F4BCDF", 600: "#ECA8D3", 700: "#E48EC6",
      800: "#DD2AB0", 900: "#C6009C", 950: "#690051",
    },
  },
  {
    name: "Gray",
    role: "Neutral",
    steps: {
      50: "#FCFCFD", 100: "#F9F9FB", 200: "#EFF0F3", 300: "#E7E8EC",
      400: "#E0E1E6", 500: "#D8D9E0", 600: "#CDCED7", 700: "#B9BBC6",
      800: "#8B8D98", 900: "#62636C", 950: "#1E1F24",
    },
  },
] as const

const tailwindHues = [
  "slate", "zinc", "neutral", "stone",
  "orange", "amber", "lime", "emerald",
  "cyan", "sky", "indigo", "violet",
  "purple", "pink", "rose",
] as const

const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

// Safelist ensures Tailwind JIT compiles dynamically-constructed class names.
const _safelist = [
  "bg-slate-50","bg-slate-100","bg-slate-200","bg-slate-300","bg-slate-400","bg-slate-500","bg-slate-600","bg-slate-700","bg-slate-800","bg-slate-900","bg-slate-950",
  "bg-zinc-50","bg-zinc-100","bg-zinc-200","bg-zinc-300","bg-zinc-400","bg-zinc-500","bg-zinc-600","bg-zinc-700","bg-zinc-800","bg-zinc-900","bg-zinc-950",
  "bg-neutral-50","bg-neutral-100","bg-neutral-200","bg-neutral-300","bg-neutral-400","bg-neutral-500","bg-neutral-600","bg-neutral-700","bg-neutral-800","bg-neutral-900","bg-neutral-950",
  "bg-stone-50","bg-stone-100","bg-stone-200","bg-stone-300","bg-stone-400","bg-stone-500","bg-stone-600","bg-stone-700","bg-stone-800","bg-stone-900","bg-stone-950",
  "bg-orange-50","bg-orange-100","bg-orange-200","bg-orange-300","bg-orange-400","bg-orange-500","bg-orange-600","bg-orange-700","bg-orange-800","bg-orange-900","bg-orange-950",
  "bg-amber-50","bg-amber-100","bg-amber-200","bg-amber-300","bg-amber-400","bg-amber-500","bg-amber-600","bg-amber-700","bg-amber-800","bg-amber-900","bg-amber-950",
  "bg-lime-50","bg-lime-100","bg-lime-200","bg-lime-300","bg-lime-400","bg-lime-500","bg-lime-600","bg-lime-700","bg-lime-800","bg-lime-900","bg-lime-950",
  "bg-emerald-50","bg-emerald-100","bg-emerald-200","bg-emerald-300","bg-emerald-400","bg-emerald-500","bg-emerald-600","bg-emerald-700","bg-emerald-800","bg-emerald-900","bg-emerald-950",
  "bg-cyan-50","bg-cyan-100","bg-cyan-200","bg-cyan-300","bg-cyan-400","bg-cyan-500","bg-cyan-600","bg-cyan-700","bg-cyan-800","bg-cyan-900","bg-cyan-950",
  "bg-sky-50","bg-sky-100","bg-sky-200","bg-sky-300","bg-sky-400","bg-sky-500","bg-sky-600","bg-sky-700","bg-sky-800","bg-sky-900","bg-sky-950",
  "bg-indigo-50","bg-indigo-100","bg-indigo-200","bg-indigo-300","bg-indigo-400","bg-indigo-500","bg-indigo-600","bg-indigo-700","bg-indigo-800","bg-indigo-900","bg-indigo-950",
  "bg-violet-50","bg-violet-100","bg-violet-200","bg-violet-300","bg-violet-400","bg-violet-500","bg-violet-600","bg-violet-700","bg-violet-800","bg-violet-900","bg-violet-950",
  "bg-purple-50","bg-purple-100","bg-purple-200","bg-purple-300","bg-purple-400","bg-purple-500","bg-purple-600","bg-purple-700","bg-purple-800","bg-purple-900","bg-purple-950",
  "bg-pink-50","bg-pink-100","bg-pink-200","bg-pink-300","bg-pink-400","bg-pink-500","bg-pink-600","bg-pink-700","bg-pink-800","bg-pink-900","bg-pink-950",
  "bg-rose-50","bg-rose-100","bg-rose-200","bg-rose-300","bg-rose-400","bg-rose-500","bg-rose-600","bg-rose-700","bg-rose-800","bg-rose-900","bg-rose-950",
] as const

/**
 * Reusable light/dark toggle button pair.
 */
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

/** Full Plus color palette with light/dark preview. */
export const Palette: Story = {
  render: () => {
    const [showHex, setShowHex] = useState(true)
    const [mode, setMode] = useState<"light" | "dark">("light")
    const isDark = mode === "dark"

    return (
      <div className="min-h-dvh bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:px-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Styles / Color
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight">
              Color palette
            </h1>
            <p className="text-sm text-muted-foreground">
              Plus brand hues derived from Figma tokens replace Tailwind defaults for
              teal, blue, green, yellow, red, fuchsia, and gray. All other Tailwind hues
              are available as-is.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <ModeToggle mode={mode} setMode={setMode} />
            <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={showHex}
                onChange={() => setShowHex(!showHex)}
                className="accent-primary"
              />
              Show hex values
            </label>
          </div>

          <div className={isDark ? "dark" : ""}>
            <div className="mt-4 rounded-2xl bg-background p-5 text-foreground ring-1 ring-border transition-colors">
              {/* Plus brand hues */}
              <div className="space-y-1">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Plus brand hues (Figma)
                </h2>
                <p className="text-[11px] text-muted-foreground/70">
                  Custom overrides in globals.css — these replace Tailwind defaults.
                </p>
              </div>

              <div className="mt-4 space-y-2">
                {plusBrandHues.map((hue) => (
                  <div key={hue.name} className="flex items-start gap-3">
                    <div className="w-20 shrink-0 pt-2">
                      <p className="text-xs font-semibold text-foreground">{hue.name}</p>
                      <p className="text-[10px] text-muted-foreground">{hue.role}</p>
                    </div>
                    <div className="flex flex-1 gap-0.5">
                      {steps.map((step) => {
                        const hex = hue.steps[step]
                        return (
                          <div key={step} className="group relative flex-1">
                            <div
                              className="h-10 w-full rounded-md ring-1 ring-black/5 transition-transform hover:scale-110 hover:shadow-lg"
                              style={{ backgroundColor: hex }}
                              title={`${hue.name.toLowerCase()}-${step}: ${hex}`}
                            />
                            {showHex && (
                              <div className="mt-1 text-center">
                                <p className="text-[9px] font-medium text-muted-foreground">
                                  {step}
                                </p>
                                <p className="text-[8px] text-muted-foreground/60">
                                  {hex}
                                </p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Standard Tailwind hues */}
              <div className="mt-10 space-y-1">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Standard Tailwind hues
                </h2>
                <p className="text-[11px] text-muted-foreground/70">
                  Unmodified defaults for extended palette needs.
                </p>
              </div>

              <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-card/60 p-4">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr>
                      <th className="pb-3 pr-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Hue
                      </th>
                      {steps.map((s) => (
                        <th
                          key={s}
                          className="pb-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                        >
                          {s}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tailwindHues.map((hue) => (
                      <tr key={hue}>
                        <td className="py-1 pr-3 text-xs font-medium capitalize text-muted-foreground">
                          {hue}
                        </td>
                        {steps.map((step) => (
                          <td key={step} className="py-1">
                            <div
                              className={`mx-auto size-6 rounded-md ring-1 ring-black/5 bg-${hue}-${step}`}
                              title={`${hue}-${step}`}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
