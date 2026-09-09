import type { Metadata } from "next"
import Link from "next/link"
import { notFound, permanentRedirect } from "next/navigation"
import { marketingListingShellClass } from "@/lib/marketing-layout"
import { fetchNews } from "@/lib/notion/queries/news"
import type { NewsItem } from "@/lib/notion/types"
import {
  isNotionId,
  newsItemForSlug,
  newsSlugFor,
} from "@/lib/notion/utils/news-slug"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const revalidate = 60

/**
 * Resolves the route param against the full set.
 *
 * Slugs are assigned across all articles at once — a UUID prefix is not unique
 * in practice — so a single-page fetch cannot answer this. `fetchNews` is the
 * same cached, revalidated call the listing already makes.
 */
async function resolve(
  slug: string,
): Promise<{ item: NewsItem; canonical: string } | null> {
  const items = await fetchNews()
  const item = newsItemForSlug(items, slug)
  if (!item) return null

  const canonical = newsSlugFor(items, item.id) ?? slug
  return { item, canonical }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const resolved = await resolve(slug)
  if (!resolved) return { title: "News" }

  const { item, canonical } = resolved
  const description =
    item.marketingBlurb || item.summary || "News and media coverage from PLUS."

  return {
    title: item.title,
    description,
    // Always the slug form, so a lingering id URL never competes with it.
    alternates: { canonical: `/about/news/${canonical}` },
    openGraph: {
      title: item.title,
      description,
      type: "article",
      publishedTime: item.publicationDate || undefined,
      url: `/about/news/${canonical}`,
      images: item.featuredImage ? [item.featuredImage] : undefined,
    },
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const resolved = await resolve(slug)

  if (!resolved) {
    notFound()
  }

  const { item, canonical } = resolved

  // Old UUID URLs are already in Google's index and in whatever was shared
  // before this change. Send them to the slug rather than serving both.
  if (isNotionId(slug) && canonical !== slug) {
    permanentRedirect(`/about/news/${canonical}`)
  }

  return (
    <main className="bg-background text-foreground">
      <div className={marketingListingShellClass}>
        <Button variant="ghost" size="sm" className="gap-1.5" nativeButton={false} render={<Link href="/about/news" />}>
          <ArrowLeft className="size-4" />
          Back to News
        </Button>

        <article className="space-y-6">
        {item.featuredImage && (
          <div className="overflow-hidden rounded-lg">
            <img
              src={item.featuredImage}
              alt=""
              className="aspect-video w-full object-cover"
            />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary">{item.category}</Badge>
            {item.publicationDate && <time>{item.publicationDate}</time>}
            {item.author && <span>by {item.author}</span>}
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {item.title}
          </h1>

          {item.marketingBlurb && (
            <p className="text-lg font-medium text-muted-foreground">
              {item.marketingBlurb}
            </p>
          )}
        </div>

        {item.summary && (
          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <p>{item.summary}</p>
          </div>
        )}

        {item.externalLink && (
          <Button
            nativeButton={false}
            render={
              <a href={item.externalLink} target="_blank" rel="noopener noreferrer" />
            }
          >
            Read Full Article
          </Button>
        )}
        </article>
      </div>
    </main>
  )
}
