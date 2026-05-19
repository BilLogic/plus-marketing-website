import { Suspense } from "react"
import type { Metadata } from "next"
import { fetchResearchPapers } from "@/lib/notion/queries/research"
import { ResearchPageClient } from "./research-page-client"

export const metadata: Metadata = {
  title: "Publications",
  description: "Explore the full archive of PLUS research publications.",
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
