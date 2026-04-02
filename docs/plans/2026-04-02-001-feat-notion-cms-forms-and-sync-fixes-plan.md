---
title: "feat: Notion CMS Form Views + Sync Script Property Fixes"
type: feat
status: active
date: 2026-04-02
---

# Notion CMS Form Views + Sync Script Property Fixes

## Overview

Create Notion form views for all 4 CMS databases so team members can contribute content directly via shareable form links — no database editing required. Simultaneously fix property name mismatches in the sync script and runtime queries that silently drop data (marketing blurbs, featured flags, success story content/images).

## Problem Statement

1. **No submission workflow:** Team members must navigate into Notion databases to add entries. Non-technical members find this intimidating and error-prone.
2. **Silent data loss:** The sync script and runtime queries reference wrong property names for 5+ fields, causing `null` values in cached data (marketing blurbs, featured flags, success story images/content).
3. **Schema drift:** The sync script and runtime query layer are separate implementations that have drifted apart — different field names, different content strategies, missing fields.

## Proposed Solution

### Phase 1: Fix Property Mismatches (Sync Script + Runtime Queries)

All mismatches confirmed by comparing `scripts/sync-notion.ts` and `src/lib/notion/queries/*.ts` against the actual Notion database schemas fetched via MCP.

#### News Database — 2 mismatches

| Location | Current (broken) | Correct |
|---|---|---|
| `scripts/sync-notion.ts:101` | `props["Marketing Blurb"]` | `props["Marketing Blurb / Headline"]` |
| `scripts/sync-notion.ts:108` | `props.Featured` | `props["Priority / Featured?"]` |
| `src/lib/notion/queries/news.ts` | `props["Marketing Blurb"]` | `props["Marketing Blurb / Headline"]` |
| `src/lib/notion/queries/news.ts` | `props.Featured` | `props["Priority / Featured?"]` |
| `src/lib/notion/queries/news.ts` (filter) | `property: "Featured"` | `property: "Priority / Featured?"` |

#### Success Stories Database — 3 mismatches + missing fields

| Location | Current (broken) | Correct |
|---|---|---|
| `scripts/sync-notion.ts:157` | `props["Full Content"]` via `getRichText` | Remove — content is page body, not a property |
| `scripts/sync-notion.ts:158` | `props.Image` | `props["Cover Image"]` |
| `scripts/sync-notion.ts` | outputs `fullContent` field | Should be `content` to match `types.ts` |
| `scripts/sync-notion.ts` | Missing fields | Add `coverImage`, `author`, `clientPartner` |
| `src/lib/notion/queries/success-stories.ts` | `props.Image` (if present) | `props["Cover Image"]` only |

#### Team & Research — No mismatches confirmed.

### Phase 2: Create Notion Form Views

Use the Notion MCP `notion-create-view` tool with `type: "form"` to create a form view on each database. Each form should feel approachable and guide the submitter with clear, friendly copy — not raw database field names.

#### Copywriting Principles for All Forms

- **Tone:** Warm, professional, encouraging. The submitter is a colleague, not filling out a government form.
- **Labels:** Use human-readable questions, not database column names. E.g., "What's your name?" not "Name".
- **Descriptions:** Every non-obvious field gets a 1-line helper that explains *what* to enter and *why* it matters.
- **Order:** Lead with identity/title fields (what is this?), then context/metadata (when, who, where), then optional enrichment (links, images, bio).
- **Required vs Optional:** Mark only truly essential fields as required. Optional fields should feel like bonus opportunities, not obligations.

---

#### Form 1: "Join the PLUS Team"

> *Welcome to PLUS! Help us get to know you by filling out your team profile. This information will appear on our public website.*

