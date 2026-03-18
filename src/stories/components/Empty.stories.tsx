import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { InboxIcon, SearchIcon, FileIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"

/** An empty-state placeholder used when a list, table, or view has no content to display. */
const meta = {
  title: "Components/Empty",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Default empty state with an icon, title, description, and action. */
export const Default: Story = {
  render: () => (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No messages</EmptyTitle>
        <EmptyDescription>
          Your inbox is empty. New messages will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Compose</Button>
      </EmptyContent>
    </Empty>
  ),
}

/** An empty search-results state. */
export const SearchResults: Story = {
  render: () => (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          Try adjusting your search or filter to find what you&apos;re looking for.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

/** Minimal empty state without an icon. */
export const Minimal: Story = {
  render: () => (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia>
          <FileIcon className="size-10 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>No files uploaded</EmptyTitle>
        <EmptyDescription>
          Drag and drop files here, or click the button below to upload.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">Upload files</Button>
      </EmptyContent>
    </Empty>
  ),
}
