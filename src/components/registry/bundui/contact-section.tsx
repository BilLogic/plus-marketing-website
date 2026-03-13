 "use client"

import type { FormEvent } from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type BunduiContactSectionProps = {
  className?: string
}

/** Bundui-inspired contact section with a simple form. */
const BunduiContactSection = ({ className }: BunduiContactSectionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  /**
   * Submit the contact form to the `/api/contact` route.
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "")
    const email = String(formData.get("email") ?? "")
    const message = String(formData.get("message") ?? "")

    if (!name || !email || !message) {
      return
    }

    try {
      setIsSubmitting(true)

      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      })
    } catch {
      // Intentionally swallow network errors in the template;
      // concrete apps can layer toasts or error handling on top.
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className={cn(
        "rounded-3xl border border-border/70 bg-background/80 px-6 py-10 sm:px-10 sm:py-12",
        className
      )}
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.4fr)] md:items-start">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Contact
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Talk to the Plus team.
          </h2>
          <p className="text-sm text-muted-foreground">
            Inspired by Bundui contact sections. Use for demo requests, partnerships, or support.
          </p>
        </header>
        <form className="space-y-3 text-sm" onSubmit={handleSubmit}>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="name" className="text-xs font-medium text-foreground">
                Name
              </label>
              <Input id="name" name="name" placeholder="Alex Doe" required />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-medium text-foreground">
                Work email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="message" className="text-xs font-medium text-foreground">
              How can we help?
            </label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Share a bit about your team, timelines, and what you want to launch."
              required
            />
          </div>
          <Button type="submit" className="mt-2" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send message"}
          </Button>
        </form>
      </div>
    </section>
  )
}

export { BunduiContactSection }

