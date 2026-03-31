import { Client } from "@notionhq/client"

let client: Client | null = null

export const getNotionClient = (): Client => {
  if (!client) {
    client = new Client({
      auth: process.env.NOTION_API_KEY,
    })
  }
  return client
}
