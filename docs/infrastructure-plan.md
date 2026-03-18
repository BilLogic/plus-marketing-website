# Goal Description
Set up the foundational infrastructure for the new marketing website repository. This includes establishing the tech stack, structuring Cursor rules (using the 2-4-2 framework), configuring agent skills (referencing the Claude Code Frontend Design Toolkit), and evaluating missing pieces to ensure high-velocity "vibe coding".

## User Review Required
> [!IMPORTANT]
> Please review the proposed tech stack (specifically choices like Next.js and Shadcn) and the evaluation of missing elements (such as CMS/Database choices). Let me know if you want to adjust the framework or add specific integrations like Supabase or Sanity before we generate the files.

## Proposed Changes

### Unified Project Overview
#### [NEW] README.md
A solid, comprehensive README at the root of the project that serves dual purposes: 
1. As the standard GitHub repository face page.
2. As the central index for the coding agent (vibe coder) to easily reference different rules, skills, and MCP configurations.

### Tech Stack (Marketing Website)
- **Framework**: Next.js (App Router) - Optimal for SEO, performance, and server-side rendering.
- **Language**: TypeScript - For type safety and better agent completions.
- **Styling**: Tailwind CSS - Utility-first styling.
- **UI Components**: Shadcn UI & Radix UI - Accessible, customizable, and agent-friendly.
- **Animation**: Framer Motion - Essential for premium marketing web animations and interactions.
- **Analytics**: Microsoft Clarity - Integration snippet in the global layout for session insights.
- **Content Management**: A lightweight, headless CMS (e.g., Sanity or standard markdown/MDX with Netlify CMS) since heavy backend requirements are minimal.

### .agent/rules/ (The 2-4-2 Framework Baseline)
Implementing the 3-tier, 8-file structure to optimize agent context windows in a universally recognized format suitable for all coding agents (Claude Code, Aider, etc.). 
*Note: The "2-4-2" rule is primarily a starting point for managing context sizes. As the project evolves, this structure may be challenged or refactored to better suit the specific needs of the AI coding agents.*
#### [NEW] .agent/rules/100-project-context.md
Always-on: Project context, tech stack, folder structure, core brand and unbreakable rules.
#### [NEW] .agent/rules/101-code-standards.md
Always-on: General code standards, TS/React conventions, and styling rules.
#### [NEW] .agent/rules/102-agent-capabilities.md
Always-on: An index of all available Skills, MCPs, and tools integrated into this repository. Explicitly instructs the agent to proactively suggest these tools to the user when relevant (e.g., suggesting Playwright MCP when testing UI) so the user learns what the vibecoder can do.
#### [NEW] .agent/rules/200-frontend-guidelines.md
Auto-attached to `src/app/**` & `src/components/**`: Component library, design system, animations.
#### [NEW] .agent/rules/201-backend-api.md
Auto-attached to `src/api/**` & `src/lib/**`: API route patterns, middlewares.
#### [NEW] .agent/rules/202-database-schema.md
Auto-attached to `src/db/**`: Schema conventions and query patterns.
#### [NEW] .agent/rules/203-ai-integration.md
Auto-attached to `src/ai/**`: Prompt standards, model handling.
#### [NEW] .agent/rules/300-security-checklist.md
Agent-requested: Security patterns, auth flows, access control.
#### [NEW] .agent/rules/301-feature-checklist.md
Agent-requested: End-to-end feature deployment, loading states, error boundaries.
#### [NEW] .agent/rules/302-mcp-status-check.md
Agent-requested: Instructions for agents to check the status of local MCP servers (Notion, Figma) and remind developers to start/install them if disconnected.

### .agent/skills/ (Comprehensive Vibe Coder Toolkit)
Based strictly on the [Claude Code Frontend Design Toolkit](https://github.com/wilwaldon/Claude-Code-Frontend-Design-Toolkit). We will configure instructions to ensure local agents load or emulate the following tools:

**1. Design & Theming**
- *Frontend Design (Official)*: Aesthetic direction.
- *UI/UX Pro Max*: Aesthetic and design system matching.
- *Taste Skill*: Tune design variance and visual density.
- *Bencium UX Designer*: WCAG & responsive patterns.
- *Design System Architect / Tailwind CSS Kit*: End-to-end token and Tailwind management.

**2. Animation & Motion**
- *Animation Skills (freshtechbro)* & *Motion Skill*: For building premium framer-motion/CSS transitions.

**3. Design-to-Code Pipeline**
- *Figma MCP & Code Connect*: Read tokens and map existing code components directly from Figma.

**4. Testing & Browser Automation**
- *Playwright MCP*: Visual regression and headless interaction.
- *Storybook MCP*: Prevent component duplication by scanning existing stories.

**5. Debug & Quality**
- *Chrome DevTools MCP*: Performance profiling.
- *Web Quality Skills (Addy Osmani)*: CWV, Accessibility audits, SEO checks.

**6. DX & Deployment**
- *Context7*: Documentation indexing.
- *TypeScript LSP*: Official type-checking integration.
- *Vercel MCP*: Deployment previews.

*All tools above will be documented in `102-agent-capabilities.md` and their core logic scaffolded in the `frontend-design` directory.*

#### [NEW] .agent/skills/frontend-design/SKILL.md
Main instruction file porting the core concepts of the tools above so any local vibe coder adheres to the premium aesthetics.
#### [NEW] .agent/skills/frontend-design/references/tokens.md
Design tokens (OKLCH scale, typography pairings) acting as the source of truth for UI components.
#### [NEW] .agent/skills/frontend-design/assets/examples.md
Examples of premium marketing components to ensure high visual quality.

### Documentation Export
#### [NEW] docs/infrastructure-plan.md
This entire infrastructure setup plan will be exported to the repository's `docs/` folder for cross-referencing during development.

## Evaluation of What May Be Missing
1. **CMS Finalization**: We've aligned on a lightweight CMS since backend needs are low. We need to finalize the specific choice (e.g., Sanity, MDX, or Contentful) to provision.
2. **Design Tokens / Brand Guide**: We need the specific brand colors, fonts (e.g., Inter, Outfit), and logo assets to populate the `tokens.md` properly.
3. **Deployment Strategy**: Setting up Vercel or Netlify configurations (based on previous conversations, Netlify was used) to enable Preview Deployments for the "vibe coders" to visually test their work.
4. **Testing Setup**: Playwright or Cypress for E2E testing (Playwright MCP was mentioned in past contexts).
5. **Local MCP Setup Instructions**: A `setup-mcps.sh` or comprehensive `README.md` to guide new developers on installing and running the Notion and Figma MCPs locally.

## Verification Plan
### Automated Tests
- Run `npx create-next-app` to scaffold the project properly and ensure it successfully outputs the boilerplate.
- Verify that standard linting (`npm run lint`) passes with the new rules.
### Manual Verification
- Review the implemented `.mdc` file contents to ensure they accurately reflect the 2-4-2 prompt constraints (length and glob patterns).
- Test that an agent successfully reads the `SKILL.md` when instructed to perform a frontend task.
