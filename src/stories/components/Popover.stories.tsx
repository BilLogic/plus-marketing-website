import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

/** A floating panel anchored to a trigger element, used for non-modal content. */
const meta = {
  title: "components-marketing/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

/** A popover with a title, description, and text content. */
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
        <p className="text-sm text-muted-foreground">
          Popover body content goes here. You can place any content inside a
          popover.
        </p>
      </PopoverContent>
    </Popover>
  ),
}
