import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { toast } from "sonner"

import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"

/** Application-level toast notifications wired through Sonner. */
const meta = {
  title: "Components/Toast",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta

type Story = StoryObj

/** Showcase of success, info, warning, and error toast variants. */
export const Variants: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap items-center gap-3">
        <Button
          size="sm"
          onClick={() =>
            toast.success("Workspace created", {
              description: "You can now invite teammates and connect your tools.",
            })
          }
        >
          Success
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toast("Heads up", {
              description: "This action will affect all active experiments.",
            })
          }
        >
          Info
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toast.warning("High traffic spike", {
              description: "Traffic is 3.2x your baseline over the last hour.",
            })
          }
        >
          Warning
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() =>
            toast.error("Billing failed", {
              description: "Update your payment method to avoid interruptions.",
            })
          }
        >
          Error
        </Button>
      </div>
    </>
  ),
}

