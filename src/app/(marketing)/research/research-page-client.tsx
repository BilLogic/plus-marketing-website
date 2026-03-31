"use client"

import { useCallback, useMemo, useRef, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import { Search, X, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ResearchPaper } from "@/lib/notion/types"
import { PaperCard } from "./paper-card"

function parseDate(dateStr: string): Date {
  const parts = dateStr.split("/")
  if (parts.length === 3) return new Date(+parts[2], +parts[0] - 1, +parts[1])
  return new Date(dateStr)
}

function extractYear(dateStr: string): string {
  return parseDate(dateStr).getFullYear().toString()
}

type SortOption = "date-desc" | "date-asc" | "title-asc" | "title-desc"

const SORT_LABELS: Record<SortOption, string> = {
  "date-desc": "Newest",
  "date-asc": "Oldest",
  "title-asc": "Title A-Z",
  "title-desc": "Title Z-A",
}

export function ResearchPageClient({ papers }: { papers: ResearchPaper[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  const [query, setQuery] = useState(searchParams.get("q") ?? "")

  const authors = searchParams.get("author")?.split(",").filter(Boolean) ?? []
  const years = searchParams.get("year")?.split(",").filter(Boolean) ?? []
  const venues = searchParams.get("venue")?.split(",").filter(Boolean) ?? []
  const hasVideo = searchParams.get("video") === "true"
  const hasSlides = searchParams.get("slides") === "true"
  const sort = (searchParams.get("sort") as SortOption) || "date-desc"

  const allAuthors = useMemo(
    () => [...new Set(papers.flatMap((p) => p.authors))].sort(),
    [papers]
  )
  const allYears = useMemo(
    () =>
      [...new Set(papers.map((p) => extractYear(p.publishDate)))]
        .filter((y) => y !== "NaN")
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

  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
  }, [])

  const toggleFilter = useCallback(
    (key: string, value: string) => {
      const current = searchParams.get(key)?.split(",").filter(Boolean) ?? []
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      updateParams({ [key]: next.length ? next.join(",") : null })
    },
    [searchParams, updateParams]
  )

  const clearAllFilters = useCallback(() => {
    setQuery("")
    router.replace("?", { scroll: false })
  }, [router])

  const searchQ = searchParams.get("q")?.toLowerCase() ?? ""

  const filtered = useMemo(() => {
    let result = papers

    if (searchQ) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQ) ||
          p.authors.some((a) => a.toLowerCase().includes(searchQ)) ||
          p.abstract?.toLowerCase().includes(searchQ) ||
          p.venue?.toLowerCase().includes(searchQ)
      )
    }
    if (authors.length) {
      result = result.filter((p) =>
        authors.some((a) => p.authors.includes(a))
      )
    }
    if (years.length) {
      result = result.filter((p) => years.includes(extractYear(p.publishDate)))
    }
    if (venues.length) {
      result = result.filter((p) => p.venue && venues.includes(p.venue))
    }
    if (hasVideo) result = result.filter((p) => p.videoLink)
    if (hasSlides) result = result.filter((p) => p.presentationLink)

    result = [...result].sort((a, b) => {
      if (sort === "date-desc")
        return parseDate(b.publishDate).getTime() - parseDate(a.publishDate).getTime()
      if (sort === "date-asc")
        return parseDate(a.publishDate).getTime() - parseDate(b.publishDate).getTime()
      if (sort === "title-asc") return a.title.localeCompare(b.title)
      return b.title.localeCompare(a.title)
    })

    return result
  }, [papers, searchQ, authors, years, venues, hasVideo, hasSlides, sort])

  const hasActiveFilters =
    searchQ || authors.length || years.length || venues.length || hasVideo || hasSlides

  const [showAuthors, setShowAuthors] = useState(false)
  const [showVenues, setShowVenues] = useState(false)

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 md:px-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Research &amp; Publications
          </h1>
          <Badge variant="outline" className="text-sm">
            {papers.length} papers
          </Badge>
        </div>
        <p className="max-w-2xl text-muted-foreground">
          Explore peer-reviewed research from the PLUS team spanning learning
          analytics, intelligent tutoring systems, and education technology.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search papers by title, author, venue, or keyword..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            debouncedSearch(e.target.value)
          }}
          className="pl-9"
        />
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Author dropdown */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setShowAuthors(!showAuthors); setShowVenues(false) }}
            className={cn(authors.length && "border-primary text-primary")}
          >
            Authors {authors.length > 0 && `(${authors.length})`}
          </Button>
          {showAuthors && (
            <div className="absolute left-0 top-full z-20 mt-1 max-h-60 w-64 overflow-y-auto rounded-lg border border-border bg-popover p-2 shadow-lg">
              {allAuthors.map((a) => (
                <button
                  key={a}
                  onClick={() => toggleFilter("author", a)}
                  className={cn(
                    "flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted",
                    authors.includes(a) && "bg-muted font-medium text-primary"
                  )}
                >
                  {a}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Year chips */}
        {allYears.map((y) => (
          <Button
            key={y}
            variant={years.includes(y) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFilter("year", y)}
          >
            {y}
          </Button>
        ))}

        {/* Venue dropdown */}
        {allVenues.length > 0 && (
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setShowVenues(!showVenues); setShowAuthors(false) }}
              className={cn(venues.length && "border-primary text-primary")}
            >
              Venue {venues.length > 0 && `(${venues.length})`}
            </Button>
            {showVenues && (
              <div className="absolute left-0 top-full z-20 mt-1 max-h-60 w-64 overflow-y-auto rounded-lg border border-border bg-popover p-2 shadow-lg">
                {allVenues.map((v) => (
                  <button
                    key={v}
                    onClick={() => toggleFilter("venue", v)}
                    className={cn(
                      "flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted",
                      venues.includes(v) && "bg-muted font-medium text-primary"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Media toggles */}
        <Button
          variant={hasVideo ? "default" : "outline"}
          size="sm"
          onClick={() => updateParams({ video: hasVideo ? null : "true" })}
        >
          Has Video
        </Button>
        <Button
          variant={hasSlides ? "default" : "outline"}
          size="sm"
          onClick={() => updateParams({ slides: hasSlides ? null : "true" })}
        >
          Has Slides
        </Button>

        <div className="ml-auto flex items-center gap-1">
          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
          <select
            value={sort}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground"
          >
            {Object.entries(SORT_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filter badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5">
          {searchQ && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchQ}
              <button onClick={() => { setQuery(""); updateParams({ q: null }) }}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {authors.map((a) => (
            <Badge key={a} variant="secondary" className="gap-1">
              {a}
              <button onClick={() => toggleFilter("author", a)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {years.map((y) => (
            <Badge key={y} variant="secondary" className="gap-1">
              {y}
              <button onClick={() => toggleFilter("year", y)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {venues.map((v) => (
            <Badge key={v} variant="secondary" className="gap-1">
              {v}
              <button onClick={() => toggleFilter("venue", v)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {hasVideo && (
            <Badge variant="secondary" className="gap-1">
              Video
              <button onClick={() => updateParams({ video: null })}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {hasSlides && (
            <Badge variant="secondary" className="gap-1">
              Slides
              <button onClick={() => updateParams({ slides: null })}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} of {papers.length} papers
      </p>

      {/* Results list */}
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((paper) => (
            <PaperCard
              key={paper.id}
              paper={paper}
              onAuthorClick={(a) => {
                if (!authors.includes(a)) toggleFilter("author", a)
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-lg font-medium text-muted-foreground">
            No papers match your filters
          </p>
          <Button variant="outline" onClick={clearAllFilters}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}
