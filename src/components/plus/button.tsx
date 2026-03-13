import * as React from "react"

import { Button } from "@/components/ui/button"

export type PlusButtonProps = React.ComponentProps<typeof Button> & {
  /**
   * Reserved for future Plus styling once the registry scan is complete.
   * For now this is intentionally a no-op to avoid deviation from base shadcn.
   */
  tone?: "primary" | "subtle"
}

/** Plus wrapper for Button. Currently identical to base shadcn Button. */
export const PlusButton = ({ ...props }: PlusButtonProps) => <Button {...props} />

