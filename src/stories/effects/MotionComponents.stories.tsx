import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ParallaxCardsSection } from "@/components/effects/parallax-cards"
import { AnimatedTabs } from "@/components/effects/animated-tabs"
import { AnimatedGradientBorder } from "@/components/effects/animated-gradient-border"
import { CounterAnimation } from "@/components/effects/counter-animation"
import { FloatingButton } from "@/components/effects/floating-button"
import { ImageComparison } from "@/components/effects/image-comparison"
import { Marquee } from "@/components/effects/marquee"
import { ScrollProgressBar } from "@/components/effects/scroll-progress-bar"
import { SlidingNumber } from "@/components/effects/sliding-number"
import { Countdown } from "@/components/effects/countdown"

/** Motion components that add interactivity and polish to marketing blocks. */
const meta = {
  title: "Effects/Motion Components",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="mt-3 overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
    <code>{children}</code>
  </pre>
)

const EffectCard = ({
  title,
  when,
  children,
  code,
}: {
  title: string
  when: string
  children: React.ReactNode
  code: string
}) => (
  <section className="rounded-2xl border bg-card/60 overflow-hidden">
    <div className="border-b bg-muted/30 p-6">
      {children}
    </div>
    <div className="p-6 space-y-3">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <div className="flex items-start gap-2">
        <span className="mt-0.5 shrink-0 rounded bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
          When to use
        </span>
        <p className="text-sm text-muted-foreground">{when}</p>
      </div>
      <CodeBlock>{code}</CodeBlock>
    </div>
  </section>
)

const SlidingNumberDemo = () => {
  const [val, setVal] = React.useState(42)
  return (
    <div className="flex items-center gap-4">
      <SlidingNumber value={val} className="text-4xl font-bold" />
      <button
        onClick={() => setVal((v) => v + Math.floor(Math.random() * 10 + 1))}
        className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
      >
        Increment
      </button>
    </div>
  )
}

