# Audience funnel report

The three audience funnels from #19, as a runnable report rather than a saved
GA4 Exploration.

GA4 Explorations cannot be created through any API — they are a UI artifact.
This gives the same three funnels in a form that is version-controlled,
reproducible, and diffable over time, which for a periodic report is arguably
more useful than a saved view someone has to remember to open.

## Running it

Needs a service account with read access to the property:

```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/ga4-sa.json uv run --with google-analytics-data python scripts/audience_funnels.py 90daysAgo today
```

Defaults to the last 30 days when no dates are given.

## What it reports

One funnel per audience, segmented on `first_audience` so a visitor is
attributed to the door they entered through rather than the page they converted
on:

| Audience | Steps |
| --- | --- |
| Schools | session start → viewed `/for-schools` → `demo_click` |
| Funders | session start → viewed `/for-researchers` or `/publications` → `contact_form_click` or `form_submit` |
| Tutors | session start → viewed `/for-tutors` or `/get-involved` → `tutor_apply_click` |

## Reading the output

**Volumes are small.** Schools and funders convert in low single digits per
month. These funnels show direction, not significance — do not let one week's
movement drive a decision.

**Not retroactive.** `first_audience` was registered on 2026-09-09. Anything
before that reports as unset, so restrict comparisons to windows starting after
that date.

**Baseline:** 1.65% of sessions that viewed a page clicked any conversion CTA
(23 of 1,394) over the 90 days to 2026-09-09. That is the number to beat.

## First run, 90 days to 2026-09-09

Out of 1,428 sessions:

| Audience | Reached the page | Converted |
| --- | --- | --- |
| Schools | 7 (0.5%) | 1 |
| Funders | 15 (1.1%) | 1 |
| Tutors | 424 (29.7%) | 7 |

Tutors reach their pages roughly sixty times as often as schools do. Schools
and funders are the two audiences PLUS most needs to reach, and essentially no
one is finding those pages — which is a way-finding problem on the homepage,
not a conversion problem on the pages themselves. Both convert at roughly the
rate tutors do once someone arrives.

## Two API constraints worth knowing

Funnel reporting exists **only in the `v1alpha` surface**. `v1beta` has no
funnel types at all — importing them from there fails outright.

`pagePath` is rejected inside a funnel step ("not currently supported inside
segments & funnel steps"). The step filters on the `page_location` event
parameter instead, which is the full URL, so a CONTAINS match on the path is
the equivalent test.
