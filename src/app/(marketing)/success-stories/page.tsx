import type { Metadata } from "next"
import { fetchSuccessStories } from "@/lib/notion/queries/success-stories"
import { SuccessStoriesClient } from "./success-stories-client"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "How schools, tutors, and researchers use PLUS — real results from classrooms using research-backed, AI-supported math tutoring.",
}

export default async function SuccessStoriesPage() {
  const stories = await fetchSuccessStories()
  return <SuccessStoriesClient stories={stories} />
}
