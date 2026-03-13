import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type TailarkTestimonial = {
  name: string
  role: string
  company: string
  quote: string
}

type TailarkTestimonialsSectionProps = {
  testimonials?: TailarkTestimonial[]
  className?: string
}

/** Tailark-inspired testimonial section with subtle dividers. */
const TailarkTestimonialsSection = ({
  testimonials = [
    {
      name: "Ada Stone",
      role: "Growth Lead",
      company: "Northwind",
      quote:
        "Tailark patterns inside Plus help us move from moodboards to live experiments in days.",
    },
    {
      name: "Leo Park",
      role: "Design Director",
      company: "Helio",
      quote:
        "Our marketing pages finally share the same components as our product, without losing polish.",
    },
  ],
  className,
}: TailarkTestimonialsSectionProps) => {
  return (
    <section
      className={cn(
        "border-border/60 bg-background/60 py-16 sm:py-20 md:py-24",
        className
      )}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <header className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Testimonials
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Tailark-style social proof for your hero and pricing pages.
          </h2>
        </header>

        <div className="mt-8 divide-y divide-border/70 rounded-3xl border border-border/70 bg-card/80">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="flex gap-4 p-6 text-sm">
              <Avatar className="mt-1 size-9">
                <AvatarFallback>{testimonial.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <blockquote className="text-sm text-muted-foreground">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{testimonial.name}</span> ·{" "}
                  {testimonial.role} at {testimonial.company}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export { TailarkTestimonialsSection }

