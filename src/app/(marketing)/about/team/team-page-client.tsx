"use client"

import { useMemo, useState, useCallback, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import type { TeamMember } from "@/lib/notion/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TeamMemberCard } from "./team-member-card"

const AFFILIATIONS: TeamMember["affiliation"][] = [
  "Leadership",
  "PLUS Staff",
  "Independent Study Student",
  "Student Intern",
  "Past Collaborators",
]

// Display labels for the grouped sections on the page
const AFFILIATION_DISPLAY_LABELS: Partial<Record<TeamMember["affiliation"], string>> = {
  "Independent Study Student": "Students",
  "Student Intern": "Students",
}

const getDisplayLabel = (aff: TeamMember["affiliation"]) =>
  AFFILIATION_DISPLAY_LABELS[aff] ?? aff

const GROUPS: TeamMember["group"][] = [
  "Researcher",
  "Software Developer",
  "Product Manager",
  "Product Designer",
  "QA Engineer",
  "Tutor Supervisor",
  "Advisor",
  "Others",
]

function useDebounced(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

function parseSet(param: string | null): Set<string> {
  if (!param) return new Set()
  return new Set(param.split(",").filter(Boolean))
}

export function TeamPageClient({ members }: { members: TeamMember[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get("q") ?? "")
  const debouncedQuery = useDebounced(query, 250)
  const [selectedAffiliations, setSelectedAffiliations] = useState<Set<string>>(
    () => parseSet(searchParams.get("affiliation"))
  )
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(
    () => parseSet(searchParams.get("group"))
  )

  const syncUrl = useCallback(
    (q: string, affs: Set<string>, grps: Set<string>) => {
      const params = new URLSearchParams()
      if (q) params.set("q", q)
      if (affs.size) params.set("affiliation", [...affs].join(","))
      if (grps.size) params.set("group", [...grps].join(","))
      const qs = params.toString()
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false })
    },
    [router, pathname]
  )

  useEffect(() => {
    syncUrl(debouncedQuery, selectedAffiliations, selectedGroups)
  }, [debouncedQuery, selectedAffiliations, selectedGroups, syncUrl])

  const toggleAffiliation = (aff: string) => {
    setSelectedAffiliations((prev) => {
      const next = new Set(prev)
      next.has(aff) ? next.delete(aff) : next.add(aff)
      return next
    })
  }

  const toggleGroup = (grp: string) => {
    setSelectedGroups((prev) => {
      const next = new Set(prev)
      next.has(grp) ? next.delete(grp) : next.add(grp)
      return next
    })
  }

  const filtered = useMemo(() => {
    const q = debouncedQuery.toLowerCase()
    return members.filter((m) => {
      if (selectedAffiliations.size && !selectedAffiliations.has(m.affiliation))
        return false
      if (selectedGroups.size && !selectedGroups.has(m.group)) return false
      if (q) {
        const haystack = [m.name, m.title1, m.title2, m.bio]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [members, debouncedQuery, selectedAffiliations, selectedGroups])

  const grouped = useMemo(() => {
    const map = new Map<string, TeamMember[]>()
    for (const aff of AFFILIATIONS) {
      const label = getDisplayLabel(aff)
      const items = filtered.filter((m) => m.affiliation === aff)
      if (!items.length) continue
      const existing = map.get(label) ?? []
      map.set(label, [...existing, ...items])
    }
    return map
  }, [filtered])

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-2 sm:px-6 sm:pb-20 md:px-8 md:pb-24">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Our Team
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Meet the researchers, engineers, designers, and educators behind PLUS
          -- working together to advance learning through technology.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Search by name, title, or bio..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-sm"
          aria-label="Search team members"
        />

        {/* Affiliation chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Affiliation:
          </span>
          {AFFILIATIONS.map((aff) => (
            <Button
              key={aff}
              variant={selectedAffiliations.has(aff) ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs"
              onClick={() => toggleAffiliation(aff)}
            >
              {aff}
            </Button>
          ))}
        </div>

        {/* Group chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Role:
          </span>
          {GROUPS.map((grp) => (
            <Button
              key={grp}
              variant={selectedGroups.has(grp) ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs"
              onClick={() => toggleGroup(grp)}
            >
              {grp}
            </Button>
          ))}
        </div>
      </div>

      {/* Team grid grouped by affiliation */}
      {grouped.size === 0 ? (
        <div className="flex flex-col items-center gap-2 py-20 text-center">
          <p className="text-lg font-medium text-muted-foreground">
            {members.length === 0
              ? "Team directory coming soon."
              : "No team members match your filters."}
          </p>
          {members.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery("")
                setSelectedAffiliations(new Set())
                setSelectedGroups(new Set())
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          {[...grouped.entries()].map(([affiliation, groupMembers]) => (
            <section key={affiliation} className="flex flex-col gap-5">
              <h2 className="text-lg font-semibold text-foreground">
                {affiliation}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({groupMembers.length})
                </span>
              </h2>
              <div
                className={cn(
                  "grid gap-4",
                  "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                )}
              >
                {groupMembers.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
