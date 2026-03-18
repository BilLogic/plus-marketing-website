import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Calendar } from "@/components/ui/calendar"

/** Calendar primitive used for date pickers and scheduling blocks. */
const meta = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

/** Single-month calendar with outside days visible. */
export const Default: Story = {
  render: () => <Calendar mode="single" />,
}

