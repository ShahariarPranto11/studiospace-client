import { AboutUs } from "@/components/about-us"
import { Banner } from "@/components/banner"
import { BrowseCategories } from "@/components/browse-categories"
import { HowItWorks } from "@/components/how-it-works"

export default function Home() {
  return (
    <div className="min-h-svh bg-black">
      <main>
        <Banner />
        <BrowseCategories />
        <HowItWorks />
        <AboutUs />
      </main>
    </div>
  )
}
