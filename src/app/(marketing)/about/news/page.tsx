import Link from "next/link"
import { fetchNews } from "@/lib/notion/queries/news"
import { Badge } from "@/components/ui/badge"

export const revalidate = 60

export default async function NewsPage() {
  const news = await fetchNews()

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:px-8">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">News</h1>
        <p className="text-muted-foreground">
          Latest updates, media coverage, and announcements from PLUS.
        </p>
      </div>

      {news.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No news articles yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md"
            >
              {item.featuredImage && (
                <div className="mb-4 overflow-hidden rounded-md">
                  <img
                    src={item.featuredImage}
                    alt=""
                    className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary" className="text-[10px]">
                  {item.category}
                </Badge>
                {item.publicationDate && (
                  <time>{item.publicationDate}</time>
                )}
              </div>
              <h2 className="mt-2 text-lg font-semibold leading-snug">
                {item.externalLink ? (
                  <a
                    href={item.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    {item.title}
                  </a>
                ) : (
                  <Link href={`/about/news/${item.id}`} className="hover:text-primary">
                    {item.title}
                  </Link>
                )}
              </h2>
              {item.marketingBlurb && (
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {item.marketingBlurb}
                </p>
              )}
              {item.author && (
                <p className="mt-auto pt-3 text-xs text-muted-foreground">
                  By {item.author}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
