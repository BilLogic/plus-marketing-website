/**
 * Push full-page HTML captures to an existing Figma file (generate_figma_design IDs).
 * Strips CSP locally so Figma’s capture script can run without editing Next layout.
 *
 * Usage:
 *   BASE_URL=http://127.0.0.1:3002 node scripts/figma-capture-pages-to-existing-file.mjs
 */
import { chromium } from "playwright"

const base = process.env.BASE_URL ?? "http://127.0.0.1:3000"
const origin = new URL(base.replace(/\/$/, "")).origin

/**
 * Each capture `id` is single-use. Get new UUIDs from Figma MCP `generate_figma_design`
 * (`outputMode: existingFile`, `fileKey: S6W4iV7xxRzChGIhwF3mEy`, `nodeId: 1991:2274`).
 *
 * Example:
 *   FIGMA_CAPTURE_JOBS='[{"path":"/","id":"..."},{"path":"/for-researchers","id":"..."},{"path":"/for-schools","id":"..."}]' \\
 *     BASE_URL=http://127.0.0.1:3002 node scripts/figma-capture-pages-to-existing-file.mjs
 */
const jobsRaw = process.env.FIGMA_CAPTURE_JOBS
if (!jobsRaw) {
  console.error(
    "Set FIGMA_CAPTURE_JOBS to a JSON array of { path, id } (see script header). Example paths: /, /for-researchers, /for-schools.",
  )
  process.exit(1)
}
const jobs = JSON.parse(jobsRaw)

const settleMs = Number(process.env.FIGMA_CAPTURE_SETTLE_MS ?? "6000")
const afterCaptureMs = Number(process.env.FIGMA_AFTER_CAPTURE_MS ?? "3000")

const browser = await chromium.launch({ headless: true })
try {
  for (const { path, id } of jobs) {
    const page = await browser.newPage()
    page.setDefaultTimeout(600_000)
    await page.route("**/*", async (route) => {
      const url = route.request().url()
      if (!url.startsWith(origin)) {
        await route.continue()
        return
      }
      const response = await route.fetch()
      const headers = { ...response.headers() }
      delete headers["content-security-policy"]
      delete headers["content-security-policy-report-only"]
      await route.fulfill({ response, headers })
    })
    const url = `${base.replace(/\/$/, "")}${path}`
    console.error("Capture", id, "←", url)
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 180000 })
    await page.waitForTimeout(settleMs)

    const js = await page.context().request.get("https://mcp.figma.com/mcp/html-to-design/capture.js")
    await page.evaluate((text) => {
      const el = document.createElement("script")
      el.textContent = text
      document.head.appendChild(el)
    }, await js.text())

    await page.waitForTimeout(800)
    const endpoint = `https://mcp.figma.com/mcp/capture/${id}/submit`
    const submitMatch = `/mcp/capture/${id}/submit`

    const [, out] = await Promise.all([
      page.waitForResponse(
        (r) => r.request().method() === "POST" && r.url().includes(submitMatch),
        { timeout: 600_000 },
      ),
      page.evaluate(
        ({ captureId, endpoint: ep }) =>
          window.figma.captureForDesign({
            captureId,
            endpoint: ep,
            selector: "body",
          }),
        { captureId: id, endpoint },
      ),
    ])
    console.error("captureForDesign:", JSON.stringify(out))
    await page.waitForTimeout(afterCaptureMs)
    await page.close()
  }
} finally {
  await browser.close()
}
