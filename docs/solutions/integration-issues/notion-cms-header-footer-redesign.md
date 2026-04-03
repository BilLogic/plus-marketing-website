---
title: "Notion CMS Integration with Mega Menu Header and Footer Redesign"
category: integration-issues
date: 2026-03-31
tags:
  - notion-cms
  - navigation
  - footer
  - header
  - mega-menu
  - shadcn-ui
  - next-js
  - route-groups
  - isr
  - research-filtering
  - base-ui
severity: enhancement
components:
  - header
  - footer
  - cms
  - research-page
  - team-page
  - news-page
  - success-stories
related_issues: []
---

# Notion CMS Integration + Marketing Site Header/Footer Redesign

## Problem

The PLUS marketing website had no CMS — all content (team bios, news, research papers, success stories) was hardcoded. The header was a flat link bar with no dropdowns, and the footer lacked structure. Non-technical team members had no way to update content without code changes.

## Root Cause

No content management layer existed. The site was built as static marketing pages with content embedded directly in React components.

## Solution

### 1. Notion CMS Data Layer

**Stack:** `@notionhq/client` v2 (pinned — v5 moved `databases.query` to `dataSources.query`)

**Architecture:** `src/lib/notion/` module:
- `client.ts` — Singleton Notion SDK client
- `types.ts` — TypeScript interfaces: `TeamMember`, `NewsItem`, `ResearchPaper`, `SuccessStory`
- `utils/parse-properties.ts` — Extract typed values from Notion's polymorphic property objects
- `utils/blocks-to-markdown.ts` — Convert Notion block objects to markdown for page body content
- `utils/cache.ts` — Read/write `src/data/cache/*.json` fallback files

**Data fetching — Hybrid ISR + git-cached JSON fallback:**
```
When NOTION_API_KEY present → query Notion API, write fresh cache
When absent → read from src/data/cache/*.json (committed to git)
```
This enables builds without secrets (CI, preview deploys, local dev).

**4 Notion databases:** Team Members (25), News (4), Research Papers (40, migrated from Airtable), Success Stories (1 case study).

**Success stories:** Full content lives in Notion page body (not a property), fetched via blocks API, converted to markdown, rendered with a custom `MarkdownRenderer`.

### 2. Header — Notion-style Mega Menu

**Components:** `nav-config.ts`, `desktop-nav.tsx`, `mobile-nav.tsx`, `announcement-bar.tsx`, `plus-header.tsx`

**Desktop:** Base-ui `NavigationMenu` with animated positioner. 4 dropdown pillars: About, Solutions, Resources, Get Involved.

**Mobile:** `Sheet` (side="right") + `Collapsible` accordion.

**Key fixes discovered:**

```tsx
// base-ui Button with non-button render element needs nativeButton={false}
<Button nativeButton={false} render={<Link href="/demo" />}>
  Try PLUS Demo
</Button>

// Avoid nested <li> — use Fragment instead of <li className="contents">
{sections.map((section, i) => (
  <Fragment key={i}>
    {section.items.map((item) => (
      <li key={item.href}>{/* ... */}</li>
    ))}
  </Fragment>
))}
```

### 3. Footer Redesign

**Components:** `footer-newsletter.tsx` (Figma-style underline input), `footer-link-columns.tsx` (4-column grid), `footer-bottom-bar.tsx` (legal only).

Social links under logo. Newsletter as full-width section. Link data sourced from shared `nav-config.ts` `FOOTER_LINKS` for header/footer consistency.

### 4. Route Group Layout

`src/app/(marketing)/layout.tsx` wraps all marketing pages with shared `PlusHeader` + `PlusFooter`. The `/assistant` route lives outside the group.

### 5. CMS Pages with Rich Filtering

- **`/about/team`** — Search, filter by affiliation/role, URL state sync
- **`/about/news`** — News grid with category badges
- **`/research`** — Dual Table/Cards view, Popover-based author/venue filters, shadcn Select for sort
- **`/success-stories`** — Category tabs with detail pages rendering Notion markdown

### 6. Infrastructure

- **GitHub Actions:** `sync-notion.yml` — daily cron syncs Notion → git cache → optional Netlify rebuild
- **Migration:** `scripts/migrate-airtable-to-notion.ts` for one-time research paper import
- **Brand assets:** 6 logo SVG variants in `public/brand/` (gradient/solid/outline × icon/wordmark)

## Key Technical Decisions

| Decision | Rationale |
|---|---|
| Notion SDK v2 not v5 | v5 moved `databases.query` to `dataSources.query`, incompatible API |
| Suspense boundaries on filter pages | `useSearchParams` in statically rendered pages requires `<Suspense>` wrapper |
| base-ui `render` prop + `nativeButton={false}` | base-ui uses `render` (not Radix's `asChild`); non-button elements need `nativeButton={false}` |
| Hybrid ISR + git-cached JSON | Builds work without API key; content stays fresh when key is available |
| Shared `nav-config.ts` | Single source of truth for nav structure consumed by header mega menu, mobile nav, and footer |
| Success story content as page body | Rich editing in Notion (headings, images, lists) vs. cramming into a text property |

## Prevention / Best Practices

1. **Always check base-ui component API before using Radix patterns.** The `asChild` pattern doesn't exist in base-ui — use `render` prop instead, with `nativeButton={false}` for non-button elements.

2. **Wrap `useSearchParams()` in `<Suspense>` for any page that can be statically generated.** Next.js App Router requires this or the build fails.

3. **When using Notion SDK, pin to v2** until the codebase is ready to migrate to v5's `dataSources.query` API.

4. **Keep nav structure in a single config file** (`nav-config.ts`) consumed by all navigation components to prevent drift between header and footer links.

5. **For CMS content with rich formatting, use Notion page body** (fetched via blocks API) rather than rich_text properties (limited to 2000 chars, no images/embeds).

## Files Changed

### New directories
- `src/lib/notion/` — CMS data layer (client, types, queries, utils)
- `src/components/marketing/header/` — Mega menu navigation
- `src/components/marketing/footer/` — Redesigned footer
- `src/app/(marketing)/` — Route group with shared layout
- `src/data/cache/` — Git-tracked CMS cache files
- `public/brand/` — Logo SVG variants
- `scripts/` — Notion sync and migration scripts
- `.github/workflows/` — Automated sync workflow

### Key files
- `src/app/(marketing)/layout.tsx` — Shared header/footer layout
- `src/components/marketing/header/nav-config.ts` — Navigation structure (single source of truth)
- `src/app/(marketing)/research/research-page-client.tsx` — Research page with table view + filters
- `src/lib/notion/utils/blocks-to-markdown.ts` — Notion blocks → markdown converter
- `next.config.ts` — Added Notion/AWS image domains
