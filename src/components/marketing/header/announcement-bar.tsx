import Link from "next/link"
import { ArrowRight } from "lucide-react"

type AnnouncementBarProps = {
  message?: string
  linkText?: string
  linkHref?: string
  badge?: string
}

export function AnnouncementBar({
  message = "Check out what's new at PLUS.",
  linkText = "Learn more",
  linkHref = "#",
  badge,
}: AnnouncementBarProps) {
  return (
    <div className="relative flex items-center justify-center gap-x-4 border-b border-border/30 bg-primary/5 px-4 py-2 text-sm sm:px-6">
      <div className="flex items-center gap-2">
        {badge && (
          <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            {badge}
          </span>
        )}
        <p className="text-muted-foreground">{message}</p>
      </div>
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
        >
          {linkText}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