| # | Field (Notion Property) | Form Label | Description / Helper Text | Input Type | Required? |
|---|---|---|---|---|---|
| 1 | Name | **Your full name** | "As you'd like it displayed on the website (e.g., Dr. Jane Smith)" | Title (text) | Yes |
| 2 | Title 1 | **Primary role or title** | "Your main title at PLUS (e.g., Research Scientist, Software Engineer)" | Text | Yes |
| 3 | Title 2 | **Secondary title (if any)** | "Additional role or academic title (e.g., PhD Candidate, CMU HCII)" | Text | No |
| 4 | Affiliation | **Your affiliation with PLUS** | "How are you connected to the team?" | Select: Leadership / PLUS Staff / Independent Study Student / Student Intern / Past Collaborators | Yes |
| 5 | Group | **What team or function?** | "Which group best describes your work at PLUS?" | Select: Researcher / Software Developer / Product Manager / Product Designer / QA Engineer / Tutor Supervisor / Advisor / Others | Yes |
| 6 | Bio | **Short bio** | "2-3 sentences about your background, interests, or what you do at PLUS. Written in third person works best for the website." | Long text | No |
| 7 | LinkedIn | **LinkedIn profile URL** | "Full URL, e.g., https://linkedin.com/in/yourname" | URL | No |
| 8 | Google Scholar | **Google Scholar profile URL** | "If you have published research, link your Scholar page here" | URL | No |
| 9 | Picture | **Profile photo** | "A clear headshot, ideally square crop. This will be displayed on the team page." | File upload | No |
| 10 | Personal Website | **Personal website or portfolio** | "Link to your personal site, portfolio, or academic homepage" | URL | No |
| 11 | Joined Date | **When did you join PLUS?** | "Approximate start date is fine" | Date | No |

```
Database: 134b7cca4982801da91dd678e79d6e27
Data Source: ca66da26-c73a-437d-ab02-80fb97269edb
Type: form
Name: "Join the PLUS Team"
Configure:
  SHOW "Name", "Title 1", "Title 2", "Affiliation", "Group", "Bio", "LinkedIn", "Google Scholar", "Personal Website", "Picture", "Joined Date"
  FORM OPEN
  FORM ANONYMOUS false
  FORM PERMISSIONS reader
```

**Pre-requisite changes to Notion database:**
- **Rename** Affiliation option `"Current Students"` → split into two new options: `"Independent Study Student"` and `"Student Intern"` (use `notion-update-data-source` to update the select options)
- **Add** a new `"Personal Website"` URL property to the Team Member Database
- **Frontend mapping:** Both "Independent Study Student" and "Student Intern" should render under a combined "Student Intern" group on the website's team page. Update the frontend grouping logic in the team page component.

---

#### Form 2: "Submit a News Item"

> *Share news about PLUS — press coverage, events, partnerships, product updates, or research highlights. Our marketing team will review and feature it on the website.*

| # | Field (Notion Property) | Form Label | Description / Helper Text | Input Type | Required? |
|---|---|---|---|---|---|
| 1 | Title | **Headline** | "A clear, attention-grabbing title for the news item" | Title (text) | Yes |
| 2 | Category | **What type of news is this?** | "Helps us organize and display it correctly on the website" | Select: Media Coverage / Events / Partnerships / Research / Product Update / Others | Yes |
| 3 | Marketing Blurb / Headline | **One-line teaser** | "A punchy single sentence that hooks readers (shown on the news card). Think of it as the subtitle." | Text | No |
| 4 | Summary | **Brief summary** | "2-4 sentences describing the news. This appears on the website listing page." | Long text | Yes |
| 5 | Author | **Who's submitting this?** | "Your name, or the original author's name" | Text | No |
| 6 | Publication Date | **When was this published?** | "The original publication date, or today if it's new" | Date | Yes |
| 7 | External Link | **Link to full article or source** | "URL to the original article, press release, or event page" | URL | No |
| 8 | Featured Image | **Cover image** | "An eye-catching image for the news card. Landscape orientation works best (16:9)." | File upload | No |

**Design decisions:**
- `"Priority / Featured?"` is **hidden** from the form. This is an editorial call made by the marketing team, not the submitter.
- Order leads with the creative content (headline, category, blurb) then moves to metadata (author, date, links).

