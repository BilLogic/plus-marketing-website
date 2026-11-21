import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-(--ds-radius-lg) border border-input bg-(--ds-background-input) hover:bg-(--ds-background-input-hovered) px-2.5 py-2 text-base transition-colors outline-none placeholder:text-(--ds-text-subtlest) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-(--ds-background-disabled) disabled:opacity-50 aria-invalid:border-(--ds-border-danger) aria-invalid:ring-2 aria-invalid:ring-(--ds-border-danger)/20 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
