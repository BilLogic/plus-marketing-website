# Clarity measurement setup — as configured

Project: **`kumnxwffl4`** ("PLUS Marketing Website") — the original project, carrying
the full Framer-era history. `x3ycp8d2ay` was a throwaway created against the
`netlify.app` dev URL and is unused; safe to delete.

## Why this was rebuilt (2026-08-03)

Everything in this project was originally defined against Framer URLs using
`is exactly` matches on the `www.tutors.plus` host. After the cutover those were
doubly broken — dead paths *and* the wrong canonical host — so they silently
stopped counting rather than erroring. Silent zeros are worse than errors.

Everything below now uses **`contains` on path fragments**, which survives the
apex/www split, query strings, and future URL changes.

## API events fired by the site

From `src/components/analytics/outbound-click-tracker.tsx`, alongside the matching
GA4 event, plus `clarity("upgrade", "cta_click")` to prioritise those sessions for
recording retention.

| Clarity event | Fires on | GA4 twin |
|---|---|---|
| `cta_tutor_apply` | tutor application form link | `tutor_apply_click` |
| `cta_contact` | contact / partnership form link | `contact_form_click` |
| `cta_demo` | `app.tutors.plus/demo` | `demo_click` |
| `cta_login` | `app.tutors.plus` login | `login_click` |
| `cta_newsletter` | footer newsletter submit | `newsletter_signup` |

Page context is tagged separately via `clarity("set", "page_type", …)` on every route
change (`src/components/analytics/clarity-tagger.tsx`), valued as the first path
segment: `home`, `for-tutors`, `for-schools`, `for-researchers`, `get-involved`,
`publications`, `success-stories`, `about`.

## Smart events

Three user-defined events, one per audience. Clarity's five auto-detected events
(Contact us, Login, Outbound click, Sign up, Submit form) adapt on their own and
are left alone.

| Event | Definition | Replaces |
|---|---|---|
| **Tutor intent** | `contains /for-tutors`, `/get-involved` | "Career and Tutor" (4 dead exact URLs) |
| **Researcher intent** | `contains /publications`, `/for-researchers` | "Researcher" (`/impact/research`, `/pubs/`, `/results` — 2 of 3 had zero traffic) |
| **School intent** | `contains /for-schools` | *nothing — the schools audience had no measurement at all* |

`/get-involved` also matches the legacy paths, so Tutor intent keeps continuity
across the cutover instead of restarting from zero.

Cap: 20 user-defined smart events per project.

## Funnels

Twelve pre-cutover funnels were removed: four were single-step (an event counter,
not a funnel — the same number is already on the dashboard), three were duplicates,
and the rest were built on dead Framer URLs. Clarity's UI cannot edit the steps of
a saved funnel, so rebuilding was the only path.

| Funnel | Steps |
|---|---|
| **NEW For Tutors to Apply Click** | page `contains /for-tutors` → Outbound click |
| **Schools: intent to contact** | School intent → Contact us |
| **Researchers: intent to outbound** | Researcher intent → Outbound click |

Funnels are **not retroactive** — they populate from creation forward.

**Next iteration:** once the four `cta_*` API events have each fired at least once
(they only began flowing into this project on 2026-08-03), swap the generic
"Outbound click" end-step for the precise event — `cta_tutor_apply` for the tutor
funnel, `cta_contact`/`cta_demo` for schools. That turns "clicked something
external" into "converted".

## Bug and UX monitoring

Zero-config, already capturing: rage clicks, dead clicks, excessive scrolling,
quick backs, and **JS errors** (top 500 by message, each linking to the session
replays that hit it — this is the primary debugging workflow).

Clarity has **no native threshold alerting**. Practical setup:
- Subscribe the team to the **weekly email digest** (Manage Account → subscribe)
- Monthly pass over Dashboard → JS errors
- Watch rage/dead clicks on `/for-tutors` first — highest traffic, and the
  conversion we care most about

## Other settings

Masking **Relaxed** · IP block on the team IP · GA4 integration connected to the
`PLUS Framer Site` property (legacy name, correct property — `G-6LB6RSKSCC`).

## Related

- GA4 taxonomy: `docs/plans/2026-08-03-001-feat-tutors-plus-launch-hardening-plan.md`
- Analytics architecture: `docs/AGENT_HANDOFF.md`
