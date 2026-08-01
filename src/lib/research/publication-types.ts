/**
 * Publication types mirror the Notion **Type** select on the `Publications & Resources`
 * CMS, which in turn mirrors the LEVI monthly report "Public Goods" vocabulary. Keep the
 * strings byte-identical to Notion — they are matched, not parsed.
 */
export const PUBLICATION_TYPES = [
  "research paper",
  "workshop",
  "book",
  "dataset",
] as const

export type PublicationType = (typeof PUBLICATION_TYPES)[number]

/** Sentence-case label for display — Notion stores these lowercase. */
const PUBLICATION_TYPE_LABELS: Record<PublicationType, string> = {
  "research paper": "Research paper",
  workshop: "Workshop",
  book: "Book / report",
  dataset: "Dataset",
}

export function publicationTypeLabel(type: string): string {
  return PUBLICATION_TYPE_LABELS[type as PublicationType] ?? type
}

export function isPublicationType(value: string): value is PublicationType {
  return (PUBLICATION_TYPES as readonly string[]).includes(value)
}

/** Neutral slate badge — deliberately distinct from the genre pills, which encode topic, not form. */
export function publicationTypeBadgeClass(): string {
  return "border border-[#62636c]/25 bg-[#f0f0f2] text-[#62636c]"
}
