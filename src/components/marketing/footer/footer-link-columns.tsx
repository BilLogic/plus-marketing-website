import Link from "next/link"
import { FOOTER_LINKS } from "@/components/marketing/header/nav-config"

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  { heading: "About", links: FOOTER_LINKS.about },
  { heading: "For Schools", links: FOOTER_LINKS.forSchools },
  { heading: "For Tutors", links: FOOTER_LINKS.forTutors },
  { heading: "For Researchers", links: FOOTER_LINKS.research },
  { heading: "Get Involved", links: FOOTER_LINKS.getInvolved },
]

export const FooterLinkColumns = () => {
  return (
    <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 md:grid-cols-5">
      {COLUMNS.map((col) => (
        <div key={col.heading}>
          <p className="text-xs font-bold uppercase tracking-wider">
            {col.heading}
          </p>
          <ul className="mt-3 space-y-2 text-white/80">
            {col.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
