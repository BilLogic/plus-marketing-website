import { cn } from "@/lib/utils"
import { marketingTypography } from "@/lib/marketing-typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type BunduiTestimonial = {
  name: string
  role: string
  company: string
  quote: string
  avatarUrl?: string
}

type BunduiTestimonialsSectionProps = {
  testimonials?: BunduiTestimonial[]
  className?: string
  sectionLabel?: string
  sectionTitle?: string
  sectionDescription?: string
}

/** Bundui-inspired testimonial grid for social proof. */
const BunduiTestimonialsSection = ({
  testimonials = [
    {
      name: "Ava Chen",
      role: "Founder",
      company: "Studio North",
      quote:
        "Plus lets us remix Bundui, Tailark, and Cult UI blocks without breaking our design system.",
    },
    {
      name: "Jordan Lee",
      role: "Head of Growth",
      company: "Orbit",
      quote:
        "Storybook previews connected to real registry components have cut our launch time in half.",
    },
    {
      name: "Maya Patel",
      role: "Design Lead",
      company: "Lumen",
      quote:
        "Marketing, design, and engineering finally work from the same source of truth for components.",
    },
  ],
  className,
  sectionLabel = "Testimonials",
  sectionTitle = "Teams shipping better marketing sites with Plus.",
  sectionDescription = "Inspired by Bundui marketing testimonial layouts and adapted to our token system.",
}: BunduiTestimonialsSectionProps) => {
  return (
    <section
      className={cn(
        "rounded-3xl border border-border/70 bg-background/80 p-5 sm:p-6",
        className
      )}
    >
      <header className="max-w-2xl space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {sectionLabel}
        </p>
        <h2 className={marketingTypography.h2}>{sectionTitle}</h2>
        <p className={marketingTypography.lead}>{sectionDescription}</p>
      </header>
      <div className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="flex h-full flex-col justify-between rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm sm:p-6"
          >
            <blockquote
              className={cn(marketingTypography.body, "text-muted-foreground")}
            >
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <Avatar className="size-8">
                {testimonial.avatarUrl ? (
                  <AvatarImage src={testimonial.avatarUrl} alt="" />
                ) : null}
                <AvatarFallback>{testimonial.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-xs">
                <p className="font-medium text-foreground">{testimonial.name}</p>
                <p className="text-muted-foreground">
                  {testimonial.role} · {testimonial.company}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export { BunduiTestimonialsSection }

