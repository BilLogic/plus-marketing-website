import { getNotionClient } from "@/lib/notion/client"
import type { TeamMember } from "@/lib/notion/types"
import {
  getTitle,
  getRichText,
  getSelect,
  getDate,
  getFiles,
  getUrl,
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
    affiliation: getSelect(props.Affiliation) as TeamMember["affiliation"],
    group: getSelect(props.Group) as TeamMember["group"],
    joinedDate: getDate(props["Date Joined PLUS"]),
    picture: getFiles(props["Profile Photo"]),
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
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
    })

    const members = response.results.map(parseTeamMember)

    members.sort((a, b) => {
      const affA = AFFILIATION_ORDER[a.affiliation] ?? 99
      const affB = AFFILIATION_ORDER[b.affiliation] ?? 99
      if (affA !== affB) return affA - affB

      const dateA = a.joinedDate ?? ""
      const dateB = b.joinedDate ?? ""
      return dateA.localeCompare(dateB)
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
 * Affiliations that may appear on `/for-researchers` "Our Researchers".
 * Excludes interns and independent-study rows so the grid stays lab/research staff
 * (Notion `Group` alone is often set to Researcher too broadly).
 */
const RESEARCHERS_GRID_AFFILIATIONS: TeamMember["affiliation"][] = [
  "Leadership",
  "PLUS Staff",
  "Past Collaborators",
]

/** Entries with Group = Researcher and a research-staff affiliation — used on `/for-researchers`. */
export async function fetchResearchTeamMembers(): Promise<TeamMember[]> {
  const members = await fetchTeamMembers()
  return members.filter(
    (m) =>
      m.group === "Researcher" &&
      RESEARCHERS_GRID_AFFILIATIONS.includes(m.affiliation)
  )
}
