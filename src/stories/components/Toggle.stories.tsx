import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Bold } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

/** A two-state button that can be toggled on or off. */
const meta = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

/** A toggle with an icon. */
export const Default: Story = {
  render: (args) => (
    <Toggle {...args}>
      <Bold />
    </Toggle>
  ),
}

/** A toggle displaying a text label. */
export const WithText: Story = {
  render: (args) => (
    <Toggle {...args}>Bold</Toggle>
  ),
}

/** An outlined toggle variant with a visible border. */
export const Outline: Story = {
  args: {
    variant: "outline",
  },
  render: (args) => (
    <Toggle {...args}>
      <Bold />
    </Toggle>
  ),
}

/** A small-sized toggle. */
export const Small: Story = {
  args: {
    size: "sm",
  },
  render: (args) => (
    <Toggle {...args}>
      <Bold />
    </Toggle>
  ),
}

/** A toggle in its pressed state. */
export const Pressed: Story = {
  args: {
    defaultPressed: true,
  },
  render: (args) => (
    <Toggle {...args}>
      <Bold />
    </Toggle>
  ),
}
