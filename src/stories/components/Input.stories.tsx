import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/** A text input field for forms. */
const meta = {
  title: "components-marketing/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[320px] space-y-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

/** A basic text input with placeholder. */
export const Default: Story = {
  args: {
    placeholder: "Email",
  },
}

/** An input paired with a label. */
export const WithLabel: Story = {
  render: () => (
    <>
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="Email" />
    </>
  ),
}

/** A disabled input that cannot be interacted with. */
export const Disabled: Story = {
  args: {
    placeholder: "Email",
    disabled: true,
  },
}

/** A file upload input. */
export const File: Story = {
  args: {
    type: "file",
  },
}

/** A password input with masked characters. */
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Password",
  },
}
