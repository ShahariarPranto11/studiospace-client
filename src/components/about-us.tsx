import Image from "next/image";
import { HeartHandshakeIcon, LightbulbIcon, UsersIcon } from "lucide-react";

const values = [
  {
    icon: LightbulbIcon,
    title: "Creator-First",
    description:
      "Every feature is built to remove friction between an idea and a finished shoot.",
  },
  {
    icon: UsersIcon,
    title: "Trusted Hosts",
    description:
      "Verified studio owners, clear policies, and reviews from real bookings.",
  },
  {
    icon: HeartHandshakeIcon,
    title: "Fair for All",
    description:
      "Transparent pricing for creators and reliable payouts for hosts.",
  },
];

function AboutUs() {
  return (
    <section
      id="about-us"
      aria-labelledby="about-us-heading"
      className="scroll-mt-16 bg-neutral-950 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-widest text-lime-400 uppercase">
              <span aria-hidden className="size-1.5 rounded-full bg-lime-400" />
              About Us
            </p>
            <h2
              id="about-us-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Built for Creators Who Ship.
            </h2>
            <p className="mt-4 max-w-lg text-base text-neutral-400">
              StudioSpace connects photographers, filmmakers, podcasters, and
              musicians with bookable spaces — so you spend less time hunting
              for a room and more time making work.
            </p>
            <p className="mt-3 max-w-lg text-base text-neutral-400">
              From daylight photo stages to soundproofed podcast suites, every
              listing is verified and ready when you are.
            </p>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-2xl ring-1 ring-white/10">
            <Image
              src="/images/studio-3.jpg"
              alt="Creators collaborating in a bright photo studio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.25)_0%,transparent_50%,rgba(190,240,0,0.12)_100%)]"
            />
          </div>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <li
                key={value.title}
                className="rounded-xl bg-neutral-900/80 p-6 ring-1 ring-white/10"
              >
                <span
                  aria-hidden
                  className="inline-flex size-9 items-center justify-center rounded-lg bg-lime-400/15 text-lime-400 ring-1 ring-lime-400/30"
                >
                  <Icon className="size-4.5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-400">
                  {value.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export { AboutUs };
