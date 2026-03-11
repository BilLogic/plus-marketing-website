# AI & LLM Integrations

*Applies to: `src/ai/**`*

## Model Usage in App
If building features that utilize AI within the application:
- Always stream responses to the client edge.
- Use explicit system prompts stored in constants rather than inline strings.
- Gracefully handle timeouts and rate limit errors (429) out of the box.
