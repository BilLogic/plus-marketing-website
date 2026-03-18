import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

/** Accordion displays collapsible content panels for presenting information in a limited space. */
const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

/** Component overview for designers and coding agents. */
export const Overview: Story = {
  render: () => (
    <div className="max-w-2xl space-y-8 p-6">
      <div>
        <h2 className="text-lg font-semibold">Accordion</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A vertically stacked set of interactive headings that each reveal a section of content.
        </p>
      </div>

      <div className="space-y-1 text-xs text-muted-foreground">
        <p><strong className="text-foreground">Source:</strong> src/components/ui/accordion.tsx</p>
        <p><strong className="text-foreground">Import:</strong> <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">{"import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from \"@/components/ui/accordion\""}</code></p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs font-semibold text-foreground">When to use</p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>FAQ sections on marketing pages</li>
            <li>Settings panels with grouped options</li>
            <li>Progressive disclosure of complex content</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs font-semibold text-foreground">When NOT to use</p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>Navigation menus — use NavigationMenu</li>
            <li>Single collapsible — use Collapsible</li>
            <li>Tabbed content — use Tabs</li>
          </ul>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold">Sub-components</p>
        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">Accordion</code> — Root container, manages open state</p>
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">AccordionItem</code> — Individual collapsible section</p>
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">AccordionTrigger</code> — Clickable header</p>
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">AccordionContent</code> — Expandable body</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold">Example</p>
        <div className="mt-3">
          <Accordion value={[0]}>
            <AccordionItem>
              <AccordionTrigger>What are your shipping options?</AccordionTrigger>
              <AccordionContent>
                We offer standard (5-7 days), express (2-3 days), and overnight shipping.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                Returns are accepted within 30 days of purchase.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  ),
}

/** Default accordion with the first item expanded. */
export const Default: Story = {
  render: () => (
    <Accordion value={[0]}>
      <AccordionItem>
        <AccordionTrigger>What are your shipping options?</AccordionTrigger>
        <AccordionContent>
          We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free shipping on
          international orders.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>
          Returns are accepted within 30 days of purchase. Items must be in original condition with
          tags attached.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
        <AccordionContent>
          You can reach our support team via email, live chat, or phone 24/7 for all plans.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/** All items collapsed by default. */
export const AllCollapsed: Story = {
  render: () => (
    <Accordion>
      <AccordionItem>
        <AccordionTrigger>What are your shipping options?</AccordionTrigger>
        <AccordionContent>
          We offer standard (5-7 days), express (2-3 days), and overnight shipping.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>
          Returns are accepted within 30 days of purchase.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
        <AccordionContent>
          You can reach our support team via email, live chat, or phone 24/7.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/** Accordion with visible border styling. */
export const Bordered: Story = {
  render: () => (
    <Accordion value={[0]} className="divide-y divide-border/60 rounded-xl border">
      <AccordionItem>
        <AccordionTrigger className="px-4 py-3 text-left text-sm font-medium">
          What are your shipping options?
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4 pt-0 text-xs text-muted-foreground">
          We offer standard (5-7 days), express (2-3 days), and overnight shipping.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger className="px-4 py-3 text-left text-sm font-medium">
          What is your return policy?
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4 pt-0 text-xs text-muted-foreground">
          Returns are accepted within 30 days of purchase.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
