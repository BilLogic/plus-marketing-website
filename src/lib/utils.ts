import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-lg",
            "display-md",
            "display-sm",
            "heading-xxl",
            "heading-xl",
            "heading-lg",
            "heading-md",
            "heading-sm",
            "heading-xs",
            "heading-xxs",
            "body-lg",
            "body-default",
            "body-sm",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
