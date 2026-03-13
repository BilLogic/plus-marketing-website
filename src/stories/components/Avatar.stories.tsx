import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

/** Circular avatar displaying user images with a text fallback. */
const meta = {
  title: "components-marketing/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

export const FallbackOnly: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
}
