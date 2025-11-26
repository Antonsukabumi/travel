import type {
  InsightMetric,
  PhotographyPackage,
  Story,
  Testimonial,
  TravelPackage,
} from "./types";

export const TRAVEL_PACKAGES: TravelPackage[] = [
  {
    slug: "aurora-norway-expedition",
    title: "Aurora Norway Expedition",
    destination: "Tromsø, Norway",
    duration: "7D6N",
    price: 48500000,
    category: "expedition",
    summary:
      "Berburu aurora borealis, eksplorasi fjord privat, dan workshop fotografi malam.",
    description:
      "Pengalaman eksklusif 7 hari menyusuri kutub utara dengan pemandu lokal, kapal ekspedisi, serta sesi foto profesional.",
    highlights: [
      "Cruise private melewati Lyngen Alps",
      "Sesi foto aurora dengan fotografer internal",
      "Sauna terapung dan fine dining Nordik",
    ],
    itinerary: [
      "Hari 1: Kedatangan & private transfer ke Arctic Lodge",
      "Hari 2: Workshop fotografi + eksplorasi kota Tromsø",
      "Hari 3: Perburuan aurora sampai tengah malam",
      "Hari 4: Cruise melewati fjord & pemotretan on-boat",
      "Hari 5: Snowshoeing + kunjungan peternakan rusa",
      "Hari 6: Hari bebas + spa",
      "Hari 7: Checkout & airport concierge",
    ],
    services: [
      "Butler & concierge 24/7",
      "Transportasi premium",
      "Dokumentasi foto & video",
    ],
    rating: 4.9,
    spotsLeft: 5,
    featured: true,
    heroImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "santorini-editorial-escape",
    title: "Santorini Editorial Escape",
    destination: "Santorini, Yunani",
    duration: "5D4N",
    price: 26500000,
    category: "editorial" as TravelPackage["category"],
    summary:
      "Foto editorial di cliffside Oia, private cruise, dan jamuan chef Michelin.",
    description:
      "Dirancang untuk pasangan dan brand fashion yang ingin membuat karya visual di Santorini.",
    highlights: [
      "Sunset editorial shoot di Oia",
      "Private catamaran Aegean Sea",
      "Wine tasting & dining fine-dining",
    ],
    itinerary: [
      "Hari 1: Kedatangan & styling session",
      "Hari 2: Editorial shoot sesi pagi & sore",
      "Hari 3: Private cruise + candid session",
      "Hari 4: Eksplorasi kuliner & leisure",
      "Hari 5: Checkout",
    ],
    services: [
      "Creative director & fotografer",
      "Stylist & wardrobe basic",
      "Transport premium",
    ],
    rating: 4.8,
    spotsLeft: 8,
    featured: true,
    heroImage:
      "https://images.unsplash.com/photo-1505739775417-85a0026f6594?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "komodo-liveaboard-luxe",
    title: "Komodo Liveaboard Luxe",
    destination: "Labuan Bajo, Indonesia",
    duration: "4D3N",
    price: 18500000,
    category: "adventure",
    summary:
      "Liveaboard premium, free diving, sunrise di Padar, dan dokumentasi bawah air.",
    description:
      "Private phinisi dengan maksimal 10 tamu, chef on-board, dan kru diving tersertifikasi.",
    highlights: [
      "Sunrise Padar Island",
      "Swim with manta rays",
      "Underwater photo session",
    ],
    itinerary: [
      "Hari 1: Boarding & sunset sail",
      "Hari 2: Trekking Padar + beach club",
      "Hari 3: Diving manta & pink beach",
      "Hari 4: Checkout & airport transfer",
    ],
    services: [
      "Kabin private + en-suite bathroom",
      "Kru dokumentasi foto/video",
      "Peralatan snorkel & diving",
    ],
    rating: 4.7,
    spotsLeft: 2,
    featured: false,
    heroImage:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    ],
  },
];

