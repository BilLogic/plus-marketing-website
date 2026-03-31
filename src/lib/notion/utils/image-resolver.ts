export const resolveImageUrl = (
  notionFileUrl: string | null,
  fallbackPath?: string
): string | null => {
  if (fallbackPath) return fallbackPath
  return notionFileUrl ?? null
}
