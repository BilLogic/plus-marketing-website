import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  ArrowRight, ChevronRight, ChevronDown, Check, X, Plus, Minus,
  Search, Settings, User, Mail, Bell, Heart, Star, Sparkles,
  Zap, Shield, Globe, Eye, Download, Upload, Copy, Trash2,
  ExternalLink, Home, BarChart3, FileText, Calendar, Clock,
  AlertCircle, AlertTriangle, Info, CheckCircle2, XCircle,
} from "lucide-react"

const meta = {
  title: "Styles/Icons",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const sizeScale = [
  { cls: "size-3", px: "12px", use: "Inline micro — breadcrumb chevrons" },
  { cls: "size-4", px: "16px", use: "Default inline — buttons, menu items" },
  { cls: "size-5", px: "20px", use: "Prominent inline — nav links, list markers" },
  { cls: "size-6", px: "24px", use: "Standalone — toolbar actions, tab icons" },
  { cls: "size-8", px: "32px", use: "Feature callouts — small card icons" },
  { cls: "size-10", px: "40px", use: "Hero features — large card icons" },
  { cls: "size-12", px: "48px", use: "Marketing hero — splash illustrations" },
]

const commonIcons = [
  { Icon: ArrowRight, name: "ArrowRight" }, { Icon: ChevronRight, name: "ChevronRight" },
  { Icon: ChevronDown, name: "ChevronDown" }, { Icon: Check, name: "Check" },
  { Icon: X, name: "X" }, { Icon: Plus, name: "Plus" },
  { Icon: Minus, name: "Minus" }, { Icon: Search, name: "Search" },
  { Icon: Settings, name: "Settings" }, { Icon: User, name: "User" },
  { Icon: Mail, name: "Mail" }, { Icon: Bell, name: "Bell" },
  { Icon: Heart, name: "Heart" }, { Icon: Star, name: "Star" },
  { Icon: Sparkles, name: "Sparkles" }, { Icon: Zap, name: "Zap" },
  { Icon: Shield, name: "Shield" }, { Icon: Globe, name: "Globe" },
  { Icon: Eye, name: "Eye" }, { Icon: Download, name: "Download" },
  { Icon: Upload, name: "Upload" }, { Icon: Copy, name: "Copy" },
  { Icon: Trash2, name: "Trash2" }, { Icon: ExternalLink, name: "ExternalLink" },
  { Icon: Home, name: "Home" }, { Icon: BarChart3, name: "BarChart3" },
  { Icon: FileText, name: "FileText" }, { Icon: Calendar, name: "Calendar" },
  { Icon: Clock, name: "Clock" },
]

const feedbackIcons = [
  { Icon: CheckCircle2, name: "CheckCircle2", color: "text-green-700", bg: "bg-green-100", use: "Success" },
  { Icon: AlertCircle, name: "AlertCircle", color: "text-destructive", bg: "bg-red-100", use: "Error" },
  { Icon: AlertTriangle, name: "AlertTriangle", color: "text-yellow-700", bg: "bg-yellow-100", use: "Warning" },
  { Icon: Info, name: "Info", color: "text-primary", bg: "bg-teal-100", use: "Info" },
  { Icon: XCircle, name: "XCircle", color: "text-muted-foreground", bg: "bg-gray-100", use: "Disabled" },
]

/** Lucide icon conventions, sizing scale, and usage patterns. */
export const Icons: Story = {
  render: () => (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Styles
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight">Icons</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We use <strong>Lucide React</strong> as our icon library. Always use explicit
            named imports — never import the entire library. Icons inherit
            <code className="mx-1 rounded bg-muted px-1 py-0.5 text-[11px]">currentColor</code>
            by default so they respond to text color utilities.
          </p>
        </div>

        {/* Size scale */}
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Size scale
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            Use Tailwind size utilities. Default inline size is size-4 (16px).
          </p>

          <div className="mt-4 space-y-3">
            {sizeScale.map((s) => (
              <div key={s.cls} className="flex items-center gap-4">
                <code className="w-16 shrink-0 text-[11px] font-medium">{s.cls}</code>
                <div className="flex w-14 shrink-0 items-center justify-center">
                  <Sparkles className={s.cls} />
                </div>
                <span className="w-10 shrink-0 text-[10px] text-muted-foreground">{s.px}</span>
                <span className="text-[10px] text-muted-foreground/70">{s.use}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Color patterns */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Color patterns
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            Icons inherit text color. Use semantic tokens for consistent theming.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { cls: "text-foreground", label: "Default" },
              { cls: "text-primary", label: "Primary" },
              { cls: "text-accent", label: "Accent" },
              { cls: "text-muted-foreground", label: "Muted" },
              { cls: "text-destructive", label: "Destructive" },
              { cls: "text-chart-1", label: "Chart 1" },
              { cls: "text-chart-2", label: "Chart 2" },
              { cls: "text-chart-5", label: "Chart 5" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-2 rounded-lg border border-border/50 p-3">
                <Star className={`size-5 ${c.cls}`} />
                <div>
                  <p className="text-[10px] font-semibold">{c.label}</p>
                  <code className="text-[9px] text-muted-foreground">{c.cls}</code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feedback icons */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Feedback icons
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            Standard icons for success, error, warning, and info states.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            {feedbackIcons.map((fi) => (
              <div key={fi.name} className="flex items-center gap-2 rounded-lg border border-border/50 p-3">
                <div className={`grid size-8 place-items-center rounded-lg ${fi.bg}`}>
                  <fi.Icon className={`size-4 ${fi.color}`} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold">{fi.use}</p>
                  <code className="text-[9px] text-muted-foreground">{fi.name}</code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common icons grid */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Common icons
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            Frequently used icons across the marketing site. Import from lucide-react.
          </p>

          <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
            {commonIcons.map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center gap-1.5 rounded-lg p-2 transition-colors hover:bg-muted"
                title={`import { ${item.name} } from "lucide-react"`}
              >
                <item.Icon className="size-5 text-foreground" />
                <span className="text-[8px] text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Usage patterns */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Usage patterns
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="space-y-3 rounded-xl border border-border p-5">
              <p className="text-xs font-semibold">Inline with text</p>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                Get started <ArrowRight className="size-4" />
              </p>
              <code className="block text-[9px] text-muted-foreground/60">
                {`<ArrowRight className="size-4" />`}
              </code>
            </div>
            <div className="space-y-3 rounded-xl border border-border p-5">
              <p className="text-xs font-semibold">Feature callout</p>
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Shield className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Secure by default</p>
                  <p className="text-[10px] text-muted-foreground">E2E encryption</p>
                </div>
              </div>
              <code className="block text-[9px] text-muted-foreground/60">
                {`bg-primary/10 text-primary + size-5`}
              </code>
            </div>
            <div className="space-y-3 rounded-xl border border-border p-5">
              <p className="text-xs font-semibold">Button with icon</p>
              <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
                <Download className="size-3.5" />
                Download
              </button>
              <code className="block text-[9px] text-muted-foreground/60">
                {`<Download className="size-3.5" />`}
              </code>
            </div>
          </div>
        </section>
      </div>
    </div>
  ),
}
