---
title: "Notion CMS Property Sync Fixes + Form Views + Netlify Deploy"
category: integration-issues
date: 2026-04-02
tags:
  - notion-cms
  - property-mapping
  - form-views
  - playwright-automation
  - netlify-deployment
  - sync-script
  - database-schema
severity: high
components:
  - scripts/sync-notion.ts
  - src/lib/notion/queries/news.ts
  - src/lib/notion/queries/research.ts
  - src/lib/notion/queries/success-stories.ts
  - src/lib/notion/queries/team.ts
  - src/lib/notion/types.ts
  - src/app/(marketing)/about/team/team-page-client.tsx
  - netlify.toml
related_issues: []
---

# Notion CMS Property Sync Fixes + Form Views + Netlify Deploy

## Problem

The PLUS marketing website's Notion CMS had three critical issues:
1. **Silent data loss** — sync script and runtime queries referenced wrong Notion property names, causing 5+ fields to silently return `null` (marketing blurbs, featured flags, success story images/content)
2. **No submission workflow** — team members had no form-based way to contribute content to the CMS databases
3. **Wrong deployment** — Netlify was deploying Storybook instead of the Next.js marketing site

## Root Cause

### Property Name Drift
The sync script (`scripts/sync-notion.ts`) and runtime queries (`src/lib/notion/queries/*.ts`) were separate implementations that drifted from the actual Notion database schemas. Property names were hardcoded in multiple places and nobody noticed when they didn't match.

| Database | Code Referenced | Actual Notion Property |
|---|---|---|
| News | `"Marketing Blurb"` | `"Marketing Blurb / Headline"` (later renamed to `"One-Line Teaser"`) |
| News | `"Featured"` | `"Priority / Featured?"` |
| News | `"Publication Date"` | Later renamed to `"Date Published"` |
| Success Stories | `"Full Content"` | Property doesn't exist — content lives in page body (blocks API) |
| Success Stories | `"Image"` | `"Cover Image"` |
| Success Stories | output field `fullContent` | TypeScript type expects `content` |

### Notion API Form Limitations
The Notion API cannot create form views programmatically — `notion-create-view` with `type: "form"` returns "Form block pointer is undefined". Form question order, labels, descriptions, and required status can only be set through the Notion UI.

### Netlify Config
`netlify.toml` was configured with `command = "npm run build-storybook"` and `publish = "storybook-static"`, explicitly skipping Next.js with `NETLIFY_NEXT_PLUGIN_SKIP = "true"`.

## Solution

### 1. Fixed Property Names (sync script + runtime queries)

Updated all property references in 5 files to match actual Notion schemas. Also renamed Notion DB columns to human-friendly names via MCP:

**Renames applied:**
- Team: Title 1 → Primary Role, Title 2 → Secondary Title, Bio → Short Bio, Picture → Profile Photo, Joined Date → Date Joined PLUS
- News: Marketing Blurb / Headline → One-Line Teaser, External Link → Link to Article or Source, Featured Image → Cover Image, Publication Date → Date Published
- Research: Venue → Conference or Journal, Publish Date → Date Published, Short Description → Website Summary, Paper/Presentation/Video Link → Link to Paper/Slides or Poster/Video
- Success Stories: Client / Partner → Organization Name, Quote Attribution → Who Said It?, Author → Written By, Published Date → Date Published

### 2. Form Views via Playwright Browser Automation

Since the Notion API can't configure form views, used Playwright to automate the Notion form editor UI:

**Key discovery: `keyboard.insertText()` vs `keyboard.type()`**
```typescript
// BROKEN: keyboard.type() does NOT persist in Notion's contentEditable fields
await page.keyboard.type("Description text"); // Appears then vanishes

// WORKS: keyboard.insertText() persists correctly
await page.keyboard.insertText("Description text"); // Persists!
```

**Automation pattern for form field configuration:**
```typescript
async function configureFormField(fieldName, descText) {
  // 1. Scroll to field
  await page.evaluate((n) => {
    const el = [...document.querySelectorAll('.form-question-title [role="textbox"]')]
      .find(e => e.textContent?.trim() === n);
    if (el) el.scrollIntoView({ block: 'center' });
  }, fieldName);
  
  // 2. Find description textbox (2nd textbox in question block)
  // Structure: .form-question-title > [role="textbox"] (title)
  //            + [placeholder="Add description"] (description)
  //            + input[placeholder="Respondent's answer"] (input)
  
  // 3. Clear existing content first (prevents accumulation from retries)
  await page.mouse.click(descRect.x + 10, descRect.y + 10);
  await page.keyboard.press('Meta+a');
  await page.keyboard.press('Backspace');
  
  // 4. Insert fresh text
  await page.keyboard.insertText(descText);
}
```

