# Project Context

## Mission
We are building the **Plus Marketing Website**. This is a highly polished, aesthetic marketing site designed to convert users. It must look premium, utilize rich aesthetics (glassmorphism, modern typography, sophisticated animations), and be fully responsive.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Components**: Shadcn UI, Radix UI primitives
- **Content**: MDX

### Theme & tokens
- **Fonts**: `DM Sans` (primary sans) via `--font-sans`, `Geist Mono` for code.
- **Colors**: OKLCH semantic tokens (background, primary, muted, etc.) defined in `src/app/globals.css`.
- **Customization strategy**:
  1. Prefer theme-level changes first (fonts, color tokens, radii) instead of per-component overrides.
  2. Only introduce component-level variants when theme knobs are insufficient.

## Compound Engineering

We follow the **Compound Engineering** philosophy (see the official plugin at `EveryInc/compound-engineering-plugin` and the local skill in `.agent/skills/compound-engineering/SKILL.md`):

- Each unit of engineering work should make subsequent units easier — not harder.
- 80% of the effort is in **planning and review**, 20% is in **execution**.

In practice, for this repo that means:

- **Reuse-first**
  - Always search Storybook and existing components before inventing new patterns:
    - `src/components/ui/**` for shadcn primitives.
    - `src/components/registry/{bundui,tailark,cult}/**` for marketing blocks and templates.
    - `src/components/effects/**` for text, motion, animation, and background effects.
  - Prefer extending comparison stories (Button, Card, Tabs, NavigationMenu, Sheet, etc.) rather than adding disconnected variants.
- **Registry-first**
  - When composing marketing sections, start from registry-inspired implementations (Bundui, Tailark, Cult UI) and adapt them to Plus tokens and content.
  - Keep `docs/registry-coverage.md` as the single source of truth for which registry patterns are implemented and where.
- **Doc-first**
  - Any non-trivial change should:
    - Update or add a Storybook story under the correct group (`Styles`, `Layout`, `Effects`, `components-marketing`, `components-misc`, `Templates`).
    - Keep `docs/registry-coverage.md` and `docs/AGENT_HANDOFF.md` in sync as needed.
  - A PR that only changes code (no stories, no docs) is usually a smell.

The global `/ce:*` commands (if the plugin is installed) should be interpreted through this lens: brainstorm using Storybook and coverage docs, plan around reuse, work by updating code + stories + docs together, review via lint + Storybook, and compound by documenting new patterns for the next engineer.

## Folder Structure
- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Reusable React components (UI library and marketing sections).
- `src/lib/`: Utility functions and shared logic.
- `docs/`: Project documentation and infrastructure plans.
- `.agent/rules/`: AI Coder context rules (you are reading one now).
- `.agent/skills/`: AI Coder skills and execution templates.

## Unbreakable Rules
1. **Never use standard generic styles.** Always refer to the design tokens and utilize premium UI patterns.
2. **Component First.** Do not write massive pages. Break down UI into smaller, reusable components in `src/components/`.
3. **Accessibility.** All interactive elements must be keyboard accessible and have proper ARIA labels.
4. **Vibe Code Awareness.** Whenever you are asked to generate UI or write tests, proactively check `.agent/rules/102-agent-capabilities.md` to utilize the correct MCP server or agent skill.
5. **Registry-first prototyping.** When designing new sections or pages, search and install existing blocks from configured registries (shadcn/ui, Tailark, Cult UI, Bundui source repo) before building bespoke layouts.
