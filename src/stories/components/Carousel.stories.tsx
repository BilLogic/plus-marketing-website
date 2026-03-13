import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    name: "Ava, Founder at Studio North",
    quote: "Plus turned our launch into a repeatable playbook instead of a one-off fire drill.",
  },
  {
    name: "Liam, Head of Growth at Orbit",
    quote: "We ship more experiments every week without losing the craft in the UI.",
  },
  {
    name: "Jade, Marketing Lead at Lumen",
    quote: "Design and data finally live in the same place. The team actually enjoys iterating now.",
  },
]

/** Embla-powered carousel used for testimonials, logos, and product shots. */
const meta = {
  title: "components-marketing/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Carousel>

export default meta

type Story = StoryObj<typeof meta>

/** Testimonial slider with previous/next controls. */
export const Testimonials: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <Carousel>
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.name}>
              <figure className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm">
                <blockquote className="text-sm text-muted-foreground">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-medium text-foreground">
                  {testimonial.name}
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}

