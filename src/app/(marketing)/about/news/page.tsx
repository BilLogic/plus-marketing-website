import type { Metadata } from "next"
import type { ComponentType } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart3, BookOpen, Calendar, Newspaper, Users, Zap } from "lucide-react"
import {
  marketingCardIconCircleClass,
  marketingCardLucideGlyphClass,
  marketingCardPaddingClass,
  marketingCardStackGapClass,
  marketingSectionLeadColorClass,
} from "@/lib/marketing-section-layout"
import { fetchNews } from "@/lib/notion/queries/news"
import type { NewsItem } from "@/lib/notion/types"
import { assignNewsSlugs } from "@/lib/notion/utils/news-slug"
import { formatNewsDate } from "@/lib/marketing/news-date"
import { marketingListingShellClass } from "@/lib/marketing-layout"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  description: "Latest updates, media coverage, and announcements from PLUS.",
}

export const revalidate = 60

const NEWS_CATEGORY_ICON: Record<string, ComponentType<{ className?: string }>> = {
  "Media Coverage": Newspaper,
  "Events": Calendar,
  "Partnerships": Users,
  "Research": BarChart3,
  "Product Update": Zap,
  "Others": BookOpen,
}

function NewsCard({ item, slug }: { item: NewsItem; slug: string }) {
  const Icon = NEWS_CATEGORY_ICON[item.category] ?? Newspaper
  const href = item.externalLink ?? `/about/news/${slug}`
  const rawBlurb = item.marketingBlurb ?? item.summary
  const blurb = rawBlurb?.startsWith("(TBD") ? null : rawBlurb
  const date = formatNewsDate(item.publicationDate)

  return (
    <article
      className={cn(
        "flex w-full flex-col rounded-(--ds-radius-xxl) bg-(--ds-background-accent-yellow-subtler)",
        marketingCardPaddingClass,
      )}
    >
      <div className="flex w-full shrink-0 items-start gap-3">
        <span
          className={cn(
            marketingCardIconCircleClass,
            "shrink-0 bg-(--ds-background-accent-yellow-bolder) text-(--ds-text-inverse)",
          )}
        >
          <Icon className={marketingCardLucideGlyphClass} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="pt-[max(0px,calc((48px-1lh)/2))] text-pretty text-heading-sm text-(--ds-text-accent-yellow) sm:text-heading-md lg:text-heading-lg">
            {item.title}
          </h2>
          {item.author || date ? (
            <p className="mt-2 text-body-default font-medium text-(--ds-text-subtle) sm:text-body-lg">
              {item.author ? <span>{item.author}</span> : null}
              {item.author && date ? (
                <span aria-hidden> &middot; </span>
              ) : null}
              {date ? (
                <time dateTime={item.publicationDate}>{date}</time>
              ) : null}
            </p>
          ) : null}
        </div>
      </div>
      {item.featuredImage ? (
        <div className="relative mt-4 min-h-[280px] flex-1 overflow-hidden rounded-(--ds-radius-xl) bg-muted sm:min-h-[360px] lg:min-h-[420px]">
          <Image
            src={item.featuredImage}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      ) : blurb ? (
        <p className="mt-4 flex-1 text-pretty text-body-lg text-(--ds-text-subtle)">
          {blurb}
        </p>
      ) : null}
      <Link
        href={href}
        className="group ml-auto mt-4 inline-flex cursor-pointer items-center gap-2 text-body-default font-medium sm:text-body-lg text-(--ds-text-accent-yellow) no-underline transition-opacity hover:opacity-90"
        aria-label={`View article about ${item.title}`}
        {...(item.externalLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span>View Article</span>
        <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </article>
  )
}

export default async function NewsPage() {
  const news = await fetchNews()
  const newsSlugs = assignNewsSlugs(news)

  return (
    <main className="bg-background text-foreground">
      <div className={marketingListingShellClass}>
        <div className="space-y-3">
          <h1 className="text-balance text-heading-lg text-(--ds-text-accent-teal-bolder) sm:text-heading-xl md:text-heading-xxl">
            News
          </h1>
          <p
            className={cn(
              "w-full max-w-none text-body-lg",
              marketingSectionLeadColorClass,
            )}
          >
            Latest updates, media coverage, and announcements from PLUS.
          </p>
        </div>

        {news.length === 0 ? (
          <div
            className={cn(
              "rounded-(--ds-radius-xl) bg-(--ds-background-accent-yellow-subtler)",
              marketingCardPaddingClass,
            )}
          >
            <p className="text-body-lg text-muted-foreground">
              No news articles yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className={cn("flex flex-col", marketingCardStackGapClass)}>
            {news.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
                slug={newsSlugs.get(item.id) ?? item.id}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
