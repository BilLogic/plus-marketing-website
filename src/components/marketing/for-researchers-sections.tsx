"use client"

import {
  ArrowRight,
  ExternalLink,
  FileText,
  LayoutGrid,
  Presentation,
  Search,
  TableIcon,
  Video,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants, plusNavCtaLinkClassName } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { marketingTypography } from "@/lib/marketing-typography"
import { forResearchersSectionIds } from "@/lib/plus-footer-ia"
import { forResearchersAssets } from "@/components/marketing/for-researchers-assets"
import {
  RESEARCH_GENRE_TAGS,
  sortResearchGenresForDisplay,
} from "@/lib/research/research-genres"
import type { ResearchPaper, TeamMember } from "@/lib/notion/types"

/** IA RecentStudiesBento (Figma 1477:4017) — studies + descriptions per variant */
const RESEARCH_HIGHLIGHT_TOPICS = [
  {
    id: "student-learning",
    title: "Student Learning",
    description: "Examining scalable tutoring solutions to support diverse math learners.",
    icon: forResearchersAssets.highlights.studentLearningIcon,
    studies: [
      "The Neglected 15%: Positive Effects of Hybrid Human-AI Tutoring Among Students with Disabilities",
      "Predicting Long-Term Student Outcomes from Short-Term EdTech Log Data",
    ],
  },
  {
    id: "gen-ai",
    title: "Gen AI",
    description:
      "Exploring how to use large language models (LLMs) to deliver explanatory tutor feedback.",
    icon: forResearchersAssets.highlights.genAiIcon,
    studies: [
      "Do Tutors Learn from Equity Training and Can Generative AI Assess It?",
      "Does Multiple Choice Have a Future in the Age of Generative AI? A Posttest-only RCT",
    ],
  },
  {
    id: "tutor-training",
    title: "Tutor Training",
    description:
      "Creating scenario-based, learner-centric solutions that improve tutor performance.",
    icon: forResearchersAssets.highlights.tutorTrainingIcon,
    studies: [
      "How Can I Get It Right? Using GPT to Rephrase Incorrect Trainee Responses",
      "Learning and AI Evaluation of Tutors Responding to Students Engaging in Negative Self-Talk",
    ],
  },
] as const

const RESEARCH_SUCCESS_STORIES = [
  { title: "Story 1 Title", icon: forResearchersAssets.successStories.icon1 },
  { title: "Story 2 Title", icon: forResearchersAssets.successStories.icon2 },
] as const

/** Match `for-schools-sections` — Community / Benefits / Oversight section headers. */
const sectionHeaderH2 =
  "text-pretty text-lg font-bold tracking-tight text-teal-950 sm:text-2xl md:text-3xl"
const sectionHeaderLead =
  "text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg"
/** Same as SchoolsCommunitySection / SchoolsTrainingSection mascot column. */
const sectionHeaderDecor =
  "pointer-events-none h-[clamp(4.5rem,18vw,10.9375rem)] w-[clamp(3.75rem,24vw,12rem)] shrink-0 object-contain sm:h-32 sm:w-[7.25rem] md:h-40 md:w-36 lg:h-[175px] lg:w-[193px]"
/** SchoolsSuccessStoriesSection header row — slightly wider gaps + compact decor. */
const successStoriesHeaderDecor =
  "pointer-events-none h-[clamp(4.5rem,18vw,9.375rem)] w-auto shrink-0 object-contain sm:h-32 md:h-36 lg:h-[150px] lg:w-[165px]"

const HI_ACCENT = "text-[#c05053]"
const HI_BORDER = "border-[#c05053]"
const HI_PINK = "bg-[#ffeaea]"
/** Figma IA: search & neutral chrome */
const FIELD_BORDER = "border-gray-600"

