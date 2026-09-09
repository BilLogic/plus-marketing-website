"use client"

import { ArrowRight, Check, Loader2 } from "lucide-react"
import { useRef, useState } from "react"

import { Input } from "@/components/ui/input"
import { clarityCall, trackEvent } from "@/lib/analytics"
import { marketingFooterInnerShell } from "@/lib/marketing-layout"

type Status = "idle" | "submitting" | "done" | "error"

export const FooterNewsletter = () => {
  const [status, setStatus] = useState<Status>("idle")
  /**
   * State is not a usable in-flight guard: React batches updates, so two
   * submits in the same tick both observe "idle". A ref updates synchronously.
   */
  const inFlight = useRef(false)

  return (
    <div className="border-b border-white/10 py-16">
      <div className={`${marketingFooterInnerShell} flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between`}>
        <h2 className="max-w-sm text-2xl font-bold leading-tight sm:text-3xl">
          Subscribe to Our Newsletter
        </h2>
        <div className="flex max-w-md flex-1 flex-col gap-3">
          <form
            className="flex items-center gap-0 rounded-full bg-white pl-5 pr-2 shadow-sm"
            onSubmit={async (e) => {
              e.preventDefault()
              if (inFlight.current) return

              const form = e.currentTarget
              const email = String(new FormData(form).get("email") ?? "")
              if (!email) return

              inFlight.current = true
              setStatus("submitting")
              try {
                const response = await fetch("/api/newsletter", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                })

                if (!response.ok) {
                  setStatus("error")
                  return
                }


                /**
                 * Fired on success, not on submit. The event has to mean a
                 * signup happened — it is a key event in GA4, and until the
                 * route actually persisted anything it was counting
                 * conversions that never occurred.
                 */
                trackEvent("newsletter_signup", { cta_location: "footer" })
                clarityCall("event", "cta_newsletter")
                setStatus("done")
                form.reset()
              } catch {
                setStatus("error")
              } finally {
                inFlight.current = false
              }
            }}
          >
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              disabled={status === "submitting"}
              aria-describedby="newsletter-status"
              className="h-12 flex-1 rounded-none border-0 bg-transparent px-0 text-sm text-teal-950 placeholder:text-teal-950/50 focus-visible:ring-0 disabled:opacity-60 sm:text-base min-[1800px]:text-lg"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              aria-label="Subscribe"
              className="group flex shrink-0 cursor-pointer items-center rounded-full border-0 bg-transparent p-2 text-teal-900 outline-none focus-visible:ring-2 focus-visible:ring-teal-900/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? (
                <Loader2 className="size-5 animate-spin opacity-70" />
              ) : status === "done" ? (
                <Check className="size-5 opacity-70" />
              ) : (
                /* Group opacity (not color alpha) so the arrow's two overlapping
                   vector paths don't double-composite into a visible seam. */
                <ArrowRight className="size-5 opacity-70 transition-[transform,opacity] group-hover:translate-x-0.5 group-hover:opacity-100" />
              )}
            </button>
          </form>
          <p
            id="newsletter-status"
            aria-live="polite"
            className="text-xs text-white/50"
          >
            {status === "done"
              ? "Thanks — you're on the list."
              : status === "error"
                ? "Something went wrong and you were not subscribed. Please try again, or email us at tutors@tutors.plus."
                : "We'll only email you about PLUS, and you can unsubscribe at any time."}
          </p>
        </div>
      </div>
    </div>
  )
}
