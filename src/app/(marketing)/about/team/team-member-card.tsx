"use client"

import { cn } from "@/lib/utils"
import type { TeamMember } from "@/lib/notion/types"
import { Badge } from "@/components/ui/badge"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import { useState } from "react"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function getHueFromName(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash) % 360
}

const AFFILIATION_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
  Leadership: "default",
  "PLUS Staff": "secondary",
  "Current Students": "outline",
  "Past Collaborators": "outline",
}

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const [expanded, setExpanded] = useState(false)
  const hue = getHueFromName(member.name)

  return (
    <button
      type="button"
      onClick={() => member.bio && setExpanded((prev) => !prev)}
      className={cn(
        "group flex w-full flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-left",
        "transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-foreground/5",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        member.bio && "cursor-pointer"
      )}
    >
      <Avatar size="lg" className="size-20">
        {member.picture ? (
          <AvatarImage src={member.picture} alt={member.name} />
        ) : null}
        <AvatarFallback
          className="text-lg font-semibold"
          style={{
            backgroundColor: `oklch(0.85 0.08 ${hue})`,
            color: `oklch(0.3 0.08 ${hue})`,
          }}
        >
          {getInitials(member.name)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-sm font-semibold text-foreground">
          {member.name}
        </h3>
        {member.title1 && (
          <p className="text-xs text-muted-foreground">{member.title1}</p>
        )}
        {member.title2 && (
          <p className="text-xs text-muted-foreground">{member.title2}</p>
        )}
      </div>

      <Badge variant={AFFILIATION_VARIANT[member.affiliation] ?? "outline"}>
        {member.affiliation}
      </Badge>

      {(member.linkedIn || member.googleScholar) && (
        <div className="flex items-center gap-2">
          {member.linkedIn && (
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
          {member.googleScholar && (
            <a
              href={member.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on Google Scholar`}
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5.242 13.769 0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
              </svg>
            </a>
          )}
        </div>
      )}

      {member.bio && expanded && (
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {member.bio}
        </p>
      )}
    </button>
  )
}
