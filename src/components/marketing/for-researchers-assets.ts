export const forResearchersAssets = {
  /**
   * Figma `1730:2510` hero collage + characters (Homepage IA `1730:1973`).
   * MCP URLs expire ~7d — export under `/public/figma/for-researchers/` when stable.
   */
  /** Figma `1730:2510` — 2×2 grid + characters (exported PNG under `/public/figma/for-researchers/`). */
  heroCollage: {
    learningIdeasConference: "/figma/for-researchers/hero-learning-ideas.png",
    sigchi: "/figma/for-researchers/hero-sigchi.png",
    solar: "/figma/for-researchers/hero-solar.png",
    aied: "/figma/for-researchers/hero-aied.png",
    characterPink: "/figma/for-researchers/hero-character-pink.png",
    characterBlue: "/figma/for-researchers/hero-character-blue.png",
  },
  heroDecor: {
    division: "/figma/for-researchers/hero-division.png",
    multiplication: "/figma/for-researchers/hero-multiplication.png",
    equal: "/figma/for-researchers/hero-equal.png",
  },
  partners: {
    decor: "/figma/for-researchers/partners-decor.png",
    logos: [
      "/figma/for-researchers/partner-1.png",
      "/figma/for-researchers/partner-2.png",
      "/figma/for-researchers/partner-3.png",
    ] as const,
  },
  highlights: {
    decor: "/figma/for-researchers/highlights-decor.png",
  },
  index: {
    decor: "/figma/for-researchers/index-decor.png",
  },
  successStories: {
    decor: "/figma/for-researchers/success-decor.png",
    /** Figma `1732:4064` — ÷ glyph next to card title (replaces legacy icon-story-1/2). */
    cardTitleIcon: "/figma/for-researchers/icon-success-story-title.svg",
  },
} as const