export const PHOTOGRAPHY_PACKAGES: PhotographyPackage[] = [
  {
    slug: "destination-prewedding",
    title: "Destination Pre-Wedding",
    style: "wedding",
    price: 15500000,
    duration: "10 jam",
    description:
      "Konsep cinematic dengan dua fotografer dan creative director untuk memastikan setiap momen tertangkap sempurna.",
    deliverables: [
      "120+ edited photos",
      "2 menit highlight film",
      "Album linen A4",
      "Creative moodboard session",
    ],
    featuredShots: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "brand-storytelling",
    title: "Brand Storytelling",
    style: "editorial",
    price: 12500000,
    duration: "8 jam",
    description:
      "Produksi konten untuk brand travel & hospitality, fokus pada narasi visual yang konsisten.",
    deliverables: [
      "Moodboard & shotlist",
      "80 retouched photos",
      "Reel 45 detik",
      "Usage license 1 tahun",
    ],
    featuredShots: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    slug: "family-heritage",
    title: "Family Heritage Session",
    style: "lifestyle",
    price: 6500000,
    duration: "4 jam",
    description:
      "Sesi foto keluarga dengan pendekatan dokumenter untuk menangkap kehangatan natural selama liburan.",
    deliverables: [
      "60 edited photos",
      "Story book 20 halaman",
      "Same-day preview",
    ],
    featuredShots: [
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1469478715127-0c2a56816920?auto=format&fit=crop&w=900&q=80",
    ],
  },
];

export const STORIES: Story[] = [
  {
    slug: "bali-phinisi-editorial",
    title: "Merancang Editorial di Atas Phinisi Bali",
    excerpt:
      "Catatan creative director kami saat memadukan nuansa heritage dan kemewahan modern di laut Flores.",
    image:
      "https://images.unsplash.com/photo-1469478715127-0c2a56816920?auto=format&fit=crop&w=900&q=80",
    readingTime: "6 menit",
  },
  {
    slug: "aurora-playbook",
    title: "Playbook Menangkap Aurora yang Dramatis",
    excerpt:
      "Gear, kamera setting, dan strategi lokasi terbaik agar tiap tamu pulang dengan masterpiece.",
    image:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=80",
    readingTime: "5 menit",
  },
  {
    slug: "intimate-retreat-japan",
    title: "Intimate Retreat di Pegunungan Jepang",
    excerpt:
      "Bagaimana kami mendesain retreat 12 tamu yang memadukan wellness dan fotografi fine-art.",
    image:
      "https://images.unsplash.com/photo-1482192597420-4817fdd7e8b0?auto=format&fit=crop&w=900&q=80",
    readingTime: "7 menit",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Adinda P.",
    role: "Creative Lead, Atelier Lumi",
    quote:
      "Tim WanderLens tahu persis bagaimana menerjemahkan identitas brand kami menjadi visual yang elegan. Workflow mereka sangat rapi.",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Reza & Nat",
    role: "Pasangan Pre-Wedding",
    quote:
      "Kami tidak hanya dapat foto yang cantik, tetapi juga itinerary yang super smooth. Semua detail diperhatikan.",
    avatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Andika K.",
    role: "Founder, Komodo Escape",
    quote:
      "Liveaboard private kami jadi paket signature berkat dokumentasi WanderLens. Klien repeat booking dua kali lipat.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
];

export const INSIGHT_METRICS: InsightMetric[] = [
  {
    label: "Trip Premium",
    value: "140+",
    caption: "Kurasi pengalaman tailor-made sejak 2018",
  },
  {
    label: "Deliverables Foto",
    value: "25K",
    caption: "File resolusi tinggi dikirim aman ke klien",
  },
  {
    label: "NPS Klien",
    value: "92",
    caption: "Skor kepuasan untuk layanan travel & fotografi",
  },
  {
    label: "Waktu Respons",
    value: "< 15 mnt",
    caption: "Rata-rata respon konsultan saat jam kerja",
  },
];

