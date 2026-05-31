"use client"

import { ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { marketingFooterInnerShell } from "@/lib/marketing-layout"

export const FooterNewsletter = () => {
  return (
    <div className="border-b border-white/10 py-16">
      <div className={`${marketingFooterInnerShell} flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between`}>
        <h2 className="max-w-sm text-2xl font-bold leading-tight sm:text-3xl">
          Subscribe to Our Newsletter
        </h2>
        <div className="flex max-w-md flex-1 flex-col gap-3">
          <form
            className="flex items-center gap-0 border-b border-white/40"
            action="/api/newsletter"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.currentTarget
              const email = new FormData(form).get("email") as string
              if (!email) return
              fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
              })
              form.reset()
            }}
          >
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              className="h-12 flex-1 rounded-none border-0 bg-transparent px-0 text-sm text-white placeholder:text-white/40 focus-visible:ring-0 sm:text-base min-[1800px]:text-lg"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="group flex shrink-0 cursor-pointer items-center border-0 bg-transparent p-2 text-white outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              {/* Group opacity (not color alpha) so the arrow's two overlapping
                  vector paths don't double-composite into a visible seam. */}
              <ArrowRight className="size-5 opacity-40 transition-[transform,opacity] group-hover:translate-x-0.5 group-hover:opacity-70" />
            </button>
          </form>
          <p className="text-xs text-white/50">
            By subscribing, you agree to our privacy policy.
          </p>
        </div>
      </div>
    </div>
  )
}
