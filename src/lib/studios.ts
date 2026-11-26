export interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: string | number;
  amenities?: string[];
  imageUrl?: string;
  galleryImages?: string[];
  overview: string;
  rating?: number;
  reviewsCount?: number;
  createdAt?: string | number;
  host?: { name: string; email: string };
  reviews?: Array<{ user: string; rating: number; comment: string }>;
  securityDeposit?: string | number;
  maxCapacity?: string | number;
  capacity?: number;
  image?: string;
  id?: string;
  status?: string;
}

export function getHourlyRate(studio: Studio): number {
  return Number(studio.hourlyRate);
}

export function getRating(studio: Studio): number {
  return studio.rating ?? 0;
}

export function getCreatedAt(studio: Studio): number {
  if (!studio.createdAt) return 0;
  return new Date(studio.createdAt).getTime();
}

export function getStudioImage(studio: Studio, index: number): string {
  const source = studio.galleryImages?.[index] ?? studio.imageUrl ?? studio.image;
  if (!source) return "";
  return source.startsWith("http")
    ? source
    : `http://localhost:8000/uploads/${source}`;
}

export function formatLocation(location: string): string {
  return location;
}

export function getCategoryOptions(studios: Studio[]): string[] {
  return Array.from(new Set(studios.map((studio) => studio.category)));
}

export function getLocationOptions(studios: Studio[]): Array<{
  value: string;
  label: string;
}> {
  return Array.from(new Set(studios.map((studio) => studio.location))).map(
    (location) => ({ value: location, label: location }),
  );
}
