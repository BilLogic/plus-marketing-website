/**
 * Homepage hero — Figma `1714:1885` (Landing): ambient wash, dashboard, floating math ornaments.
 * Legacy collage URLs (`1608:2009`) kept for reference / export parity; live hero uses `landing*` keys.
 */
export const plusHomeHero = {
  /** Centered dashboard screenshot (`1714:2168`). */
  landingDashboard: "https://www.figma.com/api/mcp/asset/cd59591c-9ee3-4eea-9508-644a5b17ffc4",
  /** Floating characters around headline (nodes `1714:2169` … `1714:2177`). */
  landingOrnamentPinkPlus: "/figma/home/ornament-pink-plus.png",
  landingOrnamentPurpleX: "/figma/home/ornament-purple-x.png",
  landingOrnamentDivide: "/figma/home/ornament-divide.png",
  landingOrnamentGreenGt: "/figma/home/ornament-green-gt.png",
  landingOrnamentEquals: "/figma/home/ornament-equals.png",
  /** Figma `1940:2273` — small character figure, lower hero area. */
  landingCharacterFigure: "/figma/home/ornament-character-figure.png",
  collageTopLeft: "https://www.figma.com/api/mcp/asset/44143310-9614-4417-958f-067804bbe158",
  collageTopRight: "https://www.figma.com/api/mcp/asset/45be58bd-c40e-41e0-8352-5aea81a15f3e",
  collageBottomLeft: "https://www.figma.com/api/mcp/asset/07b1e2a8-fd0b-4bba-a4da-b031c9f8dce8",
  collageBottomRight: "https://www.figma.com/api/mcp/asset/76edd0d5-351e-4762-8b8b-d600f58a4789",
  toastAvatarA: "https://www.figma.com/api/mcp/asset/e85a48b6-ab99-46f3-904a-747dec86ee22",
  toastAvatarB: "https://www.figma.com/api/mcp/asset/92620278-302a-4e92-aac4-4028a66683e4",
  doodleX: "https://www.figma.com/api/mcp/asset/3e240f99-03b2-4afa-adfb-4c81f24f8e6b",
  doodleBottom: "https://www.figma.com/api/mcp/asset/1d33df33-be38-49bb-a299-24079530140f",
  /** "Our Awards" row inside landing hero — Figma `1732:3947` (Homepage `1714:1883`). */
  landingAwardEdTech: "/figma/home/award-edtech.png",
  landingAwardBestDemo: "/figma/home/award-best-demo.png",
  landingAwardCodie: "/figma/home/award-codie.png",
  landingAwardIela: "/figma/home/award-iela.png",
} as const

export const plusHomeTestimonialAvatars = {
  student: "/figma/home/testimonial-student.png",
  district: "/figma/home/testimonial-district.png",
  teacher: "/figma/home/testimonial-teacher.png",
} as const

/**
 * Impact — "Serving Low-Income Students" (Figma `1714:1912` layout + assets).
 */
export const plusHomeImpactDecor = {
  equalSign: "/figma/home/impact-equal-sign.png",
  iconSchools: "/figma/home/impact-icon-schools.svg",
  iconTutors: "/figma/home/impact-icon-tutors.svg",
  iconStudents: "/figma/home/impact-icon-students.svg",
} as const

/** Figma `1602:1966` (Our Awards) — award marks + header character */
export const plusHomeAwards = {
  edTechFinalist: "/figma/home/awards-edtech-finalist.png",
  bestDemo: "/figma/home/awards-best-demo.png",
  /** Green character beside Testimonials heading — `1602:1964`. */
  headerDecor: "/figma/home/testimonials-green-character.png",
  headerCharacter: "/figma/home/awards-header-character.png",
} as const

/** Figma `1714:1956` — US map (472px-tall frame). */
export const plusHomeImpactMap = "/figma/home/impact-map.png"

/**
 * Figma `1714:1957` Smart Tech, Smarter Learning — pink bento + layered screenshots.
 * Layout: Supervisor + AI Tutor side-by-side (row 1), Collaborative Goal Setting full-width (row 2).
 * `supervisor` / `aiTutor` / `goalSetting` = single composites for small viewports.
 */
export const plusHomeSmartTech = {
  supervisor: "https://www.figma.com/api/mcp/asset/b54ac288-9952-41dc-a8bb-e0ff9fbd261a",
  aiTutor: "https://www.figma.com/api/mcp/asset/5ac6cbb5-4443-4329-a757-7d03d242a188",
  goalSetting: "https://www.figma.com/api/mcp/asset/f1944517-229f-4adf-9f76-de7f027edec0",
  /** Supervisor card — back (`1714:1974`) / front (`1714:1975`). */
  supervisorLayerBack: "/figma/home/smarttech-supervisor-back.png",
  supervisorLayerFront: "/figma/home/smarttech-supervisor-front.png",
  /** AI tutor card — back (`1714:1986`) / front (`1714:1987`). */
  aiTutorLayerBack: "/figma/home/smarttech-aitutor-back.png",
  aiTutorLayerFront: "/figma/home/smarttech-aitutor-front.png",
  /** Goal setting card — back (`1714:1996`) / front (`1714:1997`). */
  goalLayerBack: "/figma/home/smarttech-goal-back.png",
  goalLayerFront: "/figma/home/smarttech-goal-front.png",
  iconSupervisor: "/figma/home/smarttech-icon-supervisor.svg",
  iconAiTutor: "/figma/home/smarttech-icon-aitutor.svg",
  iconGoal: "/figma/home/smarttech-icon-goal.svg",
  headerDoodle: "/figma/home/smarttech-header-doodle.png",
} as const

/**
 * Figma `1708:2035` Built on the Science of Learning.
 * Layered screenshots (`papersLayer*`) + icon match node layout; stacks kept for fallbacks / older refs.
 */
export const plusHomeScience = {
  iconPapers: "/figma/home/icon-papers.svg",
  /** Back (paper) / front (table UI) — `1709:2116`, `1709:2114`. */
  papersLayerBack: "/figma/home/science-papers-back.png",
  papersLayerFront: "/figma/home/science-papers-front.png",
  /** Header decor in white frame — `1708:2077`. */
  headerDoodle: "/figma/home/science-header-doodle.png",
} as const
