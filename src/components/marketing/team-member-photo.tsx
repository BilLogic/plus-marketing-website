"use client"

import { cn } from "@/lib/utils"

type TeamMemberPhotoProps = {
  memberId: string
  name: string
  cachedSrc?: string | null
  className?: string
}

/**
 * Headshot via `/api/team-photo/[id]` (fresh Notion URL). Plain img + onError matches
 * `ResearcherCard` — next/image does not handle the API redirect reliably.
 */
export function TeamMemberPhoto({
  memberId,
  name,
  cachedSrc,
  className,
}: TeamMemberPhotoProps) {
  const proxySrc = `/api/team-photo/${memberId}`
  const initialSrc = cachedSrc ?? proxySrc

  function handleError(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget
    if (img.dataset.triedProxy !== "1") {
      img.dataset.triedProxy = "1"
      img.src = proxySrc
    } else {
      img.style.display = "none"
    }
  }

  return (
    <img
      src={initialSrc}
      alt={`${name} profile photo`}
      className={cn("absolute inset-0 h-full w-full object-cover object-top", className)}
      onError={handleError}
    />
  )
}

export function teamMemberInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}
