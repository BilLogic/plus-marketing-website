"use client"

import { useEffect } from "react"
import { clarityCall, trackEvent } from "@/lib/analytics"

/** Match by full form ID — both Google Forms share the docs.google.com host. */
const TUTOR_FORM_ID = "1FAIpQLSfnLoEbL_irrlGeoW6toMctQ8rstewQ1-PB4h7XwUKZAeXmVg"
const CONTACT_FORM_ID = "1FAIpQLSc0TFyKzbPu5WGHWc13SDQ5aOrUQZgAAC_MMp0hK467OAzjeQ"

type CtaMatch = {
  event: string
  clarityEvent: string
  /** Short stable slug — full Google Forms URLs exceed GA4's ~100-char param cap. */
  linkDomain: string
}

function matchCta(href: string): CtaMatch | null {
  if (href.includes(TUTOR_FORM_ID)) {
    return {
      event: "tutor_apply_click",
      clarityEvent: "cta_tutor_apply",
      linkDomain: "tutor_application_form",
    }
  }
  if (href.includes(CONTACT_FORM_ID)) {
    return {
      event: "contact_form_click",
      clarityEvent: "cta_contact",
      linkDomain: "contact_form",
    }
  }
  if (href.includes("app.tutors.plus")) {
    if (href.includes("/demo")) {
      return {
        event: "demo_click",
        clarityEvent: "cta_demo",
        linkDomain: "app.tutors.plus",
      }
    }
    return {
      event: "login_click",
      clarityEvent: "cta_login",
      linkDomain: "app.tutors.plus",
    }
  }
  return null
}

/** `data-cta-location` on the link (or an ancestor) wins; otherwise infer from landmarks. */
function ctaLocation(anchor: HTMLAnchorElement): string {
  const explicit =
    anchor.closest<HTMLElement>("[data-cta-location]")?.dataset.ctaLocation
  if (explicit) return explicit
  if (anchor.closest("header")) return "nav"
  if (anchor.closest("footer")) return "footer"
  return "inline"
}

/**
 * One delegated listener for every CTA, current and future — the mobile nav
 * renders its links inside a portaled Sheet outside every layout subtree, so
 * this must attach to `document` in the capture phase.
 */
export function OutboundClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.("a[href]")
      if (!(anchor instanceof HTMLAnchorElement)) return
      const cta = matchCta(anchor.href)
      if (!cta) return
      trackEvent(cta.event, {
        link_domain: cta.linkDomain,
        cta_location: ctaLocation(anchor),
      })
      clarityCall("event", cta.clarityEvent)
      // Prioritize conversion sessions for Clarity recording retention.
      clarityCall("upgrade", "cta_click")
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])
  return null
}
