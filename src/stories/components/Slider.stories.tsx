import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Slider } from "@/components/ui/slider"

/** Slider input for selecting a value or range within a bounded interval. */
const meta = {
  title: "components-marketing/Slider",
  component: Slider,
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
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: [50],
  },
}

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
  },
}
