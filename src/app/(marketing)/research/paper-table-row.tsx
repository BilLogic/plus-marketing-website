"use client"

import { FileText, Presentation, Video } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TableRow, TableCell } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { ResearchPaper } from "@/lib/notion/types"

function parseDate(dateStr: string): Date {
  const parts = dateStr.split("/")
  if (parts.length === 3) return new Date(+parts[2], +parts[0] - 1, +parts[1])
  return new Date(dateStr)
}

export function PaperTableRow({
  paper,
  onAuthorClick,
}: {
  paper: ResearchPaper
  onAuthorClick: (author: string) => void
}) {
  const year = parseDate(paper.publishDate).getFullYear()

  return (
    <TableRow>
      <TableCell className="max-w-md whitespace-normal font-medium">
        {paper.paperLink ? (
          <a
            href={paper.paperLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline-offset-2 hover:text-primary hover:underline"
          >
            {paper.title}
          </a>
        ) : (
          <span className="text-foreground">{paper.title}</span>
        )}
      </TableCell>
      <TableCell className="max-w-xs whitespace-normal">
        <div className="flex flex-wrap gap-1">
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
      </TableCell>
      <TableCell className="text-muted-foreground">{year}</TableCell>
      <TableCell className="text-muted-foreground italic">
        {paper.venue ?? "\u2014"}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          {paper.paperLink && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              nativeButton={false}
              render={
                <a
                  href={paper.paperLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="PDF"
                />
              }
            >
              <FileText className="h-3.5 w-3.5" />
            </Button>
          )}
          {paper.videoLink && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              nativeButton={false}
              render={
                <a
                  href={paper.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Video"
                />
              }
            >
              <Video className="h-3.5 w-3.5" />
            </Button>
          )}
          {paper.presentationLink && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              nativeButton={false}
              render={
                <a
                  href={paper.presentationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Slides"
                />
              }
            >
              <Presentation className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  )
}
