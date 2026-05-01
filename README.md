# PLUS Marketing Website

Production marketing site for [PLUS (tutors.plus)](https://www.tutors.plus/) — a virtual tutoring platform empowering middle school math learners with AI technology and research-backed methods, founded at Carnegie Mellon University.

> **Live production site (Framer):** [https://www.tutors.plus/](https://www.tutors.plus/)
> **This Next.js rebuild:** Hosted on Netlify — same content and section order, rebuilt with a design-system-first component library.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (OKLCH token system) |
| Components | shadcn/ui + Radix UI + Base UI |
| Motion | Framer Motion |
| Fonts | DM Sans (primary), Geist Mono |
| Deploy | Netlify (`@netlify/plugin-nextjs`) |
| Docs | Storybook (served at `/storybook` on Netlify) |

---

## Getting Started (localhost)

Prerequisites:

- **Node.js ≥ 20.9** (see `package.json` `engines`)

```bash
cd plus-marketing-website

npm install

# Pages that pull from Notion (research index, stories, team, etc.) expect secrets in `.env.local`.
cp .env.example .env.local
# Edit `.env.local` and add NOTION_API_KEY + database IDs, or rely on ISR/cache where configured.

# Dev server — Webpack (default; avoids Turbopack watcher issues such as `/` returning 404 on some macOS setups)
npm run dev
```

Then open **`http://localhost:3000/`** (homepage). Other examples: **`/for-schools`**, **`/for-researchers`**, **`/research`**.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Next.js marketing site (**Webpack**) on **`http://localhost:3000`** |
| `npm run dev:turbo` | Turbopack on **3000** (use only if watchers are stable; raise `ulimit -n` on `EMFILE`) |
| `npm run dev:8686` | Webpack on port **8686** |
| `npm run storybook` | Storybook docs on **`http://localhost:6006`** |
| `npm run build && npm run start` | Production build preview on port **3000** |

If **`Unable to acquire lock ... .next/dev/lock`**: stop every running `next dev`, then `rm -f .next/dev/lock` and run `npm run dev` again. If the port is busy, stop the other process or use `npm run dev:8686`.

If the browser says **can't connect**, **site can't be reached**, or **`ERR_CONNECTION_REFUSED`**, the dev server is not running: run `npm run dev` from the repo root and wait until the terminal prints **Ready**. Use **`http://`** (not **`https://`**). Try **`http://127.0.0.1:3000/`** if `localhost` fails.

---

## Project Structure

```
src/
  app/
    (marketing)/page.tsx  ← Landing + other marketing routes (shared marketing layout)
    layout.tsx            ← Root layout with ThemeProvider + fonts
    globals.css           ← OKLCH design tokens, Tailwind config
    theme/plus-colors.ts  ← Brand color scale generator
  components/
    marketing/            ← PLUS-specific landing sections (source of truth)
      plus-landing-sections.tsx
    registry/             ← Registry-first building blocks
      bundui/             ← Bundui-inspired marketing sections
      tailark/            ← Tailark-inspired marketing sections
      cult/               ← Cult UI-inspired components
    effects/              ← Motion & animation components
    ui/                   ← shadcn/ui primitives
.agent/                   ← AI agent rules and skills
netlify.toml              ← Netlify build config
```

---

## Landing Page Sections

The landing page mirrors [https://www.tutors.plus/](https://www.tutors.plus/) in structure and content:

1. **Announcement bar** — PLUS app v10 launch banner
2. **Navbar** — sticky, floating pill with About / Solutions / Impact / Get Involved + Demo / Login + light/dark toggle
3. **Hero** — headline, platform description, CTAs, mission card + meteor background effect
4. **Impact stats** — 13+ Schools, 500+ Tutors, 5000+ Students with animated counters
5. **Motivation** — "Math is for Everyone" / "Learn our stories"
6. **Outcomes strip** — 1:1 tutoring + 80%+ low-income families
7. **Testimonials** — 2×2 grid of real quotes from students, teachers, and districts
8. **Toolkit** — "Giving Tutors Superpowers" + feature cards + 10k+ / 20+ metrics
9. **Awards** — 2×2 award grid
10. **Research** — CMU/Stanford roots + 30+ published papers
11. **Footer** — link columns + newsletter + Carnegie Mellon © 2026

---

## Netlify Deployment

Two surfaces are served from one Netlify site:

| Path | Content |
|---|---|
| `/` | PLUS marketing landing page (Next.js) |
| `/storybook` | Component docs (static Storybook build) |

**Build config (`netlify.toml`):**
```toml
[[plugins]]
  package = "@netlify/plugin-nextjs"

[build]
  command = "npm run build && npm run build-storybook"
  publish = ".next"
```

Storybook outputs to `public/storybook` so Next.js serves it as a static subfolder automatically.

**To deploy:** Push to `main` on GitHub. Netlify auto-deploys on every push.

---

## Design System

We use a "lazy-genius" OKLCH dynamic color system:

- All semantic colors (`bg-background`, `bg-primary`, `text-muted-foreground`, etc.) resolve from CSS variables in `globals.css`
- Brand hue: teal (`--primary: #00BFCC`) + magenta accent (`--accent: #DD2AB0`)
- Light and dark modes supported via `next-themes`

**Never use raw hex codes** — always use Tailwind semantic utilities.

---

## AI Coder Onboarding

Before writing any code, read:

1. `.agent/rules/100-project-context.md` — mission, stack, non-negotiable rules
2. `.agent/rules/101-code-standards.md` — TS/React conventions
3. `.agent/rules/102-agent-capabilities.md` — available MCP tools and skills

For frontend/UI work, also read `.agent/skills/frontend-design/SKILL.md`.

---

Carnegie Mellon University © 2026
