/**
 * Writes `src/data/cache/team.json` using the same `fetchTeamMembers()` path as the app.
 *
 * Run from repo root with Notion credentials (e.g. load `.env.local`):
 *   npx dotenv-cli -e .env.local -- npx tsx scripts/fetch-team-cache.ts
 * Or:
 *   NOTION_API_KEY=secret_... npx tsx scripts/fetch-team-cache.ts
 */

import { fetchTeamMembers } from "@/lib/notion/queries/team"

async function main() {
  const hasKey = Boolean(process.env.NOTION_API_KEY)
  if (!hasKey) {
    console.warn(
      "NOTION_API_KEY is not set — fetchTeamMembers will return cached team.json only (no refresh)."
    )
  }
  const members = await fetchTeamMembers()
  console.log(
    hasKey
      ? `Fetched ${members.length} team member(s); cache written to src/data/cache/team.json`
      : `Loaded ${members.length} team member(s) from cache (no API key).`
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