export const ResearchersHeroSection = () => {
  const { division, multiplication, equal } = forResearchersAssets.heroDecor
  return (
    <section className="relative flex min-h-[calc(100svh-5.5rem)] flex-col justify-center overflow-hidden">
      <img
        alt=""
        src={division}
        className="pointer-events-none absolute left-2 top-12 hidden h-[7rem] w-[7rem] object-contain sm:left-4 sm:top-16 md:top-20 sm:block md:h-40 md:w-40"
        aria-hidden
      />
      <img
        alt=""
        src={multiplication}
        className="pointer-events-none absolute bottom-12 left-8 hidden h-[7rem] w-[7rem] object-contain sm:bottom-16 sm:left-10 md:bottom-20 sm:block md:h-40 md:w-40"
        aria-hidden
      />
      <img
        alt=""
        src={equal}
        className="pointer-events-none absolute right-2 bottom-12 hidden h-[7rem] w-[7rem] object-contain sm:right-5 sm:bottom-16 md:bottom-20 sm:block md:h-40 md:w-40"
        aria-hidden
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-4 py-12 text-center sm:gap-10 sm:px-6 sm:py-16 md:py-20">
        <h1 className="flex flex-col items-center gap-3 sm:gap-4">
          <span className="text-2xl font-semibold text-teal-900 sm:text-3xl">
            For researchers
          </span>
          <span className={cn(marketingTypography.heroH1, "max-w-prose")}>
            Pioneering Lab Research, Socio-Technical Support for Every Learning Environment
          </span>
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <Link
            href="/research"
            className={cn(
              plusNavCtaLinkClassName,
              "h-12 min-w-[12.5rem] justify-center px-10 text-base"
            )}
          >
            Our publications
          </Link>
          <Link
            href={`#${forResearchersSectionIds.researchers}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "navCta" }),
              "h-12 min-w-[12.5rem] justify-center rounded-full border-2 border-teal-900 bg-white px-10 text-base text-teal-950 hover:bg-teal-50"
            )}
          >
            Our researchers
          </Link>
        </div>
      </div>
    </section>
  )
}

const SectionHeader = ({
  title,
  description,
  decor,
}: {
  title: string
  description: string
  decor: string
}) => (
  <div className="flex w-full flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
    <div className="min-w-0 flex-1 basis-0 space-y-3 sm:space-y-4 md:space-y-5">
      <h2 className={sectionHeaderH2}>{title}</h2>
      <p className={sectionHeaderLead}>{description}</p>
    </div>
    <img alt="" src={decor} className={sectionHeaderDecor} aria-hidden />
  </div>
)

export const ResearchPartnersSection = () => {
  return (
    <section id={forResearchersSectionIds.partners} className="space-y-6 sm:space-y-8 lg:space-y-10">
      <SectionHeader
        title="Our Research Partners"
        description="A strategic alliance of world-class universities and industry leaders committed to rigorous learning engineering at scale."
        decor={forResearchersAssets.partners.decor}
      />
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-12 md:grid-cols-4 md:gap-x-[50px]">
        {forResearchersAssets.partners.logos.map((logo) => (
          <div
            key={logo}
            className="flex aspect-[4/3] max-h-[200px] items-center justify-center rounded-2xl bg-white p-4 md:max-h-[240px]"
          >
            <img alt="" src={logo} className="max-h-full w-full object-contain" aria-hidden />
          </div>
        ))}
      </div>
    </section>
  )
}

export const ResearchHighlightsSection = () => {
  const [activeTopicId, setActiveTopicId] = useState<
    (typeof RESEARCH_HIGHLIGHT_TOPICS)[number]["id"]
  >(RESEARCH_HIGHLIGHT_TOPICS[0].id)

  const activeTopic =
    RESEARCH_HIGHLIGHT_TOPICS.find((t) => t.id === activeTopicId) ?? RESEARCH_HIGHLIGHT_TOPICS[0]

  const selectTopic = (id: (typeof RESEARCH_HIGHLIGHT_TOPICS)[number]["id"]) => {
    setActiveTopicId(id)
  }

  return (
    <section id={forResearchersSectionIds.highlights} className="space-y-6 sm:space-y-8 lg:space-y-10">
      <SectionHeader
        title="Our Latest Research Highlights"
        description="Explore our most recent findings in generative artificial intelligence, tutor training, and student learning."
        decor={forResearchersAssets.highlights.decor}
      />

      {/* Bento: selected column expands (Figma 1477:4017); hover + click + keyboard sync studies below */}
      <div
        className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-[29px]"
        role="tablist"
        aria-label="Research highlight categories"
      >
        {RESEARCH_HIGHLIGHT_TOPICS.map((topic) => {
          const isActive = activeTopicId === topic.id
          return (
            <article
              key={topic.id}
              role="tab"
              tabIndex={0}
              aria-selected={isActive}
              id={`highlight-tab-${topic.id}`}
              aria-controls="highlight-studies-panel"
              onClick={() => selectTopic(topic.id)}
              onMouseEnter={() => selectTopic(topic.id)}
              onFocus={() => selectTopic(topic.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  selectTopic(topic.id)
                }
              }}
              className={cn(
                "flex min-h-0 min-w-0 cursor-pointer flex-col rounded-[30px] px-7 outline-none",
                "transition-[flex-grow,padding,background-color,border-color] duration-300 ease-out",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700",
                "py-8 lg:min-h-[234px] lg:py-[31px]",
                isActive ? cn(HI_PINK, "border-2 border-transparent lg:flex-[2] lg:py-8") : cn("border-2 bg-white lg:flex-1", HI_BORDER, "lg:py-[37px]")
              )}
            >
              <div className="flex min-h-0 flex-col gap-[9px]">
                <img alt="" src={topic.icon} className="size-[58px] shrink-0" aria-hidden />
                <h3 className={cn(marketingTypography.bentoTitle, HI_ACCENT)}>
                  {topic.title}
                </h3>
                <p
                  className={cn(
                    marketingTypography.lead,
                    "max-w-none transition-opacity duration-300",
                    isActive ? "opacity-100" : "sr-only"
                  )}
                >
                  {topic.description}
                </p>
              </div>
            </article>
          )
        })}
      </div>

      <div
        key={activeTopicId}
        id="highlight-studies-panel"
        role="tabpanel"
        aria-labelledby={`highlight-tab-${activeTopicId}`}
        className="grid grid-cols-1 gap-7 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200 lg:grid-cols-2 lg:gap-[29px]"
      >
        {activeTopic.studies.map((study) => (
          <article
            key={study}
            className={cn(
              "flex min-h-[200px] flex-col justify-between rounded-[30px] border-2 bg-white px-8 py-8 lg:min-h-[227px]",
              HI_BORDER
            )}
          >
            <h4 className={cn(marketingTypography.h3, "text-pretty", HI_ACCENT)}>
              {study}
            </h4>
            <div className={cn("mt-8 flex items-center justify-end gap-2.5", HI_ACCENT)}>
              <span className="text-sm font-semibold">Read study</span>
              <ArrowRight className="size-6 shrink-0" aria-hidden />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function parseResearchYear(publishDate: string): string {
  const parts = publishDate.split("/")
  if (parts.length === 3) {
    const y = new Date(+parts[2], +parts[0] - 1, +parts[1]).getFullYear()
    return Number.isNaN(y) ? "" : String(y)
  }
  const y = new Date(publishDate).getFullYear()
  return Number.isNaN(y) ? "" : String(y)
}

function formatAuthorsShort(authors: string[]) {
  if (authors.length === 0) return ""
  if (authors.length <= 2) return authors.join(", ")
  return `${authors[0]}, ${authors[1]} et al.`
}

/** Cropped scroll region — keeps the section short; mirrors `/research` view modes. */
const INDEX_PREVIEW_SCROLL =
  "max-h-[min(26rem,50svh)] overflow-y-auto overscroll-y-contain min-h-0 scroll-smooth sm:max-h-[min(30rem,55svh)]"

/** Research Index — dark yellow titles + CTA; light yellow tab selection only (`globals.css` yellow scale). */
const INDEX_TITLE = "text-yellow-900"
const INDEX_TITLE_LINK =
  "text-yellow-900 underline-offset-2 hover:!text-yellow-900 hover:underline"
/** Cards / Table toggle — selected state */
const INDEX_TAB_ACTIVE =
  "data-active:bg-yellow-100 data-active:text-yellow-950 dark:data-active:bg-yellow-100/80"
/** Tag filter chips — selected state (matches tab yellow) */
const INDEX_TAG_SELECTED =
  "border-yellow-900/35 bg-yellow-100 text-yellow-950 hover:bg-yellow-100 hover:text-yellow-950 dark:bg-yellow-100/80 dark:text-yellow-950 dark:hover:bg-yellow-100/80"
const INDEX_CTA_LINK =
  "inline-flex rounded-full border-2 border-yellow-900 bg-white px-8 text-yellow-900 no-underline hover:!border-yellow-900 hover:!bg-white hover:!text-yellow-900 dark:hover:!bg-white"

function IndexPaperTableRow({ paper }: { paper: ResearchPaper }) {
  const year = parseResearchYear(paper.publishDate) || "\u2014"
  return (
    <TableRow>
      <TableCell className="max-w-md whitespace-normal font-medium">
        {paper.paperLink ? (
          <a
            href={paper.paperLink}
            target="_blank"
            rel="noopener noreferrer"
            className={INDEX_TITLE_LINK}
          >
            {paper.title}
          </a>
        ) : (
          <span className={INDEX_TITLE}>{paper.title}</span>
        )}
      </TableCell>
      <TableCell className="max-w-[min(12rem,26vw)] whitespace-normal align-top">
        {(paper.topics ?? []).length === 0 ? (
          <span className="text-muted-foreground">\u2014</span>
        ) : (
          <div className="flex flex-wrap gap-1">
            {sortResearchGenresForDisplay(paper.topics ?? []).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </TableCell>
      <TableCell className="max-w-[min(14rem,28vw)] whitespace-normal">
        <div className="flex flex-wrap gap-1">
          {paper.authors.map((author) => (
            <Link
              key={author}
              href={`/research?author=${encodeURIComponent(author)}`}
              className="inline-flex"
            >
              <Badge variant="secondary" className="text-xs">
                {author}
              </Badge>
            </Link>
          ))}
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">{year}</TableCell>
      <TableCell className="max-w-[10rem] whitespace-normal text-muted-foreground italic">
        {paper.venue ?? "\u2014"}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-0.5">
          {paper.paperLink ? (
            <a
              href={paper.paperLink}
              target="_blank"
              rel="noopener noreferrer"
              title="PDF"
              className="inline-flex size-7 items-center justify-center rounded-md text-foreground hover:bg-muted"
            >
              <FileText className="size-3.5" aria-hidden />
            </a>
          ) : null}
          {paper.videoLink ? (
            <a
              href={paper.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              title="Video"
              className="inline-flex size-7 items-center justify-center rounded-md text-foreground hover:bg-muted"
            >
              <Video className="size-3.5" aria-hidden />
            </a>
          ) : null}
          {paper.presentationLink ? (
            <a
              href={paper.presentationLink}
              target="_blank"
              rel="noopener noreferrer"
              title="Slides"
              className="inline-flex size-7 items-center justify-center rounded-md text-foreground hover:bg-muted"
            >
              <Presentation className="size-3.5" aria-hidden />
            </a>
          ) : null}
        </div>
      </TableCell>
    </TableRow>
  )
}

function ResearchIndexSearchForm() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  return (
    <form
      role="search"
      className="block"
      onSubmit={(e) => {
        e.preventDefault()
        const params = new URLSearchParams()
        if (query.trim()) params.set("q", query.trim())
        router.push(`/research${params.toString() ? `?${params}` : ""}`)
      }}
    >
      <label className="block">
        <span className="sr-only">Search publications — opens the full Research &amp; Publications page</span>
        <div
          className={cn(
            "flex h-16 items-center gap-3 rounded-full border-2 bg-white px-6",
            FIELD_BORDER
          )}
        >
          <Search className="size-6 shrink-0 text-gray-900" aria-hidden />
          <input
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search papers by title, author, or keyword…"
            className="min-w-0 flex-1 border-0 bg-transparent text-base text-foreground placeholder:text-muted-foreground sm:text-lg focus:outline-none focus:ring-0"
            autoComplete="off"
          />
        </div>
      </label>
    </form>
  )
}

export const ResearchIndexSection = ({
  papers,
  totalCount,
}: {
  papers: ResearchPaper[]
  totalCount: number
}) => {
  const [tagFilter, setTagFilter] = useState<"all" | string>("all")

  const filteredPapers = useMemo(() => {
    if (tagFilter === "all") return papers
    return papers.filter((p) => (p.topics ?? []).includes(tagFilter))
  }, [papers, tagFilter])

  return (
    <section id={forResearchersSectionIds.index} className="space-y-6 sm:space-y-8 lg:space-y-10">
      <SectionHeader
        title="Research Index"
        description="Recent peer-reviewed work from the PLUS team. Tags summarize each paper at a glance—filter the preview by tag or open the full catalogue on Research & Publications."
        decor={forResearchersAssets.index.decor}
      />
      <ResearchIndexSearchForm />

      {papers.length === 0 ? (
        <div
          className={cn(
            "rounded-[30px] border-2 bg-white px-6 py-10 text-center",
            FIELD_BORDER
          )}
        >
          <p className="text-pretty text-muted-foreground">
            Publications could not be loaded right now. Browse the archive directly on the Research
            &amp; Publications page.
          </p>
          <Link href="/research" className={cn(plusNavCtaLinkClassName, "mt-6")}>
            Open publications
          </Link>
        </div>
      ) : (
        <div
          className={cn(
            "overflow-hidden rounded-[30px] border-2 bg-white",
            FIELD_BORDER
          )}
        >
          <Tabs defaultValue="cards" className="gap-0">
            <div className="flex flex-col gap-3 border-b border-border/80 bg-muted/25 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p className="text-pretty text-sm text-muted-foreground">
                Showing {filteredPapers.length} of {papers.length} in this preview · {totalCount}{" "}
                total in catalogue (newest first)
                {tagFilter !== "all" ? (
                  <span className="text-foreground"> · Tag: {tagFilter}</span>
                ) : null}
              </p>
              <TabsList className="w-full sm:w-auto" aria-label="Publication preview layout">
                <TabsTrigger value="cards" className={cn("gap-1.5", INDEX_TAB_ACTIVE)}>
                  <LayoutGrid className="size-4" aria-hidden />
                  Cards
                </TabsTrigger>
                <TabsTrigger value="table" className={cn("gap-1.5", INDEX_TAB_ACTIVE)}>
                  <TableIcon className="size-4" aria-hidden />
                  Table
                </TabsTrigger>
              </TabsList>
            </div>

            <div
              className="flex flex-col gap-2 border-b border-border/80 bg-muted/15 px-4 py-3 sm:px-5"
              role="group"
              aria-label="Filter publications by tag"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Tags
              </span>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className={cn(
                    tagFilter === "all" ? INDEX_TAG_SELECTED : "bg-background"
                  )}
                  aria-pressed={tagFilter === "all"}
                  onClick={() => setTagFilter("all")}
                >
                  All
                </Button>
                {RESEARCH_GENRE_TAGS.map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    size="sm"
                    variant="outline"
                    className={cn(
                      tagFilter === tag ? INDEX_TAG_SELECTED : "bg-background"
                    )}
                    aria-pressed={tagFilter === tag}
                    onClick={() => setTagFilter(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            <TabsContent value="cards" className={cn("mt-0 p-4 sm:p-5", INDEX_PREVIEW_SCROLL)} tabIndex={0}>
              {filteredPapers.length === 0 ? (
                <p className="text-pretty px-1 py-6 text-center text-sm text-muted-foreground">
                  No papers in this preview match that tag. Open the full catalogue to search the
                  archive.
                </p>
              ) : (
                <ul className="flex flex-col gap-3 pr-1">
                  {filteredPapers.map((paper) => {
                    const year = parseResearchYear(paper.publishDate)
                    const authorsLine = formatAuthorsShort(paper.authors)
                    return (
                      <li
                        key={paper.id}
                        className={cn(
                          "rounded-[24px] border border-border/80 bg-background/80 px-4 py-3 transition-colors sm:px-5 sm:py-3.5",
                          "hover:bg-muted/40"
                        )}
                      >
                        <div className="min-w-0 space-y-1.5">
                          <h3 className={cn("text-pretty font-semibold leading-snug", INDEX_TITLE)}>
                            {paper.paperLink ? (
                              <a
                                href={paper.paperLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn("inline-flex items-start gap-1.5", INDEX_TITLE_LINK)}
                              >
                                {paper.title}
                                <ExternalLink
                                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                                  aria-hidden
                                />
                              </a>
                            ) : (
                              paper.title
                            )}
                          </h3>
                          {(paper.topics ?? []).length > 0 ? (
                            <div className="flex flex-wrap gap-1.5" aria-label="Genres">
                              {sortResearchGenresForDisplay(paper.topics ?? []).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs font-normal text-foreground"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          ) : null}
                          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                            {[year, paper.venue, authorsLine].filter(Boolean).join(" · ")}
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </TabsContent>

            <TabsContent value="table" className={cn("mt-0 p-2 sm:p-3", INDEX_PREVIEW_SCROLL)} tabIndex={0}>
              {filteredPapers.length === 0 ? (
                <p className="text-pretty px-3 py-6 text-center text-sm text-muted-foreground">
                  No papers in this preview match that tag. Open the full catalogue to search the
                  archive.
                </p>
              ) : (
                <div className="min-w-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Authors</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Venue</TableHead>
                        <TableHead>Links</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPapers.map((paper) => (
                        <IndexPaperTableRow key={paper.id} paper={paper} />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-center border-t border-border/80 bg-muted/10 px-4 py-4">
            <Link
              href="/research"
              className={cn(
                buttonVariants({ variant: "outline", size: "navCta" }),
                INDEX_CTA_LINK
              )}
            >
              View all publications
              <ArrowRight className="ml-2 size-4 text-yellow-900" aria-hidden />
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

/** One image fills the card header — proxy URL → Notion URL → Figma placeholder. */
function ResearcherCardPhoto({
  memberId,
  name,
  notionPictureUrl,
  placeholderSrc,
}: {
  memberId: string
  name: string
  notionPictureUrl: string | null
  placeholderSrc: string
}) {
  const [src, setSrc] = useState(`/api/team-photo/${memberId}`)

  return (
    <img
      src={src}
      alt={name}
      className="h-full w-full object-cover object-[center_20%]"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        if (src.startsWith("/api/") && notionPictureUrl) {
          setSrc(notionPictureUrl)
          return
        }
        if (src !== placeholderSrc) {
          setSrc(placeholderSrc)
        }
      }}
    />
  )
}

export const ResearchersGridSection = ({ members }: { members: TeamMember[] }) => {
  const fallbackPhoto = forResearchersAssets.researchers.fallbackPhoto

  return (
    <section id={forResearchersSectionIds.researchers} className="space-y-6 sm:space-y-8 lg:space-y-10">
      <SectionHeader
        title="Our Researchers"
        description="Meet our team who are driving evidence-based breakthroughs in learning science, HCI, and artificial intelligence."
        decor={forResearchersAssets.researchers.decor}
      />

      {members.length === 0 ? (
        <p className="text-pretty text-sm text-muted-foreground">
          Researcher profiles will appear here once loaded from our team directory.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => {
            return (
              <article key={member.id} className="flex flex-col overflow-hidden rounded-[30px] bg-white">
                <div className="relative aspect-[344/322] w-full overflow-hidden rounded-t-[30px] bg-muted">
                  <ResearcherCardPhoto
                    memberId={member.id}
                    name={member.name}
                    notionPictureUrl={member.picture}
                    placeholderSrc={fallbackPhoto}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2.5 bg-sky-100 px-6 py-6">
                  <h3 className="text-xl font-bold text-teal-950">{member.name}</h3>
                  {(member.googleScholar || member.linkedIn) && (
                    <p className="text-sm text-teal-950">
                      {member.googleScholar ? (
                        <a
                          href={member.googleScholar}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-800 underline decoration-sky-700 underline-offset-2"
                        >
                          Google Scholar
                        </a>
                      ) : null}
                      {member.googleScholar && member.linkedIn ? (
                        <span className="text-teal-950"> | </span>
                      ) : null}
                      {member.linkedIn ? (
                        <a
                          href={member.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-800 underline decoration-sky-700 underline-offset-2"
                        >
                          LinkedIn
                        </a>
                      ) : null}
                    </p>
                  )}
                  {member.title1 ? (
                    <p className={cn(marketingTypography.body, "text-teal-950")}>{member.title1}</p>
                  ) : null}
                  {member.title2 ? (
                    <p className={cn(marketingTypography.body, "text-teal-950")}>{member.title2}</p>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export const ResearchSuccessStoriesSection = () => {
  return (
    <section
      id={forResearchersSectionIds.successStories}
      className="space-y-10 sm:space-y-12 lg:space-y-14"
    >
      <div className="mx-auto flex w-full max-w-[1124px] flex-col gap-10 sm:gap-12 lg:gap-14">
        <div className="flex w-full flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <div className="min-w-0 flex-1 basis-0 space-y-3 text-left sm:space-y-4 md:space-y-5">
            <h2 className={sectionHeaderH2}>Research Success Story</h2>
            <p className={sectionHeaderLead}>Read what researchers are saying about PLUS.</p>
          </div>
          <img
            alt=""
            src={forResearchersAssets.successStories.decor}
            className={successStoriesHeaderDecor}
            aria-hidden
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          {RESEARCH_SUCCESS_STORIES.map((story) => (
            <article
              key={story.title}
              className="rounded-[30px] border-2 border-green-600/30 bg-[#f4fbf6] p-4"
            >
              <div className="flex min-h-[360px] flex-col justify-center rounded-[26px] bg-white px-8 py-10">
                <div className="space-y-4">
                  <img alt="" src={story.icon} className="size-[58px]" aria-hidden />
                  <h3 className={cn(marketingTypography.h3, "text-3xl font-bold text-green-800")}>
                    {story.title}
                  </h3>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-2.5 text-green-800">
                <span className="text-base font-medium">Read story</span>
                <ArrowRight className="size-6 shrink-0" aria-hidden />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Match `SchoolsRegisterCTA` shell + header typography. */
const COLLABORATE_CTA_CARD =
  "mx-auto w-full max-w-[1022px] overflow-hidden rounded-[30px] bg-white p-8 sm:p-10 md:p-[50px]"

export const ResearchCollaborateCtaSection = () => {
  return (
    <section id={forResearchersSectionIds.collaborate} className="scroll-mt-24">
      <div className={COLLABORATE_CTA_CARD}>
        <div className="flex flex-col items-center gap-12 md:gap-14 lg:gap-[60px]">
          <div className="mx-auto w-full max-w-[49rem] space-y-3 text-center sm:space-y-4 md:space-y-5">
            <h2 className={sectionHeaderH2}>Conduct Research with Us</h2>
            <p className={sectionHeaderLead}>
              Want to get involved? Reach out if you are interested in conducting research with us.
            </p>
          </div>
          <Button
            type="button"
            variant="plusNavCta"
            size="navCta"
            className="h-[45px] min-h-[45px] rounded-full px-10 text-base font-normal"
          >
            Reach out
          </Button>
        </div>
      </div>
    </section>
  )
}
