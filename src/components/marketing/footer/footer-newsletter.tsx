"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const FooterNewsletter = () => {
  return (
    <div className="border-b border-white/10 px-6 py-5 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-bold">Join our newsletter!</p>
        <form
          className="flex flex-1 max-w-2xl gap-2"
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
            placeholder="Your email"
            required
            className="h-10 flex-1 rounded-full border-white/30 bg-transparent text-white placeholder:text-white/50"
          />
          <Button
            type="submit"
            className="h-10 rounded-full bg-teal-300 px-6 text-teal-950 hover:bg-teal-200"
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  )
}
