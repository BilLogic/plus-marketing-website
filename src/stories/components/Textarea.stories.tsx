import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Textarea } from "@/components/ui/textarea"

/** A multi-line text input for longer-form content. */
const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

/** A basic textarea with placeholder text. */
export const Default: Story = {
  args: {
    placeholder: "Type your message here.",
  },
}

/** A disabled textarea that cannot be edited. */
export const Disabled: Story = {
  args: {
    placeholder: "Type your message here.",
    disabled: true,
  },
}
