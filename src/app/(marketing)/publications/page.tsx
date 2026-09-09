import { Suspense } from "react"
import type { Metadata } from "next"
import { fetchResearchPapers } from "@/lib/notion/queries/research"
import { ResearchPageClient } from "./research-page-client"

export const metadata: Metadata = {
  // This page draws 5,682 search impressions a quarter and converts 2 clicks.
  // The queries behind those impressions are about the subject matter — "AI
  // tutoring", "personalized learning tutor", "tutoring ecosystem" — while the
  // old title described the page's filing category. Named for what the research
  // is about instead.
  title: "Research on AI Tutoring & Personalized Learning",
  description:
    "Peer-reviewed studies on AI tutoring, human-AI tutoring systems, and personalized math learning at scale — the full PLUS publication archive, with workshop materials and datasets.",
}

export const revalidate = 3600

export default async function ResearchPage() {
  const papers = await fetchResearchPapers()
  return (
    <Suspense>
      <ResearchPageClient papers={papers} />
    </Suspense>
  )
}
