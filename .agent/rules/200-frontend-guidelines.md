# Frontend Guidelines & Design System

*Applies to: `src/app/**`, `src/components/**`*

## Aesthetics & Design System (Marketing Focus)
- Use **Shadcn UI** and **Tailwind CSS v4** strictly.
- **NEVER** use generic colors like plain blue or red. Always use OKLCH-based design tokens or precise Hex codes defined in Figma (e.g., `bg-primary`, `text-muted`).
- Utilize **Framer Motion** for all micro-interactions and scroll reveals. Scroll reveals should be subtle (opacity 0 -> 1, y: 20 -> 0) to maintain a premium feel.
- Build UI components with **glassmorphism** where appropriate (e.g., `bg-white/10 backdrop-blur-md` on dark themes) to look modern.

## Data Fetching & State
- We default to React Server Components (Next.js App Router). Only use `"use client"` when interactivity (Framer Motion, onClick events) or browser APIs are absolutely required.
- Do not use Redux. Rely on URL query parameters, React Context for global UI state, or Zustand if things get complex.

## Component Structure
- Always separate logical components. E.g., a "Pricing Section" should be `PricingSection.tsx` composed of `PricingCard.tsx`.
- Keep component files under ~200 lines to ensure readability and maintainability for AI agents.
