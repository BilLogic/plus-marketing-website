import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ResearchPaper } from "@/lib/notion/types"
import {
  riFg,
  riGenrePillClass,
  riIndexCopy,
  riIndexMetaCopy,
} from "./research-index-figma-tokens"
import {
  riFormatAuthorsLine,
  riParseYear,
  riPublicationDescription,
} from "./research-index-utils"

export const ResearchIndexPublicationCard = ({
  paper,
}: {
  paper: ResearchPaper
}) => {
  const desc = riPublicationDescription(paper)
  const year = paper.publishDate ? riParseYear(paper.publishDate) : ""
  const metaBits = [
    year,
    paper.venue?.trim() || null,
    riFormatAuthorsLine(paper.authors),
  ].filter(Boolean)

  return (
    <article
      className={cn(
        "w-full min-w-0 rounded-[24px] border border-solid",
        riFg.borderCard,
        riFg.cardSurface
      )}
    >
      {/* Inset matches shell `px-5` gutter so card edges line up with filters + count row. */}
      <div className="flex flex-col gap-2 px-5 pt-3.5 pb-4">
        <div className="flex flex-wrap items-start gap-x-1.5 gap-y-1">
          {paper.paperLink ? (
            <a
              href={paper.paperLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group inline-flex max-w-full items-start gap-1.5 font-sans font-semibold leading-snug text-[#62636c] underline-offset-[3px] hover:text-[#004247] hover:underline",
                riIndexCopy
              )}
            >
              <span className="min-w-0">{paper.title}</span>
              <ExternalLink
                className="mt-0.5 size-4 shrink-0 text-[#62636c] opacity-80 group-hover:text-[#004247]"
                aria-hidden
              />
              <span className="sr-only">(opens in new tab)</span>
            </a>
          ) : (
            <h3
              className={cn(
                "font-sans font-semibold leading-snug text-[#62636c]",
                riIndexCopy
              )}
            >
              {paper.title}
            </h3>
          )}
        </div>

        {paper.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {paper.topics.map((t) => (
              <span
                key={t}
                className={cn(
                  "inline-flex items-center rounded-[26px] px-2 py-1 leading-snug",
                  riIndexMetaCopy,
                  riGenrePillClass(t)
                )}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {desc ? (
          <p
            className={cn("line-clamp-2 text-pretty text-[#62636c]", riIndexMetaCopy)}
          >
            {desc}
          </p>
        ) : null}

        {metaBits.length > 0 && (
          <p className={cn("text-[#62636c]", riIndexMetaCopy)}>
            {metaBits.join(" · ")}
          </p>
        )}
      </div>
    </article>
  )
}
