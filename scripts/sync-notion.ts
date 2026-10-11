/**
 * Sync script: Fetches all CMS data from Notion and writes to local cache.
 * Run manually: npx tsx scripts/sync-notion.ts [team|news|research|stories ...]
 * (no names syncs everything). Also used by GitHub Actions for scheduled sync.
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
import { sameIgnoringSignedUrls } from "@/lib/notion/utils/signed-urls"

const CACHE_DIR = path.resolve(__dirname, "../src/data/cache")

/** Last committed cache, or null when missing or unreadable so it gets rewritten. */
function readPreviousCache(file: string): unknown {
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"))
  } catch {
    return null
  }
}

// Not `writeCache`: that one swallows errors and skips writes in development,
// and a sync that cannot write its output has failed.
function writeCacheFile(key: string, data: unknown[]) {
  const file = path.join(CACHE_DIR, `${key}.json`)
  // Leave the file alone when only re-signed image links differ, so an
  // unchanged CMS produces no commit.
  if (sameIgnoringSignedUrls(readPreviousCache(file), data)) return
  fs.mkdirSync(CACHE_DIR, { recursive: true })
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
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

const SYNCS: Record<string, () => Promise<void>> = {
  team: syncTeam,
  news: syncNews,
  research: syncResearch,
  stories: syncSuccessStories,
}

async function main() {
  const requested = process.argv.slice(2)
  const unknown = requested.filter((name) => !(name in SYNCS))
  if (unknown.length > 0) {
    console.error(`Unknown collection: ${unknown.join(", ")} (expected ${Object.keys(SYNCS).join(", ")})`)
    process.exit(1)
  }
  const names = requested.length > 0 ? requested : Object.keys(SYNCS)

  console.log("Starting Notion sync...")
  console.log("")

  const failed: string[] = []
  for (const name of names) {
    try {
      await SYNCS[name]()
    } catch (e) {
      console.error(`Sync of ${name} failed:`, e)
      failed.push(name)
    }
  }

  console.log("")

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
