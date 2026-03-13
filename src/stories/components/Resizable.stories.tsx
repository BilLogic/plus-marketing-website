import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

/** A group of panels that can be resized by dragging a handle between them. */
const meta = {
  title: "components-misc/Resizable",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Two resizable panels side by side. */
export const Horizontal: Story = {
  render: () => (
    <div className="w-[500px]">
      <ResizablePanelGroup className="rounded-lg border">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-40 items-center justify-center p-6">
            <span className="font-semibold">Panel One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-40 items-center justify-center p-6">
            <span className="font-semibold">Panel Two</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

/** Vertically stacked resizable panels. */
export const Vertical: Story = {
  render: () => (
    <div className="w-[500px]">
      <ResizablePanelGroup className="rounded-lg border">
        <ResizablePanel defaultSize={40}>
          <div className="flex h-24 items-center justify-center p-6">
            <span className="font-semibold">Top</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60}>
          <div className="flex h-24 items-center justify-center p-6">
            <span className="font-semibold">Bottom</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

/** A three-panel layout with a nested vertical split. */
export const ThreePanels: Story = {
  render: () => (
    <div className="w-[600px]">
      <ResizablePanelGroup className="rounded-lg border">
        <ResizablePanel defaultSize={25}>
          <div className="flex h-48 items-center justify-center p-6">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup>
            <ResizablePanel defaultSize={60}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Main</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Console</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}
