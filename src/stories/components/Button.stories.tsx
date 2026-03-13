import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ChevronRight, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PlusButton } from "@/components/plus/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/** Displays a button or a component that looks like a button. */
const meta = {
  title: "components-marketing/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/** Overview of all registry sources for the Button primitive. */
export const Overview: Story = {
  render: () => <ButtonComparisonPreview />,
}

/** The default button style. */
export const Default: Story = {
  args: {
    children: "Button",
  },
}

/** A secondary-emphasis button. */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
}

/** An outlined button with a visible border. */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
}

/** A button with no visible background until hovered. */
export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
}

/** A button styled for destructive / dangerous actions. */
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
}

/** A button that looks and behaves like an inline link. */
export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
}

/** A small-sized button. */
export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
}

/** A large-sized button. */
export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
}

/** An icon-only button. */
export const Icon: Story = {
  args: {
    size: "icon",
    variant: "outline",
  },
  render: (args) => (
    <Button {...args}>
      <ChevronRight />
    </Button>
  ),
}

/** A button that combines an icon with a text label. */
export const WithIcon: Story = {
  render: () => (
    <Button>
      <Mail />
      Login with Email
    </Button>
  ),
}

/** All button variants displayed side-by-side. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

/** Plus-branded glass button built on top of the base button. */
export const PlusGlass: Story = {
  render: () => <PlusButton>Plus glass button</PlusButton>,
}

/** Local comparison view that uses an in-story toggle instead of Storybook controls. */
const TailarkButton = () => (
  <Button
    variant="outline"
    className="rounded-full border-border/80 bg-background px-5 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-background/80"
  >
    Primary
  </Button>
)

const CultUIButton = () => (
  <Button
    variant="outline"
    className="relative overflow-hidden border border-border/80 bg-card/80 px-5 py-2 text-sm font-medium text-foreground shadow-[0_18px_45px_rgba(15,23,42,0.45)]"
  >
    <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_55%)]" />
    <span className="relative">Primary</span>
  </Button>
)

const BunduiButton = () => (
  <Button className="rounded-full bg-primary px-5 py-2 text-sm font-medium tracking-tight shadow-lg shadow-primary/40">
    Primary
  </Button>
)

const ButtonComparisonPreview = () => {
  return (
    <Tabs defaultValue="shadcn" className="w-full max-w-xl">
      <TabsList variant="line" className="mb-4 w-full justify-start">
        <TabsTrigger value="shadcn">Base (shadcn)</TabsTrigger>
        <TabsTrigger value="tailark">Tailark</TabsTrigger>
        <TabsTrigger value="cult-ui">Cult UI</TabsTrigger>
        <TabsTrigger value="bundui">Bundui</TabsTrigger>
        <TabsTrigger value="plus">Plus</TabsTrigger>
      </TabsList>

      <TabsContent value="shadcn" className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Base (shadcn/ui)
        </p>
        <div className="rounded-lg border border-dashed border-border bg-card/60 p-4">
          <div className="flex items-center gap-3">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="tailark" className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Tailark (registry)
        </p>
        <div className="rounded-lg border border-dashed border-border bg-card/60 p-4">
          <p className="mb-2 text-xs text-muted-foreground">
            Pill-shaped primary actions and neutral outlines inspired by Tailark marketing CTAs.
          </p>
          <div className="flex items-center gap-3">
            <TailarkButton />
            <Button variant="outline" className="rounded-full px-5 py-2 text-sm font-medium">
              Outline
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="cult-ui" className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Cult UI (registry)
        </p>
        <div className="rounded-lg border border-dashed border-border bg-card/60 p-4">
          <p className="mb-2 text-xs text-muted-foreground">
            High-contrast buttons with subtle glow and layered light, inspired by Cult UI marketing
            heroes.
          </p>
          <div className="flex items-center gap-3">
            <CultUIButton />
            <Button
              variant="outline"
              className="border-border/70 bg-background/80 px-5 py-2 text-sm font-medium"
            >
              Outline
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="bundui" className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Bundui (blocks kit)
        </p>
        <div className="rounded-lg border border-dashed border-border bg-card/60 p-4">
          <p className="mb-2 text-xs text-muted-foreground">
            Bold, rounded CTAs echoing Bundui marketing hero and pricing sections.
          </p>
          <div className="flex items-center gap-3">
            <BunduiButton />
            <Button
              variant="outline"
              className="rounded-full border-primary/40 bg-background/80 px-5 py-2 text-sm font-medium"
            >
              Outline
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="plus" className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Plus
        </p>
        <div className="rounded-lg border border-dashed border-border bg-card/60 p-4">
          <div className="flex items-center gap-3">
            <PlusButton>Primary</PlusButton>
            <PlusButton variant="outline">Outline</PlusButton>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

/** Toggle view comparing base shadcn, registry sources, and Plus button implementations. */
export const Comparison: Story = {
  render: () => <ButtonComparisonPreview />,
}