```
Database: 18ab7cca498280b79168db5c5ab201e9
Data Source: 18ab7cca-4982-805d-b4ab-000b8277e344
Type: form
Name: "Submit a News Item"
Configure:
  SHOW "Title", "Category", "Marketing Blurb / Headline", "Summary", "Author", "Publication Date", "External Link", "Featured Image"
  FORM OPEN
  FORM ANONYMOUS false
  FORM PERMISSIONS reader
```

---

#### Form 3: "Add a Research Paper"

> *Add your published or upcoming research paper to the PLUS website. This helps showcase our team's contributions to learning science and educational technology.*

| # | Field (Notion Property) | Form Label | Description / Helper Text | Input Type | Required? |
|---|---|---|---|---|---|
| 1 | Title | **Paper title** | "The full title of the publication, exactly as it appears in the proceedings or journal" | Title (text) | Yes |
| 2 | Authors | **Author(s)** | "Select all authors from the list. If someone is missing, ask an admin to add them to the database." | Multi-select (60+ researchers) | Yes |
| 3 | Venue | **Conference or journal** | "Where was this published? (e.g., LAK 2026, AIED 2025, IJAIED)" | Text | Yes |
| 4 | Publish Date | **Publication date** | "Date of publication or conference presentation" | Date | Yes |
| 5 | Short Description | **Website summary** | "1-2 sentences in plain language for a general audience. This is what visitors see on the research page cards. Avoid jargon." | Text | No |
| 6 | Abstract | **Full abstract** | "The academic abstract as published. This is shown when a visitor expands the paper details." | Long text | No |
| 7 | Paper Link | **Link to paper** | "URL to the full text — DOI link, arXiv, ACM DL, or PDF" | URL | No |
| 8 | Presentation Link | **Slides or poster** | "Link to presentation slides, poster PDF, or slide deck" | URL | No |
| 9 | Video Link | **Video recording** | "Link to a talk recording, demo video, or conference presentation" | URL | No |

**Design decisions:**
- Venue and Publish Date are marked required because they're critical for sorting and credibility on the website.
- Short Description is separate from Abstract because the website uses the plain-language summary on cards, with the academic abstract available on detail view.
- Authors multi-select limitation: new author names can't always be added through forms. The description explicitly guides users to ask an admin.

```
Database: 85af6f147e964ed7aa92687579a14b4f
Data Source: 84e77efd-02ef-4fa2-b181-f7381806f678
Type: form
Name: "Add a Research Paper"
Configure:
  SHOW "Title", "Authors", "Venue", "Publish Date", "Short Description", "Abstract", "Paper Link", "Presentation Link", "Video Link"
  FORM OPEN
  FORM ANONYMOUS false
  FORM PERMISSIONS reader
```

---

#### Form 4: "Share a Success Story"

> *Tell us about how PLUS made a difference! Whether it's a school, tutor, researcher, or foundation — every impact story matters.*
>
> *This is a two-step process:*
> *Step 1 — Fill out this form with the story's key details (title, summary, quote, etc.)*
> *Step 2 — After you submit, Notion will show a link to the newly created page. Open that page and write the full story directly in the page body — you can add headings, images, bullet points, and rich formatting there.*
>
> *You'll have editor access to the page, so take your time crafting the narrative!*

| # | Field (Notion Property) | Form Label | Description / Helper Text | Input Type | Required? |
|---|---|---|---|---|---|
| 1 | Title | **Story title** | "A compelling title for this success story (e.g., 'How Springfield Schools Improved Math Scores with PLUS')" | Title (text) | Yes |
| 2 | Category | **Who is this story about?** | "The primary audience or partner type" | Select: Schools / Tutors / Researchers / Foundations | Yes |
| 3 | Client / Partner | **Organization name** | "The school, organization, or partner featured in this story" | Text | Yes |
| 4 | Summary | **Quick summary** | "2-3 sentences capturing the key impact. This appears on the success stories listing page." | Long text | Yes |
| 5 | Quote | **Featured quote** | "A standout quote from the partner or stakeholder. This gets highlighted prominently on the page." | Text | No |
| 6 | Quote Attribution | **Who said it?** | "Name and title of the person quoted (e.g., 'Maria Rodriguez, Principal')" | Text | No |
| 7 | Author | **Written by** | "Your name, as the person writing this story" | Text | No |
| 8 | Cover Image | **Cover image** | "A photo representing the story — ideally showing people, the school, or the product in action. Landscape (16:9) preferred." | File upload | No |
| 9 | Published Date | **Date** | "When this story was published or when the impact occurred" | Date | No |

