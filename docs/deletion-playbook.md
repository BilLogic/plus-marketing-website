# Deletion & Deprecation Playbook (CRUD Completeness)

This repo treats **components, templates, pages, and docs as persistent entities** that agents and humans both operate on.  
This playbook defines how to **Create, Read, Update, and Delete/Deprecate** them safely.

## 1. UI Primitives (`src/components/ui/*`)

- **Create**
  - Prefer `npx shadcn@latest add <component>` when possible.
  - Add or update a Storybook story under `components-marketing/*` or `components-misc/*` that exercises the component.
- **Read**
  - Source: `src/components/ui/*` + corresponding stories.
- **Update**
  - Use `npx shadcn@latest add <component> --dry-run/--diff` for upstream syncs.
  - Keep behavior and API consistent with existing stories.
- **Delete / Deprecate**
  - Prefer **deprecation** over hard delete:
    - Mark the story description as “Deprecated” and point to the replacement.
    - Stop using the component in new code.
  - Hard delete only when:
    - The component is unused (search the repo with Grep) **and**
    - Stories have been removed or updated to reflect its absence.

## 2. Effect Components (`src/components/effects/*`)

- **Create**
  - Add a new effect component under `src/components/effects/*`.
  - Add a Storybook story under `Effects/*` and update `Effects/Overview` if needed.
- **Read**
  - Source: effect component file + its Storybook story.
- **Update**
  - Keep props compatible or provide a migration note in the story description.
- **Delete / Deprecate**
  - If replacing an effect:
    - Mark the old effect’s story as “Deprecated” and link to the new effect.
  - Only remove the file and story when:
    - No templates or components still import it.

## 3. Registry Marketing Blocks (`src/components/registry/*`)

- **Create**
  - Start from an existing Bundui/Tailark/Cult example (registry‑first).
  - Add or update a Template story (e.g. `Templates/*`) that showcases the block.
  - Update `docs/registry-coverage.md` to reflect coverage.
- **Read**
  - Source: registry component file + its template story + `registry-coverage`.
- **Update**
  - Preserve public props; if breaking, document the change in the story and, if needed, in `registry-coverage`.
- **Delete / Deprecate**
  - If retiring a block:
    - Mark it as deprecated in `registry-coverage.md` and in the story description.
    - Update any templates using it to the new block.
  - Only delete the block + stories once no templates reference it.

## 4. Marketing Templates (`src/stories/templates/*`)

- **Create**
  - Add a new template story under `Templates/*` wired to existing components/blocks.
- **Read**
  - Source: the story file itself.
- **Update**
  - Maintain stable story IDs and basic structure so referential links stay valid.
- **Delete / Deprecate**
  - If you retire a template:
    - Mark the story as deprecated and, if necessary, add a short note in `registry-coverage.md`.
  - Remove the story only when:
    - No docs or other stories refer to it as an example.

## 5. Next.js Pages (`src/app/*`)

- **Create**
  - Add new routes using the App Router conventions (`page.tsx`, `layout.tsx`).
  - Reuse existing components/blocks wherever possible.
- **Read**
  - Source: route files under `src/app/*`.
- **Update**
  - Prefer composition changes (which components you render) over ad‑hoc styles.
- **Delete / Deprecate**
  - If removing a route:
    - Provide an appropriate redirect if the URL was user‑facing.
    - Remove or update any links, nav items, or docs pointing to the route.

## 6. Docs (`docs/*`, `README.md`)

- **Create**
  - Add new docs under `docs/*` and link them from existing index docs where appropriate.
- **Read**
  - Source: markdown files in `docs/*` and `README.md`.
- **Update**
  - Keep examples and pointers in sync with Storybook and components.
- **Delete / Deprecate**
  - Prefer adding a short “Deprecated” or “Superseded by …” note at the top.
  - Only delete when:
    - The content is clearly obsolete and no longer referenced from other docs or AGENT handoff flows.

## 7. Agent Rules & Skills (`.agent/**`, `.agents/**`, `.claude/**`, `.windsurf/**`, `.kiro/**`)

- **Create**
  - Introduce new rules/skills only when a pattern is stable and reused.
  - Keep them small and focused; avoid monoliths.
- **Read**
  - Source: files in the directories above.
- **Update**
  - Treat rules/skills as **versioned contracts**; update deliberately and keep behavior changes documented.
- **Delete / Deprecate**
  - Prefer:
    - Marking rules/skills as deprecated in their headers.
    - Removing references from AGENT handoff docs and READMEs.
  - Physical deletion should be rare and usually paired with a commit message explaining the removal.

