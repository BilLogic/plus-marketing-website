# Agent Capabilities Overview

This repo is wired for a rich agent toolchain (MCP servers, skills, and workflows).  
Use this as a quick reference plus a set of copy‑pastable prompts.

## Core capabilities

- **Design & theming**
  - Frontend design skill for premium UI using OKLCH tokens, DM Sans, and Geist Mono.
  - shadcn/ui skill with strict composition and styling rules.
- **Registry & Storybook**
  - Registry Advisor and shadcn MCP for searching Bundui, Tailark, Cult UI, and shadcn blocks.
  - Storybook as the single source of truth for styles, effects, components, and templates.
- **Testing & browser**
  - Playwright/browser tools for driving Storybook or the app and verifying flows.
- **Docs & compound engineering**
  - Compound Engineering workflows for brainstorm → plan → work → review → compound.

## High‑value example prompts

- **Design a new section**
  - “Use Storybook and `docs/registry-coverage.md` to propose 3 registry‑first options for a pricing section, then implement the chosen one using existing blocks.”
- **Refactor a template**
  - “Refactor the Bundui hero template to reuse more shared components, and update any affected stories plus `registry-coverage.md`.”
- **Agent‑native audit**
  - “Re‑run the agent‑native architecture audit and show how the new APIs and consent service affected each of the 8 principles.”
- **CRUD / deprecation**
  - “Safely deprecate this effect component following `docs/deletion-playbook.md`, including Storybook and registry coverage updates.”

