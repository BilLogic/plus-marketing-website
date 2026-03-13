import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Styles/Motion",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const durations = [
  { cls: "duration-75", ms: "75ms", use: "Micro-interactions (opacity toggles)" },
  { cls: "duration-100", ms: "100ms", use: "Button active states" },
  { cls: "duration-150", ms: "150ms", use: "Default Tailwind — hover, focus" },
  { cls: "duration-200", ms: "200ms", use: "Tooltips, dropdown open" },
  { cls: "duration-300", ms: "300ms", use: "Card hover lifts, accordion expand" },
  { cls: "duration-500", ms: "500ms", use: "Page section reveals, modals" },
  { cls: "duration-700", ms: "700ms", use: "Hero entrance animations" },
  { cls: "duration-1000", ms: "1000ms", use: "Background color shifts" },
]

const easings = [
  { cls: "ease-linear", label: "linear", use: "Progress bars, looping animations" },
  { cls: "ease-in", label: "ease-in", use: "Elements exiting the viewport" },
  { cls: "ease-out", label: "ease-out", use: "Elements entering — our default" },
  { cls: "ease-in-out", label: "ease-in-out", use: "Toggle states, modals" },
]

const transitionProps = [
  { cls: "transition-none", props: "none", use: "Disable transitions" },
  { cls: "transition-all", props: "all properties", use: "Kitchen sink (use sparingly)" },
  { cls: "transition-colors", props: "color, background-color, border-color…", use: "Hover color changes" },
  { cls: "transition-opacity", props: "opacity", use: "Fade in/out" },
  { cls: "transition-shadow", props: "box-shadow", use: "Elevation changes on hover" },
  { cls: "transition-transform", props: "transform", use: "Scale, translate, rotate" },
]

const animations = [
  { cls: "animate-spin", label: "spin", use: "Loading spinners" },
  { cls: "animate-ping", label: "ping", use: "Notification dots" },
  { cls: "animate-pulse", label: "pulse", use: "Skeleton loaders" },
  { cls: "animate-bounce", label: "bounce", use: "Scroll indicators" },
]

/**
 * CSS transitions, timing, and keyframe animations from Tailwind.
 * For interactive Framer Motion components, see the Effects section.
 */
export const Transitions: Story = {
  render: () => {
    const [hoveredDuration, setHoveredDuration] = useState<string | null>(null)

    return (
      <div className="min-h-dvh bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Styles
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight">
              Transitions &amp; timing
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              CSS transition tokens for hover states, focus changes, and micro-interactions.
              These are Tailwind utilities — no JavaScript required. For animated React
              components (Framer Motion), see <strong>Effects</strong>.
            </p>
          </div>

          {/* Duration scale */}
          <section className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Duration scale
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground/70">
              Hover each bar to preview the timing. Our baseline is 150–300ms.
            </p>

            <div className="mt-4 space-y-2">
              {durations.map((d) => (
                <div
                  key={d.cls}
                  className="flex items-center gap-4"
                  onMouseEnter={() => setHoveredDuration(d.cls)}
                  onMouseLeave={() => setHoveredDuration(null)}
                >
                  <code className="w-28 shrink-0 text-[11px] font-medium text-foreground">
                    {d.cls}
                  </code>
                  <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-muted">
                    <div
                      className={`absolute inset-y-0 left-0 rounded-md bg-primary transition-all ease-out ${d.cls}`}
                      style={{ width: hoveredDuration === d.cls ? "100%" : "0%" }}
                    />
                  </div>
                  <span className="w-14 shrink-0 text-right text-[10px] font-medium text-muted-foreground">
                    {d.ms}
                  </span>
                  <span className="hidden text-[10px] text-muted-foreground/60 lg:block">
                    {d.use}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Easing curves */}
          <section className="mt-12">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Easing curves
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground/70">
              Hover the cards to compare easing feels. Prefer ease-out for entrances.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {easings.map((e) => (
                <div
                  key={e.cls}
                  className={`group rounded-xl border border-border p-4 transition-all duration-300 ${e.cls} hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10`}
                >
                  <div className={`mx-auto mb-3 h-1.5 w-0 rounded-full bg-primary transition-all duration-500 ${e.cls} group-hover:w-full`} />
                  <code className="text-[11px] font-semibold">{e.cls}</code>
                  <p className="mt-1 text-[10px] text-muted-foreground">{e.use}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Transition properties */}
          <section className="mt-12">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Transition properties
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground/70">
              Scope transitions to specific properties for better performance.
            </p>

            <div className="mt-4 rounded-2xl ring-1 ring-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Class</th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Properties</th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Use for</th>
                  </tr>
                </thead>
                <tbody>
                  {transitionProps.map((t) => (
                    <tr key={t.cls} className="border-b border-border/40 last:border-0">
                      <td className="px-5 py-3">
                        <code className="rounded bg-muted px-1.5 py-0.5 text-[11px] font-medium">{t.cls}</code>
                      </td>
                      <td className="px-5 py-3 text-xs text-muted-foreground">{t.props}</td>
                      <td className="px-5 py-3 text-xs text-muted-foreground">{t.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Keyframe animations */}
          <section className="mt-12">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Keyframe animations
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground/70">
              Built-in Tailwind keyframe animations. Apply directly with the class.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {animations.map((a) => (
                <div key={a.cls} className="flex flex-col items-center gap-3 rounded-xl border border-border p-5">
                  <div className={`size-8 rounded-md bg-primary ${a.cls}`} />
                  <div className="text-center">
                    <code className="text-[11px] font-semibold">{a.cls}</code>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">{a.use}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Composition recipe */}
          <section className="mt-12">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Composition recipe
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground/70">
              Combine transition + duration + ease + property for polished interactions.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="group rounded-xl border border-border p-5 transition-colors duration-200 ease-out hover:border-primary hover:bg-primary/[0.03]">
                <p className="text-xs font-semibold">Card hover</p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  transition-colors duration-200 ease-out
                </p>
              </div>
              <div className="group rounded-xl border border-border p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10">
                <p className="text-xs font-semibold">Lift on hover</p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  transition-all duration-300 ease-out hover:-translate-y-1
                </p>
              </div>
              <div className="group rounded-xl border border-border p-5 transition-all duration-300 ease-out hover:scale-[1.02] hover:ring-2 hover:ring-primary/20">
                <p className="text-xs font-semibold">Scale + ring</p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  transition-all duration-300 ease-out hover:scale-[1.02] hover:ring-2
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  },
}
