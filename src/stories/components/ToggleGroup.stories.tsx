import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LineChart, Rows3 } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

/** Segmented control built from toggle primitives for small option sets. */
const meta = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleGroup>

export default meta

type Story = StoryObj<typeof meta>

/** View toggle between chart and table representations. */
export const ViewToggle: Story = {
  render: () => (
    <ToggleGroup>
      <ToggleGroupItem value="chart" aria-label="Show chart">
        <LineChart className="mr-1 size-4" />
        Chart
      </ToggleGroupItem>
      <ToggleGroupItem value="table" aria-label="Show table">
        <Rows3 className="mr-1 size-4" />
        Table
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

