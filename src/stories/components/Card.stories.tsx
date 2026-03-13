import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

/** A container for grouping related content and actions. */
const meta = {
  title: "components-marketing/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[380px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/** A standard card with header, content, and footer. */
export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. This is a paragraph inside the card body.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
}

/** A compact card using the small size variant. */
export const SmallSize: Story = {
  render: () => (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. This is a paragraph inside the card body.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
}

/** A card with an action button in the header area. */
export const WithAction: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. This is a paragraph inside the card body.</p>
      </CardContent>
    </Card>
  ),
}
