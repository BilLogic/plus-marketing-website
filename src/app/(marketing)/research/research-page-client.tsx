"use client"

import { useCallback, useMemo, useRef, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import {
  Search,
  X,
  ArrowUpDown,
  ChevronDown,
  TableIcon,
  LayoutGrid,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
} from "@/components/ui/table"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { ResearchPaper } from "@/lib/notion/types"
import { PaperCard } from "./paper-card"
import { PaperTableRow } from "./paper-table-row"

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

type TableSortColumn = "title" | "year" | "venue"

function FilterPopover({
  label,
  options,
  selected,
  onToggle,
  searchPlaceholder,
}: {
  label: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
  searchPlaceholder: string
}) {
  const [search, setSearch] = useState("")
  const filtered = search
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "gap-1.5",
              selected.length && "border-primary text-primary"
            )}
          />
        }
      >
        {label}
        {selected.length > 0 && (
          <Badge variant="secondary" className="ml-0.5 h-5 min-w-5 px-1 text-xs">
            {selected.length}
          </Badge>
        )}
        <ChevronDown className="h-3.5 w-3.5 opacity-50" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-0">
        <div className="p-2">
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-7 text-xs"
          />
        </div>
        <div className="max-h-52 overflow-y-auto px-1 pb-2">
          {filtered.length === 0 && (
            <p className="px-2 py-3 text-center text-xs text-muted-foreground">
              No results
            </p>
          )}
          {filtered.map((option) => (
            <button
              key={option}
              onClick={() => onToggle(option)}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted",
                selected.includes(option) && "bg-muted/60"
              )}
            >
              <Checkbox
                checked={selected.includes(option)}
                tabIndex={-1}
                className="pointer-events-none"
              />
              <span className="truncate">{option}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function ResearchPageClient({ papers }: { papers: ResearchPaper[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  const [query, setQuery] = useState(searchParams.get("q") ?? "")
  const [tableSortCol, setTableSortCol] = useState<TableSortColumn | null>(null)
  const [tableSortAsc, setTableSortAsc] = useState(true)

  const authors = searchParams.get("author")?.split(",").filter(Boolean) ?? []
  const years = searchParams.get("year")?.split(",").filter(Boolean) ?? []
  const venues = searchParams.get("venue")?.split(",").filter(Boolean) ?? []
  const hasVideo = searchParams.get("video") === "true"
  const hasSlides = searchParams.get("slides") === "true"
  const sort = (searchParams.get("sort") as SortOption) || "date-desc"
  const view = searchParams.get("view") === "cards" ? "cards" : "table"

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

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    },
    []
  )

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
        return (
          parseDate(b.publishDate).getTime() -
          parseDate(a.publishDate).getTime()
        )
      if (sort === "date-asc")
        return (
          parseDate(a.publishDate).getTime() -
          parseDate(b.publishDate).getTime()
        )
      if (sort === "title-asc") return a.title.localeCompare(b.title)
      return b.title.localeCompare(a.title)
    })

    return result
  }, [papers, searchQ, authors, years, venues, hasVideo, hasSlides, sort])

  const tableSorted = useMemo(() => {
    if (!tableSortCol) return filtered
    return [...filtered].sort((a, b) => {
      let cmp = 0
      if (tableSortCol === "title") cmp = a.title.localeCompare(b.title)
      else if (tableSortCol === "year")
        cmp =
          parseDate(a.publishDate).getTime() -
          parseDate(b.publishDate).getTime()
      else if (tableSortCol === "venue")
        cmp = (a.venue ?? "").localeCompare(b.venue ?? "")
      return tableSortAsc ? cmp : -cmp
    })
  }, [filtered, tableSortCol, tableSortAsc])

  const handleTableSort = (col: TableSortColumn) => {
    if (tableSortCol === col) setTableSortAsc(!tableSortAsc)
    else {
      setTableSortCol(col)
      setTableSortAsc(true)
    }
  }

  const hasActiveFilters =
    searchQ ||
    authors.length ||
    years.length ||
    venues.length ||
    hasVideo ||
    hasSlides

  const SortIndicator = ({ col }: { col: TableSortColumn }) => (
    <ArrowUpDown
      className={cn(
        "ml-1 inline h-3 w-3",
        tableSortCol === col ? "text-foreground" : "text-muted-foreground/40"
      )}
    />
  )

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-16 pt-8 sm:px-6 md:px-8">
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
        <FilterPopover
          label="Authors"
          options={allAuthors}
          selected={authors}
          onToggle={(a) => toggleFilter("author", a)}
          searchPlaceholder="Search authors..."
        />

        {allVenues.length > 0 && (
          <FilterPopover
            label="Venue"
            options={allVenues}
            selected={venues}
            onToggle={(v) => toggleFilter("venue", v)}
            searchPlaceholder="Search venues..."
          />
        )}

        <div className="flex flex-wrap items-center gap-1">
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
        </div>

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

        <div className="ml-auto flex items-center gap-2">
          <Select
            value={sort}
            onValueChange={(val) => updateParams({ sort: val as string })}
          >
            <SelectTrigger size="sm">
              <ArrowUpDown className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent align="end">
              {Object.entries(SORT_LABELS).map(([k, label]) => (
                <SelectItem key={k} value={k}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active filter badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5">
          {searchQ && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchQ}
              <button
                onClick={() => {
                  setQuery("")
                  updateParams({ q: null })
                }}
              >
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

      {/* Results count + view toggle */}
      <Tabs
        value={view}
        onValueChange={(val) =>
          updateParams({ view: val === "table" ? null : (val as string) })
        }
      >
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filtered.length} of {papers.length} papers
          </p>
          <TabsList>
            <TabsTrigger value="table">
              <TableIcon className="h-4 w-4" />
              Table
            </TabsTrigger>
            <TabsTrigger value="cards">
              <LayoutGrid className="h-4 w-4" />
              Cards
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Table view */}
        <TabsContent value="table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => handleTableSort("title")}
                >
                  Title
                  <SortIndicator col="title" />
                </TableHead>
                <TableHead>Authors</TableHead>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => handleTableSort("year")}
                >
                  Year
                  <SortIndicator col="year" />
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => handleTableSort("venue")}
                >
                  Venue
                  <SortIndicator col="venue" />
                </TableHead>
                <TableHead>Links</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableSorted.map((paper) => (
                <PaperTableRow
                  key={paper.id}
                  paper={paper}
                  onAuthorClick={(a) => {
                    if (!authors.includes(a)) toggleFilter("author", a)
                  }}
                />
              ))}
            </TableBody>
          </Table>
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
        </TabsContent>

        {/* Card view */}
        <TabsContent value="cards">
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
