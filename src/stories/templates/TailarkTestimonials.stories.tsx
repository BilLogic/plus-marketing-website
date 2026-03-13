import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { TailarkTestimonialsSection } from "@/components/registry/tailark/testimonials-section"

const meta = {
  title: "Templates/TestimonialsTailark",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Tailark-inspired testimonial template. */
export const TailarkTestimonials: Story = {
  render: () => <TailarkTestimonialsSection />,
}

