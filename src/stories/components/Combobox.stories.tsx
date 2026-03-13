import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox"

const frameworks = [
  { label: "Next.js", value: "next" },
  { label: "Remix", value: "remix" },
  { label: "Astro", value: "astro" },
  { label: "Vite", value: "vite" },
]

/** Autocomplete input for selecting from marketing taxonomies or filters. */
const meta = {
  title: "components-marketing/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>

export default meta

type Story = StoryObj<typeof meta>

/** Combobox for selecting a framework with search and empty state. */
export const Default: Story = {
  render: () => (
    <Combobox defaultOpen>
      <ComboboxInput placeholder="Search frameworks..." aria-label="Framework" />
      <ComboboxContent>
        <ComboboxInput placeholder="Search..." aria-label="Search frameworks" />
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxLabel>Frameworks</ComboboxLabel>
          {frameworks.map((framework) => (
            <ComboboxItem key={framework.value} value={framework.value}>
              <ComboboxValue>{framework.label}</ComboboxValue>
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

