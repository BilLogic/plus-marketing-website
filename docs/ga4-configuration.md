# GA4 configuration — as applied

Property **`PLUS Marketing Website`** (`333644173`), account `tutors.plus.ga`,
stream `G-6LB6RSKSCC`, timezone America/New_York.

Recorded here because the configuration otherwise lives only in the GA4 console,
where it cannot be reviewed, diffed, or restored. Applied 2026-09-09 via the
Admin API.

## Custom dimensions

Scope is not cosmetic: `first_audience` must be **user**-scoped or funnel
segments built on it silently return nothing.

| Parameter | Scope | Meaning |
| --- | --- | --- |
| `audience` | Event | Which of `schools` / `funders` / `tutors` the page an event fired on is written for; `general` otherwise |
| `first_audience` | **User** | The first audience-mapped page of the session — the door the visitor entered through. Use for attribution |
| `percent_scrolled` | Event | Scroll milestone reached: 25, 50, 75, 90 |
| `form` | Event | Which form was submitted: `contact`, `tutor`, `demo`, `school`, `other` |
| `page_path` | Event | Path that produced a `page_not_found`. Redirect-map QA |
| `cta_location` | Event | Where a CTA sat: `nav`, `hero`, `inline`, `footer`, `card` |
| `link_domain` | Event | Outbound CTA destination, as a short slug |
| `error_source`, `error_message` | Event | JS error capture |
| `metric_rating` | Event | Web Vitals rating |
| `filter_type` | Event | Research/team page filtering |

**Custom dimensions are not retroactive.** Data collected before a dimension is
registered cannot be backfilled. Register before shipping the event, not after.

## Key events

| Event | Key? | Reasoning |
| --- | --- | --- |
| `tutor_apply_click` | ✅ | Tutor conversion |
| `demo_click` | ✅ | School conversion |
| `contact_form_click` | ✅ | Funder / school conversion |
| `newsletter_signup` | ⚠️ | See caveat |
| `form_submit` | ✅ | Completed Google Form, via `/thanks` |
| `login_click` | ❌ | **Removed 2026-09-09.** Retention, not acquisition — it inflated the acquisition total |

`purchase`, `qualify_lead` and `close_convert_lead` are GA4 defaults, unused by
this site.

⚠️ **`newsletter_signup` historic counts are not trustworthy.** Until #30 the
footer form discarded every signup and fired the event on submit regardless, so
it counted conversions that never happened. It now fires only on a confirmed
write. Counts before 2026-09-09 should be discarded, not compared against.

## Internal traffic

GA4's IP-based rule is unreachable, so `trackEvent()` stamps
`traffic_type: "internal"` from a localStorage flag. Teammates opt in per browser
at `https://tutors.plus/?internal=1` (`?internal=0` to undo).

**This parameter does nothing without an active data filter.** The filter must
exist under Admin → Data settings → Data filters, match `traffic_type` equals
`internal`, and be in state **Active** — *Testing* is the default and excludes
nothing.

This is the one item here that cannot be automated: `dataFilters` is not exposed
in the Admin API (both `v1alpha` and `v1beta` return 404), so it must be checked
by hand in the console.

## What can and cannot be scripted

The Admin API covers custom dimensions and key events, which is how the above was
applied. It does **not** cover data filters or saved Explorations, so the internal
traffic filter and the funnel explorations in #19 are console-only.

Authentication is a service account with the `analytics.edit` scope; the same
credential the Analytics MCP uses for reads.

## Related

- `docs/AGENT_HANDOFF.md` — analytics architecture
- `docs/clarity-events-and-funnels.md` — Clarity counterparts and funnel definitions
- `docs/utm-conventions.md` — campaign tagging
