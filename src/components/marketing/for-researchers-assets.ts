export const forResearchersAssets = {
  /**
   * Figma `1730:2510` hero collage + characters (Homepage IA `1730:1973`).
   * MCP URLs expire ~7d — export under `/public/figma/for-researchers/` when stable.
   */
  heroCollage: {
    learningIdeasConference:
      "https://www.figma.com/api/mcp/asset/936758d4-1267-401c-be9f-442781d408f1",
    sigchi: "https://www.figma.com/api/mcp/asset/b8307ba1-2a0c-482b-9317-875adaff16f6",
    solar: "https://www.figma.com/api/mcp/asset/24ea8360-9233-4780-82d4-df59f54c1a36",
    aied: "https://www.figma.com/api/mcp/asset/990917d9-125f-4fbd-a7aa-45f362c6aa06",
    tooltipIconA: "https://www.figma.com/api/mcp/asset/849bd98b-4988-4219-a14c-1687a665c5a1",
    tooltipIconB: "https://www.figma.com/api/mcp/asset/32c20366-0d0c-4590-b554-1bf6889cd189",
    characterPink: "https://www.figma.com/api/mcp/asset/9b45eb3f-3634-473e-8e71-672ede43c983",
    characterBlue: "https://www.figma.com/api/mcp/asset/e23688e9-d245-43c2-8474-4603fedbf51a",
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
      "/figma/for-researchers/partner-4.png",
    ] as const,
  },
  highlights: {
    decor: "/figma/for-researchers/highlights-decor.png",
  },
  index: {
    decor: "/figma/for-researchers/index-decor.png",
  },
  researchers: {
    decor: "/figma/for-researchers/researchers-decor.png",
    fallbackPhoto: "/figma/for-researchers/researcher-card-photo.png",
  },
  successStories: {
    decor: "/figma/for-researchers/success-decor.png",
    /** Figma `1732:4064` — ÷ glyph next to card title (replaces legacy icon-story-1/2). */
    cardTitleIcon: "/figma/for-researchers/icon-success-story-title.svg",
  },
} as const
