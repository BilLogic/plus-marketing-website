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
          <h2 className="text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
            Latest from LinkedIn
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground lg:text-lg">
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
            className="h-[560px] w-full rounded-[20px] border border-border bg-white"
          />
        ))}
      </div>
      <div className="mt-6">
        <a
          href="https://www.linkedin.com/company/plus-tutors"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-full bg-blue-800 px-8 text-sm font-medium text-white no-underline hover:bg-blue-900 sm:text-base"
        >
          Follow PLUS on LinkedIn
        </a>
      </div>
    </section>
  )
}
