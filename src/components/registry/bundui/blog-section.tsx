import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type BunduiBlogPost = {
  title: string
  category: string
  readingTime: string
}

type BunduiBlogSectionProps = {
  posts?: BunduiBlogPost[]
  className?: string
}

/** Bundui-inspired blog listing section for marketing content. */
const BunduiBlogSection = ({
  posts = [
    {
      title: "Designing registry-first marketing systems",
      category: "Playbook",
      readingTime: "6 min read",
    },
    {
      title: "How we wire Storybook to production components",
      category: "Case study",
      readingTime: "8 min read",
    },
    {
      title: "Bundui, Tailark, and Cult UI in one stack",
      category: "Guide",
      readingTime: "5 min read",
    },
  ],
  className,
}: BunduiBlogSectionProps) => {
  return (
    <section
      className={cn(
        "rounded-3xl border border-border/70 bg-background/80 px-6 py-10 sm:px-10 sm:py-12",
        className
      )}
    >
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Resources
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Latest from the Plus marketing journal.
          </h2>
          <p className="text-sm text-muted-foreground">
            Inspired by Bundui blog sections. Use for changelogs, case studies, and launch notes.
          </p>
        </div>
        <Button size="sm" variant="outline">
          View all articles
        </Button>
      </header>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.title}
            className="flex h-full flex-col justify-between rounded-2xl border border-border/70 bg-card/80 p-5 text-sm shadow-sm"
          >
            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {post.category}
              </p>
              <h3 className="text-sm font-semibold tracking-tight">{post.title}</h3>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">{post.readingTime}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export { BunduiBlogSection }

