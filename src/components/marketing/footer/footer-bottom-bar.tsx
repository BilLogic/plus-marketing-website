import Link from "next/link"

export const FooterBottomBar = () => {
  return (
    <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
      <p>&copy; {new Date().getFullYear()} Carnegie Mellon University</p>
      <div className="flex items-center gap-4">
        <Link href="/privacy" className="transition-colors hover:text-white">
          Privacy Policy
        </Link>
        <Link href="/terms" className="transition-colors hover:text-white">
          Terms of Use
        </Link>
      </div>
    </div>
  )
}
