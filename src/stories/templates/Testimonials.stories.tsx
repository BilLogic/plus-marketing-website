import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BunduiTestimonialsSection } from "@/components/registry/bundui/testimonials-section"

const meta = {
  title: "Templates/Testimonials",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Bundui-inspired testimonial grid template with Plus typography and tokens. */
export const BunduiTestimonials: Story = {
  render: () => (
    <div className="bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <BunduiTestimonialsSection />
      </div>
    </div>
  ),
}

