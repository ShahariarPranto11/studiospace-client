"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: string;
  imageUrl: string;
  overview: string;
}

const StudioFature = () => {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [sort, setSort] = useState("");

  // Fetch all studios
  useEffect(() => {
    const fetchStudios = async () => {
      const res = await fetch("http://localhost:8000/explore-studio");
      const data = await res.json();
      setStudios(data);
    };

    fetchStudios();
  }, []);

  // Filter studios
  const filteredStudios = studios.filter((studio) => {
    const matchSearch =
      studio.title.toLowerCase().includes(search.toLowerCase()) ||
      studio.category.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category === "" || studio.category === category;

    const matchLocation =
      location === "" ||
      studio.location.toLowerCase().includes(location.toLowerCase());

    const matchPrice =
      price === "" ||
      (price === "0-50" && Number(studio.hourlyRate) <= 50) ||
      (price === "50-100" &&
        Number(studio.hourlyRate) > 50 &&
        Number(studio.hourlyRate) <= 100) ||
      (price === "100+" && Number(studio.hourlyRate) > 100);

    return matchSearch && matchCategory && matchLocation && matchPrice;
  });

  // Sort studios
  const sortedStudios = [...filteredStudios].sort((a, b) => {
    if (sort === "low") {
      return Number(a.hourlyRate) - Number(b.hourlyRate);
    }

    if (sort === "high") {
      return Number(b.hourlyRate) - Number(a.hourlyRate);
    }

    return 0;
  });

  // Reset filters
  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setLocation("");
    setPrice("");
    setSort("");
  };

  return (
    <section className="min-h-screen bg-[#0d110f] px-5 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h1 className="mb-3 text-3xl font-bold md:text-4xl">
          Find Your Perfect Studio
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search studios, cities, equipment"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-7 w-full rounded-full border border-[#252d28] bg-[#171e19] px-5 py-3 text-sm outline-none focus:border-green-500"
        />

        {/* Filters */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-[#303a33] bg-[#171e19] px-3 py-2 text-xs"
          >
            <option value="">Category</option>

            {Array.from(new Set(studios.map((studio) => studio.category))).map(
              (item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ),
            )}
          </select>

          {/* Location */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-full border border-[#303a33] bg-[#171e19] px-3 py-2 text-xs"
          >
            <option value="">Location</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Khulna">Khulna</option>
          </select>

          {/* Price */}
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="rounded-full border border-[#303a33] bg-[#171e19] px-3 py-2 text-xs"
          >
            <option value="">Price Range</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100+">$100+</option>
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-[#303a33] bg-[#171e19] px-3 py-2 text-xs"
          >
            <option value="">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>

          {/* Reset */}
          <button
            onClick={resetFilters}
            className="rounded-full border border-green-700 px-4 py-2 text-xs hover:bg-green-700"
          >
            Reset
          </button>
        </div>

        {/* Studio Count */}
        <p className="mb-3 text-xs text-gray-400">
          {sortedStudios.length} studios found
        </p>

        {/* Studio Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedStudios.map((studio) => (
            <div
              key={studio._id}
              className="overflow-hidden rounded-xl border border-[#29332c] bg-[#171e19] transition hover:border-green-700"
            >
              {/* Studio Image */}
              <div className="h-40 overflow-hidden">
                <img
                  src={
                    studio.imageUrl.startsWith("http")
                      ? studio.imageUrl
                      : `http://localhost:8000/uploads/${studio.imageUrl}`
                  }
                  alt={studio.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Studio Information */}
              <div className="p-3">
                <span className="rounded-sm bg-[#34451b] px-2 py-1 text-[9px] font-bold text-[#d4ff70]">
                  {studio.category.toUpperCase()}
                </span>

                <h2 className="mt-3 text-sm font-semibold">{studio.title}</h2>

                <p className="mt-1 text-xs text-gray-400">{studio.location}</p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-bold">
                    ${studio.hourlyRate} / hr
                  </span>
                </div>

                {/* Details Button */}
                <Link
                  href={`/studios/${studio._id}`}
                  className="mt-3 block rounded-full border border-green-700 py-2 text-center text-xs hover:bg-green-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Studios Found */}
        {sortedStudios.length === 0 && (
          <p className="py-10 text-center text-gray-400">No studios found!</p>
        )}
      </div>
    </section>
  );
};

export default StudioFature;
