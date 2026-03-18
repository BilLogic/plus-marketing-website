import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Progress } from "@/components/ui/progress"

/** Progress bar indicating completion status. */
const meta = {
  title: "Components/Progress",
  component: Progress,
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
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 60,
  },
}

export const Complete: Story = {
  args: {
    value: 100,
  },
}

export const Empty: Story = {
  args: {
    value: 0,
  },
}
