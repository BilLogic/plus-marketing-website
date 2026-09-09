import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const create = vi.fn()
vi.mock("./client", () => ({
  getNotionClient: () => ({ pages: { create } }),
}))

import { isLeadDestinationConfigured, recordLead } from "./leads"

const ORIGINAL = { ...process.env }

beforeEach(() => {
  create.mockReset().mockResolvedValue({ id: "page_1" })
  process.env.NOTION_NEWSLETTER_DB_ID = "news_db"
  process.env.NOTION_CONTACT_DB_ID = "contact_db"
})

afterEach(() => {
  process.env = { ...ORIGINAL }
})

describe("isLeadDestinationConfigured", () => {
  it("is false when the database id is missing", () => {
    delete process.env.NOTION_NEWSLETTER_DB_ID
    expect(isLeadDestinationConfigured("newsletter")).toBe(false)
  })

  it("is true when configured", () => {
    expect(isLeadDestinationConfigured("contact")).toBe(true)
  })
})

describe("recordLead", () => {
  it("writes a newsletter signup to the newsletter database", async () => {
    await recordLead({ kind: "newsletter", email: "a@b.com" })

    const arg = create.mock.calls[0][0]
    expect(arg.parent).toEqual({ database_id: "news_db" })
    expect(arg.properties.Email.title[0].text.content).toBe("a@b.com")
  })

  it("writes a contact submission to the contact database", async () => {
    await recordLead({
      kind: "contact",
      name: "Ada",
      email: "ada@example.org",
      message: "Hello",
    })

    const arg = create.mock.calls[0][0]
    expect(arg.parent).toEqual({ database_id: "contact_db" })
    expect(arg.properties.Name.title[0].text.content).toBe("Ada")
    expect(arg.properties.Email.email).toBe("ada@example.org")
    expect(arg.properties.Message.rich_text[0].text.content).toBe("Hello")
  })

  /**
   * Refusing is the whole point. Accepting a submission with nowhere to store
   * it is the bug this module replaces.
   */
  it("refuses rather than silently dropping when unconfigured", async () => {
    delete process.env.NOTION_NEWSLETTER_DB_ID

    await expect(
      recordLead({ kind: "newsletter", email: "a@b.com" }),
    ).rejects.toThrow(/NOTION_NEWSLETTER_DB_ID/)
    expect(create).not.toHaveBeenCalled()
  })

  it("propagates a Notion failure instead of reporting success", async () => {
    create.mockRejectedValue(new Error("notion down"))

    await expect(
      recordLead({ kind: "newsletter", email: "a@b.com" }),
    ).rejects.toThrow("notion down")
  })

  /** Notion rejects rich_text over 2000 characters with a 400. */
  it("truncates an overlong message rather than failing the write", async () => {
    await recordLead({
      kind: "contact",
      name: "Ada",
      email: "ada@example.org",
      message: "x".repeat(5000),
    })

    const arg = create.mock.calls[0][0]
    expect(arg.properties.Message.rich_text[0].text.content).toHaveLength(2000)
  })
})
