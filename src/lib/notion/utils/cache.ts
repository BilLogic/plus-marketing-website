import fs from "fs/promises"
import path from "path"

const CACHE_DIR = path.join(process.cwd(), "src", "data", "cache")

export const readCache = async <T>(key: string): Promise<T | null> => {
  try {
    const filePath = path.join(CACHE_DIR, `${key}.json`)
    const raw = await fs.readFile(filePath, "utf-8")
    const trimmed = raw.trim()
    if (!trimmed) return null
    return JSON.parse(trimmed) as T
  } catch {
    return null
  }
}

export const writeCache = async <T>(key: string, data: T): Promise<void> => {
  try {
    const filePath = path.join(CACHE_DIR, `${key}.json`)
    await fs.mkdir(CACHE_DIR, { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
  } catch {
    console.error(`Failed to write cache for key: ${key}`)
  }
}
