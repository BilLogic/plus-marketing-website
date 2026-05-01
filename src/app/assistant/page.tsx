"use client"

import { useMemo } from "react"

import { buildSystemPrompt, MARKETING_ASSISTANT_PROMPT } from "@/ai/system-prompts"

/** Simple in-app surface that shows how the marketing assistant prompt and context compose. */
const AssistantPage = () => {
  const systemPrompt = useMemo(() => {
    return buildSystemPrompt(MARKETING_ASSISTANT_PROMPT, {
      route: "/assistant",
    })
  }, [])

  return (
    <main className="flex min-h-0 flex-1 flex-col bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-4 pb-16 pt-10 sm:px-6 md:px-8 md:pt-14">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Plus Assistant
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Agent-native marketing assistant scaffold
          </h1>
          <p className="text-sm text-muted-foreground">
            This page shows the composed system prompt that in-app AI features can use
            when working on Plus marketing pages. Wire your backend to this surface to
            turn it into a full chat or command experience.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold tracking-tight">Current system prompt</h2>
          <p className="text-xs text-muted-foreground">
            Built from core project rules, skills, and dynamic context for the{" "}
            <code>/assistant</code> route.
          </p>
          <pre className="max-h-[360px] overflow-auto rounded-lg border border-border/60 bg-card/70 p-3 text-[11px] leading-relaxed text-muted-foreground">
            {systemPrompt}
          </pre>
        </section>
      </div>
    </main>
  )
}

export default AssistantPage