**Design decisions:**
- `FORM PERMISSIONS editor` — This is the **only form with editor permissions**. Reason: success stories have rich body content (headings, images, paragraphs, embedded media) that lives in the Notion page body, not in form fields. After submitting, Notion shows a confirmation with a **link to the created page** — the submitter clicks through and writes the full narrative in the page body using Notion's native editor (headings, images, toggles, embeds, etc.).
- The form intro copy explicitly walks users through this **two-step workflow** so they know the form is just step 1.
- **Post-submission UX (Notion built-in):** After form submission, Notion displays a "View submission" link. Because we set `FORM PERMISSIONS editor`, the submitter can click through and immediately start editing the page body. No additional sharing or invitation needed.
- Quote + Quote Attribution are a pair — if one is filled, the other should be too. The description hints at this.
- Client / Partner is required because every success story needs a named protagonist.

```
Database: 55c702c618dd4b5c8ceaeac797c02257
Data Source: 4e0c4f73-6bfb-4d13-a0cf-6fa7be0020cb
Type: form
Name: "Share a Success Story"
Configure:
  SHOW "Title", "Category", "Client / Partner", "Summary", "Quote", "Quote Attribution", "Author", "Cover Image", "Published Date"
  FORM OPEN
  FORM ANONYMOUS false
  FORM PERMISSIONS editor
```

### Phase 3: Sync Script Improvements

#### 3a. Add page body content fetching for success stories

The sync script currently tries to read `"Full Content"` as a property — this doesn't exist. Port the blocks API approach from `src/lib/notion/queries/success-stories.ts`:

```typescript
// In scripts/sync-notion.ts — add after querying database
async function fetchPageContent(pageId: string): Promise<string> {
  const blocks = await notion.blocks.children.list({ block_id: pageId })
  // Convert blocks to markdown (reuse or inline the blocksToMarkdown logic)
  return blocksToMarkdown(blocks.results)
}
```

#### 3b. Error isolation per database

Wrap each `sync*` call in try/catch so one failure doesn't block others:

```typescript
async function main() {
  const results = { team: false, news: false, research: false, stories: false }

  try { await syncTeam(); results.team = true } catch (e) { console.error("Team sync failed:", e) }
  try { await syncNews(); results.news = true } catch (e) { console.error("News sync failed:", e) }
  try { await syncResearch(); results.research = true } catch (e) { console.error("Research sync failed:", e) }
  try { await syncSuccessStories(); results.stories = true } catch (e) { console.error("Stories sync failed:", e) }

  const failed = Object.entries(results).filter(([, ok]) => !ok).map(([name]) => name)
  if (failed.length > 0) {
    console.error(`Partial sync failure: ${failed.join(", ")}`)
    process.exit(1)
  }
}
```

## Technical Considerations

### Notion File URL Expiration

Notion-hosted file URLs expire after ~1 hour. The sync script caches these URLs, but they'll be stale by the time users visit. Options:

- **Option A (recommended for free tier):** Rely on runtime ISR queries for fresh image URLs when `NOTION_API_KEY` is set. Cache serves as text-only fallback.
- **Option B:** Download images during sync to `public/uploads/` — adds repo bloat but works offline.
- **Option C:** Use a free image proxy/CDN that refreshes from Notion on demand.

**Decision:** Go with Option A for now. Images already work via ISR runtime queries. The cached JSON is a text-only fallback for builds without API keys.

### Content Moderation / Draft Status

Currently all database entries go live on the next sync. There's no "Draft" status to gate visibility.

**Recommendation for future phase:** Add a `Status` select property (Draft / Published) to each database and filter on `Status = "Published"` in both sync script and runtime queries. This prevents incomplete or test submissions from appearing on the website. **Not blocking for form creation** — forms can be created now and the status property added later.

