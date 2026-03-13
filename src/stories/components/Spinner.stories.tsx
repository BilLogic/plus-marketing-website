import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Spinner } from "@/components/ui/spinner"

/** Animated loading indicator for async operations. */
const meta = {
  title: "components-misc/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
