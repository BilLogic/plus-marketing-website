import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Docs/Agent Overview",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** High-level overview of agent docs, rules, and registry coverage. */
export const Overview: Story = {
  render: () => (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            For agents &amp; engineers
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Agent overview &amp; docs surfaces
          </h1>
          <p className="text-sm text-muted-foreground">
            This story summarizes where to find the key rules, skills, and registry
            coverage docs that govern how agents should work in this repo.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">Core rules &amp; skills</h2>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>
              <code>.agent/rules/100-project-context.md</code> — mission, tech stack,
              theme tokens, and Compound Engineering philosophy.
            </li>
            <li>
              <code>.agent/rules/102-agent-capabilities.md</code> — available MCP servers,
              skills, and how to proactively use them.
            </li>
            <li>
              <code>.agent/skills/frontend-design/SKILL.md</code> — design quality bar and
              OKLCH token usage.
            </li>
            <li>
              <code>.agent/skills/compound-engineering/SKILL.md</code> — brainstorm/plan/work/
              review/compound workflows for this repo.
            </li>
            <li>
              <code>docs/AGENT_HANDOFF.md</code> — initialization prompt and CRUD playbook.
            </li>
            <li>
              <code>docs/deletion-playbook.md</code> — detailed deletion and deprecation rules
              for components, templates, pages, docs, and skills.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">Registry coverage</h2>
          <p className="text-sm text-muted-foreground">
            The file <code>docs/registry-coverage.md</code> tracks which shadcn/ui primitives,
            Bundui/Tailark/Cult UI blocks, and effects/templates are documented in Storybook.
            When adding or updating blocks, always keep this checklist in sync.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">Where to start</h2>
          <p className="text-sm text-muted-foreground">
            New agents should read the handoff prompt, rules, and skills, then explore:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>
              <strong>Storybook:</strong> <code>Welcome</code>, <code>Effects/Overview</code>,
              and <code>Templates/*</code>.
            </li>
            <li>
              <strong>Docs:</strong> <code>AGENT_HANDOFF.md</code>,{" "}
              <code>registry-coverage.md</code>, and <code>deletion-playbook.md</code>.
            </li>
          </ul>
        </section>
      </div>
    </div>
  ),
}

