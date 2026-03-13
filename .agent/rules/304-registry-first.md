# Registry-first prototyping rules

When building **new marketing pages/sections**, prefer composing from existing registry blocks and components before inventing bespoke UI.

## Default registries for this repo

- `shadcn/ui` (default)
- `@tailark` marketing blocks
- `@cult-ui` components + blocks

Configured in `components.json` under `"registries"`.

## Agent behavior (required)

When the user asks you to create a new page/section/component:

1. **Search registries first**
   - Use the shadcn MCP server (preferred) to search across registries by intent:
     - "hero", "pricing", "testimonials", "logo cloud", "navbar", "faq", "bento", "cta"
   - If MCP isn't available, use the shadcn CLI:
     - `npx shadcn@latest search @tailark --query "hero"`
     - `npx shadcn@latest search @cult-ui --query "glass"`

2. **Install / copy before building**
   - Install the closest match from a registry, then adapt:
     - copy changes into `src/components/plus/**` for Plus-specific wrappers (once allowed)
     - keep upstream components in `src/components/ui/**` upgradeable

3. **Constrain initial passes**
   - First pass should be 80–90% registry blocks with minimal glue code.
   - Only write custom components when:
     - the block doesn't exist, OR
     - the existing block cannot satisfy accessibility/performance constraints.

4. **Document provenance**
   - In Storybook or MDX docs, label content as:
     - Base (shadcn)
     - Registry (Tailark / Cult UI / other)
     - Plus (custom)

