import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldContent,
  FieldTitle,
} from "@/components/ui/field"

/** Composable form field primitives that handle labels, descriptions, and validation errors. */
const meta = {
  title: "Components/Field",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** A basic field with label, input, and description. */
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Field>
        <FieldLabel>
          <FieldTitle>Email</FieldTitle>
        </FieldLabel>
        <FieldContent>
          <Input type="email" placeholder="you@example.com" />
          <FieldDescription>
            We&apos;ll never share your email with anyone.
          </FieldDescription>
        </FieldContent>
      </Field>
    </div>
  ),
}

/** A field showing a validation error. */
export const WithError: Story = {
  render: () => (
    <div className="w-80">
      <Field data-invalid="true">
        <FieldLabel>
          <FieldTitle>Username</FieldTitle>
        </FieldLabel>
        <FieldContent>
          <Input defaultValue="ab" aria-invalid="true" />
          <FieldError>Username must be at least 3 characters.</FieldError>
        </FieldContent>
      </Field>
    </div>
  ),
}

/** A horizontal field layout with checkbox. */
export const Horizontal: Story = {
  render: () => (
    <div className="w-80">
      <Field orientation="horizontal">
        <Checkbox id="terms" />
        <FieldLabel htmlFor="terms">
          <FieldContent>
            <FieldTitle>Accept terms</FieldTitle>
            <FieldDescription>
              You agree to our Terms of Service and Privacy Policy.
            </FieldDescription>
          </FieldContent>
        </FieldLabel>
      </Field>
    </div>
  ),
}

/** A fieldset grouping multiple fields with a legend. */
export const FieldSetExample: Story = {
  name: "FieldSet",
  render: () => (
    <div className="w-80">
      <FieldSet>
        <FieldLegend>Account Details</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel>
              <FieldTitle>First Name</FieldTitle>
            </FieldLabel>
            <FieldContent>
              <Input placeholder="Jane" />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>
              <FieldTitle>Last Name</FieldTitle>
            </FieldLabel>
            <FieldContent>
              <Input placeholder="Doe" />
            </FieldContent>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
}
