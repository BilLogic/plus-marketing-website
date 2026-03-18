import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
} from "@/components/ui/native-select"

/** A native HTML select element styled to match the design system. Useful when a lightweight dropdown is preferred over the custom Select. */
const meta = {
  title: "Components/NativeSelect",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** A simple native select with a few options. */
export const Default: Story = {
  render: () => (
    <NativeSelect defaultValue="react">
      <NativeSelectOption value="react">React</NativeSelectOption>
      <NativeSelectOption value="vue">Vue</NativeSelectOption>
      <NativeSelectOption value="svelte">Svelte</NativeSelectOption>
      <NativeSelectOption value="angular">Angular</NativeSelectOption>
    </NativeSelect>
  ),
}

/** A small-sized native select. */
export const Small: Story = {
  render: () => (
    <NativeSelect size="sm" defaultValue="USD">
      <NativeSelectOption value="USD">USD</NativeSelectOption>
      <NativeSelectOption value="EUR">EUR</NativeSelectOption>
      <NativeSelectOption value="GBP">GBP</NativeSelectOption>
    </NativeSelect>
  ),
}

/** A native select with option groups. */
export const WithGroups: Story = {
  render: () => (
    <NativeSelect defaultValue="banana">
      <NativeSelectOptGroup label="Fruits">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Vegetables">
        <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
        <NativeSelectOption value="broccoli">Broccoli</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
}
