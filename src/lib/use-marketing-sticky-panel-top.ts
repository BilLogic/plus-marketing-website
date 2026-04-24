"use client"

import { useLayoutEffect, useRef, useState } from "react"

/** ~5.5rem — below the main marketing header when clamping the measured “centered” `top` */
const STICKY_PANEL_TOP_MIN_PX = 88

const MAX_ZERO_HEIGHT_RETRIES = 24

/**
 * `top` for a `position: sticky` art panel: viewport center minus half the panel
 * height, clamped below the header — same math as for-schools benefits & get-involved
 * “Why work” (no `transform`, so section bounds stay correct).
 */
export function useMarketingStickyPanelTop() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [top, setTop] = useState("5.5rem")

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    let zeroHAttempts = 0

    const update = () => {
      const h = el.getBoundingClientRect().height
      if (h === 0) {
        if (zeroHAttempts < MAX_ZERO_HEIGHT_RETRIES) {
          zeroHAttempts += 1
          requestAnimationFrame(update)
        }
        return
      }
      zeroHAttempts = 0
      const y = window.innerHeight * 0.5 - h * 0.5
      setTop(`${Math.max(STICKY_PANEL_TOP_MIN_PX, y)}px`)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener("resize", update)
    const vv = window.visualViewport
    if (vv) {
      vv.addEventListener("resize", update)
    }
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", update)
      if (vv) {
        vv.removeEventListener("resize", update)
      }
    }
  }, [])

  return { ref, top }
}
