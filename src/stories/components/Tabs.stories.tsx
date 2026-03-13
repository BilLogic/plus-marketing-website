import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

/** Tabs organize content into multiple sections and allow users to navigate between them. */
const meta = {
  title: "components-marketing/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

/** Overview of tab styles across registries. */
export const Overview: Story = {
  render: () => (
    <Tabs defaultValue="shadcn">
      <TabsList variant="line" className="mb-4 w-full justify-start">
        <TabsTrigger value="shadcn">Base (shadcn)</TabsTrigger>
        <TabsTrigger value="tailark">Tailark</TabsTrigger>
        <TabsTrigger value="cult-ui">Cult UI</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
}

/** Default underline-style tabs with two panels. */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">
        Change your password here.
      </TabsContent>
    </Tabs>
  ),
}

/** Line variant provides a minimal underline indicator style. */
export const LineVariant: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList variant="line">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">
        Change your password here.
      </TabsContent>
    </Tabs>
  ),
}

/** Comparison between base, Tailark, and Cult UI tab styles. */
export const Comparison: Story = {
  render: () => (
    <Tabs defaultValue="shadcn">
      <TabsList variant="line" className="mb-4 w-full justify-start">
        <TabsTrigger value="shadcn">Base (shadcn)</TabsTrigger>
        <TabsTrigger value="tailark">Tailark</TabsTrigger>
        <TabsTrigger value="cult-ui">Cult UI</TabsTrigger>
      </TabsList>

      <TabsContent value="shadcn" className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Base (shadcn/ui)
        </p>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-3 text-xs text-muted-foreground">
            Straightforward underline tabs suitable for simple content groupings.
          </TabsContent>
          <TabsContent value="metrics" className="mt-3 text-xs text-muted-foreground">
            Use inside cards, sheets, and dashboards for basic segmentation.
          </TabsContent>
        </Tabs>
      </TabsContent>

      <TabsContent value="tailark" className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Tailark (registry)
        </p>
        <Tabs defaultValue="monthly">
          <TabsList className="inline-flex rounded-full bg-muted/60 p-1">
            <TabsTrigger
              value="monthly"
              className="rounded-full px-4 data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              className="rounded-full px-4 data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Yearly
            </TabsTrigger>
          </TabsList>
          <TabsContent value="monthly" className="mt-3 text-xs text-muted-foreground">
            Pill-shaped pricing cadence tabs inspired by Tailark&apos;s pricing sections.
          </TabsContent>
          <TabsContent value="yearly" className="mt-3 text-xs text-muted-foreground">
            Surface savings callouts and plan details alongside these controls.
          </TabsContent>
        </Tabs>
      </TabsContent>

      <TabsContent value="cult-ui" className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Cult UI (registry)
        </p>
        <Tabs defaultValue="design">
          <TabsList className="relative inline-flex gap-1 rounded-xl bg-card/80 p-1 shadow-[0_14px_35px_rgba(15,23,42,0.55)]">
            <TabsTrigger
              value="design"
              className="relative rounded-lg px-3 py-1.5 text-xs font-medium data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Design
            </TabsTrigger>
            <TabsTrigger
              value="engineering"
              className="relative rounded-lg px-3 py-1.5 text-xs font-medium data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Engineering
            </TabsTrigger>
          </TabsList>
          <TabsContent value="design" className="mt-3 text-xs text-muted-foreground">
            High-contrast, glow-adjacent tabs that feel at home in Cult UI marketing layouts.
          </TabsContent>
          <TabsContent value="engineering" className="mt-3 text-xs text-muted-foreground">
            Use for mode switches in dashboards or editor-like surfaces where Cult UI patterns fit.
          </TabsContent>
        </Tabs>
      </TabsContent>
    </Tabs>
  ),
}
