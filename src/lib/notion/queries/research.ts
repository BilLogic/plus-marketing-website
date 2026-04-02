import { getNotionClient } from "@/lib/notion/client"
import type { ResearchPaper } from "@/lib/notion/types"
import {
  getTitle,
  getRichText,
  getMultiSelect,
  getDate,
  getUrl,
} from "@/lib/notion/utils/parse-properties"
import { applyResearchGenres } from "@/lib/research/research-genres"
import { readCache, writeCache } from "@/lib/notion/utils/cache"

const CACHE_KEY = "research"

/** First non-empty multi-select among common Notion column names for research themes. */
export function getResearchTopicsFromProperties(
  props: Record<string, unknown>
): string[] {
  for (const key of ["Topics", "Tags", "Theme", "Category"]) {
    const v = getMultiSelect(props[key])
    if (v.length) return v
  }
  return []
}

const normalizeResearchPaper = (p: ResearchPaper): ResearchPaper => ({
  ...p,
  topics: Array.isArray(p.topics) ? p.topics : [],
})

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
    topics: getResearchTopicsFromProperties(props),
    paperLink: getUrl(props["Paper Link"]),
    presentationLink: getUrl(props["Presentation Link"]),
    videoLink: getUrl(props["Video Link"]),
  }
}

export const fetchResearchPapers = async (): Promise<ResearchPaper[]> => {
  const databaseId = process.env.NOTION_RESEARCH_DB_ID
  if (!databaseId) {
    const cached = await readCache<ResearchPaper[]>(CACHE_KEY)
    return (cached ?? []).map(normalizeResearchPaper).map(applyResearchGenres)
  }

  try {
    const notion = getNotionClient()
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        { property: "Publish Date", direction: "descending" as const },
      ],
    })

    const papers = response.results.map(parseResearchPaper).map(applyResearchGenres)
    await writeCache(CACHE_KEY, papers)
    return papers
  } catch (error) {
    console.error("Failed to fetch research papers from Notion:", error)
    const cached = await readCache<ResearchPaper[]>(CACHE_KEY)
    return (cached ?? []).map(normalizeResearchPaper).map(applyResearchGenres)
  }
}
