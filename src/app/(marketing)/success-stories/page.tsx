import { fetchSuccessStories } from "@/lib/notion/queries/success-stories"
import { SuccessStoriesClient } from "./success-stories-client"

export const revalidate = 3600

export default async function SuccessStoriesPage() {
  const stories = await fetchSuccessStories()
  return <SuccessStoriesClient stories={stories} />
}
