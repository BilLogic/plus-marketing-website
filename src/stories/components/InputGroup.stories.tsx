import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Mail } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"

/** Input group for pairing fields with inline buttons, icons, and helper text. */
const meta = {
  title: "Components/InputGroup",
  component: InputGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputGroup>

export default meta

type Story = StoryObj<typeof meta>

/** Newsletter signup input with inline submit button and helper text. */
export const NewsletterSignup: Story = {
  render: () => (
    <div className="space-y-2">
      <InputGroup>
        <InputGroupAddon>
          <Mail className="size-4" />
          <InputGroupText>Email</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="you@example.com" aria-label="Email address" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton>Join waitlist</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <p className="text-xs text-muted-foreground">
        Join 3,000+ founders growing faster with Plus.
      </p>
    </div>
  ),
}

/** Input group for inline filters above a marketing table or chart. */
export const InlineFilters: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <InputGroup className="max-w-xs">
        <InputGroupInput placeholder="Search campaigns" />
      </InputGroup>
      <Button variant="outline" size="sm">
        This quarter
      </Button>
      <Button variant="outline" size="sm">
        All channels
      </Button>
    </div>
  ),
}

