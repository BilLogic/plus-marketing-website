import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TypeIcon, ZapIcon, MousePointerClickIcon, ImageIcon } from "lucide-react"

const meta = {
  title: "Effects/Overview",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj

const categories = [
  {
    icon: TypeIcon,
    title: "Text Effects",
    description:
      "Animated gradients, word morphing, and scroll-reveal treatments that layer onto your existing typography tokens. Use these for hero headlines and value propositions.",
    components: [
      { name: "AnimatedGradientText", use: "Hero headlines, marketing badges" },
      { name: "TextMorph", use: "Rotating value props, tagline cycling" },
      { name: "TextGradientScroll", use: "Scroll-reveal section headers" },
    ],
  },
  {
    icon: ZapIcon,
    title: "Motion Components",
    description:
      "Interactive motion primitives: animated tabs, counters, marquees, before/after sliders, and floating elements. These are functional components that add polish to feature sections and dashboards.",
    components: [
      { name: "AnimatedTabs", use: "Feature/pricing toggles" },
      { name: "AnimatedGradientBorder", use: "Premium card highlights" },
      { name: "CounterAnimation", use: "Stats sections, social proof" },
      { name: "FloatingButton", use: "Floating CTAs" },
      { name: "ImageComparison", use: "Before/after showcase" },
      { name: "Marquee", use: "Logo clouds, tech stack strips" },
      { name: "ScrollProgressBar", use: "Long-form reading pages" },
      { name: "SlidingNumber", use: "Dynamic pricing, live counters" },
      { name: "Countdown", use: "Launch timers, sale countdowns" },
      { name: "ParallaxCards", use: "Feature grids with depth" },
    ],
  },
  {
    icon: MousePointerClickIcon,
    title: "Animations",
    description:
      "Hover and interaction effects that add character to cards, buttons, and containers. These are wrapper components — wrap any element to apply the effect.",
    components: [
      { name: "CirclePath", use: "Loading states, decorative accents" },
      { name: "FlipCard", use: "Feature reveal, team profiles" },
      { name: "MagneticHover", use: "CTAs, nav items" },
      { name: "TiltEffect", use: "Cards, product previews" },
      { name: "RippleEffect", use: "Buttons, interactive surfaces" },
      { name: "MouseTrail", use: "Hero backgrounds, interactive areas" },
      { name: "AnimatedBeam", use: "Loading skeletons, highlights" },
    ],
  },
  {
    icon: ImageIcon,
    title: "Backgrounds",
    description:
      "Atmospheric animated backgrounds that sit behind content. Position them absolutely inside a relative container. Keep density low for performance.",
    components: [
      { name: "MeteorBackground", use: "Dark heroes, SaaS landing" },
      { name: "Snowfall", use: "Seasonal campaigns, soft atmosphere" },
      { name: "Fireworks", use: "Launch events, celebrations" },
      { name: "FloatingPaths", use: "Organic texture, about pages" },
      { name: "FluidParticles", use: "Dreamy ambience, premium feel" },
      { name: "StarsBackground", use: "Dev tools, SaaS, space themes" },
    ],
  },
]

/** The Effects section overview — a guide for designers and coding agents. */
export const EffectsGuide: Story = {
  name: "Guide",
  render: () => (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <header className="mb-12 max-w-2xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Effects
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight">
            Effects Guide
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            Interactive animated React components powered by Framer Motion and Canvas.
            Each is a standalone, composable component in{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium">
              src/components/effects/
            </code>
            . For static CSS tokens (transitions, durations, easing), see{" "}
            <strong>Styles/Transitions</strong>.
          </p>
        </header>

        {/* Principles */}
        <section className="mb-16 rounded-2xl border bg-card/60 p-8">
          <h2 className="text-lg font-semibold tracking-tight">Design Principles</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold">Purposeful, not decorative</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Every effect should guide attention or communicate meaning. Avoid
                applying effects just because they look cool — each one should serve a
                clear marketing goal (draw the eye, build credibility, create urgency).
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Token-driven</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Effects use the same OKLCH color tokens, fonts, and spacing as the rest
                of the system. Never hard-code hex values. Use{" "}
                <code className="rounded bg-muted px-1 text-[11px]">text-primary</code>,{" "}
                <code className="rounded bg-muted px-1 text-[11px]">bg-muted</code>, etc.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Performance-aware</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Prefer CSS animations over JS where possible. Use{" "}
                <code className="rounded bg-muted px-1 text-[11px]">motion-safe:</code>{" "}
                for reduced-motion support. Keep particle counts and animation
                durations conservative.
              </p>
            </div>
          </div>
        </section>

        {/* General usage */}
        <section className="mb-16 rounded-2xl border bg-card/60 p-8">
          <h2 className="text-lg font-semibold tracking-tight">General Usage Pattern</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            All effects follow the same import and composition pattern:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
            <code>{`import { AnimatedGradientText } from "@/components/effects/animated-gradient-text"
import { MeteorBackground } from "@/components/effects/meteor-background"

// Text effects wrap text content
<AnimatedGradientText className="text-4xl font-bold">
  Ship faster with Plus
</AnimatedGradientText>

// Backgrounds sit inside a relative container
<div className="relative overflow-hidden rounded-2xl">
  <MeteorBackground density={14} />
  <div className="relative z-10">
    {/* Your content here */}
  </div>
</div>

// Animations wrap interactive elements
<MagneticHover strength={0.3}>
  <Button>Hover me</Button>
</MagneticHover>`}</code>
          </pre>
        </section>

        {/* Category cards */}
        {categories.map((cat) => (
          <section key={cat.title} className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <cat.icon className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-semibold tracking-tight">{cat.title}</h2>
            </div>
            <p className="mb-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {cat.description}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cat.components.map((comp) => (
                <div
                  key={comp.name}
                  className="rounded-xl border bg-card/60 p-4"
                >
                  <p className="text-sm font-semibold font-mono">{comp.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground/70">Use for: </span>
                    {comp.use}
                  </p>
                  <pre className="mt-2 rounded-md bg-muted p-2 text-[11px]">
                    <code>{`import { ${comp.name} } from\n  "@/components/effects/..."`}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>
        ))}

        <footer className="mt-8 border-t pt-6 text-xs text-muted-foreground">
          Navigate to each sub-section (Text Effects, Motion Components, Animations,
          Backgrounds) for interactive demos and detailed code examples.
        </footer>
      </div>
    </div>
  ),
}
