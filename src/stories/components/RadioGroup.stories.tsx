import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

/** RadioGroup lets the user select one option from a set of mutually exclusive choices. */
const meta = {
  title: "components-marketing/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Default radio group with three options. */
export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="option-1" />
        <Label htmlFor="option-1">Option One</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="option-2" />
        <Label htmlFor="option-2">Option Two</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" id="option-3" />
        <Label htmlFor="option-3">Option Three</Label>
      </div>
    </RadioGroup>
  ),
}
