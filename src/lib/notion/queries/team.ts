import { getNotionClient } from "@/lib/notion/client"
import type { TeamAffiliation, TeamMember } from "@/lib/notion/types"
import {
  getTitle,
  getRichText,
  getSelect,
  getDate,
  getUrl,
  getTeamMemberPictureUrl,
} from "@/lib/notion/utils/parse-properties"
import { readCache, writeCache } from "@/lib/notion/utils/cache"

const DATABASE_ID = "134b7cca4982801da91dd678e79d6e27"
const CACHE_KEY = "team"

const AFFILIATION_ORDER: Record<string, number> = {
  Leadership: 0,
  "PLUS Staff": 1,
  "Independent Study Student": 2,
  "Student Intern": 2,
  "Past Collaborators": 3,
}

const parseTeamMember = (page: any): TeamMember => {
  const props = page.properties
  return {
    id: page.id,
    name: getTitle(props.Name),
    affiliation: getSelect(props.Affiliation) as TeamMember["affiliation"] | null,
    group: getSelect(props.Group) as TeamMember["group"],
    joinedDate: getDate(props["Date Joined PLUS"]),
    picture: getTeamMemberPictureUrl(props),
    title1: getRichText(props["Primary Role"]),
    title2: getRichText(props["Secondary Title"]),
    linkedIn: getUrl(props.LinkedIn),
    googleScholar: getUrl(props["Google Scholar"]),
    personalWebsite: getUrl(props["Personal Website"]),
    bio: getRichText(props["Short Bio"]),
  }
}

export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  if (!process.env.NOTION_API_KEY) {
    const cached = await readCache<TeamMember[]>(CACHE_KEY)
    return cached ?? []
  }

  try {
    const notion = getNotionClient()
    const pages: Awaited<
      ReturnType<typeof notion.databases.query>
    >["results"] = []
    let cursor: string | undefined

    do {
      const response = await notion.databases.query({
        database_id: DATABASE_ID,
        start_cursor: cursor,
      })
      pages.push(...response.results)
      cursor = response.has_more ? response.next_cursor! : undefined
    } while (cursor)

    const members = pages.map(parseTeamMember)

    members.sort((a, b) => {
      const affA = a.affiliation ? (AFFILIATION_ORDER[a.affiliation] ?? 99) : 98
      const affB = b.affiliation ? (AFFILIATION_ORDER[b.affiliation] ?? 99) : 98
      if (affA !== affB) return affA - affB

      return a.name.localeCompare(b.name)
    })

    await writeCache(CACHE_KEY, members)
    return members
  } catch (error) {
    console.error("Failed to fetch team members from Notion:", error)
    const cached = await readCache<TeamMember[]>(CACHE_KEY)
    return cached ?? []
  }
}

/**
 * Affiliations on `/for-researchers` “Our Researchers” — Notion Group = Researcher plus one of these.
 */
const RESEARCHERS_GRID_AFFILIATIONS: TeamAffiliation[] = [
  "Leadership",
  "PLUS Staff",
]

/** Entries with Group = Researcher and a research-staff affiliation — used on `/for-researchers`. */
export async function fetchResearchTeamMembers(): Promise<TeamMember[]> {
  const members = await fetchTeamMembers()
  const grid = members.filter(
    (m) =>
      m.group === "Researcher" &&
      m.affiliation != null &&
      RESEARCHERS_GRID_AFFILIATIONS.includes(m.affiliation)
  )
  // Leadership before PLUS Staff (cache / sync paths may not match `fetchTeamMembers` sort).
  grid.sort((a, b) => {
    const affA = a.affiliation ? (AFFILIATION_ORDER[a.affiliation] ?? 99) : 99
    const affB = b.affiliation ? (AFFILIATION_ORDER[b.affiliation] ?? 99) : 99
    if (affA !== affB) return affA - affB
    const dateA = a.joinedDate ?? ""
    const dateB = b.joinedDate ?? ""
    if (dateA !== dateB) return dateA.localeCompare(dateB)
    return a.name.localeCompare(b.name)
  })
  return grid
}
