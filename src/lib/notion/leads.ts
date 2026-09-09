import { getNotionClient } from "./client"

/**
 * Persists form submissions to Notion.
 *
 * Both `/api/newsletter` and `/api/contact` previously validated a payload,
 * returned an id, and delivered it nowhere — the newsletter form was live in
 * the footer of every page, so signups were collected and discarded. The whole
 * point of this module is that a submission lands somewhere a human reads.
 *
 * Notion is the destination because the site's CMS already runs on it: the
 * `NOTION_API_KEY` credential exists, the team works there daily, and no new
 * vendor or secret is introduced.
 */

export type LeadKind = "newsletter" | "contact"

type NewsletterLead = { kind: "newsletter"; email: string }
type ContactLead = {
  kind: "contact"
  name: string
  email: string
  message: string
}

export type Lead = NewsletterLead | ContactLead

const DATABASE_ENV: Record<LeadKind, string> = {
  newsletter: "NOTION_NEWSLETTER_DB_ID",
  contact: "NOTION_CONTACT_DB_ID",
}

/**
 * Whether a destination is configured for this kind of submission.
 *
 * Callers must check this before showing a form. A form with nowhere to send
 * its data should not be rendered at all — that is the bug this replaces, and
 * silently re-introducing it would be worse than having no form.
 */
export function isLeadDestinationConfigured(kind: LeadKind): boolean {
  return Boolean(process.env[DATABASE_ENV[kind]])
}

/** Notion rejects rich_text values over 2000 characters with a 400. */
const MAX_TEXT = 2000

function text(value: string) {
  return [{ text: { content: value.slice(0, MAX_TEXT) } }]
}

function propertiesFor(lead: Lead) {
  if (lead.kind === "newsletter") {
    return {
      Email: { title: text(lead.email) },
      "Submitted at": { date: { start: new Date().toISOString() } },
    }
  }
  return {
    Name: { title: text(lead.name) },
    Email: { email: lead.email },
    Message: { rich_text: text(lead.message) },
    "Submitted at": { date: { start: new Date().toISOString() } },
  }
}

/**
 * Writes one submission. Throws on a missing destination or a Notion failure —
 * the caller must surface that to the visitor rather than swallowing it, so
 * nobody is told their message was received when it was not.
 */
export async function recordLead(lead: Lead): Promise<{ id: string }> {
  const databaseId = process.env[DATABASE_ENV[lead.kind]]
  if (!databaseId) {
    throw new Error(
      `${DATABASE_ENV[lead.kind]} is not set — refusing to accept a ${lead.kind} submission with nowhere to store it.`,
    )
  }

  const page = await getNotionClient().pages.create({
    parent: { database_id: databaseId },
    properties: propertiesFor(lead) as never,
  })

  return { id: page.id }
}
