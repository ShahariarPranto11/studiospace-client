import Image from "next/image"
import Link from "next/link"
import {
  ArrowRightIcon,
  CameraIcon,
  ClapperboardIcon,
  MicIcon,
  MusicIcon,
  PaletteIcon,
  type LucideIcon,
} from "lucide-react"
import { Card } from "@/components/ui/card"

type Category = {
  slug: string
  label: string
  count: string
  image: string
  alt: string
  icon: LucideIcon
}

const categories: Category[] = [
  {
    slug: "photo-studios",
    label: "Photo Studios",
    count: "50+",
    image: "/categories/photo-studios.jpg",
    alt: "Photo studio with white backdrop and softbox lighting",
    icon: CameraIcon,
  },
  {
    slug: "film-stages",
    label: "Film Stages",
    count: "30+",
    image: "/categories/film-stages.jpg",
    alt: "Film production stage with camera equipment",
    icon: ClapperboardIcon,
  },
  {
    slug: "podcast-rooms",
    label: "Podcast Rooms",
    count: "40+",
    image: "/categories/podcast-rooms.jpg",
    alt: "Podcast room with microphones and acoustic panels",
    icon: MicIcon,
  },
  {
    slug: "music-suites",
    label: "Music Suites",
    count: "25+",
    image: "/categories/music-suites.jpg",
    alt: "Music production suite with mixing console",
    icon: MusicIcon,
  },
  {
    slug: "art-workshops",
    label: "Art Workshops",
    count: "20+",
    image: "/categories/art-workshops.jpg",
    alt: "Art workshop with shelves and creative supplies",
    icon: PaletteIcon,
  },
]

function BrowseCategories() {
  return (
    <section
      aria-labelledby="browse-categories-heading"
      className="bg-neutral-950 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <p className="flex items-center gap-2 text-xs font-semibold tracking-widest text-lime-400 uppercase">
          <span aria-hidden className="size-1.5 rounded-full bg-lime-400" />
          Browse by Categories
        </p>
        <h2
          id="browse-categories-heading"
          className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Find Your Creative Space.
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.slug} href={`/categories/${category.slug}`}>
                <Card className="group/card relative aspect-[4/5] gap-0 overflow-hidden border-0 bg-neutral-900 py-0 ring-1 ring-white/10">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(0,0,0,0.75)_75%,rgba(0,0,0,0.92)_100%)]"
                  />
                  <div className="relative flex h-full flex-col justify-end p-4">
                    <span className="mb-3 inline-flex size-9 items-center justify-center rounded-lg bg-lime-400/15 text-lime-400 ring-1 ring-lime-400/30">
                      <Icon className="size-4.5" aria-hidden />
                    </span>
                    <h3 className="text-base font-semibold text-white">
                      {category.label}
                    </h3>
                    <p className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-lime-400">
                      {category.count} Spaces
                      <ArrowRightIcon
                        className="size-3.5 transition-transform group-hover/card:translate-x-0.5"
                        aria-hidden
                      />
                    </p>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { BrowseCategories }
