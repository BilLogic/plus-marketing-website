import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Separator } from "@/components/ui/separator"

/** Separator visually divides content into distinct sections. */
const meta = {
  title: "components-marketing/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

/** Horizontal separator spans the full width of its container. */
export const Horizontal: Story = {
  render: () => <Separator />,
}

/** Vertical separator used between inline elements. */
export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center gap-4">
      <span>Blog</span>
      <Separator orientation="vertical" />
      <span>Docs</span>
    </div>
  ),
}
