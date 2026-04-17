"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={[
        "fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full",
        "bg-[#a6edf4] shadow-md transition-all duration-300 ease-out",
        "hover:scale-110 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#027f89] focus-visible:ring-offset-2",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
    >
      <ArrowUp className="h-5 w-5 text-[#004247]" strokeWidth={2.5} />
    </button>
  )
}
