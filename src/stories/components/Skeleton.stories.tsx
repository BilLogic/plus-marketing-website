import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Skeleton } from "@/components/ui/skeleton"

/** Placeholder loading state for content that hasn't loaded yet. */
const meta = {
  title: "components-misc/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
}

export const Card: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  ),
}
