 "use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { getConsentPreferences, setConsentPreferences } from "@/lib/consent"

type BunduiCookieConsentProps = {
  className?: string
}

/** Bundui-inspired cookie consent bar with granular toggles. */
const BunduiCookieConsent = ({ className }: BunduiCookieConsentProps) => {
  const [isReady, setIsReady] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [marketingEnabled, setMarketingEnabled] = useState(false)

  useEffect(() => {
    const stored = getConsentPreferences()

    setAnalyticsEnabled(stored.analytics)
    setMarketingEnabled(stored.marketing)
    setIsReady(true)
  }, [])

  /**
   * Persist the current analytics and marketing preferences.
   */
  const persistPreferences = () => {
    setConsentPreferences({
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
    })
  }

  if (!isReady) {
    return null
  }

  return (
    <section
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:px-6 sm:pb-6",
        className
      )}
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-border/70 bg-background/95 px-4 py-3 shadow-lg shadow-background/40 backdrop-blur-sm sm:px-5 sm:py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Cookies
            </p>
            <p className="text-sm font-medium text-foreground">
              We use cookies to measure launches and improve experiments.
            </p>
            <p className="text-xs text-muted-foreground">
              Inspired by Bundui cookie consent banners. You can opt into analytics and marketing
              cookies separately.
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-3 sm:max-w-xs">
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card/60 px-3 py-2 text-xs">
              <div>
                <p className="font-medium text-foreground">Essential</p>
                <p className="text-[11px] text-muted-foreground">
                  Required for basic site functionality.
                </p>
              </div>
              <Switch checked disabled aria-readonly />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card/60 px-3 py-2 text-xs">
              <div>
                <p className="font-medium text-foreground">Analytics</p>
                <p className="text-[11px] text-muted-foreground">
                  Help us understand which templates perform best.
                </p>
              </div>
              <Switch
                aria-label="Toggle analytics cookies"
                checked={analyticsEnabled}
                onCheckedChange={(checked) => {
                  setAnalyticsEnabled(Boolean(checked))
                }}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card/60 px-3 py-2 text-xs">
              <div>
                <p className="font-medium text-foreground">Marketing</p>
                <p className="text-[11px] text-muted-foreground">
                  Show relevant Plus updates and launches.
                </p>
              </div>
              <Switch
                aria-label="Toggle marketing cookies"
                checked={marketingEnabled}
                onCheckedChange={(checked) => {
                  setMarketingEnabled(Boolean(checked))
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setAnalyticsEnabled(false)
              setMarketingEnabled(false)
              persistPreferences()
            }}
          >
            Reject all
          </Button>
          <Button
            size="sm"
            onClick={() => {
              persistPreferences()
            }}
          >
            Accept selected
          </Button>
        </div>
      </div>
    </section>
  )
}

export { BunduiCookieConsent }

