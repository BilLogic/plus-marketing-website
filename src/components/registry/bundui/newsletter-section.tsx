"use client"

import type { FormEvent, ReactNode } from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type BunduiNewsletterSectionProps = {
  heading?: ReactNode
  body?: ReactNode
  className?: string
}

/** Bundui-inspired newsletter capture with compact, high-contrast layout. */
const BunduiNewsletterSection = ({
  heading = "Stay ahead of every launch.",
  body = "A short email every few weeks with new blocks, templates, and experiments from the Plus registry.",
  className,
}: BunduiNewsletterSectionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  /**
   * Submit the newsletter form to the `/api/newsletter` route.
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "")

    if (!email) {
      return
    }

    try {
      setIsSubmitting(true)

      await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
    } catch {
      // Templates intentionally keep error handling minimal;
      // product code can add toasts or analytics as needed.
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className={cn(
        "rounded-3xl border border-border/70 bg-card/80 px-6 py-8 sm:px-10 sm:py-10",
        className
      )}
    >
      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,2fr)] md:items-center">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Newsletter
          </p>
          <h2 className="text-balance text-xl font-semibold tracking-tight sm:text-2xl">
            {heading}
          </h2>
          <p className="text-sm text-muted-foreground">{body}</p>
        </div>
        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            aria-label="Email address"
            required
            className="h-10 flex-1"
          />
          <Button type="submit" className="h-10 px-5" disabled={isSubmitting}>
            {isSubmitting ? "Joining..." : "Join newsletter"}
          </Button>
          <p className="text-[11px] text-muted-foreground sm:text-right">
            Inspired by Bundui newsletter sections. No spam, just launch notes.
          </p>
        </form>
      </div>
    </section>
  )
}

export { BunduiNewsletterSection }

