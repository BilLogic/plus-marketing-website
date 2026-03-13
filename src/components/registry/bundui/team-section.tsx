import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type BunduiTeamMember = {
  name: string
  role: string
}

type BunduiTeamSectionProps = {
  members?: BunduiTeamMember[]
  className?: string
}

/** Bundui-inspired team section for showing the people behind the product. */
const BunduiTeamSection = ({
  members = [
    { name: "Ava Chen", role: "Design" },
    { name: "Jordan Lee", role: "Engineering" },
    { name: "Maya Patel", role: "Marketing" },
    { name: "Noah Singh", role: "Product" },
  ],
  className,
}: BunduiTeamSectionProps) => {
  return (
    <section
      className={cn(
        "rounded-3xl border border-border/70 bg-card/80 px-6 py-10 sm:px-10 sm:py-12",
        className
      )}
    >
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Team
        </p>
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          The people building Plus.
        </h2>
        <p className="text-sm text-muted-foreground">
          Inspired by Bundui team sections with compact cards and avatars.
        </p>
      </header>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {members.map((member) => (
          <article
            key={member.name}
            className="flex flex-col items-center rounded-2xl border border-border/70 bg-background/80 px-4 py-5 text-center text-sm shadow-sm"
          >
            <Avatar className="mb-3 size-10">
              <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium text-foreground">{member.name}</p>
            <p className="text-xs text-muted-foreground">{member.role}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export { BunduiTeamSection }

