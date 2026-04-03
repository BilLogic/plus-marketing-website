/**
 * One-time migration script: Import Airtable research CSV into Notion.
 *
 * Prerequisites:
 * 1. Create a Research Papers database in Notion with properties:
 *    - Title (title), Authors (multi_select), Publish Date (date),
 *    - Venue (rich_text), Abstract (rich_text), Short Description (rich_text),
 *    - Paper Link (url), Presentation Link (url), Video Link (url)
 * 2. Share the database with your Notion integration
 * 3. Set NOTION_API_KEY and NOTION_RESEARCH_DB_ID env vars
 *
 * Usage: npx tsx scripts/migrate-airtable-to-notion.ts [path-to-csv]
 * Default CSV: ~/Downloads/Research Index Grid View.csv
 */

import { Client } from "@notionhq/client"
import * as fs from "fs"
import * as path from "path"

const CSV_PATH = process.argv[2] || path.join(
  process.env.HOME || "",
  "Downloads/Research Index Grid View.csv"
)

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const DATABASE_ID = process.env.NOTION_RESEARCH_DB_ID

function parseCSV(text: string): string[][] {
  const results: string[][] = []
  let row: string[] = []
  let field = ""
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        field += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === "," && !inQuotes) {
      row.push(field)
      field = ""
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (field || row.length > 0) {
        row.push(field)
        results.push(row)
      }
      row = []
      field = ""
      if (ch === "\r" && text[i + 1] === "\n") i++
    } else {
      field += ch
    }
  }
  if (field || row.length > 0) {
    row.push(field)
    results.push(row)
  }
  return results
}

function parseDate(dateStr: string): string | null {
  if (!dateStr) return null
  const parts = dateStr.split("/")
  if (parts.length === 3) {
    const [m, d, y] = parts
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
  }
  return null
}

async function main() {
  if (!DATABASE_ID) {
    console.error("NOTION_RESEARCH_DB_ID is required")
    process.exit(1)
  }
  if (!process.env.NOTION_API_KEY) {
    console.error("NOTION_API_KEY is required")
    process.exit(1)
  }

  console.log(`Reading CSV: ${CSV_PATH}`)
  const csv = fs.readFileSync(CSV_PATH, "utf8")
  const rows = parseCSV(csv)
  const data = rows.slice(1).filter((r) => r[0]?.trim())

  console.log(`Found ${data.length} papers to import`)

  for (let i = 0; i < data.length; i++) {
    const row = data[i]
    const title = (row[0] || "").trim()
    const authors = (row[1] || "").split(",").map((a) => a.trim()).filter(Boolean)
    const publishDate = parseDate((row[2] || "").trim())
    const venue = (row[3] || "").trim()
    const abstract = (row[4] || "").trim()
    const shortDesc = (row[5] || "").trim()
    const paperLink = (row[6] || "").trim()
    const presLink = (row[7] || "").trim()
    const videoLink = (row[8] || "").trim()

    try {
      await notion.pages.create({
        parent: { database_id: DATABASE_ID },
        properties: {
          Title: { title: [{ text: { content: title } }] },
          Authors: { multi_select: authors.map((name) => ({ name })) },
          ...(publishDate && {
            "Publish Date": { date: { start: publishDate } },
          }),
          ...(venue && {
            Venue: { rich_text: [{ text: { content: venue } }] },
          }),
          ...(abstract && {
            Abstract: { rich_text: [{ text: { content: abstract.slice(0, 2000) } }] },
          }),
          ...(shortDesc && {
            "Short Description": { rich_text: [{ text: { content: shortDesc.slice(0, 2000) } }] },
          }),
          ...(paperLink && { "Paper Link": { url: paperLink } }),
          ...(presLink && { "Presentation Link": { url: presLink } }),
          ...(videoLink && { "Video Link": { url: videoLink } }),
        },
      })

      console.log(`  [${i + 1}/${data.length}] ${title.slice(0, 60)}...`)

      // Rate limit: Notion allows 3 requests/second
      await new Promise((r) => setTimeout(r, 350))
    } catch (err) {
      console.error(`  [${i + 1}] FAILED: ${title.slice(0, 40)}...`, err)
    }
  }

  console.log("\nMigration complete!")
}

main().catch((err) => {
  console.error("Migration failed:", err)
  process.exit(1)
})
