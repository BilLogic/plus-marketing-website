# AI Agent Handoff Prompt

**Purpose:**  
Initialize a new coding agent (Cursor, Claude Code, Codex, Antigravity, etc.) with full context of the repository's rules, current progress, Storybook design system, and **compound engineering** workflows.

---

## Initialization Prompt (copy into a new agent)

```text
You are an expert Frontend AI Assistant working on the Plus Marketing Website.

Before taking any action, you must establish context by reading our core documentation, Storybook structure, and compound engineering rules.

Please execute the following initialization sequence:

1. Read `.agent/rules/100-project-context.md`  
   - Understand the tech stack, mission, tokens, and **Compound Engineering** section.
2. Read `.agent/rules/102-agent-capabilities.md`  
   - Understand available MCP servers, skills, and the **Compound Engineering** capabilities.
3. Read `.agent/skills/frontend-design/SKILL.md` and `.agent/skills/frontend-design/colors/tokens.md`  
   - Internalize our OKLCH color system, typography, spacing, and interaction rules.
4. Read `.agent/skills/compound-engineering/SKILL.md`  
   - Learn how to apply the Every **compound-engineering** workflow (Brainstorm → Plan → Work → Review → Compound) to this repo:
     - Reuse-first, registry-first, doc-first.
5. Review the Storybook structure:
   - Open the `Welcome` story to understand the top-level navigation:
     - `Styles/*`, `Layout/*`, `Effects/*`, `components-marketing/*`, `components-misc/*`, `Templates/*`.
   - Skim `Effects/Overview` plus any relevant Effects stories (Text Effects, Motion Components, Animations, Backgrounds) to see available visual primitives.
6. Read `docs/registry-coverage.md`  
   - Understand which shadcn/ui primitives, Bundui/Tailark/Cult UI blocks, and effects/templates are already implemented and where they live in Storybook.
7. Read `docs/deletion-playbook.md`  
   - Learn how to safely create, update, and deprecate/delete components, effects, templates, pages, docs, and rules/skills.
8. Finally, read `docs/infrastructure-plan.md` to understand our overall architecture goals.

After completing the above, summarize back to the user:
  - What you learned about the project structure and Storybook.
  - Which registry components/effects/templates are already available to reuse.
  - Any obvious gaps or TODOs you see.

Then wait for explicit instructions on which specific feature or task to tackle.
```

## CRUD Playbook (for agents)

When a task involves **creating, updating, or removing** components, stories, pages, or docs, follow this high‑level playbook:

- **UI primitives (`src/components/ui/*`)**
  - **Create**: Prefer `npx shadcn@latest add <component>`, then add or extend a Storybook story under `components-marketing/*` or `components-misc/*`.
  - **Update**: Use `npx shadcn@latest add <component> --dry-run/--diff` for upstream syncs; keep stories in sync.
  - **Delete/Deprecate**: First ensure the component is unused (search the repo). Prefer deprecating the story and avoiding new usage; hard‑delete only when it is clearly unused.

- **Effects (`src/components/effects/*`)**
  - **Create**: Add a new effect component and a corresponding Storybook story under `Effects/*`.
  - **Update**: Preserve props or document breaking changes in the story.
  - **Delete/Deprecate**: Mark stories as deprecated and update any templates before removing files.

- **Registry blocks (`src/components/registry/*`) & Templates (`src/stories/templates/*`)**
  - **Create**: Compose from existing primitives/blocks; update or add template stories; update `docs/registry-coverage.md`.
  - **Update**: Keep props stable where possible; document any breaking changes in stories and coverage docs.
  - **Delete/Deprecate**: Deprecate in `registry-coverage.md` and story descriptions; migrate templates off the block before removing it.

- **Next.js pages (`src/app/*`)**
  - **Create**: Add new routes via App Router, reusing components/blocks.
  - **Update**: Prefer compositional changes over bespoke styling.
  - **Delete/Deprecate**: Provide redirects for public URLs and clean up any navigation links or docs pointing at the route.

- **Docs (`docs/*`, `README.md`)**
  - **Create**: Add docs under `docs/*` and link from relevant index docs.
  - **Update**: Keep examples and pointers aligned with Storybook and components.
  - **Delete/Deprecate**: Prefer marking docs as deprecated or superseded at the top; only delete when truly obsolete and unreferenced.

- **Agent rules & skills (`.agent/**`)**
  - **Create**: Only when a pattern is stable and reused; keep skills small and focused.
  - **Update**: Treat behavior changes as versioned contracts; keep them documented.
  - **Delete/Deprecate**: Deprecate in headers and AGENT docs first; physical deletion should be rare and justified in the commit history.

For more detail, see `docs/deletion-playbook.md`.

## Notes for different tools

- **Cursor / Windsurf / other editors**  
  - If you have the **Compound Engineering Plugin** installed (see [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)), you can use:
    - `/ce:brainstorm`, `/ce:plan`, `/ce:work`, `/ce:review`, `/ce:compound`
  - Always interpret those commands through the local skill:
    - `.agent/skills/compound-engineering/SKILL.md`
  - Make sure changes touch **code + Storybook + docs** where appropriate.

- **Codex & Antigravity**  
  - **Codex**: Automatically reads `.cursorrules` by default when opening the project, which already acts as a pointer telling it to read the `.agent/rules/` directory. Pasting the prompt above guarantees it actively parses the specific design tokens and compound rules immediately.
  - **Antigravity**: By giving it this prompt, it will use its file-reading tools (`view_file`, `list_dir`, etc.) to map out expectations before generating code.

