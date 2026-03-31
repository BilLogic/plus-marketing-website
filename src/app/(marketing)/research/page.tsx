import { Suspense } from "react"
import { fetchResearchPapers } from "@/lib/notion/queries/research"
import { ResearchPageClient } from "./research-page-client"

export const revalidate = 3600

export default async function ResearchPage() {
  const papers = await fetchResearchPapers()
  return (
    <Suspense>
      <ResearchPageClient papers={papers} />
    </Suspense>
  )
}
