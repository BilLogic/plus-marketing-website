"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

/** Figma `1889:3826` — 74×74 circle `#a6edf4`; icon `1889:3827` 40×40 with ~20.83% inset per file. */
export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-6 right-6 z-50 size-[74px] cursor-pointer overflow-hidden rounded-full bg-[#a6edf4]",
        "transition-[opacity,transform] duration-300 ease-out",
        "hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#027f89] focus-visible:ring-offset-2",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <span
        className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        aria-hidden
      >
        <span className="relative size-10 rotate-90 overflow-clip">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/figma/back-to-top-arrow.svg"
            className="absolute left-[20.83%] top-[20.83%] block h-[58.34%] w-[58.34%] max-w-none object-contain"
          />
        </span>
      </span>
    </button>
  )
}
