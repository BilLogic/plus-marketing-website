import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AnimatedGradientText } from "@/components/effects/animated-gradient-text"
import { TextMorph } from "@/components/effects/text-morph"
import { TextGradientScroll } from "@/components/effects/text-gradient-scroll"

/** Text treatments that layer on top of typography tokens for high-impact marketing headlines. */
const meta = {
  title: "Effects/Text Effects",
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
        <span className="mt-0.5 rounded bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
          When to use
        </span>
        <p className="text-sm text-muted-foreground">{when}</p>
      </div>
      <CodeBlock>{code}</CodeBlock>
    </div>
  </section>
)

/** All text effects with live previews, guidance, and code. */
export const Overview: Story = {
  render: () => (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-10">
        <header className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Effects / Text Effects
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight">
            Text Effects
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            High-impact text treatments for hero headlines, rotating value propositions,
            and scroll-triggered reveals. Each is a standalone component that wraps
            your text content and respects existing typography tokens.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4 text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">All imports from:</strong>{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">src/components/effects/</code>
            <br />
            <strong className="text-foreground">Styling:</strong> Pass{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">className</code> for font size, weight, tracking.
            The effect itself uses CSS only — no Framer Motion dependency.
          </div>
        </header>

        <EffectCard
          title="AnimatedGradientText"
          when="Hero headlines that need visual energy. The gradient continuously sweeps across the text, drawing the eye without overwhelming."
          code={`import { AnimatedGradientText } from "@/components/effects/animated-gradient-text"

<AnimatedGradientText className="text-5xl font-bold tracking-tight">
  Ship faster with Plus
</AnimatedGradientText>`}
        >
          <div className="flex items-center justify-center py-6">
            <AnimatedGradientText className="text-4xl font-bold tracking-tight">
              Ship faster with Plus
            </AnimatedGradientText>
          </div>
        </EffectCard>

        <EffectCard
          title="TextMorph"
          when="Rotating taglines, value propositions, or feature names on landing pages. Shows breadth in a compact space."
          code={`import { TextMorph } from "@/components/effects/text-morph"

<h1 className="text-4xl font-bold">
  We help you{" "}
  <TextMorph
    words={["Design", "Build", "Ship", "Scale"]}
    interval={2000}
    className="text-primary"
  />
</h1>

// Props:
//   words: string[]     — array of words to cycle through
//   interval: number    — ms between transitions (default 2000)
//   className: string   — applied to the outer span`}
        >
          <div className="flex items-center justify-center py-6">
            <span className="text-4xl font-bold tracking-tight">
              We help you{" "}
              <TextMorph
                words={["Design", "Build", "Ship", "Scale"]}
                className="text-primary"
              />
            </span>
          </div>
        </EffectCard>

        <EffectCard
          title="TextGradientScroll"
          when="Section headings on long-scroll pages. The gradient fill reveals as the user scrolls, rewarding exploration and guiding reading flow."
          code={`import { TextGradientScroll } from "@/components/effects/text-gradient-scroll"

<TextGradientScroll className="text-4xl font-bold tracking-tight">
  Scroll to reveal this headline
</TextGradientScroll>

// Uses IntersectionObserver + scroll position.
// The gradient progresses from muted to primary
// as the element moves through the viewport.`}
        >
          <div className="flex items-center justify-center py-6">
            <TextGradientScroll className="text-3xl font-bold tracking-tight">
              Scroll to reveal this headline gradually
            </TextGradientScroll>
          </div>
        </EffectCard>
      </div>
    </div>
  ),
}

/** Gradient text standalone demo. */
export const GradientText: Story = {
  render: () => (
    <div className="flex min-h-[200px] items-center justify-center bg-background p-8">
      <AnimatedGradientText className="text-4xl font-bold tracking-tight">
        Animated gradient headline
      </AnimatedGradientText>
    </div>
  ),
}

/** Morph text standalone demo. */
export const Morph: Story = {
  render: () => (
    <div className="flex min-h-[200px] items-center justify-center bg-background p-8">
      <span className="text-3xl font-bold tracking-tight">
        We{" "}
        <TextMorph words={["design", "build", "ship", "scale"]} className="text-primary" />
      </span>
    </div>
  ),
}

/** Scroll-reveal gradient text standalone demo. */
export const ScrollGradient: Story = {
  render: () => (
    <div className="min-h-[150vh] bg-background p-8">
      <div className="h-[50vh]" />
      <TextGradientScroll className="text-4xl font-bold tracking-tight">
        Scroll down to see this gradient reveal
      </TextGradientScroll>
      <div className="h-[50vh]" />
    </div>
  ),
}
