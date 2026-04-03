import type { ResearchPaper } from "@/lib/notion/types"

/** Canonical marketing tags — match Notion multi-select labels when present. */
export const RESEARCH_GENRE_TAGS = [
  "Student learning",
  "Gen AI",
  "Tutor training",
] as const

export type ResearchGenreTag = (typeof RESEARCH_GENRE_TAGS)[number]

const GENRE_ORDER = new Map<string, number>(
  RESEARCH_GENRE_TAGS.map((tag, i) => [tag, i])
)

/** Stable display order for badges and filters. */
export function sortResearchGenresForDisplay(tags: string[]): string[] {
  return [...tags].sort(
    (a, b) =>
      (GENRE_ORDER.get(a) ?? RESEARCH_GENRE_TAGS.length) -
      (GENRE_ORDER.get(b) ?? RESEARCH_GENRE_TAGS.length)
  )
}

function normalizeTitleKey(title: string): string {
  return title
    .trim()
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[–—-]/g, "-")
}

const CANON_GENRE_BY_LOWER = new Map(
  RESEARCH_GENRE_TAGS.map((tag) => [tag.toLowerCase(), tag])
)

function normalizeNotionTopicsToGenres(topics: string[]): string[] {
  const out: string[] = []
  for (const t of topics) {
    const mapped = CANON_GENRE_BY_LOWER.get(t.trim().toLowerCase())
    if (mapped) out.push(mapped)
  }
  return sortResearchGenresForDisplay([...new Set(out)])
}

/**
 * Curated genres for CSV-seeded cache ids (`research.json`) and matching normalized titles.
 */
const GENRES_BY_PAPER_ID: Record<string, string[]> = {
  "csv-1": ["Student learning"],
  "csv-2": ["Gen AI", "Tutor training"],
  "csv-3": ["Student learning"],
  "csv-4": ["Student learning"],
  "csv-5": ["Gen AI", "Tutor training"],
  "csv-6": ["Student learning"],
  "csv-7": ["Gen AI", "Tutor training"],
  "csv-8": ["Student learning"],
  "csv-9": ["Gen AI", "Tutor training"],
  "csv-10": ["Gen AI", "Tutor training"],
  "csv-11": ["Gen AI", "Student learning"],
  "csv-12": ["Gen AI", "Tutor training"],
  "csv-13": ["Gen AI", "Tutor training"],
  "csv-14": ["Gen AI", "Tutor training"],
  "csv-15": ["Student learning"],
  "csv-16": ["Gen AI", "Tutor training"],
  "csv-17": ["Student learning"],
  "csv-18": ["Gen AI", "Tutor training"],
  "csv-19": ["Gen AI", "Tutor training"],
  "csv-20": ["Student learning", "Gen AI", "Tutor training"],
  "csv-21": ["Tutor training"],
  "csv-22": ["Gen AI", "Tutor training"],
  "csv-23": ["Gen AI", "Student learning"],
  "csv-24": ["Gen AI", "Tutor training"],
  "csv-25": ["Gen AI", "Tutor training"],
  "csv-26": ["Tutor training"],
  "csv-27": ["Tutor training"],
  "csv-28": ["Student learning"],
  "csv-29": ["Student learning", "Tutor training"],
  "csv-30": ["Gen AI", "Student learning"],
  "csv-31": ["Tutor training"],
  "csv-32": ["Tutor training"],
  "csv-33": ["Gen AI", "Tutor training"],
  "csv-34": ["Tutor training"],
  "csv-35": ["Student learning"],
  "csv-36": ["Student learning"],
  "csv-37": ["Student learning"],
  "csv-38": ["Student learning"],
  "csv-39": ["Student learning", "Tutor training"],
  "csv-40": ["Student learning"],
}

