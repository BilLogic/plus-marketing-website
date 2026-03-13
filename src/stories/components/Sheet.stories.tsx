import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/** A panel that slides in from the edge of the screen, typically used for navigation or forms. */
const meta = {
  title: "components-marketing/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

const BaseRightSheet = () => (
  <Sheet>
    <SheetTrigger className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-muted">
      Open Sheet
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Sheet Title</SheetTitle>
        <SheetDescription>
          This is a description of what this sheet is for.
        </SheetDescription>
      </SheetHeader>
      <div className="p-4">
        <p className="text-sm text-muted-foreground">Sheet body content goes here.</p>
      </div>
      <SheetFooter>
        <Button>Save changes</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
)

const BaseLeftSheet = () => (
  <Sheet>
    <SheetTrigger className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-muted">
      Open Sheet
    </SheetTrigger>
    <SheetContent side="left">
      <SheetHeader>
        <SheetTitle>Left Sheet</SheetTitle>
        <SheetDescription>
          This sheet slides in from the left side of the screen.
        </SheetDescription>
      </SheetHeader>
      <div className="p-4">
        <p className="text-sm text-muted-foreground">Sheet body content goes here.</p>
      </div>
      <SheetFooter>
        <Button>Save changes</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
)

/** Overview of sheet patterns across registries. */
export const Overview: Story = {
  render: () => (
    <Tabs defaultValue="shadcn">
      <TabsList variant="line" className="mb-4 w-full justify-start">
        <TabsTrigger value="shadcn">Base (shadcn)</TabsTrigger>
        <TabsTrigger value="tailark">Tailark</TabsTrigger>
        <TabsTrigger value="bundui">Bundui</TabsTrigger>
      </TabsList>

      <TabsContent value="shadcn">
        <BaseRightSheet />
      </TabsContent>

      <TabsContent value="tailark">
        <BaseLeftSheet />
      </TabsContent>

      <TabsContent value="bundui">
        <div className="rounded-3xl border border-border/70 bg-background/80 px-4 py-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Bundui-style filter sheet
          </p>
          <Sheet>
            <SheetTrigger className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-muted">
              Open filters
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Inspired by Bundui off-canvas filters for marketing and content pages.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-3 p-4 text-xs text-muted-foreground">
                <p>Use this pattern for filters, comparison controls, or secondary navigation.</p>
              </div>
              <SheetFooter>
                <Button size="sm">Apply</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

/** A sheet that slides in from the right (default). */
export const Default: Story = {
  render: () => (
    <BaseRightSheet />
  ),
}

/** A sheet that slides in from the left side. */
export const Left: Story = {
  render: () => (
    <BaseLeftSheet />
  ),
}
