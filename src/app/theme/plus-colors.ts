/**
 * Plus brand color scale generator using OKLCH.
 *
 * Anchors are derived from the Figma design system tokens.
 * The generated scales match what's hardcoded in globals.css;
 * this module exists so future hue rotations (e.g. seasonal themes)
 * can be generated programmatically.
 */

export type Oklch = {
  l: number
  c: number
  h: number
}

export type ScaleStep =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950

export type ScaleName = "brand" | "neutral" | "accent" | "danger" | "info" | "success" | "warning"

export type ScaleAnchors = {
  /** Mid point, usually the 500 step in the scale. */
  mid500: Oklch
  /** Lighter anchor, e.g. a 300 swatch from Figma. */
  light300?: Oklch
  /** Darker anchor, e.g. a 700 swatch from Figma. */
  dark700?: Oklch
}

export type GeneratedScale = Record<ScaleStep, string>

/**
 * Convert an OKLCH triple to a CSS oklch() string.
 */
export const toOklch = ({ l, c, h }: Oklch): string =>
  `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(3)})`

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/**
 * Generate a 50-950 scale around a mid (500) OKLCH anchor.
 *
 * Lightness uses a smooth curve; chroma tapers toward the extremes
 * to avoid gamut clipping.
 */
export const generateScale = (anchors: ScaleAnchors): GeneratedScale => {
  const steps: ScaleStep[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  const { mid500, light300, dark700 } = anchors

  const light = light300 ?? { l: Math.min(1, mid500.l + 0.12), c: mid500.c * 0.65, h: mid500.h }
  const dark = dark700 ?? { l: Math.max(0, mid500.l - 0.18), c: mid500.c * 0.9, h: mid500.h }

  const result: Partial<GeneratedScale> = {}

  steps.forEach((step) => {
    if (step === 500) {
      result[step] = toOklch(mid500)
      return
    }

    const index = steps.indexOf(step)
    const midIndex = steps.indexOf(500)
    const t = (index - midIndex) / (midIndex * 1.1)

    const side = t < 0 ? -1 : 1
    const magnitude = Math.abs(t)

    const lightness = (() => {
      if (side < 0) return lerp(light.l, mid500.l, magnitude)
      return lerp(mid500.l, dark.l, magnitude)
    })()

    const chroma = (() => {
      const centerBoost = 1 + (1 - magnitude) * 0.08
      const base = lerp(light.c, dark.c, magnitude)
      return base * centerBoost
    })()

    result[step] = toOklch({ l: lightness, c: chroma, h: mid500.h })
  })

  return result as GeneratedScale
}

/**
 * Plus brand anchor configuration derived from Figma design system.
 *
 * Teal = Primary, Fuchsia/Magenta = Accent, Red = Danger,
 * Blue = Info, Green = Success, Yellow = Warning, Gray = Neutral.
 */
export const plusAnchors: Record<ScaleName, ScaleAnchors> = {
  brand: {
    mid500: { l: 0.86, c: 0.07, h: 195 },
    light300: { l: 0.94, c: 0.04, h: 195 },
    dark700: { l: 0.72, c: 0.12, h: 195 },
  },
  neutral: {
    mid500: { l: 0.88, c: 0.01, h: 270 },
    light300: { l: 0.93, c: 0.01, h: 270 },
    dark700: { l: 0.79, c: 0.02, h: 270 },
  },
  accent: {
    mid500: { l: 0.83, c: 0.08, h: 340 },
    light300: { l: 0.91, c: 0.05, h: 340 },
    dark700: { l: 0.73, c: 0.13, h: 340 },
  },
  danger: {
    mid500: { l: 0.84, c: 0.07, h: 20 },
    light300: { l: 0.91, c: 0.04, h: 20 },
    dark700: { l: 0.72, c: 0.12, h: 20 },
  },
  info: {
    mid500: { l: 0.85, c: 0.06, h: 240 },
    light300: { l: 0.93, c: 0.03, h: 240 },
    dark700: { l: 0.74, c: 0.10, h: 240 },
  },
  success: {
    mid500: { l: 0.84, c: 0.06, h: 150 },
    light300: { l: 0.93, c: 0.03, h: 150 },
    dark700: { l: 0.71, c: 0.10, h: 150 },
  },
  warning: {
    mid500: { l: 0.86, c: 0.08, h: 80 },
    light300: { l: 0.93, c: 0.04, h: 80 },
    dark700: { l: 0.74, c: 0.12, h: 80 },
  },
}

/**
 * Generated Plus scales for all hue families.
 * These serve as the algorithmic equivalent of the hex values in globals.css.
 */
export const plusScales: Record<ScaleName, GeneratedScale> = {
  brand: generateScale(plusAnchors.brand),
  neutral: generateScale(plusAnchors.neutral),
  accent: generateScale(plusAnchors.accent),
  danger: generateScale(plusAnchors.danger),
  info: generateScale(plusAnchors.info),
  success: generateScale(plusAnchors.success),
  warning: generateScale(plusAnchors.warning),
}
