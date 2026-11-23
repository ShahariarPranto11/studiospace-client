"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
} from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

const slides = [
  
  { src: "/banner/studio-2.jpg", alt: "Modern photo studio with softbox lighting" },
  { src: "/banner/studio-3.jpg", alt: "Professional studio softbox lighting setup" },
] as const

const avatarTones = [
  "bg-lime-300",
  "bg-lime-400",
  "bg-lime-500",
  "bg-lime-600",
] as const

function Banner() {
  const [index, setIndex] = React.useState(0)
  const total = slides.length

  const prev = React.useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total]
  )
  const next = React.useCallback(
    () => setIndex((i) => (i + 1) % total),
    [total]
  )

  return (
    <section
      aria-label="Hero"
      className="relative isolate overflow-hidden bg-neutral-950"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        {slides.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              "object-cover transition-opacity duration-700 ease-out",
              i === index ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.92)_28%,rgba(0,0,0,0.5)_55%,rgba(0,0,0,0.25)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,transparent_30%,transparent_70%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-neutral-200 backdrop-blur-sm">
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-lime-400"
            />
            Premium Creative Studio Marketplace
          </span>

          <h1 className="mt-7 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            Make Space for Your Next{" "}
            <span className="text-lime-400">Big Idea.</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-400 sm:text-lg">
            Discover and book inspiring studios for photography, filmmaking,
            podcasting, music and more.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/studios"
              className={cn(
                buttonVariants(),
                "h-12 gap-2 rounded-full bg-lime-400 px-7 text-base font-semibold text-black hover:bg-lime-300"
              )}
            >
              Explore Studios
              <ArrowRightIcon className="size-4" />
            </Link>
            
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2.5" aria-hidden>
              {avatarTones.map((tone) => (
                <span
                  key={tone}
                  className={`size-9 rounded-full ring-2 ring-neutral-950 ${tone}`}
                />
              ))}
            </div>
            <p className="text-sm text-neutral-400">
              <span className="font-semibold text-white">10k+</span> Creators
              Trust Us
            </p>
          </div>
        </div>
      </div>

      <div className="absolute right-6 bottom-8 z-10 hidden items-center gap-4 sm:flex lg:right-10">
        <span
          className="text-sm tracking-wide text-neutral-400"
          aria-live="polite"
        >
          <span className="font-semibold text-white">
            {String(index + 1).padStart(2, "0")}
          </span>{" "}
          / {String(total).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <Button
            aria-label="Previous slide"
            size="icon"
            onClick={prev}
            className="size-10 rounded-full border border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white dark:border-white/25 dark:bg-transparent"
            variant="outline"
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            aria-label="Next slide"
            size="icon"
            onClick={next}
            className="size-10 rounded-full border border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white dark:border-white/25 dark:bg-transparent"
            variant="outline"
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export { Banner }
