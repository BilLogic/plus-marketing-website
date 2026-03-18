import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

/** Accessible text labels paired with form controls. */
const meta = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

/** Standard label and input pairing for a marketing signup form. */
export const Default: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="company">Company name</Label>
      <Input id="company" placeholder="Acme Inc." />
    </div>
  ),
}

