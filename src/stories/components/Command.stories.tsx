import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

/** Command palette surface for power users and quick navigation. */
const meta = {
  title: "Components/Command",
  component: Command,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Command>

export default meta

type Story = StoryObj<typeof meta>

/** Simple command dialog with grouped marketing actions. */
export const Default: Story = {
  render: () => (
    <CommandDialog open>
      <Command>
        <CommandInput placeholder="Search commands..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem>
              Go to home
              <CommandShortcut>G H</CommandShortcut>
            </CommandItem>
            <CommandItem>
              Open pricing
              <CommandShortcut>G P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem>Start new experiment</CommandItem>
            <CommandItem>Invite teammate</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
}

