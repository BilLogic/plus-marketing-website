"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Presentation, Video, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ResearchPaper } from "@/lib/notion/types"

function parseDate(dateStr: string): Date {
  const parts = dateStr.split("/")
  if (parts.length === 3) {
    return new Date(+parts[2], +parts[0] - 1, +parts[1])
  }
  return new Date(dateStr)
}

function formatDate(dateStr: string): string {
  const d = parseDate(dateStr)
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function PaperCard({
  paper,
  onAuthorClick,
}: {
  paper: ResearchPaper
  onAuthorClick: (author: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const description = paper.shortDescription || paper.abstract
  const truncated =
    description && description.length > 200
      ? description.slice(0, 200) + "..."
      : description

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-tight text-foreground">
            {paper.paperLink ? (
              <a
                href={paper.paperLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline"
              >
                {paper.title}
              </a>
            ) : (
              paper.title
            )}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {paper.authors.map((author) => (
            <button
              key={author}
              onClick={() => onAuthorClick(author)}
              className="cursor-pointer"
            >
              <Badge variant="secondary" className="text-xs">
                {author}
              </Badge>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {paper.publishDate && <span>{formatDate(paper.publishDate)}</span>}
          {paper.venue && (
            <>
              <span className="text-border">|</span>
              <span className="italic">{paper.venue}</span>
            </>
          )}
        </div>

        {description && (
          <div className="text-sm leading-relaxed text-muted-foreground">
            <p>{expanded ? description : truncated}</p>
            {description.length > 200 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className={cn(
                  "mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary",
                  "hover:underline"
                )}
              >
                {expanded ? "Show less" : "Read more"}
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform",
                    expanded && "rotate-180"
                  )}
                />
              </button>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {paper.paperLink && (
            <Button
              variant="outline"
              size="sm"
              render={<a href={paper.paperLink} target="_blank" rel="noopener noreferrer" />}
            >
              <FileText className="mr-1.5 h-3.5 w-3.5" />
              PDF
            </Button>
          )}
          {paper.presentationLink && (
            <Button
              variant="outline"
              size="sm"
              render={<a href={paper.presentationLink} target="_blank" rel="noopener noreferrer" />}
            >
              <Presentation className="mr-1.5 h-3.5 w-3.5" />
              Slides
            </Button>
          )}
          {paper.videoLink && (
            <Button
              variant="outline"
              size="sm"
              render={<a href={paper.videoLink} target="_blank" rel="noopener noreferrer" />}
            >
              <Video className="mr-1.5 h-3.5 w-3.5" />
              Video
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  )
}
