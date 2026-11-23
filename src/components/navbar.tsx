"use client"

import * as React from "react"
import Link from "next/link"
import { MenuIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "cn"

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Explore Studios", href: "/studios", active: false },
  { label: "How It Works", href: "/how-it-works", active: false },
  { label: "About Us", href: "/about", active: false },
] as const

function Navbar() {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span
            aria-hidden
            className="size-3 rounded-full bg-lime-400 shadow-[0_0_12px_rgba(190,240,90,0.8)]"
          />
          <span className="text-lg font-bold tracking-tight text-white">
            StudioSpace
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                link.active
                  ? "bg-lime-400 text-black"
                  : "text-neutral-300 hover:bg-white/5 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="outline"
            className="rounded-full border-white/20 bg-transparent px-5 text-white hover:bg-white/5 hover:text-white dark:border-white/20 dark:bg-transparent dark:hover:bg-white/5"
          >
            Login
          </Button>
          <Button className="rounded-full bg-lime-400 px-5 text-black hover:bg-lime-300">
            Register
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full text-white hover:bg-white/10 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </div>

      {isMobile && open && (
        <div
          id="mobile-nav"
          className="border-t border-white/5 bg-black px-4 pb-4 pt-2"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-current={link.active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  link.active
                    ? "bg-lime-400 text-black"
                    : "text-neutral-300 hover:bg-white/5 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex gap-2">
            <Button
              variant="outline"
              className="flex-1 rounded-full border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white dark:border-white/20 dark:bg-transparent"
            >
              Login
            </Button>
            <Button className="flex-1 rounded-full bg-lime-400 text-black hover:bg-lime-300">
              Register
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export { Navbar }
