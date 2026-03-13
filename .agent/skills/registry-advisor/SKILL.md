# Registry Advisor Skill (Plus Marketing Website)

## Purpose

Help designers and developers **discover existing patterns** from our configured registries before designing/building from scratch, and help coding agents stay grounded during initial prototyping passes.

This repo is shadcn-based (Tailwind v4 + open-code components). We also pull from additional registries:

- `shadcn/ui` (default)
- `@tailark` marketing blocks ([docs](https://tailark.com/docs))
- `@cult-ui` components/blocks ([installation](https://www.cult-ui.com/docs/installation), [MCP](https://www.cult-ui.com/docs/mcp-server))

## Activation phrases

Use this skill when the user asks to:
- design a new marketing page/section (hero, pricing, testimonials, nav, footer)
- prototype a page quickly
- “use the registry”, “search Tailark/Cult”, “what blocks exist”
- consolidate or compare components across registries

## How to use MCP for best answers

We use the **shadcn MCP server** as the single gateway to all registries configured in `components.json`.

### If MCP is connected

Prefer these behaviors:

1. **Search** by intent + registry namespace:
   - “Find me a hero from tailark registry”
   - “Find a pricing section from tailark mist registry”
   - “Find a glass card from cult-ui registry”

2. **Install** the closest match, then adapt
   - Keep upstream-installed code in the registry locations it installs to.
   - Only move/edit code into Plus-specific wrappers once the repo authorizes deviations.

3. **Present options**
   - Always return 2–4 candidate blocks with trade-offs (density, motion, complexity).
   - Recommend one default based on marketing conversion goals.

### If MCP is not connected

Use the CLI as a fallback:

- `npx shadcn@latest search @tailark --query "hero"`
- `npx shadcn@latest search @cult-ui --query "card"`
- `npx shadcn@latest add @tailark/<name>`
- `npx shadcn@latest add @cult-ui/<name>`

## Storybook organization guidance

As we adopt multiple registries, organize stories into these top-level groups:

- `Styles/*` — tokens, typography, motion rules
- `Layout/*` — flex/grid/section patterns
- `Components/*` — primitive components (button, input, tabs)
- `Blocks/*` — multi-component patterns (hero, pricing, testimonials, nav)
- `Templates/*` — full-page compositions (landing page, pricing page)

Within `Components/*`, keep “comparison” stories that show:
- Base (shadcn)
- Registry (Tailark / Cult UI / other)
- Plus (custom)

## Comparison workflow (recommended)

1. Start with **Base** story for each component.
2. Add **Registry** variants (installed under a separate namespace or folder).
3. Add **Plus** wrapper once customization is allowed.
4. Provide a single **Comparison** story with side-by-side rendering and a quick switcher (tabs or segmented control).

