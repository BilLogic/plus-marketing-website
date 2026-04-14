"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { ResearchPaper } from "@/lib/notion/types"
import { RESEARCH_GENRE_TAGS } from "@/lib/research/research-genres"
import { forResearchersAssets } from "@/components/marketing/for-researchers-assets"
import {
  riFg,
  riFilterFieldLabelCn,
  riFilterLabelCn,
  riFilterTagButtonCn,
  riGenreFilterPillClass,
  riIndexCopy,
  riPageTitleCn,
  riSeeAllPublicationsLinkClass,
  riSelectItemCn,
  riSelectTriggerCn,
} from "@/components/marketing/research-index/research-index-figma-tokens"
import { ResearchIndexPublicationCard } from "@/components/marketing/research-index/research-index-publication-card"
import { riParseDate, riParseYear } from "@/components/marketing/research-index/research-index-utils"

const PREVIEW_LIMIT = 20
const ALL_VALUE = "__all__"

export const ResearchPageClient = ({ papers }: { papers: ResearchPaper[] }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  const [query, setQuery] = useState(searchParams.get("q") ?? "")
  const showFullCatalogue = searchParams.get("all") === "1"

  const searchQ = searchParams.get("q")?.toLowerCase() ?? ""
  const genreParam = searchParams.get("genre") ?? ""
  const selectedGenre = RESEARCH_GENRE_TAGS.includes(
    genreParam as (typeof RESEARCH_GENRE_TAGS)[number]
  )
    ? (genreParam as (typeof RESEARCH_GENRE_TAGS)[number])
    : ""

  const yearsParam = searchParams.get("year")?.split(",").filter(Boolean) ?? []
  const yearFilter = yearsParam[0] ?? ""

  const venuesParam = searchParams.get("venue")?.split(",").filter(Boolean) ?? []
  const venueFilter = venuesParam[0] ?? ""

  const allYears = useMemo(
    () =>
      [...new Set(papers.map((p) => riParseYear(p.publishDate)))]
        .filter((y) => y !== "")
        .sort()
        .reverse(),
    [papers]
  )

  const allVenues = useMemo(
    () =>
      [...new Set(papers.map((p) => p.venue).filter(Boolean) as string[])].sort(),
    [papers]
  )

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([k, v]) => {
        if (v === null || v === "") params.delete(k)
        else params.set(k, v)
      })
      router.replace(`?${params.toString()}`, { scroll: false })
    },
    [searchParams, router]
  )

  const debouncedSearch = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(
        () => updateParams({ q: value || null }),
        300
      )
    },
    [updateParams]
  )

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    },
    []
  )

  const filtered = useMemo(() => {
    const authorsParam =
      searchParams.get("author")?.split(",").filter(Boolean) ?? []
    let result = papers

    if (searchQ) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQ) ||
          p.authors.some((a) => a.toLowerCase().includes(searchQ)) ||
          p.abstract?.toLowerCase().includes(searchQ) ||
          p.shortDescription?.toLowerCase().includes(searchQ) ||
          p.venue?.toLowerCase().includes(searchQ)
      )
    }

    if (selectedGenre) {
      result = result.filter((p) => p.topics.includes(selectedGenre))
    }

    if (yearFilter) {
      result = result.filter((p) => riParseYear(p.publishDate) === yearFilter)
    }

    if (venueFilter) {
      result = result.filter((p) => p.venue === venueFilter)
    }

    if (authorsParam.length) {
      result = result.filter((p) =>
        authorsParam.some((a) => p.authors.includes(a))
      )
    }

    result = [...result].sort(
      (a, b) =>
        riParseDate(b.publishDate).getTime() -
        riParseDate(a.publishDate).getTime()
    )

    return result
  }, [papers, searchParams, searchQ, selectedGenre, yearFilter, venueFilter])

  const visiblePapers = showFullCatalogue
    ? filtered
    : filtered.slice(0, PREVIEW_LIMIT)

  const setGenre = (g: string) => {
    updateParams({ genre: g ? g : null })
  }

  return (
    <div className="bg-white text-[#62636c]">
      <div className="mx-auto max-w-[1122px] px-5 pb-24 pt-10 sm:px-8">
        <header className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="flex max-w-[48rem] flex-col gap-5">
            <h1 className={riPageTitleCn}>Research Index</h1>
            <p
              className={cn("max-w-[42rem] font-sans", riIndexCopy, riFg.bodyMuted)}
            >
              Explore the full archive of PLUS research
            </p>
          </div>
          <div className="relative flex shrink-0 justify-center sm:justify-end sm:pt-1">
            <div className="relative h-[140px] w-[150px] sm:h-[173px] sm:w-[163px]">
              <Image
                src={forResearchersAssets.index.decor}
                alt=""
                fill
                className="object-contain object-right"
                sizes="163px"
                priority
              />
            </div>
          </div>
        </header>

        <div className="relative mb-8 sm:mb-10">
          <Search
            className={cn(
              "pointer-events-none absolute left-6 top-1/2 size-6 -translate-y-1/2",
              riFg.bodyMuted
            )}
            aria-hidden
            strokeWidth={2}
          />
          <Input
            type="search"
            placeholder="Search studies"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              debouncedSearch(e.target.value)
            }}
            className={cn(
              "h-[56px] rounded-full border-0 bg-[#f9f9fb]/70 pl-14 pr-5 font-sans shadow-none sm:h-[63px]",
              riFg.bodyMuted,
              riIndexCopy,
              "leading-normal placeholder:text-[#62636c]/80",
              "focus-visible:ring-2 focus-visible:ring-[#004247]/15"
            )}
            aria-label="Search studies"
          />
        </div>

        <div
          className={cn(
            "overflow-hidden rounded-[30px] shadow-none",
            riFg.shellBg
          )}
        >
          <div
            className={cn(
              "flex min-h-[57px] items-center px-5 sm:px-5",
              riFg.shellRow
            )}
          >
            <p className={cn("font-sans", riIndexCopy, riFg.bodyMuted)}>
              Showing {visiblePapers.length} of {filtered.length} in this
              preview · {papers.length} total in catalogue (newest first)
            </p>
          </div>

          <div className={cn("px-5 py-3 sm:px-5", riFg.shellRow)}>
            <p className={riFilterLabelCn}>Tags</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setGenre("")}
                className={cn(
                  riFilterTagButtonCn,
                  !selectedGenre
                    ? riFg.allActive
                    : "bg-[#f0f0f2] text-[#62636c] hover:bg-[#e8e8eb]"
                )}
              >
                All
              </button>
              {RESEARCH_GENRE_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setGenre(selectedGenre === tag ? "" : tag)}
                  className={cn(
                    riFilterTagButtonCn,
                    riGenreFilterPillClass(tag, selectedGenre === tag)
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "flex flex-col gap-4 px-5 py-3 sm:flex-row sm:items-end sm:gap-2 sm:px-5",
              riFg.shellRow
            )}
          >
            <div className="flex w-full min-w-0 flex-col gap-2 sm:w-[173px] sm:shrink-0">
              <span className={riFilterFieldLabelCn}>Year</span>
              <Select
                value={yearFilter || ALL_VALUE}
                onValueChange={(v) =>
                  updateParams({ year: v === ALL_VALUE ? null : v })
                }
              >
                <SelectTrigger size="sm" className={riSelectTriggerCn}>
                  <SelectValue placeholder="all" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_VALUE} className={riSelectItemCn}>
                    all
                  </SelectItem>
                  {allYears.map((y) => (
                    <SelectItem key={y} value={y} className={riSelectItemCn}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <span className={riFilterFieldLabelCn}>Conference</span>
              <Select
                value={venueFilter || ALL_VALUE}
                onValueChange={(v) =>
                  updateParams({ venue: v === ALL_VALUE ? null : v })
                }
              >
                <SelectTrigger
                  size="sm"
                  className={cn(riSelectTriggerCn, "sm:min-w-0")}
                >
                  <SelectValue placeholder="all" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_VALUE} className={riSelectItemCn}>
                    all
                  </SelectItem>
                  {allVenues.map((v) => (
                    <SelectItem
                      key={v}
                      value={v}
                      className={cn(
                        riSelectItemCn,
                        "items-start whitespace-normal text-pretty"
                      )}
                    >
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex w-full min-w-0 flex-col gap-3 px-5 pb-6 pt-5 sm:px-5">
            {visiblePapers.length === 0 && (
              <p className={cn("py-14 text-center font-sans", riIndexCopy, riFg.bodyMuted)}>
                No studies match your filters.
              </p>
            )}
            {visiblePapers.map((paper) => (
              <ResearchIndexPublicationCard key={paper.id} paper={paper} />
            ))}
          </div>
        </div>

        {!showFullCatalogue && filtered.length > PREVIEW_LIMIT && (
          <div className="mt-6 flex justify-end sm:mt-8">
            <button
              type="button"
              onClick={() => updateParams({ all: "1" })}
              className={riSeeAllPublicationsLinkClass}
            >
              See all publications
              <ArrowRight
                className="size-[26px] shrink-0"
                strokeWidth={2}
                aria-hidden
              />
            </button>
          </div>
        )}

        {showFullCatalogue && filtered.length > PREVIEW_LIMIT && (
          <div className="mt-6 flex justify-end sm:mt-8">
            <button
              type="button"
              onClick={() => updateParams({ all: null })}
              className={cn(
                "font-sans font-medium underline-offset-4 hover:text-[#004247] hover:underline",
                riIndexCopy,
                riFg.bodyMuted
              )}
            >
              Show preview only
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
