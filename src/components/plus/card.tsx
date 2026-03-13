import * as React from "react"

import { Card } from "@/components/ui/card"

export type PlusCardProps = React.ComponentProps<typeof Card>

/** Plus wrapper for Card. Currently identical to base shadcn Card. */
export const PlusCard = (props: PlusCardProps) => <Card {...props} />

