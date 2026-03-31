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
  "Current Students": 2,
  "Past Collaborators": 3,
}

const parseTeamMember = (page: any): TeamMember => {
  const props = page.properties
  return {
    id: page.id,
    name: getTitle(props.Name),
    affiliation: getSelect(props.Affiliation) as TeamMember["affiliation"],
    group: getSelect(props.Group) as TeamMember["group"],
    joinedDate: getDate(props["Joined Date"]),
    picture: getFiles(props.Picture),
    title1: getRichText(props["Title 1"]),
    title2: getRichText(props["Title 2"]),
    linkedIn: getUrl(props.LinkedIn),
    googleScholar: getUrl(props["Google Scholar"]),
    bio: getRichText(props.Bio),
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
