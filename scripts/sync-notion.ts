/**
 * Sync script: Fetches all CMS data from Notion and writes to local cache.
 * Run manually: npx tsx scripts/sync-notion.ts
 * Also used by GitHub Actions for scheduled sync.
 *
 * Mapping lives in `src/lib/notion/queries/` — this script only writes what the
 * site's own loaders return, so the cache can never drift from the live shape.
 */

import * as fs from "fs"
import * as path from "path"

import { loadNewsFromNotion } from "@/lib/notion/queries/news"
import { loadResearchPapersFromNotion } from "@/lib/notion/queries/research"
import { loadSuccessStoriesFromNotion } from "@/lib/notion/queries/success-stories"
import { loadTeamMembersFromNotion } from "@/lib/notion/queries/team"

const CACHE_DIR = path.resolve(__dirname, "../src/data/cache")

// Not `writeCache`: that one swallows errors and skips writes in development,
// and a sync that cannot write its output has failed.
function writeCacheFile(key: string, data: unknown[]) {
  fs.mkdirSync(CACHE_DIR, { recursive: true })
  fs.writeFileSync(path.join(CACHE_DIR, `${key}.json`), JSON.stringify(data, null, 2))
}

async function syncTeam() {
  console.log("Syncing team members...")
  const members = await loadTeamMembersFromNotion()
  writeCacheFile("team", members)
  console.log(`  Synced ${members.length} team members`)
}

async function syncNews() {
  console.log("Syncing news...")
  const items = await loadNewsFromNotion()
  writeCacheFile("news", items)
  console.log(`  Synced ${items.length} news items`)
}

async function syncResearch() {
  const dbId = process.env.NOTION_RESEARCH_DB_ID
  if (!dbId) {
    // A missing repo variable would otherwise freeze the research cache unnoticed.
    if (process.env.CI) throw new Error("NOTION_RESEARCH_DB_ID not set")
    console.log("Skipping research (NOTION_RESEARCH_DB_ID not set)")
    return
  }
  console.log("Syncing research papers...")
  const papers = await loadResearchPapersFromNotion(dbId)
  writeCacheFile("research", papers)
  console.log(`  Synced ${papers.length} research papers`)
}

async function syncSuccessStories() {
  console.log("Syncing success stories...")
  const stories = await loadSuccessStoriesFromNotion()
  writeCacheFile("success-stories", stories)
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
