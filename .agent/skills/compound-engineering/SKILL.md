---
name: Compound Engineering (Plus Marketing Website)
description: Project-local guidelines for applying the Every compound-engineering plugin and workflows to this Storybook + registry codebase so each unit of work makes the next one easier.
---

# Compound Engineering – Plus Marketing Website

This skill adapts the official **Compound Engineering Plugin** ([EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)) to this specific repo.

Use it together with the global `/ce:*` commands (when the plugin is installed) to make every change:

- **Reuse-first**: build on top of existing components, stories, and docs.
- **Registry-first**: favor Bundui / Tailark / Cult UI / shadcn patterns over bespoke layouts.
- **Doc-first**: update docs and Storybook alongside code, not as an afterthought.

> Each unit of engineering work should make subsequent units easier — not harder.

---

## 1. Local workflow mapping to `/ce:*`

If the `compound-engineering` plugin is installed in your editor, you can run:

- `/ce:brainstorm` – explore requirements and approaches before committing.
- `/ce:plan` – turn feature ideas into a concrete implementation plan.
- `/ce:work` – execute plans with worktrees and task tracking.
- `/ce:review` – multi-agent code review before merging.
- `/ce:compound` – document learnings to make future work easier.

In this repo, treat those stages as **checkpoints** over the concrete steps below.

### Brainstorm → Understand what already exists

- Open Storybook:
  - `Welcome` – high-level map of sections (Styles, Layout, Effects, components-marketing, components-misc, Templates).
  - `Effects/Overview` – catalog of all effect components and when to use them.
  - Relevant component stories, especially comparison stories for overlapping primitives:
    - `components-marketing/Button`
    - `components-marketing/Accordion`
    - `components-marketing/Tabs`
    - `components-marketing/Card` / `CardPlus`
    - `components-marketing/NavigationMenu`
    - `components-marketing/Sheet`
- Check registry coverage:
  - Read `docs/registry-coverage.md` to see what is already implemented and how it is grouped.
- Scan code:
  - `src/components/ui/**` – shadcn primitives.
  - `src/components/registry/{bundui,tailark,cult}/**` – registry blocks and surfaces.
  - `src/components/effects/**` – text, motion, animation, and background effects.

**Goal:** find a near match before inventing a new pattern.

### Plan → Design the smallest diff that compounds

When planning (manually or via `/ce:plan`), always capture:

- **Reused pieces**
  - Which existing components/effects/templates will be reused or extended?
  - Which registry sources (shadcn, Bundui, Tailark, Cult UI) are being leaned on?
- **Storybook changes**
  - Which stories need to be created or extended?
  - Which comparison stories should surface the new variant?
- **Documentation changes**
  - Does `docs/registry-coverage.md` need to be updated?
  - Do `docs/AGENT_HANDOFF.md` or other docs need new notes or examples?

If a plan does not mention Storybook and docs, it is not yet a compound plan.

### Work → Implement code + stories + docs together

Execution in this repo should almost always touch **all three**:

1. **Code** in `src/components/**`
   - Prefer extending:
     - `src/components/ui/**` for shadcn primitives.
     - `src/components/registry/{bundui,tailark,cult}/**` for blocks/templates.
     - `src/components/effects/**` for motion/backgrounds/text effects.
2. **Stories** in `src/stories/**`
   - Add or extend:
     - `components-marketing/*` for marketing primitives.
     - `components-misc/*` for utilities (DataTable, DatePicker, Sidebar, etc.).
     - `Templates/*` for full sections/pages.
     - `Effects/*` for any new effect.
   - For overlapping primitives, extend the **comparison** story instead of adding a standalone one.
3. **Docs** in `docs/**` and `.agent/**`
   - Keep:
     - `docs/registry-coverage.md`
     - `docs/AGENT_HANDOFF.md`
     - any Storybook navigation / effects docs
   - in sync with implementation.

> A change that only adds code (no stories, no docs) is almost never acceptable here.

### Review → Verify quality and reuse hooks

Before calling `/ce:review` complete:

- Run `npm run lint` and fix new errors.
- Open relevant Storybook stories and verify:
  - New variants appear under the correct group and comparison tab.
  - Effects behave as expected and respect design tokens.
  - A11y looks sane (focus states, keyboard navigation, labels).
- Confirm registry coverage and docs:
  - `docs/registry-coverage.md` reflects any new components/effects/templates.
  - Any non-trivial pattern is linked from documentation or this skill for reuse.

### Compound → Capture patterns for the next engineer

Compounding is explicit in this repo:

- When you add a reusable pattern:
  - Link it from the relevant Storybook docs (e.g. Effects stories or Templates).
  - Ensure `docs/registry-coverage.md` mentions where to find it.
  - If it represents a new workflow (e.g. how to wire Tailark heroes), add a short note or checklist to an appropriate doc or to this SKILL.

Examples:

- Implemented a new Bundui-inspired hero?
  - Add it under `Templates/Hero` and document it in `docs/registry-coverage.md`.
- Created a new text/motion effect?
  - Add it in `src/components/effects/**` with a Storybook entry under `Effects/*` and a note in the effects reference doc.

---

## 2. Quick recipes

### Recipe: Add a new registry block

1. **Identify source pattern**
   - From Bundui / Tailark / Cult UI docs and from existing code under `src/components/registry/**`.
2. **Implement reusable section**
   - Place it in the appropriate registry folder, e.g. `src/components/registry/bundui/*`.
   - Keep layout and styling token-driven (no arbitrary hex colors).
3. **Expose via Storybook**
   - Add a `Templates/*` story (or extend an existing one) that renders the new block.
   - If the block overlaps with existing patterns (e.g. hero, pricing), extend the comparison story rather than creating a new category.
4. **Update docs**
   - Flip the corresponding entry in `docs/registry-coverage.md` to ✅ and mention the Storybook path.
   - If this introduces a new pattern category, consider adding a short note to any Storybook navigation or effects doc.

### Recipe: Add a new effect

1. Implement it under `src/components/effects/*`, following existing patterns.
2. Add a live preview and usage notes to the appropriate `Effects/*` story.
3. Document import path + props in an effects reference doc.

---

## 3. When to use the global plugin vs. this SKILL

- Use the **global plugin** (`/ce:*` commands) to orchestrate multi-step, multi-agent work across tools.
- Use **this SKILL** as the **project-specific overlay**:
  - It tells you where to look (Storybook, registry coverage, effects library).
  - It encodes expectations about always updating stories and docs.

