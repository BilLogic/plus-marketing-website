import { getNotionClient } from "@/lib/notion/client"
import type { ResearchPaper } from "@/lib/notion/types"
import {
  getTitle,
  getRichText,
  getMultiSelect,
  getDate,
  getUrl,
} from "@/lib/notion/utils/parse-properties"
import { readCache, writeCache } from "@/lib/notion/utils/cache"

const CACHE_KEY = "research"

const parseResearchPaper = (page: any): ResearchPaper => {
  const props = page.properties
  return {
    id: page.id,
    title: getTitle(props.Title),
    authors: getMultiSelect(props.Authors),
    publishDate: getDate(props["Publish Date"]) ?? "",
    venue: getRichText(props.Venue),
    abstract: getRichText(props.Abstract),
    shortDescription: getRichText(props["Short Description"]),
    paperLink: getUrl(props["Paper Link"]),
    presentationLink: getUrl(props["Presentation Link"]),
    videoLink: getUrl(props["Video Link"]),
  }
}

export const fetchResearchPapers = async (): Promise<ResearchPaper[]> => {
  const databaseId = process.env.NOTION_RESEARCH_DB_ID
  if (!databaseId) {
    console.error("NOTION_RESEARCH_DB_ID is not set")
    const cached = await readCache<ResearchPaper[]>(CACHE_KEY)
    return cached ?? []
  }

  try {
    const notion = getNotionClient()
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        { property: "Publish Date", direction: "descending" as const },
      ],
    })

    const papers = response.results.map(parseResearchPaper)
    await writeCache(CACHE_KEY, papers)
    return papers
  } catch (error) {
    console.error("Failed to fetch research papers from Notion:", error)
    const cached = await readCache<ResearchPaper[]>(CACHE_KEY)
    return cached ?? []
  }
}
