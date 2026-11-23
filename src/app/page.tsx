import { Banner } from "@/components/banner"
import { BrowseCategories } from "@/components/browse-categories"

export default function Home() {
  return (
    <div className="min-h-svh bg-black">
      <main>
        <Banner />
        <BrowseCategories />
      </main>
    </div>
  )
}
