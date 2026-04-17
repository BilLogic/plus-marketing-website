import type { Metadata } from "next"
import type { ComponentType } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart3, BookOpen, Calendar, Newspaper, Users, Zap } from "lucide-react"
import { fetchNews } from "@/lib/notion/queries/news"
import type { NewsItem } from "@/lib/notion/types"

export const metadata: Metadata = {
  title: "News — PLUS",
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

function NewsCard({ item }: { item: NewsItem }) {
  const Icon = NEWS_CATEGORY_ICON[item.category] ?? Newspaper
  const href = item.externalLink ?? `/about/news/${item.id}`
  const rawBlurb = item.marketingBlurb ?? item.summary
  const blurb = rawBlurb?.startsWith("(TBD") ? null : rawBlurb

  return (
    <article className="flex w-full flex-col rounded-3xl bg-[#FFF1C7] p-5 dark:bg-amber-950/20 sm:p-6">
      <div className="flex gap-3 text-lg font-bold leading-snug tracking-tight sm:text-xl lg:text-2xl">
        <span className="mt-[calc((1lh-2.5rem)/2)] flex size-10 shrink-0 items-center justify-center rounded-full bg-[#A27707] text-white">
          <Icon className="size-5" aria-hidden />
        </span>
        <h2 className="min-w-0 text-pretty text-lg font-bold leading-snug tracking-tight text-[#9A6D00] dark:text-amber-200 sm:text-xl lg:text-2xl">
          {item.title}
        </h2>
      </div>
      {item.featuredImage ? (
        <div className="relative mt-4 min-h-[280px] flex-1 overflow-hidden rounded-2xl bg-muted sm:min-h-[360px] lg:min-h-[420px]">
          <Image
            src={item.featuredImage}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      ) : blurb ? (
        <p className="mt-4 flex-1 text-pretty text-base leading-relaxed text-teal-900/80 dark:text-amber-100/80">
          {blurb}
        </p>
      ) : null}
      <Link
        href={href}
        className="group ml-auto mt-4 inline-flex cursor-pointer items-center gap-2 text-lg font-medium text-[#9A6D00] no-underline transition-opacity hover:opacity-90 dark:text-amber-200"
        aria-label={`Read more about ${item.title}`}
        {...(item.externalLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span>Read more</span>
        <ArrowRight className="size-6 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </article>
  )
}

export default async function NewsPage() {
  const news = await fetchNews()

  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 pb-8 pt-14 sm:gap-12 sm:pb-12 sm:pt-16 lg:gap-16 lg:pb-16 lg:pt-20">
        <div className="space-y-3">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
            News
          </h1>
          <p className="w-full max-w-none text-pretty text-base text-teal-900/75 lg:text-lg dark:text-white/90">
            Latest updates, media coverage, and announcements from PLUS.
          </p>
        </div>

        {news.length === 0 ? (
          <div className="rounded-3xl bg-[#FFF1C7] p-5 dark:bg-amber-950/20 sm:p-6">
            <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
              No news articles yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
            {news.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
