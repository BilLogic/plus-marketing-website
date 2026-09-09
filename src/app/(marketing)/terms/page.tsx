import type { Metadata } from "next"
import Link from "next/link"

import { LegalPage } from "@/components/marketing/legal-page"

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms for using the PLUS marketing website.",
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="9 September 2026">
      <p>
        These terms cover your use of <strong>tutors.plus</strong>, the PLUS
        marketing website. Use of the PLUS tutoring application at
        app.tutors.plus, and any tutoring services delivered to schools, are
        covered by separate agreements.
      </p>

      <h2>Using this site</h2>
      <p>
        You may read, link to and share anything on this site. Please do not
        attempt to disrupt the site, access parts of it that are not public, or
        use automated tools in a way that degrades it for others.
      </p>

      <h2>Our research and content</h2>
      <p>
        Publications listed on this site remain the property of their authors and
        publishers, and are subject to the licence each was published under.
        Where a paper links out to a journal or repository, that source governs.
        The PLUS name and logo are ours; please ask before using them.
      </p>

      <h2>Accuracy</h2>
      <p>
        We describe research findings, programme outcomes and partner
        relationships in good faith, and figures are accurate as of publication.
        Research is ongoing and results are reported as findings, not as
        guarantees of outcomes for any particular school or student.
      </p>

      <h2>Links to other sites</h2>
      <p>
        We link to partners, funders, publishers and application forms hosted
        elsewhere. We are not responsible for the content or practices of those
        sites.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms as the programme develops. The date at the top
        of this page reflects the most recent change.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms go to{" "}
        <a href="mailto:tutors@tutors.plus">tutors@tutors.plus</a>, or{" "}
        <Link href="/get-involved">get in touch here</Link>.
      </p>
    </LegalPage>
  )
}
