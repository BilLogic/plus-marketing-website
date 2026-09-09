# UTM tagging conventions

Every link to tutors.plus that someone places **by hand** should carry campaign
tags. Links inside the site never should.

## Why this exists

Over the 90 days to 2026-09-09, **64% of sessions were Direct** — 253 of 398,
with no attributable source. At this traffic level that is not word of mouth. It
is untagged links in funder emails, grant applications, conference decks and
Slack.

The evidence is already in the data: `mail.google.com` shows up as a *referral*
source. That is someone clicking an untagged link out of Gmail. Every such link
either lands in Direct or, worse, attributes a funder to "mail.google.com".

Attribution for the funder audience depends almost entirely on fixing this,
because funders arrive through hand-placed links rather than search.

## The three tags

Use all three, always. A partial tagging is worse than none — it splits one
campaign across several rows.

| Tag | What it answers | Rule |
| --- | --- | --- |
| `utm_source` | *Which specific place?* | The site or product the link sits on, lowercase, no `www.` |
| `utm_medium` | *What kind of place?* | One of the closed list below. Never invent one. |
| `utm_campaign` | *Which push?* | `kebab-case`, dated when it is a moment rather than an evergreen placement |

### `utm_medium` — closed list

Only these five. GA4 groups channels off `medium`, so an invented value
("newsletter", "e-mail", "Email") lands in Unassigned and is invisible in every
default report.

| Value | Use for |
| --- | --- |
| `email` | Anything delivered to an inbox — funder updates, newsletters, one-to-one outreach |
| `social` | LinkedIn, X, Bluesky, Instagram |
| `referral` | A link on someone else's site: partner pages, university directories, award listings |
| `job-board` | Handshake, Chronicle, Idealist — tutor recruitment |
| `deck` | Slide decks, PDFs, grant applications, printed material, QR codes |

`cpc` and `paid-social` are deliberately absent. Add them if PLUS ever runs paid
acquisition; until then their presence would only invite miscategorisation.

### `utm_source` — the values already in play

These are real referrers from the last 90 days. Reuse the exact spelling rather
than inventing a variant, so history stays groupable.

| Source | Medium | Notes |
| --- | --- | --- |
| `linkedin` | `social` | 27 sessions, the largest non-search channel |
| `handshake` | `job-board` | CMU Handshake — the tutor recruitment pipeline |
| `chronicle` | `job-board` | jobs.chronicle.com |
| `hcii-cmu` | `referral` | hcii.cmu.edu |
| `nssa-stanford` | `referral` | nssa.stanford.edu |
| `ux-design-awards` | `referral` | Award listing |
| `gmail` | `email` | Currently arriving untagged as a `mail.google.com` referral |

For a funder or foundation, use their short name as the source: `levi`,
`gates`, `rkm`, `overdeck`, `accelerate`, `walton`, `j-pal`.

### `utm_campaign` — how to name one

- Evergreen placement: name the thing. `tutor-recruitment`, `school-partnerships`
- A moment: name it and date it. `levi-report-2026-q3`, `tools-competition-2026`
- Never put a person's name, an email address, or anything else identifying in a
  campaign value — it ends up in reports, in exports, and in URLs people paste
  onward

## Worked examples

Funder update sent by email:

```
https://tutors.plus/for-researchers?utm_source=levi&utm_medium=email&utm_campaign=levi-report-2026-q3
```

Tutor recruitment post on Handshake:

```
https://tutors.plus/for-tutors?utm_source=handshake&utm_medium=job-board&utm_campaign=tutor-recruitment
```

LinkedIn announcement:

```
https://tutors.plus/about/news?utm_source=linkedin&utm_medium=social&utm_campaign=tools-competition-2026
```

Link in a grant application PDF:

```
https://tutors.plus/publications?utm_source=gates&utm_medium=deck&utm_campaign=school-partnerships
```

## Do not tag

- **Links between pages of tutors.plus.** Self-referral tagging restarts the
  session and destroys the original attribution — the exact problem
  `ignore_referrer` exists to prevent for the Google Forms round trip.
- **Anything carrying personal data.** No names, no email addresses, no
  recipient identifiers. URL parameters are logged, cached, shared and
  screenshotted.
- **Links to `app.tutors.plus`.** That is a different property; the outbound
  click is already tracked as `login_click` / `demo_click`.

## Checking it worked

In GA4, Reports → Acquisition → Traffic acquisition, with **Session source /
medium** as the dimension. A correctly tagged campaign shows as
`levi / email`. If it appears under `Unassigned`, the `utm_medium` is not one of
the five above.

Give it 24-48 hours — standard reports are not realtime.
