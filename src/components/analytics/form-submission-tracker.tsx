"use client"

import { useEffect, useRef } from "react"

import { clarityCall, trackEvent } from "@/lib/analytics"

/** Forms we route back here. Anything else is recorded as `other`. */
const KNOWN_FORMS = ["contact", "tutor", "demo", "school"] as const

type KnownForm = (typeof KNOWN_FORMS)[number]

function normalise(form: string | undefined): KnownForm | "other" {
  const value = form?.toLowerCase().trim()
  return (KNOWN_FORMS as readonly string[]).includes(value ?? "")
    ? (value as KnownForm)
    : "other"
}

/**
 * Records a completed form submission as a first-party conversion.
 *
 * Distinct from the existing `*_click` events, which fire when someone leaves
 * for the form. Holding both is the point: the ratio between them is the
 * form's own drop-off, which has never been measurable.
 *
 * Fires once per mount. A visitor who reloads this page does re-count; that is
 * accepted rather than guarded, because a submission id would have to come
 * from Google Forms, which does not provide one in the confirmation redirect.
 */
export function FormSubmissionTracker({ form }: { form?: string }) {
  const sent = useRef(false)

  useEffect(() => {
    if (sent.current) return
    sent.current = true

    const submittedForm = normalise(form)
    // `audience` and `first_audience` are stamped by trackEvent.
    trackEvent("form_submit", { form: submittedForm })
    clarityCall("event", `form_submit_${submittedForm}`)
    clarityCall("upgrade", "form_submit")
  }, [form])

  return null
}
