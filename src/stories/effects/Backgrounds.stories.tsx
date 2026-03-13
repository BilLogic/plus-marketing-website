import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { MeteorBackground } from "@/components/effects/meteor-background"
import { Snowfall } from "@/components/effects/snowfall"
import { Fireworks } from "@/components/effects/fireworks"
import { FloatingPaths } from "@/components/effects/floating-paths"
import { FluidParticles } from "@/components/effects/fluid-particles"
import { StarsBackground } from "@/components/effects/stars-background"
import { Button } from "@/components/ui/button"

/** Animated background layers for atmospheric marketing sections. */
const meta = {
  title: "Effects/Backgrounds",
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

const BgCard = ({
  title,
  when,
  dark = false,
  children,
  code,
}: {
  title: string
  when: string
  dark?: boolean
  children: React.ReactNode
  code: string
}) => (
  <section className="rounded-2xl border bg-card/60 overflow-hidden">
    <div
      className={`relative overflow-hidden border-b p-8 ${
        dark ? "bg-zinc-950 text-white" : "bg-card/80 text-foreground"
      }`}
      style={{ minHeight: 200 }}
    >
      {children}
      <div className="relative z-10 space-y-2">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="max-w-md text-sm opacity-70">
          Move your cursor over this area to see the effect in context.
        </p>
        <div className="flex gap-2 pt-2">
          <Button size="sm">Primary CTA</Button>
          <Button size="sm" variant="outline">Learn more</Button>
        </div>
      </div>
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

/** All background effects with contextual demos, guidance, and code snippets. */
export const Overview: Story = {
  render: () => (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-10">
        <header className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Effects / Backgrounds
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight">
            Backgrounds
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Animated background layers that create atmosphere behind hero sections,
            feature blocks, and high-impact surfaces. They render as absolutely
            positioned elements inside a relative container.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4 text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Setup pattern (all backgrounds):</strong>
            <CodeBlock>{`<div className="relative overflow-hidden rounded-2xl">
  {/* Background layer — absolutely positioned, behind content */}
  <MeteorBackground density={14} />

  {/* Content layer — must be relative + z-10 to sit above */}
  <div className="relative z-10">
    <h1>Your hero content</h1>
  </div>
</div>

// Key rules:
// 1. Parent must be \`relative\` + \`overflow-hidden\`
// 2. Content must have \`relative z-10\` to stay above
// 3. Most backgrounds look best on dark surfaces`}</CodeBlock>
          </div>
        </header>

        <BgCard
          title="MeteorBackground"
          when="Dark hero sections, SaaS landing pages, product launch announcements. Creates a cinematic, high-energy feel."
          dark
          code={`import { MeteorBackground } from "@/components/effects/meteor-background"

<MeteorBackground density={14} />

// Props:
//   density: number — number of meteor streaks (default 14)
// Renders diagonal streaks that fade in/out continuously.`}
        >
          <MeteorBackground density={16} />
        </BgCard>

        <BgCard
          title="Snowfall"
          when="Seasonal campaigns (winter/holiday), soft atmospheric sections, or any context where gentle falling particles set a calm mood."
          dark
          code={`import { Snowfall } from "@/components/effects/snowfall"

<Snowfall count={40} />

// Props:
//   count: number — number of particles (default 40)
// Each flake has randomized size, speed, and opacity.
// CSS-only animation — no runtime JS after mount.`}
        >
          <Snowfall count={35} />
        </BgCard>

        <BgCard
          title="Fireworks"
          when="Launch events, milestone celebrations, Black Friday/sale pages, achievement unlocks. Use sparingly for impact."
          dark
          code={`import { Fireworks } from "@/components/effects/fireworks"

<Fireworks count={6} />

// Props:
//   count: number — number of burst centers (default 5)
// Each burst spawns 8 particles in a radial pattern.
// Colors use randomized OKLCH hues for vibrancy.`}
        >
          <Fireworks count={6} />
        </BgCard>

        <BgCard
          title="FloatingPaths"
          when="About pages, organic/creative brands, or sections where a geometric background would feel too rigid. Adds soft movement."
          code={`import { FloatingPaths } from "@/components/effects/floating-paths"

<FloatingPaths pathCount={5} />

// Props:
//   pathCount: number — number of SVG curves (default 4)
// Paths gently undulate using CSS transforms.
// Uses currentColor — inherits from the container's text color.`}
        >
          <FloatingPaths pathCount={5} />
        </BgCard>

        <BgCard
          title="FluidParticles"
          when="Premium/luxury positioning, dreamy product pages, or sections that need depth without hard geometric shapes."
          dark
          code={`import { FluidParticles } from "@/components/effects/fluid-particles"

<FluidParticles count={20} />

// Props:
//   count: number — number of blurred orbs (default 20)
// Large, blurred circles drift and pulse.
// Uses OKLCH colors in the blue-purple range.
// Subtle enough to sit behind dense content.`}
        >
          <FluidParticles count={15} />
        </BgCard>

        <BgCard
          title="StarsBackground"
          when="Developer tools, SaaS platforms, space/tech themes. A twinkling star field that feels vast and professional."
          dark
          code={`import { StarsBackground } from "@/components/effects/stars-background"

<StarsBackground count={80} />

// Props:
//   count: number — number of stars (default 60)
// Each star has randomized position, size, and twinkle timing.
// Very lightweight — just tiny divs with CSS animations.`}
        >
          <StarsBackground count={80} />
        </BgCard>
      </div>
    </div>
  ),
}

/** Meteor shower standalone. */
export const MeteorShower: Story = {
  render: () => (
    <div className="relative flex min-h-[300px] items-center justify-center bg-zinc-950 p-8">
      <MeteorBackground density={20} />
      <p className="relative z-10 text-2xl font-bold text-white">Meteors</p>
    </div>
  ),
}

/** Snowfall standalone. */
export const Snow: Story = {
  render: () => (
    <div className="relative flex min-h-[300px] items-center justify-center bg-zinc-950 p-8">
      <Snowfall count={50} />
      <p className="relative z-10 text-2xl font-bold text-white">Snowfall</p>
    </div>
  ),
}

/** Stars standalone. */
export const Stars: Story = {
  render: () => (
    <div className="relative flex min-h-[300px] items-center justify-center bg-zinc-950 p-8">
      <StarsBackground count={100} />
      <p className="relative z-10 text-2xl font-bold text-white">Stars</p>
    </div>
  ),
}
