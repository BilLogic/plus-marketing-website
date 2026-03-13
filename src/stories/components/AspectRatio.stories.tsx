import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AspectRatio } from "@/components/ui/aspect-ratio"

/** Utility for maintaining consistent aspect ratios for media and previews. */
const meta = {
  title: "components-misc/AspectRatio",
  component: AspectRatio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AspectRatio>

export default meta

type Story = StoryObj<typeof meta>

/** 16:9 preview frame for hero or product imagery. */
export const SixteenByNine: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <AspectRatio {...args} className="w-[320px] overflow-hidden rounded-3xl border bg-card">
      <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
        16:9 media slot
      </div>
    </AspectRatio>
  ),
}

