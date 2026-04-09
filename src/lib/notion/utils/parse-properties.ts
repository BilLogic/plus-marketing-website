/* eslint-disable @typescript-eslint/no-explicit-any */

export const getTitle = (prop: any): string => {
  if (!prop || prop.type !== "title") return ""
  return prop.title?.map((t: any) => t.plain_text).join("") ?? ""
}

export const getRichText = (prop: any): string | null => {
  if (!prop || prop.type !== "rich_text") return null
  const text = prop.rich_text?.map((t: any) => t.plain_text).join("") ?? ""
  return text || null
}

export const getSelect = (prop: any): string | null => {
  if (!prop || prop.type !== "select") return null
  return prop.select?.name ?? null
}

export const getMultiSelect = (prop: any): string[] => {
  if (!prop || prop.type !== "multi_select") return []
  return prop.multi_select?.map((s: any) => s.name) ?? []
}

export const getDate = (prop: any): string | null => {
  if (!prop || prop.type !== "date") return null
  return prop.date?.start ?? null
}

export const getCheckbox = (prop: any): boolean => {
  if (!prop || prop.type !== "checkbox") return false
  return prop.checkbox ?? false
}

export const getUrl = (prop: any): string | null => {
  if (!prop || prop.type !== "url") return null
  return prop.url ?? null
}

export const getFiles = (prop: any): string | null => {
  if (!prop || prop.type !== "files") return null
  const file = prop.files?.[0]
  if (!file) return null
  return file.type === "external"
    ? file.external?.url ?? null
    : file.file?.url ?? null
}

/** Notion databases often name the headshot column differently — try files, then URL fields. */
const TEAM_HEADSHOT_FILES = [
  "Picture",
  "Photo",
  "Image",
  "Headshot",
  "Avatar",
  "Profile photo",
] as const

const TEAM_HEADSHOT_URLS = [
  "Picture URL",
  "Photo URL",
  "Image URL",
  "Headshot URL",
  "Photo link",
] as const

export function getTeamMemberPictureUrl(props: Record<string, any>): string | null {
  for (const key of TEAM_HEADSHOT_FILES) {
    const url = getFiles(props[key])
    if (url) return url
  }
  for (const key of TEAM_HEADSHOT_URLS) {
    const url = getUrl(props[key])
    if (url) return url
  }
  return null
}
