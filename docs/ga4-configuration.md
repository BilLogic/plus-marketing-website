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

### 1. Set the internal-traffic data filter to Active

Admin → Data collection and modification → Data filters → *Internal Traffic* →
**Filter state: Active**.

It is almost certainly still on **Testing**, the default, which tags traffic but
excludes nothing. Verify rather than assume — the state cannot be read
programmatically either.

*Why it cannot be scripted:* there is no `dataFilters` resource in the Admin API
in either version. The 21 property sub-resources in `v1alpha` are
`accessBindings, adSenseLinks, audiences, bigQueryLinks, calculatedMetrics,
channelGroups, conversionEvents, customDimensions, customMetrics, dataStreams,
displayVideo360AdvertiserLinkProposals, displayVideo360AdvertiserLinks,
expandedDataSets, firebaseLinks, googleAdsLinks, keyEvents,
reportingDataAnnotations, rollupPropertySourceLinks, searchAds360Links,
subpropertyEventFilters, subpropertySyncConfigs`. `v1beta` has 7, and none of
them either.

**Activating it alone changes nothing.** The filter excludes on
`traffic_type = internal`, which `trackEvent()` stamps from a localStorage flag.
Teammates must opt in per browser at `https://tutors.plus/?internal=1`
(`?internal=0` undoes it). Without that, there is nothing to exclude.

### 2. Build the three audience funnel Explorations — optional

Explore → Blank → Funnel exploration, three times. Step definitions are in
`scripts/audience-funnels.md`.

*Why it cannot be scripted:* there is no Explorations resource in the Admin API
at all.

**Only worth doing if someone wants the clickable version in the UI.** The
measurement itself is already delivered as `scripts/audience_funnels.py`, which
produces the same three funnels on demand and is version-controlled. Nothing is
blocked on this.

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

The browser route was tried for items 1 and 2, since it needs no password. The
Chrome session is signed into a Workspace account where Google Analytics is
disabled at the org level — *"you do not have access to Google Analytics. Your
account is managed by an organization that has this service turned off for its
users."* Signing in as the property's own account needs that account's password.

## Related

- `docs/AGENT_HANDOFF.md` — analytics architecture
- `docs/clarity-events-and-funnels.md` — Clarity counterparts and funnel definitions
- `docs/utm-conventions.md` — campaign tagging
