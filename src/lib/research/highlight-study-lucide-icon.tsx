import type { ComponentType, SVGAttributes } from "react"
import {
  BadgeCheck,
  BookMarked,
  BookOpen,
  Bot,
  Boxes,
  Braces,
  Brain,
  Calculator,
  ClipboardCheck,
  ClipboardList,
  Compass,
  Cpu,
  FileSpreadsheet,
  Flame,
  FlaskConical,
  Gamepad2,
  Gauge,
  Gem,
  GitBranch,
  Globe2,
  GraduationCap,
  Languages,
  Layers,
  Lightbulb,
  MessageSquare,
  MessagesSquare,
  Microscope,
  Network,
  PenLine,
  Puzzle,
  Radar,
  Rocket,
  Scale,
  ScanSearch,
  School,
  Share2,
  Shield,
  Sparkles,
  Telescope,
  TrendingUp,
  Users,
  Video,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"

type LucideLike = ComponentType<
  Omit<SVGAttributes<SVGSVGElement>, "ref"> & { strokeWidth?: number }
>

/**
 * Normalize title for cheap keyword routing (accent folding, lowercase, spaced).
 */
function highlightTitleHaystack(title: string): string {
  const folded = title
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
  return ` ${folded.replace(/\s+/g, " ").trim()} `
}

/** DJB2 — stable tiny hash for icon variety when keywords don’t match. */
function highlightTitleIconHash(title: string): number {
  let h = 5381
  for (let i = 0; i < title.length; i += 1) {
    h = (h << 5) + h + title.charCodeAt(i)
    h >>>= 0
  }
  return h
}

/**
 * Visually distinct silhouettes — no two feel like the same glyph family.
 */
const FALLBACK_ICON_POOL = [
  Telescope,
  Rocket,
  Compass,
  Radar,
  Gem,
  Gauge,
  Network,
  Share2,
  GitBranch,
  Boxes,
  Braces,
  Globe2,
  ScanSearch,
  BadgeCheck,
  FileSpreadsheet,
  Shield,
  Zap,
  School,
  BookOpen,
] as const satisfies readonly LucideLike[]

/** First matching pattern wins — specific phrases before loose substrings; avoid giant “student/learning” catch-alls (they drowned out variety). */
const HIGHLIGHT_ICON_RULES: ReadonlyArray<{
  patterns: readonly string[]
  Icon: LucideLike
}> = [
  { patterns: [" large language ", " llm ", " gpt-", " chatgpt ", " generative ai ", " diffusion ", " dall-e ", " midjourney ", " multimodal lm "], Icon: Sparkles },
  { patterns: [" nlp ", "natural language ", " tokenization ", " embedding ", "sentence "], Icon: Languages },
  { patterns: [" transformer ", "attention mechanism ", "few-shot"], Icon: Braces },
  { patterns: [" graph neural ", "social network ", " knowledge graph"], Icon: Share2 },
  { patterns: [" chatbot ", " conversational agent ", " dialog system ", "dialogue"], Icon: Bot },
  { patterns: [" computer vision ", " image ", " multimodal ", " video-based ", " video analysis ", "speech"], Icon: Video },
  { patterns: [" interface ", "dashboard", " prototyping ", "prototype", "design study", " user study ", "usability", "wireframe"], Icon: Layers },
  { patterns: [" randomiz", " rct ", " controlled trial", "experiment", " longitudinal ", " longitudinal study"], Icon: FlaskConical },
  { patterns: [" survey ", " questionnaire ", " thematic analysis ", "-coded", "coding scheme"], Icon: ClipboardList },
  { patterns: [" interview ", " focus group ", " ethnograph"], Icon: ClipboardCheck },
  { patterns: [" assess", "exam ", "quiz ", "rubric", "item response"], Icon: BadgeCheck },
  { patterns: [" cognitive ", "cognition ", " reasoning ", "mental model", " metacognition"], Icon: Brain },
  { patterns: [" feedback ", " rubric ", " scoring ", " rating "], Icon: MessageSquare },
  { patterns: [" tutor ", " tutors ", " teaching ", " teacher ", " pedagogy ", " instructional ", " facilitation "], Icon: Users },
  { patterns: [" training ", " certify", " onboarding ", " professional development ", "coach"], Icon: GraduationCap },
  { patterns: [" workflow ", " orchestration ", " pipeline ", " process model"], Icon: Workflow },
  { patterns: [" tool ", " toolkit ", " plugin ", " scaffold", " system design"], Icon: Wrench },
  { patterns: [" math ", " algebra ", "arithmetic ", " equation ", "fraction", "geometry", " calculus "], Icon: Calculator },
  { patterns: [" reading ", " writing ", " literacy ", "essay", " discourse "], Icon: PenLine },
  { patterns: [" retention ", " achievement ", " outcomes ", " performance ", "improvement", "growth"], Icon: TrendingUp },
  { patterns: [" predict", " forecast", "regression", "classifier"], Icon: Gauge },
  { patterns: [" optimization ", " personalize", " adaptiv", "recommend"], Icon: Radar },
  { patterns: [" ethics ", " fair ", " bias ", " equitable ", "privacy", "policy", "trustworthy"], Icon: Scale },
  { patterns: [" game ", "gaming", " gamif", " playful "], Icon: Gamepad2 },
  { patterns: [" puzzle ", "problem-solving", " problem solving"], Icon: Puzzle },
  { patterns: [" microworld", " simulation ", "simulate"], Icon: Cpu },
  { patterns: [" case study ", " observation ", " contextual ", " qualitative "], Icon: Microscope },
  { patterns: [" insight ", " formative ", " exploratory "], Icon: Lightbulb },
  { patterns: [" curriculum ", " courseware ", " module ", " lesson "], Icon: BookMarked },
  { patterns: [" collaborat", " team ", " pair ", " cohort ", "community"], Icon: MessagesSquare },
  { patterns: [" motive", "engage", " interest ", "enjoy"], Icon: Flame },
  { patterns: [" school ", "classroom ", " k-12", " kindergarten ", " middle school"], Icon: School },
  { patterns: [" parent ", " family ", " home ", "caregiver"], Icon: Globe2 },
  { patterns: [" scale ", " rollout ", " deploy", "district", "national"], Icon: Network },
  { patterns: [" model ", "framework", " architecture ", " taxonomy"], Icon: Boxes },
  { patterns: [" cost", "budget", " resource "], Icon: Gem },
  { patterns: [" error ", " mistake ", "self-correct"], Icon: ScanSearch },
  { patterns: [" safety ", " risk ", " harm ", "moderation"], Icon: Shield },
  { patterns: [" novel", "toward ", " rethinking"], Icon: Rocket },
]

export function highlightStudyLucideIconForTitle(title: string): LucideLike {
  const hay = highlightTitleHaystack(title.trim())
  for (const { patterns, Icon } of HIGHLIGHT_ICON_RULES) {
    if (patterns.some((p) => hay.includes(p))) return Icon
  }
  const i = highlightTitleIconHash(title) % FALLBACK_ICON_POOL.length
  return FALLBACK_ICON_POOL[i]
}

export function HighlightStudyLucideGlyph({
  title,
  className,
  strokeWidth = 2.25,
}: {
  title: string
  className?: string
  strokeWidth?: number
}) {
  const Icon = highlightStudyLucideIconForTitle(title)
  return (
    <Icon className={cn("size-6 shrink-0", className)} strokeWidth={strokeWidth} aria-hidden />
  )
}