**Reordering fields via Edit question menu:**
```typescript
async function moveFieldUp(fieldName, positions) {
  for (let i = 0; i < positions; i++) {
    // Hover right edge → click "Edit question" button
    // Click "Move question" → "Move up"
    await page.evaluate((fy) => {
      const btn = [...document.querySelectorAll('[aria-label="Edit question"]')]
        .find(el => Math.abs(el.getBoundingClientRect().y - fy) < 40);
      if (btn) btn.click();
    }, fieldRect.y);
    // ... click "Move question" then "Move up"
  }
}
```

**Hiding editorial fields (e.g., "Priority / Featured?" on News form):**
```typescript
// Edit question menu → "Delete question" removes from form only (not the DB property)
await page.evaluate(() => {
  const item = [...document.querySelectorAll('[role="menuitem"]')]
    .find(e => e.textContent?.includes('Delete question'));
  if (item) item.click();
});
```

### 3. TypeScript Type Updates

```typescript
// TeamMember: updated affiliation union, added personalWebsite
export type TeamMember = {
  affiliation: "Leadership" | "PLUS Staff" | "Independent Study Student" | "Student Intern" | "Past Collaborators"
  personalWebsite: string | null
  // ...
}

// SuccessStory: removed duplicate image field
export type SuccessStory = {
  coverImage: string | null  // was: image + coverImage (duplicate)
  // ...
}
```

### 4. Sync Script Improvements

- Added blocks API content fetching for success stories (page body → markdown)
- Error isolation: each database syncs independently with try/catch
- Added `personalWebsite` field to team sync

### 5. Netlify Deployment Fix

```toml
# Before (Storybook)
[build]
  command = "npm run build-storybook"
  publish = "storybook-static"
[build.environment]
  NETLIFY_NEXT_PLUGIN_SKIP = "true"

# After (Next.js)
[build]
  command = "npm run build"
  publish = ".next"
[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 6. Frontend Grouping Update

Both "Independent Study Student" and "Student Intern" affiliations display under a combined "Students" heading on the team page:

```typescript
const AFFILIATION_DISPLAY_LABELS: Partial<Record<TeamMember["affiliation"], string>> = {
  "Independent Study Student": "Students",
  "Student Intern": "Students",
}
```

## Key Technical Decisions

| Decision | Rationale |
|---|---|
| Rename DB columns rather than just fix code references | Human-friendly names improve both form labels and database table readability |
| Playwright for form config, not manual instructions | Automatable and reproducible; discovered the `insertText` pattern for future use |
| `keyboard.insertText()` over `keyboard.type()` | Only method that persists in Notion's virtual DOM contentEditable fields |
| Clear-then-insert pattern for descriptions | Prevents text accumulation from retry attempts |
| Error isolation in sync script | One database failure shouldn't block the other three |
| `FORM PERMISSIONS editor` for Success Stories only | Submitters need to edit the page body after form submission for rich content |

## Prevention / Best Practices

1. **Single source of truth for property names.** Consider extracting a `schema.ts` that maps Notion property names to TypeScript fields, consumed by both sync script and runtime queries. This prevents drift between the two implementations.

2. **Notion API cannot create or fully configure form views.** Don't attempt `notion-create-view` with `type: "form"` — it will fail. Form views must be created through the Notion UI, then can be partially updated via `notion-update-view` (name, SHOW fields, FORM OPEN/CLOSE).

3. **Use `keyboard.insertText()` for Notion UI automation.** `keyboard.type()` does not persist in Notion's contentEditable fields. Always clear with `Meta+a → Backspace` before inserting to prevent accumulation.

4. **The form editor "Edit question" menu** (accessed via hover → `[aria-label="Edit question"]` button) provides: Description toggle, Required toggle, Move question, Delete question, Sync with property name.

5. **When renaming Notion DB columns, update ALL references:** sync script, runtime queries, TypeScript types, sort/filter property strings in database.query() calls, and any form question labels (which are independent of property names).

## Files Changed

- `scripts/sync-notion.ts` — All property name fixes, blocks API, error isolation, personalWebsite
- `src/lib/notion/queries/news.ts` — Property renames + filter fix
- `src/lib/notion/queries/research.ts` — Property renames
- `src/lib/notion/queries/success-stories.ts` — Removed `props.Image`, fixed property names
- `src/lib/notion/queries/team.ts` — personalWebsite, affiliation sort order
- `src/lib/notion/types.ts` — New affiliations, personalWebsite, removed duplicate image
- `src/app/(marketing)/about/team/team-page-client.tsx` — New affiliations, "Students" grouping
- `src/app/(marketing)/success-stories/[id]/page.tsx` — `story.image` → `story.coverImage`
- `src/app/(marketing)/success-stories/success-stories-client.tsx` — Same image fix
- `netlify.toml` — Storybook → Next.js deployment
- `docs/plans/2026-04-02-001-feat-notion-cms-forms-and-sync-fixes-plan.md` — Implementation plan
