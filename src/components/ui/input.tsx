import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 max-md:min-h-11 w-full min-w-0 rounded-(--ds-radius-lg) border border-input bg-(--ds-background-input) hover:bg-(--ds-background-input-hovered) px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-(--ds-text-subtlest) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-(--ds-background-disabled) disabled:opacity-50 aria-invalid:border-(--ds-border-danger) aria-invalid:ring-2 aria-invalid:ring-(--ds-border-danger)/20 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
