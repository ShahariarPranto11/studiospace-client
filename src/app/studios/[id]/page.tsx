"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: string;
  securityDeposit?: string;
  maxCapacity?: string;
  imageUrl: string;
  galleryImages?: string[];
  overview: string;
  amenities?: string[];
  rating?: number;
  reviewsCount?: number;
  host?: { name: string; email: string };
  reviews?: Array<{ user: string; rating: number; comment: string }>;
}

const StudioDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const res = await fetch(`http://localhost:8000/studios/${id}`);

        if (!res.ok) {
          throw new Error("Studio not found");
        }

        const data = await res.json();
        setStudio(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudio();
    }
  }, [id]);

  if (loading) {
    return <p className="py-20 text-center text-white">Loading...</p>;
  }

  if (!studio) {
    return <p className="py-20 text-center text-white">Studio not found!</p>;
  }

  const resolveImage = (value?: string) => {
    if (!value) return "";
    return value.startsWith("http")
      ? value
      : `http://localhost:8000/uploads/${value}`;
  };

  const imageSrc = resolveImage(studio.imageUrl);

  return (
    <section className="min-h-screen bg-[#0d110f] px-5 py-10 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="relative group h-112.5 overflow-hidden rounded-xl">
              <Image
                src={imageSrc}
                alt={studio.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 left-4 h-7 rounded-full border border-[#C5F36A]/25 bg-black/45 px-3 py-0.5 text-[11px] font-semibold text-[#C5F36A] uppercase backdrop-blur-sm">
                {studio.category.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => {
                const thumb = studio.galleryImages?.[i];
                const src = resolveImage(thumb || studio.imageUrl);
                return (
                  <div
                    key={i}
                    className="h-24 relative overflow-hidden rounded-lg"
                  >
                    <Image
                      src={src}
                      alt={`${studio.title} thumbnail`}
                      fill
                      sizes="24vw"
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              {studio.title}
            </h1>

            <p className="mt-1 text-[#929992]">
              {studio.location} ·{" "}
              <span className="text-[#C5F36A]">
                ★ {studio.rating?.toFixed(1) ?? "4.9"}
              </span>{" "}
              ({studio.reviewsCount ?? 0} reviews)
            </p>

            <h2 className="mt-8 text-xl font-semibold">Overview</h2>
            <p className="mt-2 text-[#929992] leading-relaxed">
              {studio.overview}
            </p>

            <h2 className="mt-8 text-xl font-semibold">Amenities</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {studio.amenities?.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#C5F36A]/25 bg-[#C5F36A]/5 px-3 py-1 text-xs font-semibold text-[#C5F36A]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-[#262c28] bg-[#171b19] p-5">
              <p className="font-bold">
                Hosted by {studio.host?.name ?? "Host"}
              </p>
              <p className="mt-0.5 text-sm text-[#929992]">
                Verified Host · {studio.host?.email ?? ""}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold">Reviews</h2>
              <div className="mt-3 space-y-3">
                {(studio.reviews ?? []).map((review, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-[#262c28] bg-[#171b19] p-5"
                  >
                    <p className="font-bold flex items-baseline gap-1">
                      {review.user} ·
                      <span className="text-[#C5F36A]">★ {review.rating}</span>
                    </p>
                    <p className="mt-0.5 text-sm text-[#929992]">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-5 rounded-2xl border border-[#262c28] bg-[#171b19] p-6">
              <p className="text-3xl font-bold tracking-tight">
                ${studio.hourlyRate} / hr
              </p>
              <p className="mt-1 text-sm text-[#929992]">
                Security deposit ${studio.securityDeposit ?? "0"} · Max capacity{" "}
                {studio.maxCapacity ?? "-"}
              </p>
              <button className="mt-5 flex w-full items-center justify-center rounded-full bg-[#C5F36A] px-6 py-2.5 text-base font-bold text-black hover:bg-lime-300">
                Book Workspace Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioDetailsPage;
