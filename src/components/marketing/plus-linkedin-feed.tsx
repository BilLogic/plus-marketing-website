import { cn } from "@/lib/utils"
import { marketingSectionIntroColumnClass } from "@/lib/marketing-section-layout"
import { PLUS_LINKEDIN_EMBEDS } from "@/components/marketing/plus-linkedin-embeds"

/**
 * Homepage "Latest from LinkedIn" feed.
 *
 * Renders LinkedIn's official post embeds (iframes) from `PLUS_LINKEDIN_EMBEDS`.
 * Returns null while the list is empty so we never ship an empty section.
 */
export const PlusLinkedInFeedSection = () => {
  const embeds = PLUS_LINKEDIN_EMBEDS.filter(Boolean)
  if (embeds.length === 0) return null

  return (
    <section id="linkedin" className="relative">
      <div className="relative w-full text-left">
        <div className={marketingSectionIntroColumnClass}>
          <h2 className="text-heading-lg text-(--ds-text-accent-teal-bolder) sm:text-heading-xl md:text-heading-xxl">
            Latest from LinkedIn
          </h2>
          <p className="max-w-2xl text-body-lg text-muted-foreground">
            Follow along with the latest updates from the PLUS team.
          </p>
        </div>
      </div>
      <div
        className={cn(
          "mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2",
          embeds.length >= 3 && "lg:grid-cols-3",
        )}
      >
        {embeds.map((src) => (
          <iframe
            key={src}
            src={src}
            title="LinkedIn post"
            loading="lazy"
            frameBorder={0}
            allowFullScreen
            className="h-[560px] w-full rounded-(--ds-radius-xl) border border-border bg-(--ds-surface)"
          />
        ))}
      </div>
      <div className="mt-6">
        <a
          href="https://www.linkedin.com/company/plus-tutors"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-full bg-(--ds-background-accent-blue-bolder) px-8 text-body-default font-medium text-(--ds-text-inverse) no-underline hover:bg-(--ds-background-accent-blue-bolder-hovered) sm:text-body-lg"
        >
          Follow PLUS on LinkedIn
        </a>
      </div>
    </section>
  )
}
