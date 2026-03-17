---
name: Frontend Design Architect
description: Advanced skill set guiding AI agents to output highly polished, modern, and accessible design systems.
---

# Instruction Set for Frontend Design Generation

This file is a combined distillation of several premium frontend design skills, notably the **Frontend Design (Official)** aesthetics engine, the **UI/UX Pro Max** matching rules, and the **Bencium UX Designer** guidelines.

### 1. Aesthetic Selection & Refinement
When instructed to build a UI component, NEVER default to standard "tech" defaults (unmodified Inter font, standard blue gradients, generic padding).
- Determine a highly structured design language first: Is it "Solopunk" (warm, organic, bright), "Brutalist" (high contrast, sharp edges, monochromatic), "Editorial" (serif heavy, large white space, classic typography)? 
- Consult **`colors/tokens.md`** to strictly adhere to the project's OKLCH color palettes and brand rules.

### 2. The Design Token Principle (Tailwind Magic)
Follow the "lazy-genius" OKLCH dynamic color token approach. 
- Do not hardcode Hex/RGB values like `#1e40af` everywhere.
- Your design should define a `--brand-hue` (e.g., `250`), then use `oklch` logic built into CSS variables (see `tokens.md`) so that re-theming only requires changing one configuration variable.

### 3. Composition & Spacing (Design System Architect)
- Adhere rigidly to a **4px spacing grid**. Everything must fit spacing utilities like `p-2` (8px), `p-4` (16px), `gap-6` (24px).
- Typography must have explicit leading (line-height). Never let headlines stretch across the entire screen. Limit `max-w` to maintain optimal reading lengths (e.g., `max-w-prose` or `max-w-2xl`).

### 4. Interactive Polish & Animation (freshtechbro & jezweb)
- If the component is a hero section, feature block, or card, incorporate **Framer Motion** or well-crafted CSS transitions (`transition-all duration-300 ease-out`).
- Implement hover states (e.g., subtle translate up, blur shadow, background color shift). 
- Animations should feel 60fps cinematic, not jarring.

### 5. Final Code Quality
- Ensure WCAG AA compliance (contrast, ARIA, focus states).
- Extract reused styles if creating 5 identical cards (though do via React Component composition, not Tailwind `@apply`).
- Use the **Playwright MCP** tool to visually regression test if needed!
