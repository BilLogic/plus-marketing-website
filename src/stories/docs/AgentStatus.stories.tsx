import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Docs/Agent Status",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** High-level status overview for agent integrations and MCP servers. */
export const Status: Story = {
  render: () => (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Agent status
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            MCP &amp; rules status (static snapshot)
          </h1>
          <p className="text-sm text-muted-foreground">
            This story provides a quick, human-readable overview of agent-related
            configuration so changes to rules and MCP wiring are visible from the UI.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">MCP servers</h2>
          <p className="text-sm text-muted-foreground">
            The `.cursor/mcp.json` file defines MCP servers available to agents. In this
            project it currently includes:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>
              <code>shadcn</code> — configured via <code>.cursor/mcp.json</code> to expose
              project-aware shadcn operations.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">Key rules &amp; docs</h2>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>
              <code>.agent/rules/100-project-context.md</code> — project mission, tokens, and
              compound-engineering rules.
            </li>
            <li>
              <code>.agent/rules/102-agent-capabilities.md</code> — skills and MCP capabilities.
            </li>
            <li>
              <code>docs/AGENT_HANDOFF.md</code> — initialization and CRUD playbook.
            </li>
            <li>
              <code>docs/deletion-playbook.md</code> — deletion and deprecation details.
            </li>
            <li>
              <code>docs/AGENT_CAPABILITIES_OVERVIEW.md</code> — short capabilities and prompts
              overview.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">How to update</h2>
          <p className="text-sm text-muted-foreground">
            When you change MCP wiring or rules:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>Update `.cursor/mcp.json` and commit the change.</li>
            <li>Adjust the relevant rule/skill or doc file under `.agent/**` or `docs/**`.</li>
            <li>Optionally update this story&apos;s copy to reflect any significant shifts.</li>
          </ul>
        </section>
      </div>
    </div>
  ),
}

