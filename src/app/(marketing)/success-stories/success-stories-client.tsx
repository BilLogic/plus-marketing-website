"use client"

import { useState } from "react"
import type { ComponentType, SVGProps } from "react"
import Link from "next/link"
import { ArrowRight, BarChart3, BookOpen, GraduationCap, School, Sparkles } from "lucide-react"
import type { SuccessStory } from "@/lib/notion/types"
import {
  marketingCardIconCircleClass,
  marketingCardIconTitleRowOffsetClass,
  marketingCardLhAlignedHeaderRowClass,
  marketingCardLucideGlyphClass,
  marketingCardPaddingClass,
  marketingSectionLeadColorClass,
} from "@/lib/marketing-section-layout"
import { marketingListingShellClass } from "@/lib/marketing-layout"
import {
  successStoriesReadStoryArrowClass,
  successStoriesReadStoryLinkClass,
} from "@/lib/success-stories-link-classes"
import { cn } from "@/lib/utils"

const CATEGORIES = ["All", "Schools", "Tutors", "Researchers", "Foundations"] as const

const CATEGORY_ICON: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Schools: School,
  Tutors: GraduationCap,
  Researchers: BarChart3,
  Foundations: BookOpen,
}

const cardTitle =
  "text-pretty text-lg font-bold leading-snug tracking-tight text-[#C6009C] dark:text-[#C6009C] sm:text-xl lg:text-2xl"

const cardBody =
  "text-base leading-relaxed text-teal-900/75 dark:text-white/80"

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
    <main className="bg-background text-foreground">
      <div className={marketingListingShellClass}>
        <div className="space-y-3">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-teal-950 dark:text-white sm:text-3xl md:text-4xl">
            Success Stories
          </h1>
          <p
            className={cn(
              "w-full max-w-none text-base lg:text-lg",
              marketingSectionLeadColorClass,
            )}
          >
            See how PLUS is making an impact across schools, tutors, researchers, and foundations.
          </p>
        </div>

        {/* Category filter pills */}
        <div className="-mt-4 flex flex-wrap gap-2 sm:-mt-6">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat
            const count = cat !== "All" ? stories.filter((s) => s.category === cat).length : null
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors",
                  active
                    ? "bg-[#C6009C] text-white"
                    : "border border-[#C6009C]/30 text-[#C6009C]/80 hover:border-[#C6009C]/60 hover:bg-[#FFE8F6] dark:border-[#C6009C]/40 dark:text-[#e879a9] dark:hover:bg-[#FFE8F6]/10"
                )}
              >
                {cat}
                {count !== null && (
                  <span
                    className={cn(
                      "inline-flex size-5 items-center justify-center rounded-full text-xs",
                      active ? "bg-white/25 text-white" : "bg-[#FFE8F6] text-[#C6009C] dark:bg-[#C6009C]/20"
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {filtered.length === 0 ? (
          <div
            className={cn(
              "rounded-[30px] bg-[#FFE8F6] dark:bg-[#FFE8F6]/10",
              marketingCardPaddingClass,
            )}
          >
            <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
              No success stories in this category yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
            {filtered.map((story) => {
              const Icon = CATEGORY_ICON[story.category] ?? Sparkles
              const href =
                story.publicReadUrl ??
                (story.content ? `/success-stories/${story.id}` : null)

              return (
                <article
                  key={story.id}
                  className={cn(
                    "flex h-full flex-col rounded-[30px] bg-[#FFE8F6] dark:bg-[#FFE8F6]/10",
                    marketingCardPaddingClass,
                  )}
                >
                  <div
                    className={cn(
                      "flex min-h-0 flex-1 flex-col rounded-3xl bg-white dark:bg-card",
                      marketingCardPaddingClass,
                    )}
                  >
                    <div className={marketingCardLhAlignedHeaderRowClass}>
                      <span
                        className={cn(
                          marketingCardIconTitleRowOffsetClass,
                          marketingCardIconCircleClass,
                          "shrink-0 bg-[#C6009C] text-white",
                        )}
                      >
                        <Icon className={marketingCardLucideGlyphClass} aria-hidden />
                      </span>
                      <h2 className={cn(cardTitle, "min-w-0 flex-1")}>{story.title}</h2>
                    </div>
                    {story.quote ? (
                      <p className={cn(cardBody, "mt-4 min-h-0 flex-1 text-pretty italic text-muted-foreground")}>
                        &ldquo;{story.quote}&rdquo;
                        {story.quoteAttribution && (
                          <span className="mt-2 block not-italic font-medium text-[#C6009C]/80 dark:text-[#C6009C]/80">
                            — {story.quoteAttribution}
                          </span>
                        )}
                      </p>
                    ) : (
                      <p className={cn(cardBody, "mt-4 min-h-0 flex-1 text-pretty text-muted-foreground")}>
                        {story.summary}
                      </p>
                    )}
                  </div>
                  {href && (
                    <Link
                      href={href}
                      className={successStoriesReadStoryLinkClass}
                      aria-label={`Read story: ${story.title}`}
                      {...(story.publicReadUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <span>Read story</span>
                      <ArrowRight className={successStoriesReadStoryArrowClass} aria-hidden />
                    </Link>
                  )}
                </article>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
