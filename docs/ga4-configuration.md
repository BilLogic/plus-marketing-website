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

## Manual console steps — the three things no API reaches

Everything above was applied through the Admin API. Three items cannot be, and
they are still outstanding. Each blocker below was verified, not assumed, so
nobody has to re-derive it.

**None of these can be done by an agent.** Each needs a person signed into the
GA4 UI as an editor, or with edit rights on the Google Forms.

### 1. Internal-traffic data filter — DONE (was already Active)

Verified in the console on 2026-09-09: the *Internal Traffic* filter is
**Active** (not Testing), operation **Exclude**, matching on parameter
`traffic_type` exactly matching `internal`. That is exactly what `trackEvent()`
stamps, so the filter is both on and correct.

This corrects an earlier assumption recorded here that it was "almost certainly
still on Testing". It was not. Nothing needed changing, and nothing was changed.

The filter still only excludes browsers that have opted in. Teammates opt in per
browser at `https://tutors.plus/?internal=1` (`?internal=0` undoes it); until
they do, the filter has nothing to exclude.

*Why it cannot be scripted:* there is no `dataFilters` resource in the Admin API
in either version, so its state can be neither read nor changed programmatically
— it had to be confirmed by eye.

### 2. Audience funnel Explorations — DONE

Built in the console on 2026-09-09 as one exploration, **"Audience funnels
(schools / funders / tutors)"**, with three tabs: `Schools`, `Funders`,
`Tutors`. One exploration with three tabs rather than three separate
explorations — the same three funnels, in one place, sharing a date range.

Each is `session_start` → a `page_view` on that audience's pages → that
audience's conversion event, broken down by the user-scoped **First audience**
so a visitor is attributed to the door they entered through.

| Tab | Page step | Conversion step |
| --- | --- | --- |
| Schools | `page_location` contains `/for-schools` | `demo_click` |
| Funders | `page_location` matches `.*/(for-researchers\|publications).*` | `contact_form_click` |
| Tutors | `page_location` matches `.*/(for-tutors\|get-involved).*` | `tutor_apply_click` |

**Gotcha worth keeping: a funnel step's "matches regex" is a FULL-STRING match.**
`/(for-tutors|get-involved)` silently matched nothing and the funnel reported a
clean, plausible-looking **zero** — no error, no warning. Wrapping it as
`.*/(for-tutors|get-involved).*` took the same step from 0 to 48 users. If a
funnel step reports zero, suspect the regex anchoring before you conclude the
traffic is not there.

`form_submit` was left out of the funders funnel: the event does not exist in
GA4 yet, because nothing links to `/thanks` (see item 3). GA4 offered to create
it as a new definition; a placeholder event that has never fired would only make
the funnel look configured while measuring nothing.

The 28-day figures at build time agreed with `scripts/audience_funnels.py`,
which is the cross-check that the console funnels are measuring what the script
measures: tutors 27.75% reaching their pages, funders 1.16%, schools 0.58%.

### 3. Link `/thanks` from each form's confirmation message

Add `https://tutors.plus/thanks?form=contact|tutor|demo|school` to each outbound
Google Form's confirmation message.

**Read this before trusting the resulting numbers.** Google Forms cannot redirect
anywhere after submission — the confirmation option is a *message*, not a URL,
and the Forms API exposes no confirmation field at all (`FormSettings` carries
only `emailCollectionType` and `quizSettings`). The most a form can do is show a
clickable link the respondent has to notice and click.

So `form_submit` counts **"submitted and then clicked through"**, not
"submitted", and undercounts by an unknown margin. Do not compare it against the
`*_click` events and call the gap form drop-off.

Counting iframe `load` events on the embedded form does not rescue this: Google
Forms fires a load on every section change, and Form A ("Contact Form") has four
page breaks — checked against its published `FB_PUBLIC_LOAD_DATA_`, not assumed.
It would overcount badly.

**If completion counts matter**, the ground truth is each form's linked response
sheet. Nothing reads it yet; that is real new work rather than a checklist item.

### On access

GA4 admin work needs the property's own Google account. The CMU Workspace
account cannot reach Analytics at all — *"you do not have access to Google
Analytics. Your account is managed by an organization that has this service
turned off for its users"* — so signing in as that account is not a workaround.

## Related

- `docs/AGENT_HANDOFF.md` — analytics architecture
- `docs/clarity-events-and-funnels.md` — Clarity counterparts and funnel definitions
- `docs/utm-conventions.md` — campaign tagging
