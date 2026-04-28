import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchNewsById } from "@/lib/notion/queries/news"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const revalidate = 60

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = await fetchNewsById(id)

  if (!item) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl py-12 min-[1800px]:max-w-5xl min-[1800px]:py-16">
      <Button variant="ghost" size="sm" className="mb-6 gap-1.5" nativeButton={false} render={<Link href="/about/news" />}>
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
            Read full article
          </Button>
        )}
      </article>
    </div>
  )
}
