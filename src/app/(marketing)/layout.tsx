import { PlusHeader } from "@/components/marketing/header/plus-header"
import { PlusFooter } from "@/components/marketing/footer/plus-footer"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="bg-background text-foreground">
      <PlusHeader />
      {children}
      <PlusFooter />
    </main>
  )
}
