import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { CirclePath } from "@/components/effects/circle-path"
import { FlipCard } from "@/components/effects/flip-card"
import { MagneticHover } from "@/components/effects/magnetic-hover"
import { TiltEffect } from "@/components/effects/tilt-effect"
import { RippleEffect } from "@/components/effects/ripple-effect"
import { MouseTrail } from "@/components/effects/mouse-trail"
import { AnimatedBeam } from "@/components/effects/animated-beam"
import { Button } from "@/components/ui/button"

/** Hover and interaction animations that add character to interactive elements. */
const meta = {
  title: "Effects/Animations",
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

/** All animation effects with interactive demos, usage notes, and code. */
export const Overview: Story = {
  render: () => (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-10">
        <header className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Effects / Animations
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight">
            Animations
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Interaction-driven animations that respond to hover, click, or cursor position.
            These are <strong>wrapper components</strong> — wrap any element to apply the
            effect. They use CSS transforms and minimal JS for performance.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4 text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Tip:</strong> Animations should feel like
            a natural extension of the interaction, not a distraction. Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">motion-safe:</code> media
            query classes when possible. Keep effects subtle on mobile.
          </div>
        </header>

        <EffectCard
          title="CirclePath"
          when="Loading indicators, decorative accents next to headings, or empty-state illustrations. Pure SVG — zero DOM overhead."
          code={`import { CirclePath } from "@/components/effects/circle-path"

<CirclePath size={80} strokeWidth={2} duration={2} />
<CirclePath size={120} strokeWidth={3} duration={3} className="text-primary" />

// Props:
//   size: number          — SVG viewBox dimensions (default 120)
//   strokeWidth: number   — circle stroke width (default 3)
//   duration: number      — seconds per loop (default 2)
//   className: string     — controls color via \`text-*\` (uses currentColor)`}
        >
          <div className="flex items-center justify-center gap-8 py-6 text-primary">
            <CirclePath size={80} strokeWidth={2} duration={2} />
            <CirclePath size={120} strokeWidth={3} duration={3} />
          </div>
        </EffectCard>

        <EffectCard
          title="FlipCard"
          when="Feature reveals (front = icon + title, back = description), team member bios, or interactive FAQ cards."
          code={`import { FlipCard } from "@/components/effects/flip-card"

<FlipCard
  className="h-48 w-64"
  front={
    <div className="flex h-full flex-col items-center justify-center">
      <h3>Front Side</h3>
      <p>Hover me</p>
    </div>
  }
  back={
    <div className="flex h-full items-center justify-center text-center">
      <p>Back side content revealed on hover.</p>
    </div>
  }
/>

// The card uses CSS 3D transforms with backface-visibility.
// Set a fixed height on the wrapper for proper flip behavior.`}
        >
          <div className="flex items-center justify-center py-4">
            <FlipCard
              className="h-48 w-64"
              front={
                <div className="flex h-full flex-col items-center justify-center gap-2">
                  <p className="text-lg font-semibold">Front Side</p>
                  <p className="text-sm text-muted-foreground">Hover me</p>
                </div>
              }
              back={
                <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                  <p className="text-lg font-semibold">Back Side</p>
                  <p className="text-sm text-muted-foreground">
                    Revealed with a smooth 3D flip.
                  </p>
                </div>
              }
            />
          </div>
        </EffectCard>

        <EffectCard
          title="MagneticHover"
          when="Primary CTAs, navigation items, or any element where you want to subtly draw the user's click. The element 'pulls' toward the cursor."
          code={`import { MagneticHover } from "@/components/effects/magnetic-hover"

<MagneticHover strength={0.3}>
  <Button size="lg">Get Started</Button>
</MagneticHover>

// Props:
//   strength: number — pull multiplier (default 0.3, range 0–1)
//   className: string — applied to the wrapper div`}
        >
          <div className="flex items-center justify-center py-8">
            <MagneticHover strength={0.35}>
              <Button size="lg">Magnetic Button</Button>
            </MagneticHover>
          </div>
        </EffectCard>

        <EffectCard
          title="TiltEffect"
          when="Feature cards, product screenshots, testimonial cards. Creates depth that makes the page feel interactive without requiring a click."
          code={`import { TiltEffect } from "@/components/effects/tilt-effect"

<TiltEffect maxTilt={15}>
  <div className="rounded-xl border bg-card p-8 shadow-lg">
    <h3>Feature Title</h3>
    <p>Move your cursor to see the tilt.</p>
  </div>
</TiltEffect>

// Props:
//   maxTilt: number — degrees of rotation (default 15)
//   className: string — applied to the wrapper`}
        >
          <div className="flex items-center justify-center py-6">
            <TiltEffect maxTilt={20}>
              <div className="rounded-xl border bg-card p-8 shadow-lg">
                <p className="text-lg font-semibold">Hover &amp; tilt</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Move your cursor to see the 3D effect.
                </p>
              </div>
            </TiltEffect>
          </div>
        </EffectCard>

        <EffectCard
          title="RippleEffect"
          when="Buttons, card surfaces, or any clickable area. Provides satisfying tactile feedback on click."
          code={`import { RippleEffect } from "@/components/effects/ripple-effect"

<RippleEffect className="rounded-lg">
  <button className="w-full rounded-lg bg-muted p-4">
    Click anywhere for ripple
  </button>
</RippleEffect>

// Click generates expanding circles that fade out.
// Works with any child content.`}
        >
          <RippleEffect className="flex h-28 cursor-pointer items-center justify-center rounded-lg bg-muted">
            <p className="text-sm font-medium">Click anywhere in this area</p>
          </RippleEffect>
        </EffectCard>

        <EffectCard
          title="MouseTrail"
          when="Hero backgrounds, interactive sections, or creative landing pages. Adds a playful, cursor-following particle effect."
          code={`import { MouseTrail } from "@/components/effects/mouse-trail"

<MouseTrail className="h-48" dotCount={16} />

// Props:
//   dotCount: number — max trailing dots (default 12)
//   className: string — must include a height for the area`}
        >
          <MouseTrail className="h-40 rounded-lg bg-muted/50" dotCount={16} />
        </EffectCard>

        <EffectCard
          title="AnimatedBeam"
          when="Loading/skeleton highlights, promotional banners, or decorative card overlays. A light sweep that suggests activity."
          code={`import { AnimatedBeam } from "@/components/effects/animated-beam"

<div className="relative h-24 overflow-hidden rounded-lg border bg-card">
  <AnimatedBeam className="h-full w-full" />
  <div className="absolute inset-0 flex items-center justify-center">
    Content sits above the beam
  </div>
</div>

// Place inside a relative container. The beam sweeps left→right on loop.`}
        >
          <div className="relative h-24 rounded-lg border bg-card">
            <AnimatedBeam className="h-full w-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm font-medium">Content sits above the beam</p>
            </div>
          </div>
        </EffectCard>
      </div>
    </div>
  ),
}
