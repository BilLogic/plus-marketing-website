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
  title: "Components/Card",
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

/** Component overview for designers and coding agents. */
export const Overview: Story = {
  render: () => (
    <div className="max-w-2xl space-y-8 p-6">
      <div>
        <h2 className="text-lg font-semibold">Card</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A container that groups related content and actions with consistent spacing and elevation.
        </p>
      </div>

      <div className="space-y-1 text-xs text-muted-foreground">
        <p><strong className="text-foreground">Source:</strong> src/components/ui/card.tsx</p>
        <p><strong className="text-foreground">Import:</strong> <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">{"import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from \"@/components/ui/card\""}</code></p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs font-semibold text-foreground">When to use</p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>Feature highlights on landing pages</li>
            <li>Pricing tiers and plan comparisons</li>
            <li>Dashboard widgets and stat panels</li>
            <li>Form containers in settings pages</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs font-semibold text-foreground">When NOT to use</p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>Modal content — use Dialog</li>
            <li>Inline alerts — use Alert</li>
            <li>Navigation items — use sidebar or nav components</li>
          </ul>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold">Sub-components</p>
        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">Card</code> — Root container with border and background</p>
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">CardHeader</code> — Top section with title and description</p>
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">CardTitle</code> — Heading element</p>
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">CardDescription</code> — Subheading / helper text</p>
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">CardContent</code> — Main body area</p>
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">CardFooter</code> — Bottom section for actions</p>
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">CardAction</code> — Header-level action slot</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold">Example</p>
        <div className="mt-3">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content goes here.</p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  ),
}

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

/** A card with only content, no header or footer. */
export const ContentOnly: Story = {
  render: () => (
    <Card>
      <CardContent className="pt-6">
        <p>A minimal card with just content. Useful for simple stat displays or compact widgets.</p>
      </CardContent>
    </Card>
  ),
}
