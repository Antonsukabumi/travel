export type TravelPackage = {
  _id?: string;
  slug: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  category:
    | "expedition"
    | "culinary"
    | "wellness"
    | "culture"
    | "adventure"
    | "editorial";
  summary: string;
  description: string;
  highlights: string[];
  itinerary: string[];
  services: string[];
  rating: number;
  spotsLeft: number;
  featured?: boolean;
  heroImage: string;
  gallery: string[];
};

export type PhotographyPackage = {
  _id?: string;
  slug: string;
  title: string;
  style: "lifestyle" | "editorial" | "documentary" | "wedding";
  price: number;
  duration: string;
  description: string;
  deliverables: string[];
  featuredShots: string[];
};

export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  readingTime: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

export type InsightMetric = {
  label: string;
  value: string;
  caption: string;
};

export type BookingInput = {
  name: string;
  email: string;
  phone?: string;
  startDate: string;
  travelers: number;
  message?: string;
  travelPackageSlug?: string;
  photographyPackageSlug?: string;
};

export type BookingRecord = BookingInput & {
  _id: string;
  createdAt: string;
};

