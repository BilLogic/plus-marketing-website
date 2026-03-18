import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Badge } from "@/components/ui/badge"

/** A small status descriptor for UI elements. */
const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/** The default badge style. */
export const Default: Story = {
  args: {
    children: "Badge",
  },
}

/** A secondary-emphasis badge. */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
}

/** An outlined badge with a visible border. */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
}

/** A badge styled for destructive / error states. */
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
}

/** A badge with no visible background until hovered. */
export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
}

/** All badge variants displayed side-by-side. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  ),
}
