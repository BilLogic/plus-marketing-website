import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

/** Switch toggles the state of a single setting on or off. */
const meta = {
  title: "components-marketing/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

/** Default switch paired with a label. */
export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane" />
      <Label htmlFor="airplane">Airplane Mode</Label>
    </div>
  ),
}

/** Small variant for compact layouts. */
export const Small: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-sm" size="sm" />
      <Label htmlFor="airplane-sm">Airplane Mode</Label>
    </div>
  ),
}
