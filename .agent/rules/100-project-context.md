# Project Context

## Mission
We are building the **Plus Marketing Website**. This is a highly polished, aesthetic marketing site designed to convert users. It must look premium, utilize rich aesthetics (glassmorphism, modern typography, sophisticated animations), and be fully responsive.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Components**: Shadcn UI, Radix UI primitives
- **Content**: MDX

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
