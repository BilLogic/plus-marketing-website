import { cn } from "@/lib/utils"

type PlusLogoMarkProps = {
  className?: string
  /** Screen-reader label (navbar vs footer context). */
  title?: string
}

/**
 * Inline PLUS wordmark — no `src` / `public` URL so it works in Storybook, Next, and static Netlify
 * builds without relying on static file paths or `next/image`.
 */
export function PlusLogoMark({
  className,
  title = "PLUS Personalized Learning",
}: PlusLogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 44"
      role="img"
      aria-label={title}
      className={cn("shrink-0", className)}
    >
      <title>{title}</title>
      <text
        x="0"
        y="32"
        fill="#0d9488"
        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
        fontSize="28"
        fontWeight="800"
        letterSpacing="-0.02em"
      >
        PLUS
      </text>
      <text
        x="108"
        y="20"
        fill="#115e59"
        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
        fontSize="11"
        fontWeight="600"
      >
        Personalized
      </text>
      <text
        x="108"
        y="34"
        fill="#115e59"
        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
        fontSize="10"
        fontWeight="500"
      >
        Learning²
      </text>
    </svg>
  )
}
