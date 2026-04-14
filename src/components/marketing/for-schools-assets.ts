export const forSchoolsAssets = {
  partnerLogos: [
    "/figma/for-schools/partner-1.png",
    "/figma/for-schools/partner-2.png",
    "/figma/for-schools/partner-3.png",
    "/figma/for-schools/partner-4.png",
  ] as const,
  decor: {
    community: "/figma/for-schools/decor-11.png",
    successStories: "/figma/for-schools/decor-10.png",
  },
  /**
   * Large hero mascots — Figma node 1379-2316 (exported PNGs).
   * Benefit row icons — Figma 58×58 circles (`benefit-icon-*.svg`).
   */
  mathDecor: {
    division: "/figma/for-schools/division.png",
    multiplication: "/figma/for-schools/multiplication.png",
    equal: "/figma/for-schools/equal.png",
  } as const,
  /**
   * Benefits accordion panel images — Figma node 1104-1220.
   * Indices: 0=Free for All, 1=Multilingual Support, 2=unused, 3=Human+AI.
   */
  benefitsPanelArt: [
    "/figma/for-schools/benefits-panel-free.png",
    "/figma/for-schools/benefits-panel-multilingual.png",
    "/figma/for-schools/benefits-panel-goal-setting.png",
    "/figma/for-schools/benefits-panel-human-ai.png",
  ] as const,
  /**
   * Goal Setting panel — 3 layered dashboard screenshots (back → front).
   * Figma: imgScreenshot20260413At103713Pm3 (top/back), Pm2 (middle), Pm1 (front/bottom).
   */
  benefitsPanelGoalScreenshots: [
    "/figma/for-schools/benefits-panel-goal-3.png",
    "/figma/for-schools/benefits-panel-goal-2.png",
    "/figma/for-schools/benefits-panel-goal-1.png",
  ] as const,
  /** Day-to-Day Experience phase icons — Figma `1877:2175` (SVG circles). */
  experienceIcons: [
    "/figma/for-schools/experience-icon-1.svg",
    "/figma/for-schools/experience-icon-2.svg",
    "/figma/for-schools/experience-icon-3.svg",
    "/figma/for-schools/experience-icon-4.svg",
  ] as const,
  icons: {
    benefits: [
      "/figma/for-schools/benefit-icon-1.svg",
      "/figma/for-schools/benefit-icon-2.svg",
      "/figma/for-schools/benefit-icon-3.svg",
      "/figma/for-schools/benefit-icon-4.svg",
    ] as const,
    /** Figma 1379:2353 — 58×58 row icons (SVG from IA export). */
    oversight: [
      "/figma/for-schools/oversight-icon-1.svg",
      "/figma/for-schools/oversight-icon-2.svg",
      "/figma/for-schools/oversight-icon-3.svg",
      "/figma/for-schools/oversight-icon-4.svg",
    ] as const,
  },
  /**
   * Robust Oversight sticky cards — right-hand panel art, Figma node 1379-2353 (IA export).
   * Order matches cards: curriculum, data dashboard, credentials, math tools.
   */
  oversightCardImages: [
    "/figma/for-schools/oversight-card-1.png",
    "/figma/for-schools/oversight-card-2.png",
    "/figma/for-schools/oversight-card-3.png",
    "/figma/for-schools/oversight-card-4.png",
  ] as const,
  images: {
    benefits: "/figma/for-schools/benefits-image.png",
    experience: "/figma/for-schools/frame-2042.png",
    oversightData: "/figma/for-schools/oversight-image-2.png",
  },
  /**
   * Day-to-day bento hero panels — Figma 1206:1373 (per-step image on hover).
   * Indices 1–2 share the placeholder base; overlay numbers added in code.
   */
  experienceBentoHeroes: [
    "/figma/for-schools/experience-bento-1-kickoff.png",
    "/figma/for-schools/experience-bento-2-3-base.png",
    "/figma/for-schools/experience-bento-2-3-base.png",
    "/figma/for-schools/experience-bento-4-teacher-loop.png",
  ] as const,
  avatars: [
    "/figma/for-schools/avatar-1.png",
    "/figma/for-schools/avatar-2.png",
    "/figma/for-schools/avatar-3.png",
  ] as const,
  /**
   * School Success Stories — Figma 1379:2428 (header character + 62px avatar crops).
   */
  successStories: {
    headerDecor: "/figma/for-schools/success-stories-header-decor.png",
    cardTitleIcon: "/figma/for-researchers/icon-success-story-title.svg",
    avatars: [
      "/figma/for-schools/success-story-avatar-1.png",
      "/figma/for-schools/success-story-avatar-2.png",
      "/figma/for-schools/success-story-avatar-3.png",
    ] as const,
  },
} as const
