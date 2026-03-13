import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

/** Slide-in panel for secondary tasks on mobile and desktop. */
const meta = {
  title: "components-marketing/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>

export default meta

type Story = StoryObj<typeof meta>

/** Marketing drawer used for plan comparison and upsell flows. */
export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open pricing drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Compare plans</DrawerTitle>
          <DrawerDescription>
            Quickly scan the differences between Starter, Growth, and Scale without leaving the
            current page.
          </DrawerDescription>
        </DrawerHeader>
        <div className="space-y-3 px-4 pb-4 text-sm text-muted-foreground">
          <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card/60 px-3 py-2">
            <span className="font-medium text-foreground">Starter</span>
            <span>$19 / mo</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-primary/70 bg-primary/5 px-3 py-2">
            <span className="font-medium text-foreground">Growth</span>
            <span>$49 / mo</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card/60 px-3 py-2">
            <span className="font-medium text-foreground">Scale</span>
            <span>$99 / mo</span>
          </div>
        </div>
        <DrawerFooter>
          <Button className="w-full">Choose Growth</Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Keep browsing
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

