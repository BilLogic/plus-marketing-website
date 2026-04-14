/**
 * Opens localhost pages with Figma html-to-design hash params (requires
 * NEXT_PUBLIC_FIGMA_HTML_CAPTURE=1 in the running Next dev server).
 *
 * Usage:
 *   BASE_URL=http://127.0.0.1:3847 node scripts/figma-html-capture-open.mjs
 *
 * Pass capture IDs and paths as JSON in FIGMA_CAPTURES env, or edit defaults below.
 */
import { chromium } from "playwright"

const base = process.env.BASE_URL ?? "http://127.0.0.1:3847"
const waitMs = Number(process.env.FIGMA_CAPTURE_WAIT_MS ?? "14000")

/** Default: homepage + for-researchers (replace IDs when you generate new captures). */
const defaultCaptures = [
  {
    path: "/",
    id: "6b6c15c7-456c-435b-aee3-7ea68fe89df6",
  },
  {
    path: "/for-researchers",
    id: "a7711b68-ade1-423f-af34-8273235377fb",
  },
]

const captures = process.env.FIGMA_CAPTURES
  ? JSON.parse(process.env.FIGMA_CAPTURES)
  : defaultCaptures

function captureHash(id) {
  const endpoint = encodeURIComponent(`https://mcp.figma.com/mcp/capture/${id}/submit`)
  return `#figmacapture=${id}&figmaendpoint=${endpoint}&figmadelay=4000`
}

const browser = await chromium.launch({ headless: true })
try {
  for (const { path, id } of captures) {
    const page = await browser.newPage()
    const url = `${base.replace(/\/$/, "")}${path}${captureHash(id)}`
    console.log("Opening:", url.slice(0, 120) + "...")
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 120000 })
    await page.waitForTimeout(waitMs)
    await page.close()
    console.log("Done waiting for capture:", id)
  }
} finally {
  await browser.close()
}
