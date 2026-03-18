import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

/** Themed chart components built on top of Recharts with automatic color tokens. */
const meta = {
  title: "Components/Chart",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const sampleData = [
  { month: "Jan", revenue: 4000, expenses: 2400 },
  { month: "Feb", revenue: 3000, expenses: 1398 },
  { month: "Mar", revenue: 5000, expenses: 3200 },
  { month: "Apr", revenue: 4780, expenses: 2908 },
  { month: "May", revenue: 5890, expenses: 4800 },
  { month: "Jun", revenue: 6390, expenses: 3800 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "oklch(0.65 0.18 250)",
  },
  expenses: {
    label: "Expenses",
    color: "oklch(0.65 0.08 250)",
  },
} satisfies ChartConfig

/** A bar chart with two data series and a tooltip. */
export const BarChartExample: Story = {
  name: "Bar Chart",
  render: () => (
    <div className="w-[500px]">
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <BarChart accessibilityLayer data={sampleData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
          <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  ),
}
