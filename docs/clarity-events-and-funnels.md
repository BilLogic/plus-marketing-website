# Clarity smart events & funnels — setup spec

Project: **`kumnxwffl4`** ("PLUS Marketing Website") — the original project holding
the Framer-era history. Configure this one; `x3ycp8d2ay` was created against the
`netlify.app` dev URL and is unused.

Funnels are **not retroactive** — they populate from creation forward, so create
them early. Funnel steps can only reference events Clarity has already observed,
so build them once real traffic has fired each CTA at least once.

## API events shipped by the site

Fired from `src/components/analytics/outbound-click-tracker.tsx` alongside the
matching GA4 event, plus `clarity("upgrade", "cta_click")` to prioritise those
sessions for recording retention.

| Clarity event | Fires on | GA4 twin |
|---|---|---|
| `cta_tutor_apply` | tutor application form link | `tutor_apply_click` |
| `cta_contact` | contact / partnership form link | `contact_form_click` |
| `cta_demo` | `app.tutors.plus/demo` | `demo_click` |
| `cta_login` | `app.tutors.plus` login | `login_click` |

Page context is tagged separately via `clarity("set", "page_type", …)` on every
route change (`src/components/analytics/clarity-tagger.tsx`), values matching the
first path segment: `home`, `for-tutors`, `for-schools`, `for-researchers`,
`get-involved`, `publications`, `success-stories`, `about`.

## Smart events to create (Settings → Smart events)

Clarity's auto-detection is unreliable for visually similar outbound links, so the
four CTAs above are explicit API events and need no smart-event configuration.
Create these three to cover interactions the code does not instrument:

| Name | Type | Definition | Why |
|---|---|---|---|
| `research_filter_used` | Click | any click within the filter/sort controls on `/publications` | Filtering is the core interaction on that page; tells us whether the archive is browsable |
| `team_filter_used` | Click | any click within the filter controls on `/about/team` | Same question for the team directory |
| `news_article_open` | Page visit | URL contains `/about/news/` | Distinguishes index browsing from actual article reads |

Cap: 20 user-defined smart events per project.

## Funnels to create (Settings → Funnels)

Three funnels, each mixing page-visit and API-event steps.

**1. Tutor recruitment** — the highest-traffic path on the site.
```
Page visit: any  →  Page visit: /for-tutors  →  API event: cta_tutor_apply
```
Drop-off between steps 2 and 3 is the single most useful number here: it measures
whether the for-tutors page actually converts.

**2. School / partnership**
```
Page visit: any  →  Page visit: /for-schools  →  API event: cta_contact OR cta_demo
```
Two acceptable exits — a school can convert by contacting or by trying the demo.

**3. Research credibility path**
```
Page visit: /publications  →  Page visit: /for-schools OR /for-researchers  →  API event: cta_contact
```
Tests the assumption that research content drives partnership intent rather than
just being a reference destination.

## Alerts and monitoring

Clarity has **no native threshold alerting**. Practical setup:

- Subscribe the team to the **weekly email digest** (Manage Account → subscribe) —
  covers sessions, rage/dead clicks, JS errors, quick backs.
- Monthly manual pass over Dashboard → **JS errors** panel. Errors link straight to
  the session replays that hit them; this is the primary bug-hunting workflow and
  needs no configuration.
- Watch **rage clicks** and **dead clicks** on `/for-tutors` first — highest traffic,
  and the page whose conversion we care most about.

## Related

- Tagging taxonomy and GA4 side: `docs/plans/2026-08-03-001-feat-tutors-plus-launch-hardening-plan.md`
- Analytics architecture: `docs/AGENT_HANDOFF.md`
