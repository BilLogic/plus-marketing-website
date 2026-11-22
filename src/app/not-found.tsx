import Link from "next/link"
import { NotFoundTracker } from "@/components/analytics/not-found-tracker"

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
      <NotFoundTracker />
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="text-heading-lg">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-(--ds-background-brand-bold-hovered)"
      >
        Back to home
      </Link>
    </main>
  )
}
