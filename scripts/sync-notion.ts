/**
 * Sync script: Fetches all CMS data from Notion and writes to local cache.
 * Run manually: npx tsx scripts/sync-notion.ts
 * Also used by GitHub Actions for scheduled sync.
 */

import { Client } from "@notionhq/client"
import * as fs from "fs"
import * as path from "path"

const CACHE_DIR = path.resolve(__dirname, "../src/data/cache")

const notion = new Client({ auth: process.env.NOTION_API_KEY })

async function queryDatabase(databaseId: string) {
  const pages: any[] = []
  let cursor: string | undefined

  do {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
    })
    pages.push(...response.results)
    cursor = response.has_more ? response.next_cursor! : undefined
  } while (cursor)

  return pages
}

function getRichText(prop: any): string | null {
  if (!prop?.rich_text?.length) return null
  return prop.rich_text.map((t: any) => t.plain_text).join("")
}

function getTitle(prop: any): string {
  if (!prop?.title?.length) return ""
  return prop.title.map((t: any) => t.plain_text).join("")
}

function getSelect(prop: any): string | null {
  return prop?.select?.name ?? null
}

function getMultiSelect(prop: any): string[] {
  return prop?.multi_select?.map((s: any) => s.name) ?? []
}

function getDate(prop: any): string | null {
  return prop?.date?.start ?? null
}

function getCheckbox(prop: any): boolean {
  return prop?.checkbox ?? false
}

function getUrl(prop: any): string | null {
  return prop?.url ?? null
}

function getFiles(prop: any): string | null {
  const files = prop?.files
  if (!files?.length) return null
  const file = files[0]
  return file.file?.url ?? file.external?.url ?? null
}

// Blocks-to-markdown converter (mirrors src/lib/notion/utils/blocks-to-markdown.ts)
function richTextToMarkdown(richText: any[]): string {
  if (!richText?.length) return ""
  return richText
    .map((t: any) => {
      let text = t.plain_text ?? ""
      const ann = t.annotations ?? {}
      if (ann.bold) text = `**${text}**`
      if (ann.italic) text = `*${text}*`
      if (ann.code) text = `\`${text}\``
      if (ann.strikethrough) text = `~~${text}~~`
      if (t.href) text = `[${text}](${t.href})`
      return text
    })
    .join("")
}

function blockToMarkdown(block: any): string {
  const type = block.type
  const data = block[type]
  switch (type) {
    case "paragraph":
      return richTextToMarkdown(data?.rich_text) + "\n"
    case "heading_1":
      return `# ${richTextToMarkdown(data?.rich_text)}\n`
    case "heading_2":
      return `## ${richTextToMarkdown(data?.rich_text)}\n`
    case "heading_3":
      return `### ${richTextToMarkdown(data?.rich_text)}\n`
    case "bulleted_list_item":
      return `- ${richTextToMarkdown(data?.rich_text)}\n`
    case "numbered_list_item":
      return `1. ${richTextToMarkdown(data?.rich_text)}\n`
    case "to_do": {
      const checked = data?.checked ? "x" : " "
      return `- [${checked}] ${richTextToMarkdown(data?.rich_text)}\n`
    }
    case "toggle":
      return `<details><summary>${richTextToMarkdown(data?.rich_text)}</summary></details>\n`
    case "quote":
      return `> ${richTextToMarkdown(data?.rich_text)}\n`
    case "callout": {
      const icon = data?.icon?.emoji ?? ""
      return `> ${icon} ${richTextToMarkdown(data?.rich_text)}\n`
    }
    case "divider":
      return "---\n"
    case "code": {
      const lang = data?.language ?? ""
      return `\`\`\`${lang}\n${richTextToMarkdown(data?.rich_text)}\n\`\`\`\n`
    }
    case "image": {
      const url = data?.file?.url ?? data?.external?.url ?? ""
      const caption = richTextToMarkdown(data?.caption)
      return `![${caption}](${url})\n`
    }
    case "video": {
      const videoUrl = data?.file?.url ?? data?.external?.url ?? ""
      return `[Video](${videoUrl})\n`
    }
    case "bookmark":
      return `[${data?.url ?? "Link"}](${data?.url ?? ""})\n`
    case "embed":
      return `[Embed](${data?.url ?? ""})\n`
    default:
      return ""
  }
}

function blocksToMarkdown(blocks: any[]): string {
  return blocks.map(blockToMarkdown).join("\n").trim()
}

async function fetchPageContent(pageId: string): Promise<string | null> {
  try {
    const blocks: any[] = []
    let cursor: string | undefined
    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
      })
      blocks.push(...response.results)
      cursor = response.has_more ? response.next_cursor! : undefined
    } while (cursor)
    if (blocks.length === 0) return null
    return blocksToMarkdown(blocks)
  } catch {
    return null
  }
}

