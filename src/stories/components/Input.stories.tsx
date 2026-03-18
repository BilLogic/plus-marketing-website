import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/** A text input field for forms. */
const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[320px] space-y-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

/** Component overview for designers and coding agents. */
export const Overview: Story = {
  render: () => (
    <div className="max-w-2xl space-y-8 p-6">
      <div>
        <h2 className="text-lg font-semibold">Input</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A single-line text field for collecting user input in forms.
        </p>
      </div>

      <div className="space-y-1 text-xs text-muted-foreground">
        <p><strong className="text-foreground">Source:</strong> src/components/ui/input.tsx</p>
        <p><strong className="text-foreground">Import:</strong> <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">{"import { Input } from \"@/components/ui/input\""}</code></p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs font-semibold text-foreground">When to use</p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>Text, email, password, and number fields</li>
            <li>Search bars and filter inputs</li>
            <li>URL and file path entry</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs font-semibold text-foreground">When NOT to use</p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>Multi-line text — use Textarea</li>
            <li>Selection from options — use Select or Combobox</li>
            <li>OTP codes — use InputOTP</li>
          </ul>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold">States</p>
        <div className="mt-3 space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Default</Label>
            <Input placeholder="Enter text..." className="mt-1" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Disabled</Label>
            <Input placeholder="Disabled" disabled className="mt-1" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Error</Label>
            <Input placeholder="Invalid input" aria-invalid="true" className="mt-1" />
          </div>
        </div>
      </div>
    </div>
  ),
}

/** A basic text input with placeholder. */
export const Default: Story = {
  args: {
    placeholder: "Email",
  },
}

/** An input paired with a label. */
export const WithLabel: Story = {
  render: () => (
    <>
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="Email" />
    </>
  ),
}

/** A disabled input that cannot be interacted with. */
export const Disabled: Story = {
  args: {
    placeholder: "Email",
    disabled: true,
  },
}

/** An input in the error state using aria-invalid. */
export const ErrorState: Story = {
  render: () => (
    <div className="space-y-1.5">
      <Label htmlFor="email-error">Email</Label>
      <Input id="email-error" placeholder="Email" aria-invalid="true" defaultValue="not-an-email" />
      <p className="text-xs text-destructive">Please enter a valid email address.</p>
    </div>
  ),
}

/** A file upload input. */
export const FileUpload: Story = {
  args: {
    type: "file",
  },
}

/** A password input with masked characters. */
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Password",
  },
}
