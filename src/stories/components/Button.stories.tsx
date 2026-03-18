import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ChevronRight, Loader2, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"

/** Displays a button or a component that looks like a button. */
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/** Component overview for designers and coding agents. */
export const Overview: Story = {
  render: () => (
    <div className="max-w-2xl space-y-8 p-6">
      <div>
        <h2 className="text-lg font-semibold">Button</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A clickable element that triggers an action or navigation.
        </p>
      </div>

      <div className="space-y-1 text-xs text-muted-foreground">
        <p><strong className="text-foreground">Source:</strong> src/components/ui/button.tsx</p>
        <p><strong className="text-foreground">Import:</strong> <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">{"import { Button } from \"@/components/ui/button\""}</code></p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs font-semibold text-foreground">When to use</p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>Primary and secondary actions in forms</li>
            <li>CTA buttons in hero and pricing sections</li>
            <li>Navigation triggers (as links with button styling)</li>
            <li>Icon-only actions in toolbars</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs font-semibold text-foreground">When NOT to use</p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>Inline text links — use an anchor or link variant</li>
            <li>Toggle state — use Toggle or Switch instead</li>
            <li>Menu items — use DropdownMenu items</li>
          </ul>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold">Variants</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold">Sizes</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" variant="outline"><ChevronRight /></Button>
          <Button size="icon-xs" variant="outline"><ChevronRight className="size-3" /></Button>
          <Button size="icon-sm" variant="outline"><ChevronRight className="size-4" /></Button>
          <Button size="icon-lg" variant="outline"><ChevronRight className="size-5" /></Button>
        </div>
      </div>
    </div>
  ),
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

/** A button showing a loading spinner with disabled state. */
export const Loading: Story = {
  render: () => (
    <Button disabled>
      <Loader2 className="animate-spin" />
      Please wait
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
