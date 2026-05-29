"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, X } from "lucide-react"

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
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="relative border-b border-[rgba(231,232,236,0.3)] bg-[rgba(166,237,244,0.5)] px-4 py-3 pr-12 sm:px-6 sm:pr-12">
      <div className="flex flex-col items-start gap-1.5 lg:flex-row lg:items-center lg:justify-center lg:gap-2">
        {badge && (
          <span className="shrink-0 rounded-full bg-[#a6edf4] px-2 py-0.5 text-xs font-semibold text-[#004247]">
            {badge}
          </span>
        )}
        <p className="text-[14px] text-[#62636c]">{message}</p>
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
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-2 inline-flex size-8 items-center justify-center rounded-md text-[#62636c] transition-colors hover:bg-[#004247]/10 hover:text-[#004247] lg:top-1/2 lg:-translate-y-1/2"
      >
        <X className="size-5" />
      </button>
    </div>
  )
}
