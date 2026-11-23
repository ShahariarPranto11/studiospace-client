import { ShieldCheckIcon } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Discover Spaces",
    description: "Find your perfect studio.",
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description: "Choose your preferred time.",
  },
  {
    number: "03",
    title: "Book Instantly",
    description: "Reserve your workspace.",
  },
  {
    number: "04",
    title: "Create & Produce",
    description: "Bring your ideas to life.",
  },
]

const promises = [
  {
    title: "Liability Protection",
    description: "Clear booking policies for your peace of mind.",
  },
  {
    title: "Verified Profiles",
    description: "Connect with verified studio hosts.",
  },
  {
    title: "Equipment Safety",
    description: "Know what equipment is available.",
  },
  {
    title: "24/7 Creator Support",
    description: "Get help whenever you need it.",
  },
]

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative scroll-mt-16 overflow-hidden bg-neutral-950 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 size-80 rounded-full bg-lime-400/80 blur-2xl sm:size-96"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-widest text-lime-400 uppercase">
              <span aria-hidden className="size-1.5 rounded-full bg-lime-400" />
              How It Works
            </p>
            <h2
              id="how-it-works-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              From Idea to Creation. Four Simple Steps.
            </h2>
            <p className="mt-4 max-w-sm text-base text-neutral-400">
              Book your perfect studio in just a few clicks.
            </p>
          </div>

          <ol className="grid grid-cols-2 gap-6 border-white/10 sm:grid-cols-4 lg:border-l lg:pl-12">
            {steps.map((step) => (
              <li key={step.number} className="flex flex-col gap-3">
                <span
                  aria-hidden
                  className="inline-flex size-10 items-center justify-center rounded-full border border-lime-400/60 text-xs font-semibold text-lime-400"
                >
                  {step.number}
                </span>
                <h3 className="text-base leading-snug font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-400">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 rounded-2xl bg-neutral-900/80 p-6 ring-1 ring-white/10 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-12">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold tracking-widest text-lime-400 uppercase">
                <span aria-hidden className="size-1.5 rounded-full bg-lime-400" />
                Our Promise
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                A Trusted Platform for Creators
              </h2>
            </div>

            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {promises.map((promise) => (
                <li
                  key={promise.title}
                  className="flex flex-col gap-3 border-white/10 lg:border-l lg:pl-6"
                >
                  <ShieldCheckIcon
                    className="size-5 text-lime-400"
                    aria-hidden
                  />
                  <h3 className="text-base font-semibold text-white">
                    {promise.title}
                  </h3>
                  <p className="text-sm text-neutral-400">
                    {promise.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export { HowItWorks }
