"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "lucide-react";
import { cn } from "cn";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatLocation,
  getCategoryOptions,
  getCreatedAt,
  getHourlyRate,
  getLocationOptions,
  getRating,
  getStudioImage,
  type Studio,
} from "@/lib/studios";

const PRICE_OPTIONS = [
  { value: "all", label: "Price $0-$200" },
  { value: "0-50", label: "$0 - $50" },
  { value: "50-100", label: "$50 - $100" },
  { value: "100-200", label: "$100 - $200" },
  { value: "200+", label: "$200+" },
] as const;

const SORT_OPTIONS = [
  { value: "top-rated", label: "Top Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
] as const;

const triggerClass =
  "h-9 w-fit rounded-full border-[#303632] bg-[#171B19] px-4 text-xs font-medium text-[#D7DBD4] hover:bg-[#1B1F1D] focus-visible:border-[#C5F36A]/50 focus-visible:ring-[#C5F36A]/15";

const contentClass = "border border-[#262C28] bg-[#1B1F1D] text-[#F4F5F0]";

export function ExploreStudios({ studios }: { studios: Studio[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("top-rated");

  const categories = useMemo(() => getCategoryOptions(studios), [studios]);
  const locations = useMemo(() => getLocationOptions(studios), [studios]);

  const categoryItems = useMemo(() => {
    const items: Record<string, string> = { all: "Category" };
    for (const option of categories) items[option] = option;
    return items;
  }, [categories]);

  const locationItems = useMemo(() => {
    const items: Record<string, string> = { all: "Location" };
    for (const option of locations) items[option.value] = option.label;
    return items;
  }, [locations]);

  const priceItems = useMemo(
    () => Object.fromEntries(PRICE_OPTIONS.map((o) => [o.value, o.label] as const)),
    [],
  );

  const sortItems = useMemo(
    () => Object.fromEntries(SORT_OPTIONS.map((o) => [o.value, o.label] as const)),
    [],
  );

  const filteredStudios = useMemo(() => {
    const query = search.trim().toLowerCase();

    const list = studios.filter((studio) => {
      const haystack = [
        studio.title,
        studio.location,
        studio.category,
        studio.overview,
        ...(studio.amenities ?? []),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || haystack.includes(query);
      const matchesCategory =
        category === "all" || studio.category === category;
      const matchesLocation =
        location === "all" ||
        formatLocation(studio.location).toLowerCase() === location;

      const rate = getHourlyRate(studio);
      const matchesPrice =
        price === "all" ||
        (price === "0-50" && rate <= 50) ||
        (price === "50-100" && rate > 50 && rate <= 100) ||
        (price === "100-200" && rate > 100 && rate <= 200) ||
        (price === "200+" && rate > 200);

      return (
        matchesSearch && matchesCategory && matchesLocation && matchesPrice
      );
    });

    return [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return getHourlyRate(a) - getHourlyRate(b);
        case "price-desc":
          return getHourlyRate(b) - getHourlyRate(a);
        case "newest":
          return getCreatedAt(b) - getCreatedAt(a);
        default:
          return getRating(b) - getRating(a);
      }
    });
  }, [studios, search, category, location, price, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setLocation("all");
    setPrice("all");
    setSort("top-rated");
  };

  return (
    <main className="min-h-svh bg-[#111312] px-4 py-10 text-[#F4F5F0] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Find Your Perfect Studio
        </h1>

        <Input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search studios, cities, equipment"
          aria-label="Search studios, cities and equipment"
          className="mt-6 h-12 w-full rounded-full border-[#262C28] bg-[#171B19] px-5 text-sm text-[#F4F5F0] placeholder:text-[#929992] focus-visible:border-[#C5F36A]/60 focus-visible:ring-[#C5F36A]/15"
        />

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <Select
            value={category}
            onValueChange={(value) => setCategory(value ?? "all")}
            items={categoryItems}
          >
            <SelectTrigger className={triggerClass}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={contentClass}>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={location}
            onValueChange={(value) => setLocation(value ?? "all")}
            items={locationItems}
          >
            <SelectTrigger className={triggerClass}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={contentClass}>
              <SelectItem value="all">All locations</SelectItem>
              {locations.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={price}
            onValueChange={(value) => setPrice(value ?? "all")}
            items={priceItems}
          >
            <SelectTrigger className={triggerClass}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={contentClass}>
              {PRICE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={sort}
            onValueChange={(value) => setSort(value ?? "top-rated")}
            items={sortItems}
          >
            <SelectTrigger className={triggerClass}>
              <SelectValue>
                {(value) =>
                  `Sort: ${sortItems[value as string] ?? "Top Rated"}`
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent className={contentClass}>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="outline"
            onClick={resetFilters}
            className="h-9 rounded-full border-[#C5F36A]/50 bg-transparent px-4 text-xs font-medium text-[#F4F5F0] hover:bg-[#C5F36A]/10 hover:text-[#C5F36A]"
          >
            Reset
          </Button>
        </div>

        <p className="mt-7 text-xs text-[#929992]">
          {filteredStudios.length}{" "}
          {filteredStudios.length === 1 ? "studio" : "studios"} found
        </p>

        {filteredStudios.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudios.map((studio, index) => (
              <StudioCard key={studio._id} studio={studio} index={index} />
            ))}
          </div>
        ) : (
          <div className="mt-5 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#262C28] bg-[#151816] px-6 py-16 text-center">
            <p className="text-sm text-[#929992]">
              No studios match your search. Try adjusting your filters.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={resetFilters}
              className="h-9 rounded-full border-[#C5F36A]/50 bg-transparent px-4 text-xs font-medium text-[#C5F36A] hover:bg-[#C5F36A]/10 hover:text-[#C5F36A]"
            >
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

function StudioCard({ studio, index }: { studio: Studio; index: number }) {
  const rating = getRating(studio);
  const rate = getHourlyRate(studio);

  return (
    <Card className="group/card gap-0 overflow-hidden rounded-2xl border border-[#262C28] bg-[#171B19] p-0 ring-0 transition-colors hover:border-[#C5F36A]/30">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={getStudioImage(studio, index)}
          alt={studio.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.72)_100%)]"
        />
        <Badge className="absolute bottom-3 left-3 h-5 rounded-full border border-[#C5F36A]/25 bg-black/55 px-2.5 text-[10px] font-semibold tracking-wider text-[#C5F36A] uppercase backdrop-blur-sm">
          {studio.category}
        </Badge>
      </div>

      <div className="p-4">
        <h3 className="truncate text-[15px] font-semibold text-[#F4F5F0]">
          {studio.title}
        </h3>
        <p className="mt-1 truncate text-xs text-[#929992]">
          {formatLocation(studio.location)}
        </p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <Badge
            variant="secondary"
            className="h-auto gap-1 rounded-full border border-[#C5F36A]/20 bg-[#C5F36A]/10 px-2 py-1 text-[11px] font-semibold text-[#C5F36A]"
          >
            <StarIcon className="size-3" fill="currentColor" />
            {rating.toFixed(1)}
          </Badge>

          <p className="text-lg font-bold leading-none text-[#F4F5F0]">
            ${rate}
            <span className="ml-1 text-[11px] font-normal text-[#929992]">
              / hr
            </span>
          </p>
        </div>

        <Link
          href={`/explore-studio/${studio._id}`}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "mt-4 flex h-10 w-full items-center justify-center rounded-full border-[#303632] bg-transparent text-xs font-medium text-[#D7DBD4] hover:border-[#C5F36A]/40 hover:bg-[#C5F36A]/5 hover:text-[#C5F36A]",
          )}
        >
          View Details
        </Link>
      </div>
    </Card>
  );
}
