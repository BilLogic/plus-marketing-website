import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MailIcon, BellIcon, SettingsIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
  ItemSeparator,
} from "@/components/ui/item"

/** A versatile list-item component for building settings pages, notification lists, and more. */
const meta = {
  title: "Components/Item",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** A single item with icon, title, description, and an action. */
export const Default: Story = {
  render: () => (
    <div className="w-96">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <MailIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Email Notifications</ItemTitle>
          <ItemDescription>
            Receive email updates about your account activity.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Badge variant="secondary">Enabled</Badge>
        </ItemActions>
      </Item>
    </div>
  ),
}

/** Multiple items in a group with separators. */
export const GroupWithSeparators: Story = {
  render: () => (
    <div className="w-96">
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <MailIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Messages</ItemTitle>
            <ItemDescription>Direct messages and mentions.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">Configure</Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item variant="outline">
          <ItemMedia variant="icon">
            <BellIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Alerts</ItemTitle>
            <ItemDescription>System and security alerts.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">Configure</Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item variant="outline">
          <ItemMedia variant="icon">
            <SettingsIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Preferences</ItemTitle>
            <ItemDescription>General app preferences.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">Configure</Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  ),
}

/** Compact size items. */
export const SmallSize: Story = {
  render: () => (
    <div className="w-96">
      <ItemGroup>
        <Item size="sm" variant="muted">
          <ItemMedia variant="icon">
            <MailIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Inbox</ItemTitle>
          </ItemContent>
        </Item>
        <Item size="sm" variant="muted">
          <ItemMedia variant="icon">
            <BellIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Notifications</ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  ),
}