/** All motion components with live demos, usage guidance, and code snippets. */
export const Overview: Story = {
  render: () => (
    <div className="min-h-dvh bg-background text-foreground">
      <ScrollProgressBar />
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-10">
        <header className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Effects / Motion Components
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight">
            Motion Components
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Interactive motion primitives for tabs, counters, marquees, image comparisons,
            and more. These are fully functional components, not just visual wrappers — they
            provide real UI value alongside their motion polish.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4 text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Scroll this page</strong> to see the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">ScrollProgressBar</code> in
            action at the top of the viewport.
          </div>
        </header>

        <EffectCard
          title="AnimatedTabs"
          when="Feature toggles, pricing cadence switches, navigation pills. The sliding indicator provides clear feedback."
          code={`import { AnimatedTabs } from "@/components/effects/animated-tabs"

<AnimatedTabs items={["Overview", "Features", "Pricing", "Docs"]} />

// Props:
//   items: string[]   — tab labels
//   className: string — applied to the container`}
        >
          <div className="flex items-center justify-center py-4">
            <AnimatedTabs items={["Overview", "Features", "Pricing", "Docs"]} />
          </div>
        </EffectCard>

        <EffectCard
          title="AnimatedGradientBorder"
          when="Premium card highlights, pricing tier emphasis, or any card that needs to stand out from siblings."
          code={`import { AnimatedGradientBorder } from "@/components/effects/animated-gradient-border"

<AnimatedGradientBorder>
  <h3>Pro Plan</h3>
  <p>$49/month</p>
</AnimatedGradientBorder>

// Wraps children in a card with a spinning conic-gradient border.
// Uses @property for smooth CSS-only animation.`}
        >
          <div className="flex items-center justify-center py-4">
            <AnimatedGradientBorder className="w-64">
              <p className="text-sm font-semibold">Pro Plan</p>
              <p className="mt-1 text-2xl font-bold">$49<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              <p className="mt-1 text-xs text-muted-foreground">Everything you need to ship.</p>
            </AnimatedGradientBorder>
          </div>
        </EffectCard>

        <EffectCard
          title="CounterAnimation"
          when="Stats sections, social proof numbers, and KPI displays. Triggers on scroll-into-view for maximum impact."
          code={`import { CounterAnimation } from "@/components/effects/counter-animation"

<CounterAnimation target={1250} suffix="+" className="text-4xl font-bold" />
<CounterAnimation target={99} suffix="%" duration={1500} />
<CounterAnimation target={48} prefix="$" suffix="M" />

// Props:
//   target: number     — final value to count up to
//   duration: number   — animation duration in ms (default 2000)
//   prefix/suffix: string — characters before/after the number`}
        >
          <div className="flex items-center justify-center gap-12 py-6">
            <div className="text-center">
              <CounterAnimation target={1250} suffix="+" className="text-4xl font-bold" />
              <p className="mt-1 text-xs text-muted-foreground">Users</p>
            </div>
            <div className="text-center">
              <CounterAnimation target={99} suffix="%" className="text-4xl font-bold" />
              <p className="mt-1 text-xs text-muted-foreground">Uptime</p>
            </div>
            <div className="text-center">
              <CounterAnimation target={48} prefix="$" suffix="M" className="text-4xl font-bold" />
              <p className="mt-1 text-xs text-muted-foreground">Revenue</p>
            </div>
          </div>
        </EffectCard>

        <EffectCard
          title="FloatingButton"
          when="Sticky/floating CTAs that need to draw attention without animation overload. The gentle bounce is subtle."
          code={`import { FloatingButton } from "@/components/effects/floating-button"

<FloatingButton>Get Started Free</FloatingButton>
<FloatingButton className="bg-secondary text-secondary-foreground">
  Learn More
</FloatingButton>`}
        >
          <div className="flex items-center justify-center py-8">
            <FloatingButton>Get Started Free</FloatingButton>
          </div>
        </EffectCard>

        <EffectCard
          title="ImageComparison"
          when="Before/after showcases (redesigns, product updates, transformations). Users drag the divider to reveal."
          code={`import { ImageComparison } from "@/components/effects/image-comparison"

<ImageComparison
  beforeSrc="/images/before.png"
  afterSrc="/images/after.png"
  className="w-full max-w-lg"
/>

// Drag-based slider. Works with mouse and touch.`}
        >
          <div className="flex items-center justify-center py-2">
            <ImageComparison className="w-full max-w-md" />
          </div>
        </EffectCard>

        <EffectCard
          title="Marquee"
          when="Logo clouds, partner strips, tech stack displays. Auto-scrolling content that loops infinitely."
          code={`import { Marquee } from "@/components/effects/marquee"

<Marquee speed={25} pauseOnHover>
  <span>React</span>
  <span>Next.js</span>
  <span>Tailwind</span>
</Marquee>

// Props:
//   speed: number        — seconds for one full loop (default 30)
//   pauseOnHover: bool   — pause on mouse hover (default true)
//   reverse: bool        — scroll right-to-left (default false)`}
        >
          <div className="py-4">
            <Marquee speed={25}>
              {["React", "Next.js", "Tailwind", "TypeScript", "Storybook", "Figma"].map(
                (name) => (
                  <span key={name} className="mx-4 rounded-full border px-4 py-2 text-sm font-medium">
                    {name}
                  </span>
                )
              )}
            </Marquee>
          </div>
        </EffectCard>

        <EffectCard
          title="ScrollProgressBar"
          when="Long-form content pages, blog posts, documentation. Shows readers how far they've scrolled."
          code={`import { ScrollProgressBar } from "@/components/effects/scroll-progress-bar"

// Place once at the top of your page layout:
<ScrollProgressBar />

// Renders a fixed 2px bar at the very top of the viewport.
// No configuration needed — it reads window.scrollY automatically.`}
        >
          <div className="flex items-center justify-center py-4">
            <p className="text-sm text-muted-foreground">
              ↑ Look at the top of this page — the thin bar tracks your scroll position.
            </p>
          </div>
        </EffectCard>

        <EffectCard
          title="SlidingNumber"
          when="Live pricing calculators, dynamic counters, real-time dashboards. Each digit slides in from below when it changes."
          code={`import { SlidingNumber } from "@/components/effects/sliding-number"

const [price, setPrice] = useState(42)

<SlidingNumber value={price} className="text-4xl font-bold" />`}
        >
          <div className="flex items-center justify-center py-4">
            <SlidingNumberDemo />
          </div>
        </EffectCard>

        <EffectCard
          title="Countdown"
          when="Product launches, flash sales, event timers. Displays MM:SS format counting down to zero."
          code={`import { Countdown } from "@/components/effects/countdown"

<Countdown seconds={120} className="text-4xl font-bold" />
<Countdown seconds={3600} onComplete={() => alert("Done!")} />

// Props:
//   seconds: number           — start value in seconds
//   onComplete: () => void    — callback when timer hits 00:00`}
        >
          <div className="flex items-center justify-center py-4">
            <Countdown seconds={90} className="text-4xl font-bold" />
          </div>
        </EffectCard>

        <EffectCard
          title="ParallaxCards"
          when="Feature grids, benefit sections. Cards subtly shift on hover for a sense of depth and interactivity."
          code={`import { ParallaxCardsSection } from "@/components/effects/parallax-cards"

<ParallaxCardsSection
  items={[
    { index: 1, title: "Fast", description: "Blazing fast builds." },
    { index: 2, title: "Safe", description: "Type-safe by default." },
    { index: 3, title: "Smart", description: "AI-powered workflows." },
  ]}
/>`}
        >
          <ParallaxCardsSection
            items={[
              { index: 1, title: "Fast", description: "Blazing fast builds." },
              { index: 2, title: "Safe", description: "Type-safe by default." },
              { index: 3, title: "Smart", description: "AI-powered workflows." },
            ]}
          />
        </EffectCard>
      </div>
    </div>
  ),
}
