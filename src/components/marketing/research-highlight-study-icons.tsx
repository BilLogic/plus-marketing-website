"use client"

import {
  Atom,
  Award,
  BadgeCheck,
  BarChart2,
  Binary,
  BookMarked,
  BookOpen,
  BookOpenCheck,
  Bot,
  Brain,
  BrainCircuit,
  Cable,
  Calendar,
  ClipboardCheck,
  ClipboardList,
  Code2,
  Cpu,
  Database,
  Eye,
  FileText,
  FlaskConical,
  GitBranch,
  Globe2,
  GraduationCap,
  Handshake,
  Headphones,
  Heart,
  Layers,
  Library,
  Lightbulb,
  LineChart,
  Medal,
  MessageSquare,
  Mic,
  Microscope,
  Network,
  PenLine,
  Pencil,
  PieChart,
  Presentation,
  Radio,
  School,
  ScrollText,
  Server,
  Sparkles,
  Star,
  Target,
  Terminal,
  Timer,
  Trophy,
  UserCheck,
  UserRound,
  Users,
  UsersRound,
  Video,
  Wand2,
  Workflow,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { ResearchPaper } from "@/lib/notion/types"

/** Must match `/for-researchers` highlight accordion topic ids. */
export type ResearchHighlightStudyIconTopic =
  | "student-learning"
  | "gen-ai"
  | "tutor-training"

function stableIndexFromPaperId(paperId: string, modulo: number): number {
  let h = 0
  for (let i = 0; i < paperId.length; i++) {
    h = (Math.imul(31, h) + paperId.charCodeAt(i)) | 0
  }
  return Math.abs(h) % modulo
}

/**
 * Disjoint Lucide pools per highlight theme (~20 icons each).
 * Choice is deterministic from `paper.id` so thumbnails stay stable.
 */
const STUDENT_LEARNING_ICONS = [
  BookOpen,
  Brain,
  Lightbulb,
  Users,
  School,
  LineChart,
  Target,
  Heart,
  BookMarked,
  Library,
  Pencil,
  ClipboardList,
  BarChart2,
  PieChart,
  FileText,
  ScrollText,
  Globe2,
  Presentation,
  Eye,
] as const

const GEN_AI_ICONS = [
  Cpu,
  Bot,
  Sparkles,
  Wand2,
  Network,
  Binary,
  Code2,
  Terminal,
  Layers,
  GitBranch,
  Workflow,
  Zap,
  Microscope,
  FlaskConical,
  Atom,
  BrainCircuit,
  Database,
  Server,
  Cable,
  Radio,
] as const

const TUTOR_TRAINING_ICONS = [
  GraduationCap,
  UserRound,
  Award,
  Medal,
  Star,
  Handshake,
  MessageSquare,
  UsersRound,
  BookOpenCheck,
  ClipboardCheck,
  Timer,
  Calendar,
  Video,
  Headphones,
  PenLine,
  BadgeCheck,
  Trophy,
  UserCheck,
  Mic,
] as const

const ICONS_BY_TOPIC = {
  "student-learning": STUDENT_LEARNING_ICONS,
  "gen-ai": GEN_AI_ICONS,
  "tutor-training": TUTOR_TRAINING_ICONS,
}

export function pickHighlightStudyLucideIcon(
  paper: ResearchPaper,
  topicId: ResearchHighlightStudyIconTopic
) {
  const pool = ICONS_BY_TOPIC[topicId]
  const i = stableIndexFromPaperId(paper.id, pool.length)
  return pool[i]!
}

export function ResearchHighlightStudyLucideIcon({
  paper,
  topicId,
  className,
  strokeWidth = 2,
}: {
  paper: ResearchPaper
  topicId: ResearchHighlightStudyIconTopic
  className?: string
  strokeWidth?: number
}) {
  const Icon = pickHighlightStudyLucideIcon(paper, topicId)
  return (
    <Icon
      className={cn("size-6 shrink-0", className)}
      strokeWidth={strokeWidth}
      aria-hidden
    />
  )
}
