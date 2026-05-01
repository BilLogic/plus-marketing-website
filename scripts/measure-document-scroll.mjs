#!/usr/bin/env node
/**
 * Measures document scroll extent vs footer (for debugging extra scroll past footer).
 * Usage: node scripts/measure-document-scroll.mjs [--verbose] [baseUrl] [pathname]
 * Defaults: http://localhost:3000 /for-researchers
 * Requires: dev server running on baseUrl, `playwright` installed.
 */
import { chromium } from "playwright"

const verbose = process.argv.includes("--verbose")
const args = process.argv.slice(2).filter((a) => a !== "--verbose")
const base = args[0] || "http://localhost:3000"
const pathname = args[1] || "/for-researchers"
const url = `${base.replace(/\/$/, "")}${pathname.startsWith("/") ? pathname : `/${pathname}`}`

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

try {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 120000 })
  await page.waitForTimeout(2500)

  const atTop = await page.evaluate((verbose) => {
    const doc = document.documentElement
    const body = document.body
    const main = document.querySelector("main")
    const footer = document.querySelector("footer")
    const htmlStyle = {
      height: getComputedStyle(doc).height,
      minHeight: getComputedStyle(doc).minHeight,
      display: getComputedStyle(doc).display,
      overflowY: getComputedStyle(doc).overflowY,
    }
    const bodyStyle = {
      height: getComputedStyle(body).height,
      minHeight: getComputedStyle(body).minHeight,
      marginBottom: getComputedStyle(body).marginBottom,
      overflowY: getComputedStyle(body).overflowY,
    }
    const bodyKids = [...body.children].map((el) => ({
      tag: el.tagName,
      id: el.id,
      cn: typeof el.className === "string" ? el.className.slice(0, 80) : "",
      oh: el.offsetHeight,
      sh: el.scrollHeight,
      mb: getComputedStyle(el).marginBottom,
    }))

    let deepestElementsByDocBottom = null
    let tallestLayoutBottomRounded = null
    if (verbose) {
      const scrollY = window.scrollY ?? 0
      const skips = new Set([
        "SCRIPT",
        "STYLE",
        "NOSCRIPT",
        "LINK",
        "META",
        "TEMPLATE",
      ])
      const layoutBottomHints = []
      for (const el of body.querySelectorAll("*")) {
        if (skips.has(el.tagName)) continue
        const cs = getComputedStyle(el)
        if (cs.position === "fixed") continue
        const r = el.getBoundingClientRect()
        const docBottom = r.bottom + scrollY
        const docTop = r.top + scrollY
        layoutBottomHints.push({
          docBottom,
          docTop,
          tag: el.tagName,
          id: el.id || undefined,
          cn:
            typeof el.className === "string"
              ? el.className.slice(0, 64)
              : undefined,
          pos: cs.position,
          oh: el.offsetHeight,
          sh: el.scrollHeight,
        })
      }
      layoutBottomHints.sort((a, b) => b.docBottom - a.docBottom)
      tallestLayoutBottomRounded =
        Math.round((layoutBottomHints[0]?.docBottom ?? 0) * 100) / 100
      deepestElementsByDocBottom = layoutBottomHints.slice(0, 25).map((row) => ({
        ...row,
        docBottom: Math.round(row.docBottom * 100) / 100,
        docTop: Math.round(row.docTop * 100) / 100,
      }))
    }

    return {
      htmlStyle,
      bodyStyle,
      bodyChildCount: body.children.length,
      bodyKids,
      documentElement: {
        scrollHeight: doc.scrollHeight,
        offsetHeight: doc.offsetHeight,
        clientHeight: doc.clientHeight,
      },
      body: {
        scrollHeight: body.scrollHeight,
        offsetHeight: body.offsetHeight,
      },
      innerHeight: window.innerHeight,
      scrollHeightDiffHtmlMinusBody: doc.scrollHeight - body.scrollHeight,
      main: main
        ? {
            offsetHeight: main.offsetHeight,
            rect: (() => {
              const r = main.getBoundingClientRect()
              return { top: r.top, bottom: r.bottom, height: r.height }
            })(),
          }
        : null,
      footer: footer
        ? {
            offsetHeight: footer.offsetHeight,
            rect: (() => {
              const r = footer.getBoundingClientRect()
              return { top: r.top, bottom: r.bottom, height: r.height }
            })(),
          }
        : null,
      ...(verbose
        ? { tallestLayoutBottomRounded, deepestElementsByDocBottom }
        : {}),
    }
  }, verbose)

  await page.evaluate(() => {
    window.scrollTo(0, document.documentElement.scrollHeight)
  })
  await page.waitForTimeout(400)

  const atBottom = await page.evaluate(() => {
    const doc = document.documentElement
    const footer = document.querySelector("footer")
    const fr = footer?.getBoundingClientRect()
    /* Viewport Y: distance from bottom of footer to bottom of viewport (+ = white gap below footer) */
    const gapBelowFooterPx =
      fr != null ? Math.round(window.innerHeight - fr.bottom) : null
    return {
      scrollY: Math.round(window.scrollY),
      maxScrollY: Math.round(doc.scrollHeight - window.innerHeight),
      documentElementScrollHeight: doc.scrollHeight,
      footerRect: fr
        ? {
            top: Math.round(fr.top),
            bottom: Math.round(fr.bottom),
            height: Math.round(fr.height),
          }
        : null,
      innerHeight: window.innerHeight,
      /** Positive ≈ empty space visible under footer when scrolled to end */
      gapBelowFooterPx,
    }
  })

  const out = {
    url,
    atTop,
    afterScrollToMax: atBottom,
    interpretation: {
      documentElementScrollHeight_equals:
        "Scrollable height of the page (what you can scroll through).",
      gapBelowFooterPx:
        "> 0 usually means footer sits above viewport bottom → blank strip visible when scrolled to max.",
    },
  }
  console.log(JSON.stringify(out, null, 2))
} catch (e) {
  console.error(String(e))
  process.exitCode = 1
} finally {
  await browser.close()
}
