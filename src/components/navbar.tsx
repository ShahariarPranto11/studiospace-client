"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Explore Studios", href: "/explore-studio", active: false },
  { label: "Add Studio", href: "/add-studio", active: false },
  { label: "How It Works", href: "/#how-it-works", active: false },
  { label: "About Us", href: "/#about-us", active: false },
] as const;

function Navbar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const session = authClient.useSession();
  const user = session.data?.user;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/sign-out", {
        method: "POST",
        credentials: "include",
      });
    } catch {}
    router.push("/");
  };

  const authButtons = (
    <div className="hidden lg:flex items-center gap-3">
      {user ? (
        <Popover>
          <PopoverTrigger
            render={
              <button
                type="button"
                className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                aria-label="Open profile menu"
              />
            }
          >
            <Avatar className="cursor-pointer">
              <AvatarImage
                referrerPolicy="no-referrer"
                src={user?.image || ""}
                alt={user?.name || "User"}
              />
              <AvatarFallback>
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>

          <PopoverContent align="end" className="w-64">
            <PopoverHeader>
              <PopoverTitle>{user?.name}</PopoverTitle>
              <PopoverDescription>{user?.email}</PopoverDescription>
            </PopoverHeader>

            <div className="flex flex-col gap-1 py-2">
              <Link
                href="/profile"
                className="rounded-md px-3 py-2 text-sm hover:bg-muted"
              >
                My Profile
              </Link>
              
            </div>

            <div className="border-t pt-3">

             <Button
                type="button"
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <>
          <Link
            href="/login"
            className="px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors duration-300 hover:text-lime-400"
          >
            Login
          </Link>
          <Link
            href="/Registration"
            className="px-6 py-3 rounded-full bg-lime-400 text-sm font-semibold text-white shadow-md shadow-lime-200/60 transition-all duration-300 hover:bg-lime-500 hover:shadow-lg hover:-translate-y-0.5"
          >
            Register
          </Link>
        </>
      )}
    </div>
  );

  const mobileAuthButtons = (
    <div className="flex items-center gap-6 mt-5 pt-4">
      <Link
        href="/login"
        onClick={() => setOpen(false)}
        className="text-sm font-semibold text-gray-700 transition-colors hover:text-indigo-600"
      >
        Login
      </Link>

      <Link
        href="/Registration"
        onClick={() => setOpen(false)}
        className="px-6 py-3 rounded-full bg-lime-400 text-sm font-semibold text-white shadow-md shadow-lime-200/60 transition-all duration-300 hover:bg-lime-500 hover:shadow-lg hover:-translate-y-0.5"
      >
        Register
      </Link>
    </div>
  );

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
                  : "text-neutral-300 hover:bg-white/5 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {authButtons}

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex size-10 items-center justify-center rounded-full text-white hover:bg-white/10 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <XIcon className="size-5" />
          ) : (
            <MenuIcon className="size-5" />
          )}
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
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  link.active
                    ? "bg-lime-400 text-black"
                    : "text-neutral-300 hover:bg-white/5 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {mobileAuthButtons}
        </div>
      )}
    </header>
  );
}

export { Navbar };
