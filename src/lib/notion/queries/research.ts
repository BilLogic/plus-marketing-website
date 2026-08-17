import { getNotionClient } from "@/lib/notion/client"
import type { ResearchPaper } from "@/lib/notion/types"
import {
  getTitle,
  getRichText,
  getMultiSelect,
  getSelect,
  getDate,
  getUrl,
} from "@/lib/notion/utils/parse-properties"
import {
  isPublicationType,
  type PublicationType,
} from "@/lib/research/publication-types"
import { applyResearchGenres } from "@/lib/research/research-genres"
import { readCache, writeCache } from "@/lib/notion/utils/cache"

const CACHE_KEY = "research"

/** First non-empty multi-select among common Notion column names for research themes. */
function getResearchTopicsFromProperties(
  props: Record<string, unknown>
): string[] {
  for (const key of ["Topics", "Tags", "Theme", "Category"]) {
    const v = getMultiSelect(props[key])
    if (v.length) return v
  }
  return []
}

/** Notion **Type** select; unrecognized values fall back to null rather than leaking to the UI. */
function getPublicationType(prop: unknown): PublicationType | null {
  const v = getSelect(prop)
  return v && isPublicationType(v) ? v : null
}

const normalizeResearchPaper = (p: ResearchPaper): ResearchPaper => ({
  ...p,
  topics: Array.isArray(p.topics) ? p.topics : [],
  // Cache files written before `Type` existed have no such key.
  type: p.type && isPublicationType(p.type) ? p.type : null,
})

const parseResearchPaper = (page: any): ResearchPaper => {
  const props = page.properties
  return {
    id: page.id,
    title: getTitle(props.Title),
    authors: getMultiSelect(props.Authors),
    publishDate: getDate(props["Date Published"]) ?? "",
    venue: getRichText(props["Conference or Journal"]),
    abstract: getRichText(props.Abstract),
    shortDescription: getRichText(props["Website Summary"]),
    topics: getResearchTopicsFromProperties(props),
    type: getPublicationType(props.Type),
    paperLink: getUrl(props["Link to Paper"]),
    presentationLink: getUrl(props["Link to Slides or Poster"]),
    videoLink: getUrl(props["Link to Video"]),
  }
}

export const fetchResearchPapers = async (): Promise<ResearchPaper[]> => {
  const databaseId = process.env.NOTION_RESEARCH_DB_ID
  if (!databaseId) {
    const cached = await readCache<ResearchPaper[]>(CACHE_KEY)
    return (cached ?? [])
      .map(normalizeResearchPaper)
      .map(applyResearchGenres)
  }

  try {
    const notion = getNotionClient()
    // Notion caps a query at 100 rows — page through `next_cursor` or the list
    // (and the count derived from it) silently truncates once the CMS passes 100.
    const results: unknown[] = []
    let cursor: string | undefined = undefined
    do {
      const response = await notion.databases.query({
        database_id: databaseId,
        sorts: [
          { property: "Date Published", direction: "descending" as const },
        ],
        start_cursor: cursor,
        page_size: 100,
      })
      results.push(...response.results)
      cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
    } while (cursor)

    const papers = results
      .map(parseResearchPaper)
      .map(applyResearchGenres)
    await writeCache(CACHE_KEY, papers)
    return papers
  } catch (error) {
    console.error("Failed to fetch research papers from Notion:", error)
    const cached = await readCache<ResearchPaper[]>(CACHE_KEY)
    return (cached ?? [])
      .map(normalizeResearchPaper)
      .map(applyResearchGenres)
  }
}

/**
 * Floor to `step` so a marketing "N+" claim is always backed by at least N CMS
 * entries — 67 publications renders "60+", and the copy only moves at 70.
 */
export const roundedPublicationStat = (count: number, step = 10): number =>
  Math.floor(count / step) * step

/**
 * Every row of the Publications & Resources CMS — papers, workshops, books and
 * datasets alike — matching what `/publications` lists.
 *
 * `floor` guards the homepage stat against a Notion outage landing on an empty
 * disk cache: the claim degrades to the last hand-verified number, never "0+".
 */
export const fetchPublicationCount = async (floor = 30): Promise<number> => {
  const papers = await fetchResearchPapers()
  return Math.max(papers.length, floor)
}
