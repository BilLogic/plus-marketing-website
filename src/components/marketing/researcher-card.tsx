import Link from "next/link"
import { User } from "lucide-react"
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
      <div className="flex flex-col gap-2 p-5">
        <p className="font-bold text-lg leading-snug text-[#004247] sm:text-xl">
          {member.name}
        </p>
        {links.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-1 text-sm">
            {links.map((link, i) => (
              <span key={link.href} className="inline-flex items-center gap-1">
                {i > 0 && (
                  <span className="text-[#004247]/50" aria-hidden>
                    |
                  </span>
                )}
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CN}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className={LINK_CN}>
                    {link.label}
                  </Link>
                )}
              </span>
            ))}
          </div>
        )}
        {member.title1 && (
          <p className="text-sm leading-snug text-[#004247]">{member.title1}</p>
        )}
        {member.title2 && (
          <p className="text-sm leading-snug text-[#004247]/75">{member.title2}</p>
        )}
      </div>
    </article>
  )
}
