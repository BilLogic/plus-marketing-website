"use client"

import { useReportWebVitals } from "next/web-vitals"
import { trackEvent } from "@/lib/analytics"

/**
 * Core Web Vitals → GA4, standard web.dev pattern: event name = metric name,
 * CLS scaled ×1000 (GA event values must be integers), `metric_id` for dedup,
 * `metric_rating` + `metric_value` registered as custom dimension/metric.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    trackEvent(metric.name, {
      value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value
      ),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_rating: metric.rating,
      non_interaction: true,
    })
  })
  return null
}
