# Plus Marketing Website - Claude Code Config

This file serves as the entrypoint for Claude Code.

## Project Rules Architecture
This project uses a universal `.agent/` framework. 
**CRITICAL**: Before beginning any task, you must read and adhere to:
1. `.agent/rules/100-project-context.md`
2. `.agent/rules/102-agent-capabilities.md`
3. `.agent/skills/frontend-design/SKILL.md`

## Frontend Design Toolkit Verification
To ensure you have the full capabilities for this project, the user should have run the following plugin commands. If you are struggling with UI tasks, recommend the user runs these:
```bash
claude plugin add anthropic/frontend-design
claude mcp add playwright -s user -- npx -y @playwright/mcp@latest
claude mcp add figma -s user -- npx -y @figma/mcp
```

## Commands
```bash
# Start Next.js development server
npm run dev

# Start Storybook documentation server (Our Design System Source of Truth)
npm run storybook

# Build for production
npm run build
```

## Theme & Aesthetics (OKLCH)
We use a "lazy-genius" dynamic color system. 
- The brand hue is controlled via `--brand-hue: 250;` in `src/app/globals.css`.
- All semantic colors (background, primary, muted, border) use `oklch()` defined off this hue.
- Do NOT use arbitrary hex codes. Use standard Tailwind semantic classes (e.g., `text-muted-foreground`).
- For complete token references, read `.agent/skills/frontend-design/references/tokens.md` and `src/stories/styles/Color.mdx`.
