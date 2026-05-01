import { PlusFooter } from "@/components/marketing/footer/plus-footer"
import { PlusHeader } from "@/components/marketing/header/plus-header"
import { marketingShellPadX, marketingWideTypeScale } from "@/lib/marketing-layout"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-dvh w-full min-w-0 flex-col bg-transparent text-foreground">
      <div className="shrink-0">
        <PlusHeader />
      </div>
      <div
        className={`flex min-h-0 min-w-0 w-full flex-1 flex-col bg-background ${marketingShellPadX} ${marketingWideTypeScale}`}
      >
        {children}
      </div>
      <div className="flex w-full min-w-0 shrink-0 flex-col bg-background">
        <div className="h-12 shrink-0 bg-background" aria-hidden />
        <PlusFooter />
      </div>
    </main>
  )
}
