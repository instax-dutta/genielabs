import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container py-6 sm:py-8 px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#304FFE] to-[#00C853]">
              <Image src="/favicon.svg" alt="GenieLabs Logo" width={20} height={20} />
            </div>
            <span className="text-sm font-bold text-white">GenieLabs</span>
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            <Link
              href="/privacy"
              className="text-sm text-neutral-400 transition-colors duration-200 hover:text-[#304FFE]"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-neutral-400 transition-colors duration-200 hover:text-[#304FFE]"
            >
              Terms
            </Link>
            <Link
              href="/security"
              className="text-sm text-neutral-400 transition-colors duration-200 hover:text-[#304FFE]"
            >
              Security
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-neutral-400 transition-colors duration-200 hover:text-[#304FFE]"
            >
              Cookies
            </Link>
          </nav>
          <div className="text-sm text-neutral-400 text-center sm:text-left">
            {new Date().getFullYear()} GenieLabs
          </div>
        </div>
      </div>
    </footer>
  )
}
