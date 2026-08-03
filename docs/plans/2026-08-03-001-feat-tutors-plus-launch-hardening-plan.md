---
title: "feat: tutors.plus launch hardening — analytics, redirects, SEO, cutover"
type: feat
status: active
date: 2026-08-03
---

# feat: tutors.plus launch hardening — analytics, redirects, SEO, cutover

## Enhancement Summary

**Deepened:** 2026-08-03 — 3 research agents (GA4 taxonomy, Clarity advanced config, Next.js monitoring instrumentation), all claims verified against 2025-26 official docs.

**Key improvements:**
1. Full tagging taxonomy locked (GA4 events/params/custom dimensions + Clarity tags/events) — see "Tagging Taxonomy" section
2. Three new instrumentation items: Core Web Vitals → GA4, global JS-error capture (`instrumentation-client.ts`), 404 tracking (`not-found.tsx`)
3. Phase D split into **API-automatable** (Admin API script: retention, key events, custom dims, EM toggles, annotations) vs **UI-only** (internal traffic, referral exclusions)
4. **Decision revised: Clarity masking Balanced, not Strict** — inputs are always masked in every mode, the Google Forms iframe is not recorded at all (cross-origin), and Strict would destroy replay value on a content site
5. `page_path` param dropped (redundant — GA4 predefined dimension); `cta_location` param added (placement attribution)
6. Confirmed: `@next/third-parties` sends no SPA pageviews itself — GA4 Enhanced Measurement "history events" is the mechanism (must stay ON)

## Overview

Cut tutors.plus over from the old Framer site to the Netlify-hosted Next.js 16 site without losing analytics continuity, search equity, or email. Four workstreams: (A) GA4 + Clarity instrumentation in code, (B) redirect map + SEO files, (C) DNS cutover runbook (third-party executes DNS), (D) GA4/Clarity console configuration.

Existing IDs are reused — **GA4 `G-6LB6RSKSCC`**, **Clarity `x3ycp8d2ay`**. Both already receive live traffic from the Framer site, so history is continuous across the cutover.

## Problem Statement

- New site has **no GA4 at all**; Clarity ID is hardcoded in `src/app/layout.tsx:33-41` and fires in every environment (dev/preview pollution).
- Old Framer site double-loads GA4 (direct gtag + GTM `GTM-55K5X5Z5`) — inflated pageviews today; must not carry over.
- 12 old URLs (from live sitemap) mostly do not exist on the new site; top traffic page `/get-involved/become-a-tutor` (26 sessions/3d) would 404.
- No `robots.txt`, no sitemap, no `metadataBase`; root meta description is `"Plus marketing website"`.
- Conversion surface is outbound Google Forms links — nothing measures them.
- DNS is on Cloudflare in an account we don't control; cutover is executed by dev lead (Cindy).

## Decisions (locked)

| Decision | Choice | Rationale |
|---|---|---|
| GA4 property | Reuse `G-6LB6RSKSCC` | Same domain/business; preserves history |
| GTM | Drop `GTM-55K5X5Z5` | Unknown container contents; double-fire bug on old site |
| Clarity project | Reuse `x3ycp8d2ay` | Continuous session history |
| Canonical host | **Apex `tutors.plus`** | Shorter; Netlify auto-301s www once apex is primary |
| Redirect location | `next.config.ts` `redirects()` | Repo pattern exists (`/research → /publications`, next.config.ts:14-22) |
| `/hidden/*` old URLs | Intentional 404 | Never public-facing; no traffic; Next redirects() can't emit 410 |
| SPA pageviews | GA4 Enhanced Measurement "history events" ON; component sends none | Next.js-documented pattern for `@next/third-parties`; avoids double-count |
| Analytics env gate | `CONTEXT === "production"` (Netlify build env) | No dev/preview pollution |
| Event names | Custom (`tutor_apply_click` etc.), NOT `generate_lead` | We measure outbound clicks, not form submissions; `generate_lead` semantics don't apply. Names are reserved-word-safe (`click`/`error`/`scroll` are GA4-reserved) |
| Scroll tracking | Enhanced Measurement 90% only; no custom scroll events | Clarity scroll heatmaps answer granular scroll questions better; custom thresholds double-fire risk |
| Clarity masking | **Balanced** (default) — revised from Strict | Inputs/dropdowns always masked in every mode; Google Forms iframe not recorded at all (cross-origin); Strict masks all text and kills replay value |
| Clarity identify API | Skip | Anonymous marketing site; no stable user ID; privacy-positive |
| Error tracking | GA4 `js_error` events + Clarity auto-capture; no Sentry | Right-sized for traffic level; Clarity links errors → replays natively |

