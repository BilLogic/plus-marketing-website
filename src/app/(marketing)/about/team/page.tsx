import type { Metadata } from "next"
import { Suspense } from "react"
import { fetchTeamMembers } from "@/lib/notion/queries/team"
import { TeamPageClient } from "./team-page-client"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the researchers, engineers, and educators building PLUS — personalized learning and scalable tutoring for math classrooms.",
}

export default async function TeamPage() {
  const members = await fetchTeamMembers()
  return (
    <Suspense>
      <TeamPageClient members={members} />
    </Suspense>
  )
}
