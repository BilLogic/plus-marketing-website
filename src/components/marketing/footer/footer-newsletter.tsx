"use client"

import { ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const FooterNewsletter = () => {
  return (
    <div className="border-b border-white/10 px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="max-w-sm text-2xl font-bold leading-tight sm:text-3xl">
          Subscribe to our newsletter
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
              className="h-12 flex-1 rounded-none border-0 bg-transparent px-0 text-lg text-white placeholder:text-white/40 focus-visible:ring-0"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="shrink-0 text-white/60 hover:text-white"
            >
              <ArrowRight className="size-5" />
            </Button>
          </form>
          <p className="text-xs text-white/50">
            By subscribing, you agree to our privacy policy.
          </p>
        </div>
      </div>
    </div>
  )
}
