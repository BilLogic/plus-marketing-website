# Marketing Website - Vibe Coding Core

Welcome to the central hub for the Marketing Website repository. This project is built using **Next.js**, **TypeScript**, **Tailwind CSS**, and **Shadcn UI**.

This repository is designed from the ground up for high-velocity "Vibe Coding" using AI tooling.

---

## 🤖 Vibe Coder Architecture & Rules Index

This section is meant for **AI Agents** (Cursor, Claude Code, Aider, Antigravity) and human developers alike. We use the **2-4-2 Framework Baseline** to manage context. 
*Note: This rule structure is primarily a starting point for managing context sizes. Feel free to challenge and refactor these rules to better suit the specific needs of the vibe-coding experience as the project evolves.*

### **1. Always-on Context (`.agent/rules` - Load these first)**
- [100-project-context.md](.agent/rules/100-project-context.md): Core stack info, folder structure, absolute non-negotiable rules.
- [101-code-standards.md](.agent/rules/101-code-standards.md): TS/React conventions, styling rules, error handling.
- [102-agent-capabilities.md](.agent/rules/102-agent-capabilities.md): Tools, MCPs, and skills index for proactive agent assistance.

### **2. Domain-Specific Guidelines (Attached conditionally by glob)**
- [200-frontend-guidelines.md](.agent/rules/200-frontend-guidelines.md) -> `src/app/**`, `src/components/**`
- [201-backend-api.md](.agent/rules/201-backend-api.md) -> `src/api/**`, `src/lib/**`
- [202-database-schema.md](.agent/rules/202-database-schema.md) -> `src/db/**`
- [203-ai-integration.md](.agent/rules/203-ai-integration.md) -> `src/ai/**`

### **3. Agent-Requested Checklists (Read when shipping)**
- [300-security-checklist.md](.agent/rules/300-security-checklist.md): Auth flows, token handling, access control.
- [301-feature-checklist.md](.agent/rules/301-feature-checklist.md): End-to-end polish, error boundaries, caching.
- [302-mcp-status-check.md](.agent/rules/302-mcp-status-check.md): Verify Notion/Figma MCP connections.

---

## 🛠️ Vibe Coder Toolkit & Agent Skills

In addition to context rules, the `.agent/skills` folder contains actionable logic for executing tasks optimally. 

**Pro-Tip to Agents:** When requested to perform a design, animation, testing, or deployment task, always refer to the specific `.agent/skills/` documents first.
Refer to [102-agent-capabilities.md](.agent/rules/102-agent-capabilities.md) for a comprehensive breakdown of all available tools including:
- **Design/Theming**: Taste Skill, UI/UX Pro Max, Design Tokens.
- **Testing/Debug**: Playwright MCP, Storybook MCP, Chrome DevTools MCP.
- **Code Quality**: Web Quality Skills, TypeScript LSP.

---

## 🚀 Getting Started (Human Developers)

1. Ensure Node.js (v18+) is installed.
2. Run standard installation and dev server:
   ```bash
   npm install
   npm run dev
   ```
3. Read the `docs/infrastructure-plan.md` (if exported) for full context on why certain libraries were chosen.
