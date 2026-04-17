import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchSuccessStoryById } from "@/lib/notion/queries/success-stories"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Quote } from "lucide-react"
import { MarkdownRenderer } from "./markdown-renderer"

export const revalidate = 3600

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

  return (
    <div className="mx-auto max-w-3xl py-12">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 gap-1.5"
        nativeButton={false}
        render={<Link href="/success-stories" />}
      >
        <ArrowLeft className="size-4" />
        Back to Success Stories
      </Button>

      <article className="space-y-6">
        {story.coverImage && (
          <div className="overflow-hidden rounded-lg">
            <img
              src={story.coverImage}
              alt=""
              className="aspect-video w-full object-cover"
            />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{story.category}</Badge>
            {story.publishedDate && (
              <span className="text-sm text-muted-foreground">
                {story.publishedDate}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {story.title}
          </h1>
          {story.summary && (
            <p className="text-lg text-muted-foreground">{story.summary}</p>
          )}
        </div>

        {story.quote && (
          <blockquote className="flex gap-3 rounded-lg bg-muted/50 p-5">
            <Quote className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="text-base italic">{story.quote}</p>
              {story.quoteAttribution && (
                <p className="mt-2 text-sm text-muted-foreground">
                  — {story.quoteAttribution}
                </p>
              )}
            </div>
          </blockquote>
        )}

        {story.content && (
          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <MarkdownRenderer content={story.content} />
          </div>
        )}
      </article>
    </div>
  )
}
