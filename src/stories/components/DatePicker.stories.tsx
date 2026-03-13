import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

/** A date picker composed from Calendar + Popover. Click the button to open a calendar dropdown. */
const meta = {
  title: "components-misc/DatePicker",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const DatePickerDemo = () => {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          />
        }
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  )
}

/** A single date picker with calendar dropdown. */
export const Default: Story = {
  render: () => <DatePickerDemo />,
}

const DateRangeDemo = () => {
  const [from, setFrom] = React.useState<Date>()
  const [to, setTo] = React.useState<Date>()

  const label = from
    ? to
      ? `${format(from, "LLL dd")} – ${format(to, "LLL dd, y")}`
      : format(from, "LLL dd, y")
    : "Pick a date range"

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !from && "text-muted-foreground"
            )}
          />
        }
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {label}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={from && to ? { from, to } : undefined}
          onSelect={(range) => {
            if (range && "from" in range) {
              setFrom(range.from)
              setTo(range.to)
            }
          }}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}

/** A date range picker showing two months. */
export const DateRange: Story = {
  render: () => <DateRangeDemo />,
}
