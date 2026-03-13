import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  PaletteIcon,
  LayoutGridIcon,
  SparklesIcon,
  ComponentIcon,
  WrenchIcon,
  BlocksIcon,
} from "lucide-react"

const meta = {
  title: "Welcome",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj

const sections = [
  {
    icon: PaletteIcon,
    title: "Styles",
    description:
      "Color tokens (OKLCH), typography (DM Sans / Geist Mono), elevation, motion principles, icons, and shape conventions. Start here to understand the visual language.",
    path: "Styles/Overview",
    items: ["Color", "Typography", "Elevation", "Motion", "Icons", "Shape"],
  },
  {
    icon: LayoutGridIcon,
    title: "Layout",
    description:
      "Grid system, flex patterns, spacing scale, and section containers. These primitives control how content flows across breakpoints.",
    path: "Layout/Grid",
    items: ["Grid", "Flex", "Section", "Spacing"],
  },
  {
    icon: SparklesIcon,
    title: "Effects",
    description:
      "Text effects, motion components, interactive animations, and animated backgrounds. Each effect is a composable React component with usage guidance and code snippets.",
    path: "Effects/Overview",
    items: ["Text Effects", "Motion Components", "Animations", "Backgrounds"],
  },
  {
    icon: ComponentIcon,
    title: "Components — Marketing",
    description:
      "Core UI primitives styled for marketing pages. Many include a multi-source comparison (Base, Tailark, Cult UI, Bundui, Plus) so designers can evaluate visual directions.",
    path: "components-marketing/Button",
    items: [
      "Button", "Accordion", "Card", "Tabs", "Navigation Menu",
      "Sheet", "Dialog", "Select", "Input", "and 20+ more",
    ],
  },
  {
    icon: WrenchIcon,
    title: "Components — Misc",
    description:
      "Utility and application-level primitives: data tables, charts, sidebars, date pickers, OTP inputs, resizable panels, and more.",
    path: "components-misc/DataTable",
    items: [
      "DataTable", "DatePicker", "Chart", "Sidebar", "Menubar",
      "InputOTP", "Resizable", "Field", "Item", "and more",
    ],
  },
  {
    icon: BlocksIcon,
    title: "Templates",
    description:
      "Full-page and section-level marketing templates sourced from Bundui, Tailark, and Cult UI. Heroes, pricing, testimonials, CTAs, footers, and more — ready to compose.",
    path: "Templates/Overview",
    items: [
      "Hero", "Pricing", "CTA", "Testimonials", "Features",
      "Blog", "Team", "Stats", "Footer", "and 10+ more",
    ],
  },
]

/** The landing page for the Plus Marketing Website design system. */
export const Overview: Story = {
  render: () => (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Hero */}
        <header className="mb-16 max-w-2xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Plus Design System
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight">
            Marketing Website Storybook
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            This Storybook is the single source of truth for every visual building block
            on the Plus marketing site. It documents design tokens, layout primitives,
            interactive effects, UI components, and full-page templates — all sourced
            from{" "}
            <strong>shadcn/ui</strong>, <strong>Bundui</strong>, <strong>Tailark</strong>,
            and <strong>Cult UI</strong>.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>For designers:</strong> browse each section to understand available
            tokens, variants, and effects before composing in Figma.
            <br />
            <strong>For engineers &amp; agents:</strong> every component includes import
            paths, props, and usage snippets so you can wire things up immediately.
          </p>
        </header>

        {/* Tech stack */}
        <div className="mb-16 flex flex-wrap gap-2">
          {[
            "Next.js App Router",
            "Tailwind CSS v4",
            "OKLCH Tokens",
            "shadcn/ui (base-nova)",
            "Framer Motion",
            "Storybook 10",
            "DM Sans + Geist Mono",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Section cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <article
              key={section.title}
              className="group flex flex-col rounded-2xl border border-border bg-card/60 p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <section.icon className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold tracking-tight">
                {section.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {section.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {section.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Registry sources */}
        <section className="mt-16">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Registry Sources
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "shadcn/ui",
                role: "Base primitives",
                detail: "50+ accessible components with the base-nova preset. Our foundational layer.",
              },
              {
                name: "Bundui",
                role: "Marketing blocks & effects",
                detail: "Hero sections, pricing, CTAs, testimonials, animated backgrounds, text effects, and more.",
              },
              {
                name: "Tailark",
                role: "Marketing templates",
                detail: "Hero, pricing, testimonials, logo clouds, and feature section variants.",
              },
              {
                name: "Cult UI",
                role: "Surfaces & navbars",
                detail: "Card surfaces, layout shells, and glow-accented navigation components.",
              },
            ].map((source) => (
              <div
                key={source.name}
                className="rounded-xl border border-border bg-muted/30 p-4"
              >
                <p className="text-sm font-semibold">{source.name}</p>
                <p className="text-xs font-medium text-primary">{source.role}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {source.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick-start */}
        <section className="mt-16 rounded-2xl border bg-card/60 p-8">
          <h2 className="text-lg font-semibold tracking-tight">Quick Start</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">Run Storybook</h3>
              <pre className="mt-2 rounded-lg bg-muted p-3 text-xs">
                <code>npm run storybook</code>
              </pre>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">Run Dev Server</h3>
              <pre className="mt-2 rounded-lg bg-muted p-3 text-xs">
                <code>npm run dev</code>
              </pre>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">Add a shadcn component</h3>
              <pre className="mt-2 rounded-lg bg-muted p-3 text-xs">
                <code>npx shadcn@latest add [component]</code>
              </pre>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">Key paths</h3>
              <pre className="mt-2 rounded-lg bg-muted p-3 text-xs leading-relaxed">
                <code>{`src/components/ui/      → shadcn primitives
src/components/effects/ → effect components
src/components/plus/    → Plus-branded wrappers
src/components/registry/ → Bundui/Tailark/Cult
src/stories/            → all Storybook stories`}</code>
              </pre>
            </div>
          </div>
        </section>

        <footer className="mt-16 border-t pt-6 text-xs text-muted-foreground">
          Plus Marketing Website Design System · Built with Next.js, Tailwind v4, and shadcn/ui · Documented in Storybook 10
        </footer>
      </div>
    </div>
  ),
}
