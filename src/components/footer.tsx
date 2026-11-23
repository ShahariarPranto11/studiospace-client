import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about-us" },
]

const categories = [
  { label: "Photo Studios", href: "/categories/photo-studios" },
  { label: "Film Stages", href: "/categories/film-stages" },
  { label: "Podcast Rooms", href: "/categories/podcast-rooms" },
  { label: "Music Suites", href: "/categories/music-suites" },
]

const socials = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
]

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,18rem)] lg:gap-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span
                aria-hidden
                className="size-3.5 rounded-full bg-lime-400"
              />
              <span className="text-lg font-bold tracking-tight text-white">
                StudioSpace
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              Create. Collaborate. Inspire.
              <br />
              Your ultimate platform for discovering and booking creative
              spaces.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-300 transition-colors hover:text-lime-400"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Quick links">
            <h2 className="text-sm font-semibold text-white">Quick Links</h2>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-lime-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Studio categories">
            <h2 className="text-sm font-semibold text-white">
              Studio Categories
            </h2>
            <ul className="mt-4 space-y-2.5">
              {categories.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-lime-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-white">
              Subscribe to Our Newsletter
            </h2>
            <form className="mt-4 flex gap-2" action="#" method="post">
              <Input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                aria-label="Email address"
                className="h-10 flex-1 border-white/15 bg-neutral-900 text-white placeholder:text-neutral-500"
              />
              <Button
                type="submit"
                className="h-10 rounded-full bg-lime-400 px-5 text-neutral-950 hover:bg-lime-300"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs text-neutral-500">
            © 2026 StudioSpace. All rights reserved. ·{" "}
            <Link
              href="/terms"
              className="text-lime-400/90 transition-colors hover:text-lime-400"
            >
              Terms of Service
            </Link>{" "}
            ·{" "}
            <Link
              href="/privacy"
              className="text-lime-400/90 transition-colors hover:text-lime-400"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
