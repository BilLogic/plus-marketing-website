"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ExternalLink, LayoutGrid, List, Search } from "lucide-react"
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
import {
  riFg,
  riFilterFieldLabelCn,
  riFilterLabelCn,
  riFilterTagButtonCn,
  riGenreFilterPillClass,
  riGenrePillClass,
  riIndexMetaCopy,
  riSelectItemCn,
  riSelectTriggerCn,
} from "@/components/marketing/research-index/research-index-figma-tokens"
import { ResearchIndexPublicationCard } from "@/components/marketing/research-index/research-index-publication-card"
import {
  riFormatAuthorsLine,
  riParseDate,
  riParseYear,
} from "@/components/marketing/research-index/research-index-utils"

const ALL_VALUE = "__all__"

const tableHeaderCn = cn(
  "pb-2.5 pr-4 pt-4 text-left font-semibold",
  riIndexMetaCopy,
  riFg.bodyMuted
)

function PublicationTableRow({ paper }: { paper: ResearchPaper }) {
  const year = paper.publishDate ? riParseYear(paper.publishDate) : ""
  const authors = riFormatAuthorsLine(paper.authors)

  const titleEl = paper.paperLink ? (
    <a
      href={paper.paperLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-start gap-1 font-sans font-medium leading-snug text-[#62636c] underline-offset-[3px] hover:text-[#004247] hover:underline"
    >
      <span className="min-w-0">{paper.title}</span>
      <ExternalLink
        className="mt-0.5 size-3.5 shrink-0 opacity-60 group-hover:text-[#004247]"
        aria-hidden
      />
      <span className="sr-only">(opens in new tab)</span>
    </a>
  ) : (
    <span className="font-sans font-medium leading-snug text-[#62636c]">
      {paper.title}
    </span>
  )

  return (
    <tr
      className={cn(
        "border-b transition-colors hover:bg-[#f9f9fb]/60",
        riFg.borderHairline
      )}
    >
      {/* Title — always visible */}
      <td className={cn("py-3 pr-4 align-top", riIndexMetaCopy)}>{titleEl}</td>

      {/* Tags — sm+ */}
      <td className="hidden py-3 pr-4 align-top sm:table-cell">
        {paper.topics.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {paper.topics.map((t) => (
              <span
                key={t}
                className={cn(
                  "inline-flex items-center rounded-[26px] px-2 py-0.5 leading-snug",
                  riIndexMetaCopy,
                  riGenrePillClass(t)
                )}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </td>

      {/* Year — always visible */}
      <td
        className={cn(
          "whitespace-nowrap py-3 pr-4 align-top tabular-nums",
          riIndexMetaCopy,
          riFg.bodyMuted
        )}
      >
        {year}
      </td>

      {/* Conference — md+ */}
      <td
        className={cn(
          "hidden py-3 pr-4 align-top md:table-cell",
          riIndexMetaCopy,
          riFg.bodyMuted
        )}
      >
        {paper.venue ?? "—"}
      </td>

      {/* Authors — lg+ */}
      <td
        className={cn(
          "hidden py-3 align-top lg:table-cell",
          riIndexMetaCopy,
          riFg.bodyMuted
        )}
      >
        {authors}
      </td>
    </tr>
  )
}

export const ResearchPageClient = ({ papers }: { papers: ResearchPaper[] }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  const [query, setQuery] = useState(searchParams.get("q") ?? "")
  const [viewMode, setViewMode] = useState<"card" | "table">("card")

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

  const setGenre = (g: string) => {
    updateParams({ genre: g ? g : null })
  }

  const toggleBtnCn = (active: boolean) =>
    cn(
      "flex items-center justify-center rounded-lg p-1.5 transition-colors",
      active
        ? "bg-[#f0f0f2] text-[#004247]"
        : "text-[#62636c]/40 hover:text-[#62636c]"
    )

  return (
    <div className="bg-white text-[#62636c]">
      <div className="mx-auto flex max-w-5xl flex-col pb-12 pt-14 sm:pb-14 sm:pt-16 lg:pb-16 lg:pt-20 min-[1800px]:max-w-7xl min-[1800px]:pb-20 min-[1800px]:pt-24">
        <header className="mb-8 sm:mb-10">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-teal-950 sm:text-3xl md:text-4xl">
            Publications
          </h1>
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
              riIndexMetaCopy,
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
          {/* Count row + view toggle */}
          <div
            className={cn(
              "flex min-h-[57px] items-center justify-between px-4 sm:px-6 md:px-8",
              riFg.shellRow
            )}
          >
            <p className={cn("font-sans", riIndexMetaCopy, riFg.bodyMuted)}>
              Showing {filtered.length} of {papers.length} (newest first)
            </p>
            <div className="flex items-center gap-0.5" role="group" aria-label="View mode">
              <button
                type="button"
                onClick={() => setViewMode("card")}
                className={toggleBtnCn(viewMode === "card")}
                aria-label="Card view"
                aria-pressed={viewMode === "card"}
              >
                <LayoutGrid className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={toggleBtnCn(viewMode === "table")}
                aria-label="Table view"
                aria-pressed={viewMode === "table"}
              >
                <List className="size-4" aria-hidden />
              </button>
            </div>
          </div>

          {/* Tag filter */}
          <div className={cn("px-4 py-3 sm:px-6 md:px-8", riFg.shellRow)}>
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

          {/* Year + Conference filters */}
          <div
            className={cn(
              "flex flex-col gap-4 px-4 py-3 sm:flex-row sm:items-end sm:gap-2 sm:px-6 md:px-8",
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

          {/* Results — card or table */}
          {filtered.length === 0 ? (
            <p className={cn("px-4 py-14 text-center font-sans sm:px-6 md:px-8", riIndexMetaCopy, riFg.bodyMuted)}>
              No studies match your filters.
            </p>
          ) : viewMode === "card" ? (
            <div className="flex w-full min-w-0 flex-col gap-3 px-4 pb-6 pt-5 sm:px-6 md:px-8">
              {filtered.map((paper) => (
                <ResearchIndexPublicationCard key={paper.id} paper={paper} />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto px-4 pb-6 sm:px-6 md:px-8">
              <table className="w-full border-collapse font-sans">
                <thead>
                  <tr className={cn("border-b", riFg.borderHairline)}>
                    <th className={tableHeaderCn}>Title</th>
                    <th className={cn(tableHeaderCn, "hidden sm:table-cell")}>Tags</th>
                    <th className={tableHeaderCn}>Year</th>
                    <th className={cn(tableHeaderCn, "hidden md:table-cell")}>Conference</th>
                    <th className={cn(tableHeaderCn, "hidden pr-0 lg:table-cell")}>Authors</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((paper) => (
                    <PublicationTableRow key={paper.id} paper={paper} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
