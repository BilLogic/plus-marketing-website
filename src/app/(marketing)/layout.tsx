import { PlusHeader } from "@/components/marketing/header/plus-header"
import { PlusFooter } from "@/components/marketing/footer/plus-footer"
import { marketingShellPadX, marketingWideTypeScale } from "@/lib/marketing-layout"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="bg-background text-foreground">
      <PlusHeader />
      <div className={`${marketingShellPadX} ${marketingWideTypeScale}`}>{children}</div>
      <PlusFooter />
    </main>
  )
}