## Tagging Taxonomy (locked spec)

### GA4 events

| Event | Trigger | Params |
|---|---|---|
| `tutor_apply_click` | outbound click, tutor form ID `1FAIpQLSfnLoEb…` | `link_domain`, `cta_location` |
| `contact_form_click` | outbound click, contact form ID `1FAIpQLSc0TFyK…` | `link_domain`, `cta_location` |
| `demo_click` | click → app.tutors.plus/demo | `link_domain`, `cta_location` |
| `login_click` | click → app.tutors.plus login | `link_domain`, `cta_location` |
| `LCP` / `INP` / `CLS` / `FCP` / `TTFB` | web-vitals report | `value` (CLS ×1000, rounded), `metric_id`, `metric_rating`, `non_interaction: true` |
| `js_error` | window error/unhandledrejection + error boundaries | `error_message` (≤100 chars), `error_source` (≤100 chars), `non_interaction: true` |
| `page_not_found` | not-found.tsx hydration | `page_path`, `referrer` |

Param rules: NO `page_path` on CTA events (predefined "Page path" dimension covers it); `link_url` replaced by short `link_domain`/slug — full Google Forms URLs exceed GA4's ~100-char param value cap. `cta_location` enum: `nav` | `hero` | `inline` | `footer` | `card`. All events fired through one `trackEvent()` wrapper — no free-hand `gtag()` calls.

### GA4 custom dimensions/metrics to register (24-48h lag, not retroactive — register day one)

| Name | Scope | Param | Kind |
|---|---|---|---|
| CTA location | Event | `cta_location` | Dimension |
| Link domain | Event | `link_domain` | Dimension |
| Metric rating | Event | `metric_rating` | Dimension |
| Error message | Event | `error_message` | Dimension |
| Error source | Event | `error_source` | Dimension |
| Metric value | Event | `metric_value` | Custom metric (standard unit) |

(6 of 50 slots. Do NOT register `metric_id` — high-cardinality, dedup/BigQuery only.)

### Clarity tags/events

| Call | Value | When |
|---|---|---|
| `clarity("set", "page_type", …)` | first path segment (`home`, `for-tutors`, `publications`, `success-stories`, `news`, `about`, `get-involved`) | every load + SPA route change (page-scoped; ≤255 chars; queue-stub buffers early calls) |
| `clarity("event", "cta_tutor_apply" \| "cta_contact" \| "cta_demo" \| "cta_login")` | — | same click handlers as GA4 events; API events usable in funnels |
| `clarity("upgrade", "cta_click")` | — | same handler — prioritizes conversion sessions for recording retention |
| Skip: `identify`, referrer/viewport/source tags | — | redundant with built-in filters |

## Proposed Solution

### Phase A — Instrumentation (code)

**A1. GA4** — install `@next/third-parties`. In `src/app/layout.tsx`, render `<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />` only when `process.env.CONTEXT === "production"` and the ID is set.

**A2. Clarity env-gated** — replace hardcoded `x3ycp8d2ay` with `NEXT_PUBLIC_CLARITY_PROJECT_ID`, same production gate, same `afterInteractive` inline snippet.

