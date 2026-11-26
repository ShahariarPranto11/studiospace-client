
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Other",
];

const allAmenities = [
  "WiFi",
  "Green Screen",
  "Lighting Kit",
  "AC",
  "Parking",
  "Soundproofing",
];

export default function AddStudioPage() {
  const router = useRouter();

  const [amenities, setAmenities] = useState<string[]>(["WiFi"]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    maxCapacity: "",
    location: "",
    hourlyRate: "45",
    securityDeposit: "50",
    overview: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Amenities select and unselect
  const handleAmenity = (item: string) => {
    if (amenities.includes(item)) {
      setAmenities(amenities.filter((a) => a !== item));
    } else {
      setAmenities([...amenities, item]);
    }
  };

  // Image selection
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setMessage("Please select a valid image.");
        return;
      }

      setImageFile(file);
      setMessage("");
    }
  };

  // Upload image to ImgBB
  const uploadImage = async () => {
    if (!imageFile) {
      return imageUrl;
    }

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      throw new Error("ImgBB API key is missing.");
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error("Image upload failed. Please try again.");
    }

    return data.data.url;
  };

  // Publish Studio
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      // Upload image first
      const uploadedImageUrl = await uploadImage();

      if (!uploadedImageUrl) {
        throw new Error("Please select an image or provide an image URL.");
      }

      // Save studio information
      const res = await fetch("http://localhost:8000/add-studio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          maxCapacity: Number(formData.maxCapacity),
          hourlyRate: Number(formData.hourlyRate),
          securityDeposit: Number(formData.securityDeposit),
          amenities,
          imageUrl: uploadedImageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to add studio.");
      }

      setMessage("Studio published successfully!");

      router.push("/explore-studio");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#303632] bg-[#171B19] px-3 py-2.5 text-sm text-white placeholder:text-[#929992] outline-none focus:border-[#C5F36A]";

  const labelClass = "mb-1.5 block text-[11px] text-[#929992]";

  return (
    <main className="min-h-screen bg-[#111312] px-4 pb-24 pt-8 text-[#F4F5F0] sm:px-8">
      <div className="mx-auto max-w-[568px]">
        <h1 className="mb-4 text-2xl font-bold sm:text-[28px]">
          Add New Studio
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-[#262C28] bg-[#1B1F1D] p-5 sm:p-6"
        >
          {/* BASIC INFO */}
          <section>
            <h2 className="mb-3 text-[10px] font-bold tracking-wider text-[#C5F36A]">
              ▪ BASIC INFO
            </h2>

            <div className="space-y-3">
              <div>
                <label className={labelClass}>Studio Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Studio name"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="">Category</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Max Capacity</label>
                  <input
                    type="number"
                    name="maxCapacity"
                    placeholder="Number of people"
                    min="1"
                    value={formData.maxCapacity}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Location / Address</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Street, area, city"
                  value={formData.location}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section>
            <h2 className="mb-3 text-[10px] font-bold tracking-wider text-[#C5F36A]">
              ▪ PRICING
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Hourly Rate ($)</label>
                <input
                  type="number"
                  name="hourlyRate"
                  min="1"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Security Deposit ($)</label>
                <input
                  type="number"
                  name="securityDeposit"
                  min="0"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </section>

          {/* AMENITIES */}
          <section>
            <h2 className="mb-3 text-[10px] font-bold tracking-wider text-[#C5F36A]">
              ▪ AMENITIES
            </h2>

            <div className="flex flex-wrap gap-1.5">
              {allAmenities.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleAmenity(item)}
                  className={`rounded-full border px-3 py-1.5 text-[10px] transition ${
                    amenities.includes(item)
                      ? "border-[#C5F36A]/30 bg-[#C5F36A]/15 text-[#C5F36A]"
                      : "border-[#303632] text-[#929992] hover:border-[#C5F36A]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* IMAGE */}
          <section>
            <h2 className="mb-3 text-[10px] font-bold tracking-wider text-[#C5F36A]">
              ▪ IMAGE
            </h2>

            <div className="rounded-xl border border-dashed border-[#303632] bg-[#171B19] p-4">
              <p className="mb-3 text-center text-xs text-[#929992]">
                Image URL or upload (ImgBB)
              </p>

              <input
                type="text"
                placeholder="Paste image URL here"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className={`${inputClass} mb-3`}
              />

              <label className="block cursor-pointer rounded-lg border border-[#303632] px-4 py-3 text-center text-xs text-[#C5F36A] hover:bg-[#C5F36A]/10">
                {imageFile ? imageFile.name : "Choose Image"}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>

              {imageFile && (
                <p className="mt-2 text-center text-xs text-gray-400">
                  Selected: {imageFile.name}
                </p>
              )}
            </div>
          </section>

          {/* OVERVIEW */}
          <section>
            <h2 className="mb-3 text-[10px] font-bold tracking-wider text-[#C5F36A]">
              ▪ OVERVIEW
            </h2>

            <textarea
              name="overview"
              rows={4}
              placeholder="Describe the space, light and gear"
              value={formData.overview}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
              required
            />
          </section>

          {/* HOST INFORMATION */}
          <section>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Host Name (read-only)</label>
                <input
                  type="text"
                  value=""
                  placeholder="Host name"
                  readOnly
                  className={`${inputClass} opacity-70`}
                />
              </div>

              <div>
                <label className={labelClass}>Host Email (read-only)</label>
                <input
                  type="email"
                  value=""
                  placeholder="Host email"
                  readOnly
                  className={`${inputClass} opacity-70`}
                />
              </div>
            </div>
          </section>

          {/* MESSAGE */}
          {message && (
            <p className="text-center text-sm text-[#C5F36A]">
              {message}
            </p>
          )}

          {/* BUTTONS */}
          <div className="flex justify-end gap-2 border-t border-[#303632] pt-5">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded-full border border-[#52602F] px-5 py-2 text-xs font-medium hover:bg-[#1B1F1D]"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#C5F36A] px-5 py-2 text-xs font-bold text-[#111312] transition hover:bg-[#D5FF7A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Publishing..." : "Publish Studio"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

