import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Quote } from "lucide-react"
import { fetchSuccessStoryById } from "@/lib/notion/queries/success-stories"
import { formatMarketingLongDate } from "@/lib/format-marketing-date"
import { marketingListingShellClass } from "@/lib/marketing-layout"
import { marketingSectionLeadColorClass } from "@/lib/marketing-section-layout"
import {
  successStoriesBackArrowClass,
  successStoriesBackToIndexLinkClass,
} from "@/lib/success-stories-link-classes"
import { cn } from "@/lib/utils"
import { MarkdownRenderer } from "./markdown-renderer"

export const revalidate = 3600

/** Long-form body from Notion — mirrors About / listing section H2, card H3, and lead grey (`#62636C`). */
const successStoryBodyFromMarkdownClass = cn(
  "text-base leading-relaxed",
  "[&_h1]:w-full [&_h1]:max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-teal-950 dark:[&_h1]:text-white sm:[&_h1]:text-3xl md:[&_h1]:text-4xl [&_h1]:mb-4 [&_h1]:mt-10 [&_h1]:first:mt-0",
  "[&_h2]:w-full [&_h2]:max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-teal-950 dark:[&_h2]:text-white sm:[&_h2]:text-3xl md:[&_h2]:text-4xl [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:first:mt-0",
  "[&_h3]:text-pretty [&_h3]:text-lg [&_h3]:font-bold [&_h3]:leading-snug [&_h3]:tracking-tight [&_h3]:text-teal-950 dark:[&_h3]:text-white sm:[&_h3]:text-xl lg:[&_h3]:text-2xl [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:first:mt-0",
  "[&_p]:text-pretty [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-[#62636C] dark:[&_p]:text-white/90 [&_p]:mb-4 [&_p]:last:mb-0",
  "[&_strong]:font-semibold [&_strong]:text-teal-950 dark:[&_strong]:text-white",
  "[&_a]:font-medium [&_a]:text-[#027f89] [&_a]:underline-offset-4 hover:[&_a]:underline",
  "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-[#62636C] dark:[&_ul]:text-white/90",
  "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-[#62636C] dark:[&_ol]:text-white/90",
  "[&_li]:mb-1 [&_li]:marker:text-[#e598c8] dark:[&_li]:marker:text-[#ebb4d4]",
  /* Pull quotes — no border (prose default adds a left rule). */
  "[&_blockquote]:my-6 [&_blockquote]:rounded-2xl [&_blockquote]:border-0 [&_blockquote]:border-l-0 [&_blockquote]:bg-[#FFF5FB]/80 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:not-italic [&_blockquote]:shadow-none dark:[&_blockquote]:bg-[#C6009C]/10",
  "[&_blockquote]:text-[#4a4a4a] dark:[&_blockquote]:text-white/90",
  "[&_blockquote_p]:mb-2 [&_blockquote_p]:last:mb-0",
  "[&_hr]:my-10 [&_hr]:border-border/50",
  "[&_img]:my-6 [&_img]:max-h-[28rem] [&_img]:w-full [&_img]:rounded-2xl [&_img]:object-cover",
  "[&_pre]:my-4 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:text-sm",
)

export default async function SuccessStoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const story = await fetchSuccessStoryById(id)

  if (!story) {
    notFound()
  }

  const dateLine = formatMarketingLongDate(story.publishedDate)
  const metaLine =
    dateLine !== null ? `${story.category} • ${dateLine}.` : story.category

  return (
    <main className="bg-background text-foreground">
      <div className={marketingListingShellClass}>
        <Link href="/success-stories" className={successStoriesBackToIndexLinkClass}>
          <ArrowLeft className={successStoriesBackArrowClass} aria-hidden />
          Back to Success Stories
        </Link>

        <article className="flex flex-col gap-8 sm:gap-10">
          {story.coverImage && (
            <div className="overflow-hidden rounded-[30px] ring-1 ring-teal-950/10 dark:ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={story.coverImage}
                alt=""
                className="aspect-video w-full object-cover"
              />
            </div>
          )}

          <header className="w-full min-w-0 max-w-none space-y-3">
            <p
              className={cn(
                "w-full max-w-none text-sm sm:text-base",
                marketingSectionLeadColorClass,
              )}
            >
              {metaLine}
            </p>
            <h1 className="w-full max-w-none text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
              {story.title}
            </h1>
            {story.summary ? (
              <p
                className={cn(
                  "w-full max-w-none text-base leading-relaxed lg:text-lg",
                  marketingSectionLeadColorClass,
                )}
              >
                {story.summary}
              </p>
            ) : null}
          </header>

          {story.quote ? (
            <blockquote
              className={cn(
                "flex gap-3 rounded-[30px] bg-[#FFF5FB] p-5 sm:p-6 dark:bg-[#C6009C]/10",
              )}
            >
              <Quote
                className="mt-0.5 size-5 shrink-0 text-[#C6009C] dark:text-[#e879a9]"
                aria-hidden
              />
              <div className="min-w-0">
                <p className="text-pretty text-base italic leading-relaxed text-teal-950 dark:text-white/90">
                  {story.quote}
                </p>
                {story.quoteAttribution ? (
                  <p
                    className={cn(
                      "mt-3 text-sm sm:text-base",
                      marketingSectionLeadColorClass,
                    )}
                  >
                    — {story.quoteAttribution}
                  </p>
                ) : null}
              </div>
            </blockquote>
          ) : null}

          {story.content ? (
            <div className={successStoryBodyFromMarkdownClass}>
              <MarkdownRenderer content={story.content} />
            </div>
          ) : null}
        </article>
      </div>
    </main>
  )
}
