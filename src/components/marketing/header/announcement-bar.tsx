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
    <div className="relative flex items-center justify-center gap-x-2 border-b border-[rgba(231,232,236,0.3)] bg-[rgba(166,237,244,0.5)] px-4 py-3 sm:px-6">
      <div className="flex items-center gap-2">
        {badge && (
          <span className="shrink-0 rounded-full bg-[#a6edf4] px-2 py-0.5 text-xs font-semibold text-[#004247]">
            {badge}
          </span>
        )}
        <p className="text-[14px] text-[#62636c]">{message}</p>
      </div>
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="group inline-flex shrink-0 items-center gap-1 text-[14px] font-medium text-[#027f89] transition-opacity hover:opacity-75"
        >
          {linkText}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
