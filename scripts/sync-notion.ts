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
      joinedDate: getDate(props["Joined Date"]),
      picture: getFiles(props.Picture),
      title1: getRichText(props["Title 1"]),
      title2: getRichText(props["Title 2"]),
      linkedIn: getUrl(props.LinkedIn),
      googleScholar: getUrl(props["Google Scholar"]),
      bio: getRichText(props.Bio),
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
      marketingBlurb: getRichText(props["Marketing Blurb"]),
      summary: getRichText(props.Summary),
      category: getSelect(props.Category),
      publicationDate: getDate(props["Publication Date"]),
      author: getRichText(props.Author),
      featuredImage: getFiles(props["Featured Image"]),
      externalLink: getUrl(props["External Link"]),
      featured: getCheckbox(props.Featured),
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
      publishDate: getDate(props["Publish Date"]),
      venue: getRichText(props.Venue),
      abstract: getRichText(props.Abstract),
      shortDescription: getRichText(props["Short Description"]),
      paperLink: getUrl(props["Paper Link"]),
      presentationLink: getUrl(props["Presentation Link"]),
      videoLink: getUrl(props["Video Link"]),
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
  const stories = pages.map((page: any) => {
    const props = page.properties
    return {
      id: page.id,
      title: getTitle(props.Title),
      category: getSelect(props.Category),
      summary: getRichText(props.Summary),
      fullContent: getRichText(props["Full Content"]),
      image: getFiles(props.Image),
      quote: getRichText(props.Quote),
      quoteAttribution: getRichText(props["Quote Attribution"]),
      publishedDate: getDate(props["Published Date"]),
    }
  })
  fs.writeFileSync(path.join(CACHE_DIR, "success-stories.json"), JSON.stringify(stories, null, 2))
  console.log(`  Synced ${stories.length} success stories`)
}

async function main() {
  console.log("Starting Notion sync...")
  console.log("")

  await syncTeam()
  await syncNews()
  await syncResearch()
  await syncSuccessStories()

  console.log("")
  console.log("Sync complete!")
}

main().catch((err) => {
  console.error("Sync failed:", err)
  process.exit(1)
})
