import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/** A modal dialog that interrupts the user with important content and expects a response. */
const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

/** Component overview for designers and coding agents. */
export const Overview: Story = {
  render: () => (
    <div className="max-w-2xl space-y-8 p-6">
      <div>
        <h2 className="text-lg font-semibold">Dialog</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A modal overlay that interrupts the user flow to require acknowledgment or input.
        </p>
      </div>

      <div className="space-y-1 text-xs text-muted-foreground">
        <p><strong className="text-foreground">Source:</strong> src/components/ui/dialog.tsx</p>
        <p><strong className="text-foreground">Import:</strong> <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">{"import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from \"@/components/ui/dialog\""}</code></p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs font-semibold text-foreground">When to use</p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>Forms that need focused attention (edit profile, create item)</li>
            <li>Confirmation before destructive actions</li>
            <li>Detailed content previews</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs font-semibold text-foreground">When NOT to use</p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>Simple yes/no — use AlertDialog</li>
            <li>Slide-over panels — use Sheet or Drawer</li>
            <li>Inline editing — edit in place</li>
          </ul>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold">Sub-components</p>
        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">Dialog</code> — Root, manages open/close state</p>
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">DialogTrigger</code> — Element that opens the dialog</p>
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">DialogContent</code> — The modal panel with backdrop</p>
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">DialogHeader</code> — Title and description wrapper</p>
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">DialogTitle</code> — Accessible heading</p>
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">DialogDescription</code> — Supporting text</p>
          <p><code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">DialogFooter</code> — Action buttons area</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold">Example</p>
        <div className="mt-3">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              Open Dialog
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>
                  This is a description of the dialog content.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  ),
}

/** A dialog with a form for editing profile information. */
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Edit Profile
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/** A confirmation dialog for destructive actions. */
export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" />}>
        Delete Account
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
