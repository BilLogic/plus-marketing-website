/**
 * Typography scale from Storybook: Styles/Typography (Heading hierarchy + Body text).
 * Use semantic HTML (h1, h2, h3, p) with these classes for marketing pages.
 */
export const marketingTypography = {
  /** H1 — Hero headline (Storybook: text-heading-xxl sm:text-display-md) */
  h1: "text-balance text-heading-xxl text-foreground sm:text-display-md",
  /**
   * Marketing landing hero title — matches for-tutors / get-involved hero H1.
   * Used by for-schools `SchoolsHeroSection`.
   */
  heroH1:
    "text-balance text-heading-xxl text-(--ds-text-accent-teal-bolder) sm:text-display-sm md:text-display-md",
  /** H2 — Section headline (Storybook: text-heading-xl) */
  h2: "text-balance text-heading-xl text-foreground",
  /** H3 — Card / accordion titles (Storybook: text-heading-md) */
  h3: "text-heading-md",
  /**
   * Dense bento / tile title (Storybook: Styles/Typography — `text-heading-md` → `sm:text-heading-lg`).
   * Set brand color at the call site.
   */
  bentoTitle: "text-pretty text-heading-md sm:text-heading-lg",
  /** Lead paragraph — section intros (Storybook: text-body-lg text-muted-foreground) */
  lead: "max-w-prose text-body-lg text-muted-foreground",
  /**
   * Section description under H2 — For Researchers / Schools (`sectionHeaderLead` scale).
   * Use with the muted text role or `riFg.bodyMuted` where the index uses fixed grey instead of `muted-foreground`.
   */
  sectionLead:
    "text-pretty text-body-default text-muted-foreground sm:text-body-lg",
  /** Standard body (Storybook: text-body-lg) */
  body: "text-body-lg text-foreground",
} as const
