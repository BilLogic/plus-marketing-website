import { Suspense } from "react"
import { fetchTeamMembers } from "@/lib/notion/queries/team"
import { TeamPageClient } from "./team-page-client"

export const revalidate = 3600

export default async function TeamPage() {
  const members = await fetchTeamMembers()
  return (
    <Suspense>
      <TeamPageClient members={members} />
    </Suspense>
  )
}
