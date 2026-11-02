import type { Metadata } from "next"
import Link from "next/link"

import { FormSubmissionTracker } from "@/components/analytics/form-submission-tracker"

export const metadata: Metadata = {
  title: "Thanks for reaching out",
  description: "We've received your message and will be in touch shortly.",
  // A confirmation page has no search value and would leak into results as a
  // dead end for anyone who never submitted anything.
  robots: { index: false, follow: true },
}

/**
 * Confirmation destination for our outbound Google Forms.
 *
 * Every conversion CTA leaves the site for docs.google.com, so GA4 has only
 * ever seen the click, never the submission — the audit calls submissions "our
 * primary measure of success" and they have been invisible throughout. Setting
 * this page as each form's confirmation URL brings the visitor back onto
 * tutors.plus and turns the submission into a first-party conversion.
 *
 * `?form=` identifies which form was completed. Unknown or missing values are
 * still recorded, as `other` — a submission we cannot attribute is worth more
 * than one we drop.
 */
export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string }>
}) {
  const { form } = await searchParams

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start gap-6 px-6 py-24 md:py-32">
      <FormSubmissionTracker form={form} />
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Thanks — we&rsquo;ve got it.
      </h1>
      <p className="text-lg text-muted-foreground">
        Your message is with the PLUS team. We usually reply within a few
        working days.
      </p>
      <p className="text-muted-foreground">
        In the meantime, you might want to read{" "}
        <Link href="/publications" className="underline underline-offset-4">
          our research
        </Link>
        , see{" "}
        <Link href="/success-stories" className="underline underline-offset-4">
          how partner schools are using PLUS
        </Link>
        , or{" "}
        <Link href="/about/team" className="underline underline-offset-4">
          meet the team
        </Link>
        .
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  )
}
