import { cn } from "@/lib/utils"

type PlusLogoImageProps = {
  className?: string
}

const ALT = "PLUS Personalized Learning²"

/** Committed asset: `public/plus-logo.png` (400×160). Plain `<img>` so Storybook + Netlify static don’t rely on `next/image`. */
export function PlusLogoImage({ className }: PlusLogoImageProps) {
  return (
    <img
      src="/plus-logo.png"
      alt={ALT}
      width={400}
      height={160}
      decoding="async"
      fetchPriority="high"
      className={cn(
        "h-10 w-auto max-w-[min(100%,280px)] object-contain object-left",
        className
      )}
    />
  )
}
