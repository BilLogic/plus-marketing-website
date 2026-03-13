export type VibeContextInput = {
  route?: string
  userPreferences?: {
    tone?: "concise" | "detailed"
    formality?: "casual" | "neutral" | "formal"
  }
  recentFiles?: string[]
  featureFlags?: Record<string, boolean>
}

/**
 * Build a compact, textual description of the current workspace and request context.
 *
 * Static project rules (100-project-context, 102-agent-capabilities, frontend-design, etc.)
 * are assumed to already be part of the system prompt; this helper focuses on **dynamic**
 * information such as route, user preferences, recent edits, and feature flags.
 */
export const buildVibeContext = (input: VibeContextInput = {}) => {
  const { route, userPreferences, recentFiles, featureFlags } = input

  const parts: string[] = []

  if (route) {
    parts.push(`Current route: ${route}`)
  }

  if (userPreferences) {
    const prefs: string[] = []

    if (userPreferences.tone) {
      prefs.push(`tone=${userPreferences.tone}`)
    }

    if (userPreferences.formality) {
      prefs.push(`formality=${userPreferences.formality}`)
    }

    if (prefs.length > 0) {
      parts.push(`User preferences: ${prefs.join(", ")}`)
    }
  }

  if (recentFiles && recentFiles.length > 0) {
    parts.push(`Recent files: ${recentFiles.join(", ")}`)
  }

  if (featureFlags && Object.keys(featureFlags).length > 0) {
    const flags = Object.entries(featureFlags)
      .map(([key, value]) => `${key}=${value ? "on" : "off"}`)
      .join(", ")

    parts.push(`Feature flags: ${flags}`)
  }

  if (parts.length === 0) {
    return ""
  }

  return parts.join(" | ")
}

