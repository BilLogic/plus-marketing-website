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

/** Legacy — US map (was used in the older 2×2 impact grid; kept for reference). */
export const plusHomeImpactMap = "/figma/home/impact-map.png"

/**
 * Figma `2127:2274` — “Serving students…” Z-pattern: classroom → school team → remote tutoring
 * (556×472px frames, alternating with 473px-wide text columns, 93px gutter).
 */
export const plusHomeImpactRowStudents = "/figma/home/impact-row-students.png"
export const plusHomeImpactRowSchools = "/figma/home/impact-row-schools.png"
export const plusHomeImpactRowTutors = "/figma/home/impact-row-tutors.png"

/**
 * Figma `1714:1957` Smart Tech, Smarter Learning — pink bento + layered screenshots.
 * Layout: Supervisor + AI Tutor side-by-side (row 1), Collaborative Goal Setting full-width (row 2).
 * Goal row: two PNGs (`goalLeft` / `goalRight`) — Figma `2193:2400`, `2193:2436`.
 */
export const plusHomeSmartTech = {
  goalLeft: "/figma/home/smarttech-goal-left.png",
  goalRight: "/figma/home/smarttech-goal-right.png",
  /** Supervisor — left donut `2193:2305`, right donut `2193:2314` inside `1714:1965` (526×423). */
  supervisorLayerBack: "/figma/home/smarttech-supervisor-back.png",
  supervisorLayerFront: "/figma/home/smarttech-supervisor-front.png",
  /** AI tutor — stacked profile cards `2193:2378` → `2193:2356` → `2193:2326` inside `1714:1976`. */
  aiTutorLayerBack: "/figma/home/smarttech-aitutor-layer-back.png",
  aiTutorLayerMid: "/figma/home/smarttech-aitutor-layer-mid.png",
  aiTutorLayerFront: "/figma/home/smarttech-aitutor-layer-front.png",
  iconSupervisor: "/figma/home/smarttech-icon-supervisor.svg",
  iconAiTutor: "/figma/home/smarttech-icon-aitutor.svg",
  iconGoal: "/figma/home/smarttech-icon-goal.svg",
  headerDoodle: "/figma/home/smarttech-header-doodle.png",
} as const

/**
 * Figma `1714:1998` Built on the Science of Learning (homepage).
 * Right panel: single composite `1714:2017` — conference / venue logo grid.
 */
export const plusHomeScience = {
  iconPapers: "/figma/home/icon-papers.svg",
  /** Right column 556×397 panel — `1714:2017` under `1714:1998`. */
  papersPanel: "/figma/home/science-learning-panel.png",
  /** Header decor in white frame — `1708:2077`. */
  headerDoodle: "/figma/home/science-header-doodle.png",
} as const
