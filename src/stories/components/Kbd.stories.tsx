import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Kbd, KbdGroup } from "@/components/ui/kbd"

/** Renders a keyboard shortcut badge. Useful for documenting hotkeys and shortcuts. */
const meta = {
  title: "Components/Kbd",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** A single keyboard key. */
export const Default: Story = {
  render: () => <Kbd>⌘</Kbd>,
}

/** A grouped shortcut with multiple keys. */
export const GroupedShortcut: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        Copy
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>C</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        Paste
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>V</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        Undo
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>Z</Kbd>
        </KbdGroup>
      </div>
    </div>
  ),
}
