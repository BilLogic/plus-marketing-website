import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DirectionProvider, useDirection } from "@/components/ui/direction"
import { Button } from "@/components/ui/button"

/** A context provider for controlling text direction (LTR/RTL). Wrap your app or section to support internationalized layouts. */
const meta = {
  title: "Components/Direction",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const DirectionDemo = () => {
  const direction = useDirection()
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border p-6">
      <p className="text-sm text-muted-foreground">
        Current direction: <strong>{direction ?? "inherit"}</strong>
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Previous</Button>
        <Button size="sm">Next</Button>
      </div>
    </div>
  )
}

/** LTR direction (default for English and most Western languages). */
export const LTR: Story = {
  render: () => (
    <DirectionProvider direction="ltr">
      <DirectionDemo />
    </DirectionProvider>
  ),
}

/** RTL direction for Arabic, Hebrew, and other right-to-left languages. */
export const RTL: Story = {
  render: () => (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <DirectionDemo />
      </div>
    </DirectionProvider>
  ),
}