### Research Authors Multi-Select Limitation

Notion forms allow selecting from existing multi-select options but have inconsistent behavior around creating new options from forms. For the research database with 60+ author names:

- Existing PLUS researchers can self-select
- New collaborators may need an admin to add their name to the database first
- **Mitigation:** Add a "Notes" or "Additional Authors" text field in the future if this becomes a friction point

## Acceptance Criteria

### Property Fixes
- [ ] News sync script reads `"Marketing Blurb / Headline"` instead of `"Marketing Blurb"`
- [ ] News sync script reads `"Priority / Featured?"` instead of `"Featured"`
- [ ] News runtime query reads `"Marketing Blurb / Headline"` instead of `"Marketing Blurb"`
- [ ] News runtime query reads `"Priority / Featured?"` instead of `"Featured"`
- [ ] News runtime query filter uses `"Priority / Featured?"` property name
- [ ] Success stories sync script removes `"Full Content"` property read, uses blocks API for content
- [ ] Success stories sync script reads `"Cover Image"` instead of `"Image"`
- [ ] Success stories sync script outputs `content` field (not `fullContent`)
- [ ] Success stories sync script includes `coverImage`, `author`, `clientPartner` fields
- [ ] Success stories runtime query uses only `"Cover Image"` (remove `props.Image` if present)

### Notion Database Schema Updates
- [ ] Team Member Affiliation: "Current Students" option replaced with "Independent Study Student" and "Student Intern"
- [ ] Team Member Database: new "Personal Website" URL property added
- [ ] Frontend team page groups both "Independent Study Student" and "Student Intern" under a combined "Student Intern" display group

### Form Views
- [ ] "Join the PLUS Team" form created on Team Member Database — includes Personal Website field
- [ ] "Submit a News Item" form created on News Database — "Priority / Featured?" hidden from submitters
- [ ] "Add a Research Paper" form created on Research Papers Database — all fields shown
- [ ] "Share a Success Story" form created on Success Stories Database — editor permissions for post-submit editing

### Sync Script
- [ ] Error isolation: one database failure does not block others
- [ ] Success stories sync fetches page body content via blocks API

### Prerequisites (User Actions)
- [ ] Share all 4 databases with the "BlueSky" integration in Notion (Connections menu)
- [ ] Verify sync script runs successfully after sharing: `npx tsx scripts/sync-notion.ts`

## Implementation Order

1. **User action first:** Share databases with BlueSky integration
2. **Fix property mismatches** in sync script + runtime queries (highest impact — unlocks broken data)
3. **Create form views** via Notion MCP (independent of code fixes)
4. **Improve sync script** — error isolation + success story blocks API
5. **Test end-to-end:** Submit via form → verify in database → run sync → check cache → verify on website

## Files to Modify

| File | Changes |
|---|---|
| `scripts/sync-notion.ts` | Fix News property names (lines ~101, 108); Fix Success Stories property names + add blocks API + add missing fields (lines ~150-165); Add error isolation in `main()` |
| `src/lib/notion/queries/news.ts` | Fix `"Marketing Blurb"` → `"Marketing Blurb / Headline"`; Fix `"Featured"` → `"Priority / Featured?"` in both parse and filter |
| `src/lib/notion/queries/success-stories.ts` | Fix `props.Image` → `props["Cover Image"]` if still present |
| `src/lib/notion/types.ts` | Verify `SuccessStory` type matches updated field names; remove `image` if only `coverImage` exists; add `personalWebsite` to `TeamMember` type |
| `src/lib/notion/queries/team.ts` | Parse new `"Personal Website"` property; map "Independent Study Student" + "Student Intern" affiliations |
| Team page component | Group "Independent Study Student" and "Student Intern" under combined "Student Intern" display label |

## Sources

- Notion database schemas fetched live via Notion MCP on 2026-04-02
- Existing solution doc: `docs/solutions/integration-issues/notion-cms-header-footer-redesign.md`
- Sync script: `scripts/sync-notion.ts`
- Runtime queries: `src/lib/notion/queries/*.ts`
- TypeScript types: `src/lib/notion/types.ts`
