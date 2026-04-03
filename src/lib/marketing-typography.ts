/**
 * Typography scale from Storybook: Styles/Typography (Heading hierarchy + Body text).
 * Use semantic HTML (h1, h2, h3, p) with these classes for marketing pages.
 */
export const marketingTypography = {
  /** H1 — Hero headline (Storybook: text-5xl font-semibold tracking-tight) */
  h1: "text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl",
  /** H2 — Section headline (Storybook: text-3xl font-semibold tracking-tight) */
  h2: "text-balance text-3xl font-semibold tracking-tight text-foreground",
  /** H3 — Card / accordion titles (Storybook: text-xl font-semibold tracking-tight) */
  h3: "text-xl font-semibold tracking-tight",
  /**
   * Dense bento / tile title (Storybook: Styles/Typography — `text-xl` → `sm:text-2xl`, bold).
   * Set brand color at the call site.
   */
  bentoTitle:
    "text-pretty text-xl font-bold leading-snug tracking-tight sm:text-2xl",
  /** Lead paragraph — section intros (Storybook: text-lg text-muted-foreground) */
  lead: "max-w-prose text-lg text-muted-foreground",
  /** Standard body (Storybook: text-base leading-relaxed) */
  body: "text-base leading-relaxed text-foreground",
} as const