async function syncTeam() {
  const dbId = process.env.NOTION_TEAM_DB_ID || "134b7cca4982801da91dd678e79d6e27"
  console.log("Syncing team members...")
  const pages = await queryDatabase(dbId)
  const members = pages.map((page: any) => {
    const props = page.properties
    return {
      id: page.id,
      name: getTitle(props.Name),
      affiliation: getSelect(props.Affiliation),
      group: getSelect(props.Group),
      joinedDate: getDate(props["Date Joined PLUS"]),
      picture: getFiles(props["Profile Photo"]),
      title1: getRichText(props["Primary Role"]),
      title2: getRichText(props["Secondary Title"]),
      linkedIn: getUrl(props.LinkedIn),
      googleScholar: getUrl(props["Google Scholar"]),
      personalWebsite: getUrl(props["Personal Website"]),
      bio: getRichText(props["Short Bio"]),
    }
  })
  fs.writeFileSync(path.join(CACHE_DIR, "team.json"), JSON.stringify(members, null, 2))
  console.log(`  Synced ${members.length} team members`)
}

async function syncNews() {
  const dbId = process.env.NOTION_NEWS_DB_ID || "18ab7cca498280b79168db5c5ab201e9"
  console.log("Syncing news...")
  const pages = await queryDatabase(dbId)
  const items = pages.map((page: any) => {
    const props = page.properties
    return {
      id: page.id,
      title: getTitle(props.Title),
      marketingBlurb: getRichText(props["One-Line Teaser"]),
      summary: getRichText(props.Summary),
      category: getSelect(props.Category),
      publicationDate: getDate(props["Date Published"]),
      author: getRichText(props.Author),
      featuredImage: getFiles(props["Cover Image"]),
      externalLink: getUrl(props["Link to Article or Source"]),
      featured: getCheckbox(props["Priority / Featured?"]),
    }
  })
  fs.writeFileSync(path.join(CACHE_DIR, "news.json"), JSON.stringify(items, null, 2))
  console.log(`  Synced ${items.length} news items`)
}

async function syncResearch() {
  const dbId = process.env.NOTION_RESEARCH_DB_ID
  if (!dbId) {
    console.log("Skipping research (NOTION_RESEARCH_DB_ID not set)")
    return
  }
  console.log("Syncing research papers...")
  const pages = await queryDatabase(dbId)
  const papers = pages.map((page: any) => {
    const props = page.properties
    return {
      id: page.id,
      title: getTitle(props.Title),
      authors: getMultiSelect(props.Authors),
      publishDate: getDate(props["Date Published"]),
      venue: getRichText(props["Conference or Journal"]),
      abstract: getRichText(props.Abstract),
      shortDescription: getRichText(props["Website Summary"]),
      paperLink: getUrl(props["Link to Paper"]),
      presentationLink: getUrl(props["Link to Slides or Poster"]),
      videoLink: getUrl(props["Link to Video"]),
    }
  })
  fs.writeFileSync(path.join(CACHE_DIR, "research.json"), JSON.stringify(papers, null, 2))
  console.log(`  Synced ${papers.length} research papers`)
}

async function syncSuccessStories() {
  const dbId = process.env.NOTION_SUCCESS_STORIES_DB_ID
  if (!dbId) {
    console.log("Skipping success stories (NOTION_SUCCESS_STORIES_DB_ID not set)")
    return
  }
  console.log("Syncing success stories...")
  const pages = await queryDatabase(dbId)
  const stories = []
  for (const page of pages) {
    const props = (page as any).properties
    const content = await fetchPageContent(page.id)
    stories.push({
      id: page.id,
      title: getTitle(props.Title),
      category: getSelect(props.Category),
      summary: getRichText(props.Summary),
      content,
      coverImage: getFiles(props["Cover Image"]),
      author: getRichText(props["Written By"]),
      clientPartner: getRichText(props["Organization Name"]),
      quote: getRichText(props.Quote),
      quoteAttribution: getRichText(props["Who Said It?"]),
      publishedDate: getDate(props["Date Published"]),
      publicReadUrl: getUrl(props["Public URL"]) ?? getUrl(props["Public page URL"]) ?? null,
    })
  }
  fs.writeFileSync(path.join(CACHE_DIR, "success-stories.json"), JSON.stringify(stories, null, 2))
  console.log(`  Synced ${stories.length} success stories`)
}

async function main() {
  console.log("Starting Notion sync...")
  console.log("")

  const results: Record<string, boolean> = {}

  try { await syncTeam(); results.team = true } catch (e) {
    console.error("Team sync failed:", e)
    results.team = false
  }

  try { await syncNews(); results.news = true } catch (e) {
    console.error("News sync failed:", e)
    results.news = false
  }

  try { await syncResearch(); results.research = true } catch (e) {
    console.error("Research sync failed:", e)
    results.research = false
  }

  try { await syncSuccessStories(); results.stories = true } catch (e) {
    console.error("Success stories sync failed:", e)
    results.stories = false
  }

  console.log("")

  const failed = Object.entries(results).filter(([, ok]) => !ok).map(([name]) => name)
  if (failed.length > 0) {
    console.error(`Partial sync failure: ${failed.join(", ")}`)
    process.exit(1)
  }

  console.log("Sync complete!")
}

main().catch((err) => {
  console.error("Sync failed:", err)
  process.exit(1)
})
