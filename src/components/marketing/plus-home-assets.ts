/**
 * Homepage hero — Figma `1714:1885` (Landing): ambient wash, dashboard, floating math ornaments.
 * Legacy collage URLs (`1608:2009`) kept for reference / export parity; live hero uses `landing*` keys.
 */
export const plusHomeHero = {
  /** Centered dashboard screenshot (`1714:2168`). */
  landingDashboard: "https://www.figma.com/api/mcp/asset/cd59591c-9ee3-4eea-9508-644a5b17ffc4",
  /** Floating characters around headline (nodes `1714:2169` … `1714:2177`). */
  landingOrnamentPinkPlus: "https://www.figma.com/api/mcp/asset/02746783-eb0b-44f2-ac1e-cbb5ef7177a6",
  landingOrnamentPurpleX: "https://www.figma.com/api/mcp/asset/8a378da3-7954-491a-93a1-23edccfb126c",
  landingOrnamentDivide: "https://www.figma.com/api/mcp/asset/a73552e9-3ad9-47a1-8ba8-83e6900b7772",
  landingOrnamentGreenGt: "https://www.figma.com/api/mcp/asset/bd29b01f-201f-4467-8b45-a09db16de4f5",
  landingOrnamentEquals: "https://www.figma.com/api/mcp/asset/a792493d-d967-45dd-8035-68e1cb1ba734",
  collageTopLeft: "https://www.figma.com/api/mcp/asset/44143310-9614-4417-958f-067804bbe158",
  collageTopRight: "https://www.figma.com/api/mcp/asset/45be58bd-c40e-41e0-8352-5aea81a15f3e",
  collageBottomLeft: "https://www.figma.com/api/mcp/asset/07b1e2a8-fd0b-4bba-a4da-b031c9f8dce8",
  collageBottomRight: "https://www.figma.com/api/mcp/asset/76edd0d5-351e-4762-8b8b-d600f58a4789",
  toastAvatarA: "https://www.figma.com/api/mcp/asset/e85a48b6-ab99-46f3-904a-747dec86ee22",
  toastAvatarB: "https://www.figma.com/api/mcp/asset/92620278-302a-4e92-aac4-4028a66683e4",
  doodleX: "https://www.figma.com/api/mcp/asset/3e240f99-03b2-4afa-adfb-4c81f24f8e6b",
  doodleBottom: "https://www.figma.com/api/mcp/asset/1d33df33-be38-49bb-a299-24079530140f",
  /**
   * “Our Awards” row inside landing hero — Figma `1732:3947` (Homepage `1714:1883`).
   * MCP URLs expire ~7d; export to `/public/figma/home/` when stabilizing.
   */
  landingAwardEdTech: "https://www.figma.com/api/mcp/asset/48005b0e-cd22-400b-a240-e5f496c03a78",
  landingAwardBestDemo: "https://www.figma.com/api/mcp/asset/8b8c8753-4297-4164-b8ea-b50025000c4d",
  landingAwardCodie: "https://www.figma.com/api/mcp/asset/82de1ad9-31f3-43cd-904f-a3a1488647af",
  landingAwardIela: "https://www.figma.com/api/mcp/asset/97b915ec-2ec8-4dd2-8c61-9cb0656f01a9",
} as const

export const plusHomeTestimonialAvatars = {
  student: "/figma/home/testimonial-student.png",
  district: "/figma/home/testimonial-district.png",
  teacher: "/figma/home/testimonial-teacher.png",
} as const

/**
 * Impact — “Serving Low-Income Students” (Figma `1714:1912` layout + assets).
 */
export const plusHomeImpactDecor = {
  equalSign: "https://www.figma.com/api/mcp/asset/af9344f2-60f2-4838-bc02-4c6410ea6458",
  iconSchools: "https://www.figma.com/api/mcp/asset/a77af182-04cc-4299-88e6-fe0df736f55c",
  iconTutors: "https://www.figma.com/api/mcp/asset/b36597a4-4a7a-4459-bb92-182d6eb28ce0",
  iconStudents: "https://www.figma.com/api/mcp/asset/e1e21ec0-adee-4211-9d7f-b9e059aff322",
} as const

