import Link from "next/link"
import { User } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TeamMember } from "@/lib/notion/types"

const LINK_CN =
  "text-[#0080b4] underline decoration-[#0080b4] underline-offset-2 hover:text-[#006a94] transition-colors"

function researcherLinks(
  member: TeamMember
): { label: string; href: string; external: boolean }[] {
  const rows: { label: string; href: string; external: boolean }[] = []
  if (member.googleScholar)
    rows.push({ label: "Google Scholar", href: member.googleScholar, external: true })
  if (member.linkedIn)
    rows.push({ label: "LinkedIn", href: member.linkedIn, external: true })
  if (member.personalWebsite)
    rows.push({ label: "Website", href: member.personalWebsite, external: true })
  if (rows.length === 0)
    rows.push({
      label: "Team profile",
      href: `/about/team?q=${encodeURIComponent(member.name)}`,
      external: false,
    })
  return rows
}

/**
 * Photo area: placeholder (User icon) always rendered behind.
 * The <img> overlays it; on load failure it is hidden via onError, revealing the placeholder.
 *
 * Fallback chain:
 *  1. cachedSrc (works immediately for stable URLs like framerusercontent.com)
 *  2. /api/team-photo/[id] proxy (fetches a fresh Notion URL — works in production with NOTION_API_KEY)
 *  3. Hide img → placeholder shows
 */
function ResearcherPhoto({
  id,
  cachedSrc,
  name,
}: {
  id: string
  cachedSrc: string | null
  name: string
}) {
  function handleError(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget
    if (img.dataset.triedProxy !== "1") {
      img.dataset.triedProxy = "1"
      img.src = `/api/team-photo/${id}`
    } else {
      img.style.display = "none"
    }
  }

  const initialSrc = cachedSrc ?? `/api/team-photo/${id}`

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-[#c5e8f7]">
      <div className="absolute inset-0 flex items-end justify-center" aria-hidden>
        <User className="h-[85%] w-[85%] text-[#004247]/10" strokeWidth={1} />
      </div>
      <img
        src={initialSrc}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover object-top"
        onError={handleError}
      />
    </div>
  )
}

export function ResearcherCard({ member }: { member: TeamMember }) {
  const links = researcherLinks(member)
  return (
    <article className="flex flex-col overflow-hidden rounded-[30px] bg-[#e0f5fe]">
      <ResearcherPhoto id={member.id} cachedSrc={member.picture} name={member.name} />
      <div className="flex flex-col gap-2 px-2 pt-3 pb-4 sm:px-3 sm:pt-4 sm:pb-5">
        <p className="text-xs font-bold leading-tight tracking-tight text-[#004247] sm:text-sm lg:text-base">
          {member.name}
        </p>
        {links.length > 0 && (
          <div className="flex flex-col gap-0.5 text-[10px] font-medium leading-tight text-[#0080b4] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-1.5 sm:gap-y-0 sm:text-xs">
            {links.map((link, i) => (
              <span key={link.href} className="inline-flex items-center gap-1">
                {i > 0 && (
                  <span className="hidden sm:inline text-[#004247]/50 select-none" aria-hidden>|</span>
                )}
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className="underline underline-offset-2">
                    {link.label}
                  </Link>
                )}
              </span>
            ))}
          </div>
        )}
        {member.title1 && (
          <p className="text-[10px] leading-snug text-[#004247] sm:text-xs">{member.title1}</p>
        )}
        {member.title2 && (
          <p className="text-[10px] leading-snug text-[#004247]/75 sm:text-xs">{member.title2}</p>
        )}
      </div>
    </article>
  )
}
