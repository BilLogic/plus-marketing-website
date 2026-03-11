# Design Tokens & Theming Strategy

This file acts as the source of truth for the Plus Marketing Website's aesthetic tokens, directly mirroring our Figma Design System structure.

## STYLES

### 1. Colors (The OKLCH System)
We utilize a single hue-driven OKLCH dynamic color system (the "lazy-genius" approach).
- **Primary Brand Hue**: `--brand-hue: 250;` (Adjust this single degree to re-theme the site).
- **Core Semantic Mapping**:
  - `--background`: `oklch(0.995 0.005 var(--brand-hue))`
  - `--foreground`: `oklch(0.15 0.02 var(--brand-hue))`
  - `--primary`: `oklch(0.6 0.2 var(--brand-hue))`
  - `--muted`: `oklch(0.94 0.01 var(--brand-hue))`
  - `--border`: `oklch(0.88 0.015 var(--brand-hue))`
*Rule:* Never use arbitrary HEX codes in components. Always use `var(--color-primary)` via Tailwind classes (`bg-primary`, `text-muted-foreground`).

### 2. Typography
- **Headings (Display)**: `Outfit` (or `Geist Sans` if keeping the Next.js default) - bold, tight tracking.
- **Body**: `Inter` (or `Geist Sans`) - highly legible, 150% line-height minimum.
- *Rule:* Always use semantic HTML tags (`h1`, `h2`, `p`) with corresponding Tailwind typography utilities (`text-4xl font-extrabold tracking-tight`).

### 3. Layout (The 4px Grid)
- All spacing (padding, margins, gaps) must strictly adhere to a 4px incremental scale.
- Allowed values: `0`, `0.5` (2px), `1` (4px), `2` (8px), `4` (16px), `6` (24px), `8` (32px), `12` (48px), `16` (64px).
- Avoid odd pixel values.

### 4. Elevation (Shadows & Depth)
- **Flat/Subtle**: `shadow-sm` for standard cards.
- **Floating/Premium**: `shadow-xl shadow-primary/10` combined with `ring-1 ring-border`.
- **Glassmorphism**: When laying over images or gradients, use `bg-background/80 backdrop-blur-md`.

### 5. Icons
- Standardize on **Lucide React** (via `lucide-react`). Do not mix icon libraries.
- Standard sizing: `w-5 h-5` for inline text, `w-8 h-8` for feature callouts.

---

## ASSETS

### 1. Logo
- Ensure the logo is implemented as an SVG or a high-res optimized WebP.
- The `Logo` React component should accept `className` props to easily adjust sizing (e.g., `h-8 w-auto`).

### 2. Images
- Only use `next/image` for image optimization.
- Always provide `alt` tags.
- For marketing hero sections, employ subtle `Framer Motion` scale or blur-in effects on load.
