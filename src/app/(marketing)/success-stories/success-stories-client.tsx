"use client"

import { useState } from "react"
import Link from "next/link"
import type { SuccessStory } from "@/lib/notion/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Quote, ArrowRight } from "lucide-react"

const CATEGORIES = ["All", "Schools", "Tutors", "Researchers", "Foundations"] as const

type Props = {
  stories: SuccessStory[]
}

export const SuccessStoriesClient = ({ stories }: Props) => {
  const [activeCategory, setActiveCategory] = useState<string>("All")

  const filtered =
    activeCategory === "All"
      ? stories
      : stories.filter((s) => s.category === activeCategory)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:px-8">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Success Stories
        </h1>
        <p className="text-muted-foreground">
          See how PLUS is making an impact across schools, tutors, researchers,
          and foundations.
        </p>
      </div>

      {/* Category tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat)}
            className="rounded-full"
          >
            {cat}
            {cat !== "All" && (
              <Badge
                variant="secondary"
                className="ml-1.5 px-1.5 py-0 text-[10px]"
              >
                {stories.filter((s) => s.category === cat).length}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            No success stories yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((story) => (
            <article
              key={story.id}
              className="flex flex-col rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              {story.image && (
                <div className="mb-4 overflow-hidden rounded-md">
                  <img
                    src={story.image}
                    alt=""
                    className="aspect-video w-full object-cover"
                  />
                </div>
              )}
              <Badge variant="secondary" className="mb-3 w-fit text-[10px]">
                {story.category}
              </Badge>
              <h2 className="text-lg font-semibold">
                <Link
                  href={`/success-stories/${story.id}`}
                  className="hover:text-primary"
                >
                  {story.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {story.summary}
              </p>
              {story.content && (
                <Link
                  href={`/success-stories/${story.id}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Read full story
                  <ArrowRight className="size-3.5" />
                </Link>
              )}
              {story.quote && (
                <blockquote className="mt-4 flex gap-2 rounded-md bg-muted/50 p-4">
                  <Quote className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm italic text-foreground">
                      {story.quote}
                    </p>
                    {story.quoteAttribution && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        — {story.quoteAttribution}
                      </p>
                    )}
                  </div>
                </blockquote>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
