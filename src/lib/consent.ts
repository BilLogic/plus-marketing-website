export type ConsentPreferences = {
  analytics: boolean
  marketing: boolean
}

const CONSENT_STORAGE_KEY = "plus-consent-preferences"

/**
 * Safely read stored consent preferences.
 */
export const getConsentPreferences = (): ConsentPreferences => {
  if (typeof window === "undefined") {
    return { analytics: false, marketing: false }
  }

  const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)?.trim()

  if (!raw) {
    return { analytics: false, marketing: false }
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ConsentPreferences>

    return {
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    }
  } catch {
    return { analytics: false, marketing: false }
  }
}

/**
 * Persist consent preferences.
 */
export const setConsentPreferences = (preferences: ConsentPreferences) => {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences))
}