/** Figma `1602:1966` (Our Awards) — award marks + header character */
export const plusHomeAwards = {
  edTechFinalist: "https://www.figma.com/api/mcp/asset/3508f2c5-5876-4393-b1e9-0874bdde2057",
  bestDemo: "https://www.figma.com/api/mcp/asset/566ffecb-3330-45a0-a24c-a3fdf96c5af7",
  headerDecor: "https://www.figma.com/api/mcp/asset/bf21a364-d6ed-4908-90be-93a4a0d508a2",
  headerCharacter: "https://www.figma.com/api/mcp/asset/6d9eb07c-ab64-4f9d-8357-b5b9d82c051a",
} as const

/** Figma `1714:1956` — US map (472px-tall frame). */
export const plusHomeImpactMap =
  "https://www.figma.com/api/mcp/asset/efb47704-0474-476f-b65d-b182a6a2b8a4"

/**
 * Figma `1714:1957` Smart Tech, Smarter Learning — pink bento + layered screenshots.
 * Layout: Supervisor + AI Tutor side-by-side (row 1), Collaborative Goal Setting full-width (row 2).
 * `supervisor` / `aiTutor` / `goalSetting` = single composites for small viewports.
 * Layer URLs match Figma node `1714:1957`; may expire — export to `/public/figma/home/` when stabilizing.
 */
export const plusHomeSmartTech = {
  supervisor: "https://www.figma.com/api/mcp/asset/b54ac288-9952-41dc-a8bb-e0ff9fbd261a",
  aiTutor: "https://www.figma.com/api/mcp/asset/5ac6cbb5-4443-4329-a757-7d03d242a188",
  goalSetting: "https://www.figma.com/api/mcp/asset/f1944517-229f-4adf-9f76-de7f027edec0",
  /** Supervisor card — back (`1714:1974`) / front (`1714:1975`). */
  supervisorLayerBack: "https://www.figma.com/api/mcp/asset/dc285f70-60d4-4710-9994-49dedae9801c",
  supervisorLayerFront: "https://www.figma.com/api/mcp/asset/e0c41e41-993e-45f6-a41b-c3b25da9d369",
  /** AI tutor card — back (`1714:1986`) / front (`1714:1987`). */
  aiTutorLayerBack: "https://www.figma.com/api/mcp/asset/de29422b-922d-4fcb-aa83-358d4b56914e",
  aiTutorLayerFront: "https://www.figma.com/api/mcp/asset/0b2ffd6a-e420-44de-927f-4ae0d28fa5b5",
  /** Goal setting card — back (`1714:1996`) / front (`1714:1997`). */
  goalLayerBack: "https://www.figma.com/api/mcp/asset/1ed1f244-e789-4347-9d98-384c89257429",
  goalLayerFront: "https://www.figma.com/api/mcp/asset/9ccd1977-372c-4af4-8386-48f34b169308",
  iconSupervisor: "https://www.figma.com/api/mcp/asset/de5f5606-72a7-4f22-a434-4a552649d245",
  iconAiTutor: "https://www.figma.com/api/mcp/asset/a1a8c5d7-e8f1-478f-bb18-97ba43076b2a",
  iconGoal: "https://www.figma.com/api/mcp/asset/5559a160-5eac-4e92-b08a-389022f9ca95",
  headerDoodle: "https://www.figma.com/api/mcp/asset/67b6c977-6c74-4f3a-aca1-128530fd3eb0",
} as const

/**
 * Figma `1708:2035` Built on the Science of Learning.
 * Layered screenshots (`papersLayer*`) + icon match node layout; stacks kept for fallbacks / older refs.
 */
export const plusHomeScience = {
  iconPapers: "/figma/home/icon-papers.svg",
  /** Back (paper) / front (table UI) — `1709:2116`, `1709:2114`. */
  papersLayerBack: "https://www.figma.com/api/mcp/asset/3dbdd08d-1150-42f9-a688-9e87a3d4d0bc",
  papersLayerFront: "https://www.figma.com/api/mcp/asset/622abe99-d8bb-4356-b1be-4ed075dce10d",
  /** Header decor in white frame — `1708:2077`. */
  headerDoodle: "https://www.figma.com/api/mcp/asset/cd4db696-7f46-486f-8e14-8b4e8bc61f31",
} as const
