import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

/** Collapsible region for showing and hiding supplemental content. */
const meta = {
  title: "components-misc/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Collapsible>

export default meta

type Story = StoryObj<typeof meta>

/** Simple collapsible block with a button trigger and paragraph content. */
export const Default: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-muted">
        Toggle details
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3 max-w-sm rounded-xl border border-border bg-card/70 p-4 text-sm text-muted-foreground">
        Use a collapsible when you want to tuck away secondary information without leaving the
        current context—like product details, changelog notes, or advanced filters.
      </CollapsibleContent>
    </Collapsible>
  ),
}