**A3. Outbound click tracker** — new client component `src/components/analytics/outbound-click-tracker.tsx`, mounted once in root `src/app/layout.tsx` (next to `ScrollToTopButton`, matching the repo's small-client-utility pattern):
- **`document`-level listener, capture phase, `e.target.closest("a")`** — required because mobile-nav CTAs render inside a portaled Sheet (`src/components/marketing/header/mobile-nav.tsx`), outside any layout subtree (SpecFlow #1).
- Match by **full form ID**, not URL shape (both forms are docs.google.com; get-involved-sections.tsx:404 links the embedded form with `usp=header`):
  - `1FAIpQLSfnLoEb…` → event `tutor_apply_click`
  - `1FAIpQLSc0TFyK…` → event `contact_form_click`
  - `app.tutors.plus/demo` → `demo_click`; `app.tutors.plus` login → `login_click`
- Fire via `sendGAEvent('event', name, { link_domain, cta_location })` per the Tagging Taxonomy (no `page_path` param — predefined dimension covers it). In the same handler, fire `clarity("event", "cta_*")` + `clarity("upgrade", "cta_click")` (guarded). `cta_location` derived from a `data-cta-location` attribute on the anchor (or nearest section landmark) — enum `nav|hero|inline|footer|card`. Links are `target="_blank"` (verified), so unload race is minimal; gtag uses beacon transport. Middle-click (`auxclick`) loss accepted.
- All GA sends route through one `trackEvent()` helper (`src/lib/analytics.ts`) — single choke point for naming rules.
- Known limit (documented): the contact form **iframe embed** on /get-involved (`get-involved-sections.tsx:67-87`) is cross-origin — submissions inside it are untrackable. Only link-clicks are measured.

**A4. Clarity page_type tagger** — small client component using `usePathname`; on each pathname change calls `window.clarity?.("set", "page_type", <segment>)`. **Must guard `window.clarity` existence** — the stub only exists where the gated snippet rendered (SpecFlow #3). Segment map: `/for-tutors` → `for-tutors`, `/publications` → `publications`, etc.; first path segment is sufficient.

**A5. Env plumbing** — add both vars to `.env.example` with comments; set on Netlify:

```bash
netlify env:set NEXT_PUBLIC_GA_MEASUREMENT_ID G-6LB6RSKSCC
netlify env:set NEXT_PUBLIC_CLARITY_PROJECT_ID x3ycp8d2ay
```

`NEXT_PUBLIC_*` is inlined at build time — a missing var fails **silently**. Acceptance includes grepping the production build output for both IDs (SpecFlow #6).

**A6. Core Web Vitals → GA4** — new client component `src/components/analytics/web-vitals.tsx` using `useReportWebVitals` from `next/web-vitals`, mounted in root layout. Forward each metric via `sendGAEvent`: event name = metric name (`LCP`/`INP`/`CLS`/`FCP`/`TTFB`), `value: Math.round(name === "CLS" ? value * 1000 : value)`, plus `metric_id` (dedup), `metric_rating`, `non_interaction: true`. `@next/third-parties` has nothing native for this — manual forward is the documented pattern. No custom `PerformanceObserver` (anti-pattern: duplicates web-vitals' INP finalization).

**A7. Global JS-error capture** — `src/instrumentation-client.ts` (Next ≥15.3 canonical location, runs before hydration): `window.addEventListener("error")` + `"unhandledrejection"` → `js_error` event with `error_message`/`error_source` (≤100 chars each). **Flood control mandatory**: dedupe-set per page load + hard cap 5 events/pageload; filter cross-origin `"Script error."` noise. Fixed event name always — never dynamic names (500-event-name limit). Add `src/app/error.tsx` + `global-error.tsx` boundaries (repo has none) with a `useEffect` firing the same `js_error` on boundary catch. Clarity captures JS errors automatically (dashboard panel, error → replay links) — GA4 event is the trend/alert layer, Clarity is the debug layer.

**A8. 404 tracking** — add `src/app/not-found.tsx` (repo has none; currently default 404) with a small client `NotFoundTracker`: `usePathname` + `useEffect` → `page_not_found` event with `page_path` + `document.referrer`. Caveat: 404 page is statically prerendered — only client hydration knows the real missing path; this is the reliable mechanism. Post-cutover this doubles as redirect-map QA (any legacy URL we missed shows up here).

### Phase B — Redirects + SEO (code)

**B1. Redirect map** in `next.config.ts` `redirects()` — all `permanent: true`, all **single-hop** to final destinations (never chain through the existing `/research` rule — SpecFlow #4):

| Old (Framer) | New | Note |
|---|---|---|
| `/about/story` | `/about` | |
| `/get-involved/become-a-tutor` | `/for-tutors` | top traffic page |
| `/get-involved/contact-us` | `/get-involved` | |
| `/get-involved/careers` | `/get-involved` | no careers page on new site |
| `/impact/research` | `/publications` | direct, not via `/research` |
| `/solution/tutoring` | `/for-schools` | |
| `/solution/toolkit` | `/for-schools` | |
| `/solution/training` | `/for-tutors` | |
| `/hidden/design-system`, `/hidden/page` | — | intentional 404 |
| `/`, `/about/team` | — | exist unchanged |

www→apex and `plus-marketing-website.netlify.app`→apex 301s are handled by Netlify primary-domain setting — **verify, don't assume** (SpecFlow #5).

**B2. `src/app/robots.ts`** — allow all; disallow `/api/` and `/assistant`; `sitemap: https://tutors.plus/sitemap.xml`. *(Assumption: `/assistant` is an app surface, not marketing content — flag if it should be indexed.)*

**B3. `src/app/sitemap.ts`** — static marketing routes + dynamic entries via the **existing Notion query layer** (`fetchNews()` — news.ts:33, `fetchSuccessStories()` — success-stories.ts:70, `successStorySlug()` helper). Query layer degrades to git-cached JSON (`src/data/cache/*.json`) when `NOTION_API_KEY` absent, so builds never hard-fail (learning: notion-cms-header-footer-redesign.md). Sitemap is build-time static; new Notion entries appear on next deploy — accepted and documented.

**B4. Metadata** — in root layout: `metadataBase: new URL("https://tutors.plus")`, title template `{ default: "PLUS | Personalized Learning & Scalable Tutoring Solutions", template: "%s | PLUS" }`, replace `"Plus marketing website"` description with real copy (reuse about-page description voice), add `openGraph` defaults. Missing per-page metadata (homepage, team, success-stories index, `[id]` pages) — homepage gets one now; rest deferred.

**B5. netlify.toml** — untouched except review. Preserve `@netlify/plugin-nextjs`, `publish = ".next"`, `NODE_VERSION = 20` (learning: notion-cms-property-sync-fixes.md — do not reintroduce Storybook build settings).

**B6. Doc-first rule** — update `docs/AGENT_HANDOFF.md` with the analytics architecture (env vars, gate, event names).

### Phase C — Cutover runbook (sequenced)

Order matters (SpecFlow #2, #9):

1. **Merge + deploy Phases A/B to production** (still on netlify.app host). Verify build inlined both IDs.
2. **Pre-flight on netlify.app**: redirects curl-tested, sitemap/robots served, GA4 DebugView shows page_view + click events, Clarity live. Traffic here reports hostname `plus-marketing-website.netlify.app` — distinguishable from Framer traffic (same GA property, hostname dimension) — acceptable during transition window.
3. **Attach domain** (before any DNS change):
   ```bash
   netlify api updateSite --data '{"site_id":"c13b0a44-950d-4c6f-8d92-27816a3d08f0","body":{"custom_domain":"tutors.plus","domain_aliases":["www.tutors.plus"]}}'
   ```
4. **Cindy executes DNS** (message already drafted): apex → `CNAME plus-marketing-website.netlify.app` (Cloudflare flattens), www → same target; **both grey-cloud/DNS-only**; MX (Mailgun) + SPF TXT untouched.
5. **Provision cert + force HTTPS**:
   ```bash
   netlify api provisionSiteTLSCertificate --data '{"site_id":"c13b0a44-950d-4c6f-8d92-27816a3d08f0"}'
   ```
6. **Verify**: both hosts serve over valid TLS; www 301s to apex; netlify.app 301s to apex; all 10 redirect rows return single-hop 301; `/hidden/*` 404s.
7. **GA4 annotation** at DNS-flip date (not deploy date).
8. **Only now cancel Framer.** Rollback until then = Cindy reverts two DNS records.

### Phase D — Console configuration

**GA4 — automatable via Admin API script** (service account `analytics@personalized-learning-2.iam.gserviceaccount.com`, Editor on property `properties/333644173`, account `tutors.plus.ga`; key at `~/.config/gcloud/plus-ga4-sa.json`; executed 2026-08-03):
- [x] Data retention → 14 months (was **TWO_MONTHS** — caught before launch)
- [x] 4 key events created (`tutor_apply_click`, `contact_form_click`, `demo_click`, `login_click`; ONCE_PER_SESSION). Pre-existing `purchase` key event left as-is
- [x] 5 custom dimensions + `metric_value` custom metric registered (24-48h reporting lag running)
- [x] Enhanced Measurement verified: streamEnabled + pageChangesEnabled both ON — SPA pageview mechanism confirmed active
- [ ] Cutover annotation at DNS-flip date — `properties.reportingDataAnnotations.create` (v1alpha) — **run at flip, not before**
- [x] Google Analytics MCP registered user-scope (`uvx --from analytics-mcp google-analytics-mcp`, ADC via key file) — available in new sessions

**GA4 — UI-only (not exposed in Admin API; ~10 min clicking):**
- [ ] Internal traffic rule (office/home IPs) → activate filter (Admin → Data streams → Configure tag settings → Define internal traffic; then Data settings → Data filters)
- [ ] Unwanted referrals: `docs.google.com` (same Configure tag settings panel)
- [ ] Data stream URL → `https://tutors.plus` (cosmetic)
- [ ] Search Console: verify domain property (DNS TXT — Cindy again) → link → submit sitemap. **After cutover** (SpecFlow #10); monitor Coverage for legacy-URL crawl errors 2 weeks
- [ ] Build 4 audiences (not retroactive — build now): tutor-intent-no-apply, school-intent-no-contact, converters (any key event), engaged-non-converters
- [ ] Reports: add "Key events" column to Pages + Landing pages standard reports; 3 Explorations — (1) funnel `session_start` → audience page → matching `_click` by channel group, (2) free-form key events by Page path × `cta_location`, (3) path exploration from `/`
- [ ] Validation: **DebugView** for param values (Realtime does not show custom params reliably); Realtime only for post-deploy smoke test incl. client-side-navigation pageview check

**Clarity (dashboard-only; no config API):**
- [ ] Masking: confirm **Balanced** (default). Inputs/dropdowns always masked in every mode; Google Forms iframe not recorded at all (cross-origin) — no per-element work needed. Confirm privacy policy discloses session recording
- [ ] IP block (Settings → IP blocking; IPv4/CIDR only — same IPs as GA4)
- [ ] GA4 integration (Settings → connect Google account, supply Measurement ID + Property ID). Expectation set: GA segments appear as **Recordings filters only**; no replay links inside GA4
- [ ] Funnels (create early — not retroactive; steps = page visits + API events): (1) entry → /for-tutors → `cta_tutor_apply`, (2) entry → /for-schools → `cta_contact`|`cta_demo`, (3) entry → /get-involved → any cta event
- [ ] Bug-hunting workflow (zero config, auto-captured): Dashboard → JS errors panel (top 500 errors, error → replay links, "error clicks" toggle); rage/dead clicks/quick-backs Insights cards. No native threshold alerts — subscribe team to **weekly email digest** (Manage Account); monthly manual pass over JS-errors panel
- [ ] Optional: generate Data Export API token (Settings → Data Export; limits: 10 req/day, 1-3 day lookback, 1000 rows) if scheduled pulls wanted — Clarity MCP already covers ad-hoc reads
- [ ] Note: saved URL filters referencing old paths go stale at cutover

**Consent (explicit open decision):** GA4 + Clarity fire without a consent banner. US-focused education nonprofit — acceptable for launch per current posture, but EU/UK traffic + FERPA-adjacent context deserves a real review. **Deferred, owner: Bill/legal. Not a launch blocker by decision.**

## System-Wide Impact

- **Interaction graph**: click tracker is passive (capture-phase listener, no preventDefault) — zero interference with navigation. Clarity tagger runs per route change; no state.
- **Error propagation**: analytics components no-op when env vars absent or gate fails; sitemap falls back to git-cached JSON; no new hard-fail paths.
- **State lifecycle**: none — no persistence added.
- **API surface parity**: none — marketing site only.
- **Integration risk concentrated in**: build-time env inlining (silent), portal DOM escape (covered by document listener), redirect chaining (covered by direct mapping).

## Acceptance Criteria

- [ ] Production build output contains `G-6LB6RSKSCC` and `x3ycp8d2ay`; preview/dev builds contain neither
- [ ] GA4 Realtime shows page_view on hard load AND client-side navigation
- [ ] All 4 click events visible in GA4 DebugView, including from **mobile nav** (portal test)
- [ ] `curl -sI` on all 8 redirect sources → single `301` to final destination; `/hidden/*` → 404
- [ ] `robots.txt` + `sitemap.xml` served; sitemap lists all static routes + news + success-story URLs on apex host
- [ ] www.tutors.plus and netlify.app both 301 → `https://tutors.plus`
- [ ] Valid TLS on apex + www; Force HTTPS on
- [ ] Clarity receives sessions with `page_type` tag; no console errors in dev (guarded stub)
- [ ] Web vitals events (`LCP`/`INP`/`CLS`) arrive in DebugView with `metric_rating`
- [ ] `js_error` fires on an injected test error, capped at 5/pageload, fixed event name
- [ ] `page_not_found` fires with correct `page_path` on an unknown URL
- [ ] Custom dimensions registered before launch traffic (24-48h lag accounted)
- [ ] Framer cancelled only after all above green
- [ ] `docs/AGENT_HANDOFF.md` updated

## Google-side Access Setup (for API automation + MCP)

1. **Create service account**: console.cloud.google.com → select the Firebase-linked project `266575603137` (or any project) → IAM & Admin → Service Accounts → Create (`claude-analytics`) → no GCP roles needed → Keys → Add key → JSON → download.
2. **Enable APIs** in that project: "Google Analytics Admin API" + "Google Analytics Data API".
3. **Grant GA4 access**: GA4 Admin → Property access management → + → paste the service-account email (`…@….iam.gserviceaccount.com`) → role **Editor**. (Admin identity per Entity Access export: `tutors.plus.manager@gmail.com`.)
4. **MCP (reads/reporting)**: Google's official `analytics-mcp` with `GOOGLE_APPLICATION_CREDENTIALS` pointing at the JSON key.
5. **Config writes**: scripted against Admin API v1beta/v1alpha with the same key (Phase D automatable list).

## Success Metrics

- Zero drop in GA4 property continuity (same property, hostname transition visible)
- Legacy-URL 404 rate in Netlify analytics ~0 (only /hidden/*)
- Tutor-application click-through measurable within first week

## Dependencies & Risks

| Risk | Mitigation |
|---|---|
| Cindy DNS access/timing unknown | Message drafted; Framer stays live until verified |
| Cloudflare orange-cloud left on | Explicit grey-cloud instruction; cert provision fails loudly if not |
| `NEXT_PUBLIC_*` var missing at build | Grep build output (acceptance) |
| GA4 double pageviews | Single mechanism chosen (Enhanced Measurement); verified in Realtime |
| Framer tag still firing during transition | Same property both sites; hostname dimension separates; annotation at flip |
| Notion API down at build | Git-cache fallback in query layer |

## Sources & References

- Repo research: form-link inventory (get-involved-sections.tsx:139-146,403-410,635-642; for-tutors-sections.tsx:139-146,797-804,1106-1113; plus-landing-sections.tsx:832-866; for-schools-benefits.ts:12-13; mobile-nav.tsx:58-115)
- Existing redirect pattern: next.config.ts:14-22
- Notion query layer: src/lib/notion/queries/news.ts:33, success-stories.ts:70; slug helper src/lib/success-stories/success-story-path.ts:7
- Learnings: docs/solutions/integration-issues/notion-cms-property-sync-fixes.md (netlify.toml gotchas), notion-cms-header-footer-redesign.md (cache fallback, SDK v2 pin)
- Live-site audit (this session): Framer serves identical title/description on all 12 URLs — minimal per-page SEO equity at stake
- Clarity MCP: `/get-involved/become-a-tutor` = top page, 26 sessions/3d
- Netlify site: `c13b0a44-950d-4c6f-8d92-27816a3d08f0`, deploys green as of 2026-08-02

### Deepening research references (verified 2025-26 docs)

- GA4: [recommended events](https://support.google.com/analytics/answer/9267735) · [event naming rules](https://support.google.com/analytics/answer/13316687) · [custom dimensions](https://support.google.com/analytics/answer/10075209) · [enhanced measurement](https://support.google.com/analytics/answer/9216061) · [Admin API v1 REST](https://developers.google.com/analytics/devguides/config/admin/v1/rest) · [web-vitals→GA4](https://web.dev/articles/vitals-ga4)
- Clarity: [client API](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api) · [custom tags](https://learn.microsoft.com/en-us/clarity/filters/custom-tags) · [smart events](https://learn.microsoft.com/en-us/clarity/setup-and-installation/smart-events) · [funnels](https://learn.microsoft.com/en-us/clarity/setup-and-installation/funnels) · [masking](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking) · [GA4 integration](https://learn.microsoft.com/en-us/clarity/ga-integration/ga4-integration) · [Data Export API](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-data-export-api)
- Next.js: [useReportWebVitals](https://nextjs.org/docs/app/api-reference/functions/use-report-web-vitals) · [instrumentation-client](https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client) · [not-found](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) · [third-party libraries](https://nextjs.org/docs/app/guides/third-party-libraries) · [Netlify deploy notifications](https://docs.netlify.com/deploy/deploy-notifications/) · [Netlify function logs](https://docs.netlify.com/build/functions/logs/)
