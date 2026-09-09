import type { Metadata } from "next"
import Link from "next/link"

import { LegalPage } from "@/components/marketing/legal-page"

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What PLUS collects on tutors.plus, why, and how to opt out.",
}

/**
 * Describes what this marketing site actually does — GA4, Clarity session
 * recording, and Notion-stored form submissions — rather than generic
 * boilerplate. It deliberately does not describe the tutoring product at
 * app.tutors.plus, which handles student data under separate agreements.
 */
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" updated="9 September 2026">
      <p>
        This page covers <strong>tutors.plus</strong>, the PLUS marketing
        website. It does not cover the PLUS tutoring application at
        app.tutors.plus, or the handling of student data in schools, both of
        which are governed by separate agreements with partner districts.
      </p>

      <h2>What we collect</h2>
      <p>
        <strong>Analytics.</strong> We use Google Analytics 4 and Microsoft
        Clarity to understand how people move through the site — which pages are
        visited, how far down a page people read, and which links are clicked. We
        record which of our three audiences a page is written for (schools,
        funders or tutors) so we can tell whether the site serves each of them.
      </p>
      <p>
        <strong>Session replay.</strong> Microsoft Clarity records anonymised
        replays of site visits, including mouse movement, clicks and scrolling.
        Text you type into form fields is masked. We use these to find usability
        problems.
      </p>
      <p>
        <strong>Things you send us.</strong> If you subscribe to our newsletter
        we store your email address. If you contact us through one of our forms
        we store what you submitted, which may include your name, email address
        and message.
      </p>

      <h2>What we do not do</h2>
      <ul>
        <li>We do not sell your information.</li>
        <li>We do not run advertising on this site or build advertising profiles.</li>
        <li>We do not ask for or store payment details on this site.</li>
      </ul>

      <h2>Where it goes</h2>
      <p>
        Analytics data is processed by Google and Microsoft under their own
        terms. Newsletter and contact submissions are stored in Notion, which
        PLUS uses as its internal workspace, and are read only by the PLUS team.
        The site is hosted by Netlify.
      </p>

      <h2>Opting out</h2>
      <p>
        Most browsers let you block analytics scripts, and browser privacy modes
        and extensions will prevent both Google Analytics and Clarity from
        loading. To unsubscribe from the newsletter, or to ask us to delete
        anything you have sent us, email{" "}
        <a href="mailto:tutors@tutors.plus">tutors@tutors.plus</a> and we will
        action it.
      </p>

      <h2>Children</h2>
      <p>
        This marketing site is intended for educators, funders and prospective
        tutors — not for students. We do not knowingly collect information from
        children through this site.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this page, or about what we hold about you, go to{" "}
        <a href="mailto:tutors@tutors.plus">tutors@tutors.plus</a>. You can also{" "}
        <Link href="/get-involved">get in touch here</Link>.
      </p>
    </LegalPage>
  )
}