const PAPER_TITLE_BY_CSV_ID: Record<string, string> = {
    "csv-1":
      "Intelligent Support for Practice Goal Setting to Enhance Learning",
    "csv-2": "Improving Open‑Response Assessment with LearnLM",
    "csv-3":
      "Engagement and Learning Benefits of Goal Setting with Rewards in Human-AI Tutoring",
    "csv-4": "Human Tutoring Improves the Impact of AI Tutor Use on Learning Outcomes",
    "csv-5":
      "VTutor for high-impact tutoring at scale: Managing engagement and real-time multi-screen monitoring with P2P connections.",
    "csv-6": "Starting Seatwork Earlier as a Valid Measure of",
    "csv-7":
      "Exploring the Benefit of Customizing Feedback Interventions for Educators and Students With Offline Contextual Multi‑Armed Bandits",
    "csv-8": "Predicting Long-Term Student Outcomes from Short-Term EdTech Log Data",
    "csv-9": "Do Tutors Learn from Equity Training and Can Generative AI Assess It?",
    "csv-10":
      "Does Multiple Choice Have a Future in the Age of Generative AI? A Posttest-only RCT",
    "csv-11": "Examining the Use of an AI-Powered Teacher Orchestration Tool at Scale",
    "csv-12":
      "Learning and AI Evaluation of Tutors Responding to Students Engaging in Negative Self-Talk",
    "csv-13": "How Can I Get It Right? Using GPT to Rephrase Incorrect Trainee Responses",
    "csv-14":
      "How Can I Improve? Using GPT to Highlight the Desired and Undesired Parts of Open-ended Responses",
    "csv-15":
      "The Neglected 15%: Positive Effects of Hybrid Human-AI Tutoring Among Students with Disabilities",
    "csv-16":
      "Using Generative AI to Provide Feedback to Adult Tutors in Training and Assess Real-life Performance",
    "csv-17":
      "Improving Student Learning with Hybrid Human-AI Tutoring: A Three-Study Quasi-Experimental Investigation",
    "csv-18":
      "Improving Assessment of Tutoring Practices using Retrieval-Augmented Generation",
    "csv-19":
      "Using Large Language Models to Assess Tutors' Performance in Reacting to Students Making Math Errors",
    "csv-20":
      "Personalized Learning Squared (PLUS): Doubling Math Learning through AI-assisted Tutoring",
    "csv-21":
      "So You Want to Be a Tutor? Professional Development and Scenario-Based Training for Adult Tutors",
    "csv-22":
      "Comparative Analysis of GPT-4 and Human Graders in Evaluating Human Tutors Giving Praise to Students",
    "csv-23": "Towards the Future of AI-Augmented Human Tutoring in Math Learning.",
    "csv-24":
      "Comparative Analysis of Learnersourced Human-Graded and AI-Generated Responses for Autograding Online Tutor Lessons.",
    "csv-25":
      "Using Large Language Models to Provide Explanatory Feedback to Human Tutors",
    "csv-26":
      "When the Tutor Becomes the Student: Design and Evaluation of Efficient Scenario-based Lessons for Tutors.",
    "csv-27": "Scenario-based Training and On-the-Job Support for Equitable Mentoring.",
    "csv-28":
      "Educational Equity Through Combined Human-AI Personalization: A Propensity Matching Evaluation.",
    "csv-29":
      "Personalized Learning ²: A Human Mentoring and AI Tutoring Platform Ensuring Equity Interactive Event.",
    "csv-30": "Designing for Human–AI Complementarity in K-12 Education.",
    "csv-31":
      "Development of Scenario-based Mentor Lessons: An Iterative Design Process for Training at Scale.",
    "csv-32":
      "An Evaluation of Perceptions Regarding Mentor Competencies for Technology-based Personalized Learning.",
    "csv-33": "Supporting Mentoring and Math Instruction with AI Software.",
    "csv-34":
      "Building strategies for a personalized learning mentor app: A design case.",
    "csv-35":
      "Student-Teacher Relationships Drive Student Help-Seeking from Teachers for Math Learning Challenges.",
    "csv-36":
      "Perceptions of Preparedness and Success Inform Undergraduates' Feelings of Belonging.",
    "csv-37":
      "A narrative inquiry of critical moments in students' paths to math success.",
    "csv-38":
      "Comprehensive views of math learners: A case for modeling and supporting non-math factors in adaptive math software.",
    "csv-39":
      "Computer-supported human mentoring for personalized and equitable math learning.",
    "csv-40": "Interactions with peers on the path to math success.",
}

const GENRES_BY_TITLE_KEY: Record<string, string[]> = {}
for (const [id, genres] of Object.entries(GENRES_BY_PAPER_ID)) {
  const title = PAPER_TITLE_BY_CSV_ID[id]
  if (title) {
    GENRES_BY_TITLE_KEY[normalizeTitleKey(title)] = genres
  }
}

function inferGenresFromContent(paper: ResearchPaper): string[] {
  const blob = `${paper.title}\n${paper.abstract ?? ""}\n${paper.shortDescription ?? ""}`
    .toLowerCase()
    .normalize("NFKC")
  const tags = new Set<string>()

  const tutorSignals =
    /tutor training|tutor lesson|trainee|scenario-based|professional development|adult tutor|mentor lesson|mentor training|assessing tutor|tutor performance|tutor responding|equity training|giving effective praise|tutor competencies|remote tutor|undergraduate tutor|novice tutor/
  const genAiSignals =
    /\b(llm|gpt-|gpt |gpt-4|gpt-3|generative ai|large language|chatgpt|learnlm|retrieval-augmented|open.response|open response|fine-tun|ai-powered|artificial intelligence|automated grading|autograding|machine learning|nlp\b)/
  const studentSignals =
    /student learning|learning outcome|achievement|engagement|middle school|students with disabilities|marginalized students|math learning|literacy|k-12|seatwork|goal setting|learning gains|hybrid human-ai|human-ai tutoring|propensity|state test|edtech log|peer interaction|belonging|help-seeking|narrative inquiry|adaptive math/

  if (tutorSignals.test(blob)) tags.add("Tutor training")
  if (genAiSignals.test(blob)) tags.add("Gen AI")
  if (studentSignals.test(blob)) tags.add("Student learning")

  if (tags.size === 0) tags.add("Student learning")

  return sortResearchGenresForDisplay([...tags])
}

/**
 * Resolves canonical genre tags for list views. Prefer Notion when it already uses our labels;
 * then curated id/title maps; then light keyword inference for other Notion page ids.
 */
export function applyResearchGenres(paper: ResearchPaper): ResearchPaper {
  const fromNotion = normalizeNotionTopicsToGenres(paper.topics ?? [])
  if (fromNotion.length > 0) {
    return { ...paper, topics: fromNotion }
  }

  const fromId = GENRES_BY_PAPER_ID[paper.id]
  if (fromId?.length) {
    return { ...paper, topics: sortResearchGenresForDisplay([...fromId]) }
  }

  const key = normalizeTitleKey(paper.title)
  const fromTitle = GENRES_BY_TITLE_KEY[key]
  if (fromTitle?.length) {
    return { ...paper, topics: sortResearchGenresForDisplay([...fromTitle]) }
  }

  return { ...paper, topics: inferGenresFromContent(paper) }
}
