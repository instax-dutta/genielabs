"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { href: "/tools/bug-fixer", label: "Bug Fixer" },
    { href: "/tools/complexity-analyzer", label: "Complexity Analyzer" },
    { href: "/tools/code-explainer", label: "Code Explainer" },
    { href: "/tools/code-converter", label: "Code Converter" },
    { href: "/tools/sql-generator", label: "SQL Generator" },
    { href: "/tools/regex-tool", label: "Regex Builder" },
  ]

  return (
    <header className="fixed top-0 z-50 w-full ios-blur border-b border-white/10 bg-black/80">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className="flex w-full items-center justify-between md:w-auto">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-xl bg-gradient-to-br from-[#304FFE] to-[#00C853] p-1.5 transition-transform duration-300 hover:scale-105">
              <Image src="/favicon.svg" alt="GenieLabs Logo" width={32} height={32} />
            </div>
            <span className="brand-name bg-gradient-to-r from-[#304FFE] to-[#00C853] bg-clip-text text-lg font-bold text-transparent">GenieLabs</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="ios-button rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 md:hidden z-10"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="ios-blur w-full border-white/10 bg-black/90 p-0 sm:max-w-md">
              <nav className="flex flex-col px-6 py-12">
                <Link href="/" className="flex items-center gap-2 font-bold text-white">
                  <div className="rounded-xl bg-gradient-to-br from-[#304FFE] to-[#00C853] p-1.5">
                    <Image src="/favicon.svg" alt="GenieLabs Logo" width={32} height={32} />
                  </div>
                  <span className="brand-name bg-gradient-to-r from-[#304FFE] to-[#00C853] bg-clip-text text-xl text-transparent">GenieLabs</span>
                </Link>
                <div className="mt-8 flex flex-col gap-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center rounded-lg px-4 py-3 text-lg transition-colors",
                        isActive(item.href)
                          ? "bg-[#304FFE]/20 text-white"
                          : "text-white/60 hover:bg-[#304FFE]/10 hover:text-white",
                      )}
                    >
                      {item.label}
                      <div className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">
                        <Menu className="h-4 w-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <nav className="hidden md:ml-auto md:flex md:items-center md:gap-2 lg:gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative rounded-lg px-3 py-2 text-sm transition-colors hover:text-white",
                isActive(item.href) ? "text-white" : "text-white/60",
              )}
            >
              <span className="relative z-10">{item.label}</span>
              <div
                className={cn(
                  "absolute inset-0 -z-10 scale-90 rounded-lg opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100",
                  isActive(item.href) ? "bg-[#304FFE]/20" : "bg-[#304FFE]/10",
                )}
              />
            </Link>
          ))}
        </nav>
        {/* Removed Sign In button */}
        {/* <div className="hidden md:ml-4 md:flex md:items-center">
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-white/10 bg-[#304FFE]/20 px-3 text-white hover:bg-[#304FFE]/30"
          >
            Sign In
          </Button>
        </div> */}
      </div>
    </header>
  )
}
