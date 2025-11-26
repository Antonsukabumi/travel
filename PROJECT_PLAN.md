# WanderLens Travel Platform – Rencana Implementasi

## Tujuan
Membangun website profesional yang memadukan layanan travel premium dan fotografi dengan stack **Next.js 16 (App Router)** dan **MongoDB**. Platform harus menawarkan pengalaman pemesanan end-to-end (katalog paket, detail layanan, formulir booking, testimoni, konten inspirasi) serta API terstruktur untuk integrasi lanjutan.

## Sasaran Fungsional
1. **Landing Page komprehensif**: hero CTA ganda, pencarian cepat, highlight paket, layanan fotografi, testimoni, artikel inspirasional, FAQ, dan CTA newsletter.
2. **Katalog Paket Travel**: filter (tema, budget, durasi), detail paket dengan itinerary, highlight, dan ketersediaan.
3. **Layanan Fotografi**: showcase paket foto, portofolio fotografer, paket bundling travel+foto.
4. **Form Booking terpusat**: pengunjung memilih paket travel/fotografi, jadwal, jumlah tamu, detail kontak; data tersimpan ke MongoDB.
5. **API publik dasar**: endpoint `GET` daftar paket, `GET` fotografer, `POST` booking.
6. **Dashboard ringkas (MVP)**: ringkasan statistik dan daftar booking terbaru langsung di landing page admin section sederhana (tanpa auth, hanya ringkasan read-only).

## Arsitektur & Teknologi
- **Front-end**: Next.js App Router, Server Components untuk data fetching, Client Components untuk interaktivitas (forms, carousels).
- **Styling**: Tailwind CSS 4 utility-first + komponen custom (Card, Badge, Button, Section).
- **State**: Form state via React hook (client), data di-load via async server functions.
- **Database**: MongoDB Atlas/standalone via native driver. Koneksi reusable (`lib/mongodb.ts`) dengan caching global agar tidak membuka koneksi ganda pada hot reload.
- **Validasi**: Zod untuk memvalidasi payload booking pada API route.
- **Data Layer**:
  - `lib/models.ts`: tipe TypeScript.
  - `lib/seed-data.ts`: data awal untuk paket & fotografer, otomatis diinsert ketika koleksi kosong.
  - `lib/data-service.ts`: fungsi `getTravelPackages`, `getPhotographyPackages`, `getFeaturedStories`, `getInsights`, `createBooking`.

## Struktur Halaman
```
/
├── (sections) hero, quick-search, featured-packages, photography, experiences,
│   testimonials, stories, booking-cta, faq, newsletter
├── /packages
│   └── fitur filter, daftar kartu, detail highlight
├── /photography
│   └── paket foto, portofolio fotografer, bundling tips
├── API
│   ├── /api/packages (GET)
│   ├── /api/photography (GET)
│   └── /api/bookings (POST)
```

## Skema Data
```ts
TravelPackage {
  _id, slug, title, destination, duration, price, category,
  spotsLeft, rating, summary, highlights[], itinerary[], services[], image
}

PhotographyPackage {
  _id, slug, title, style, price, description, deliverables[], featuredShots[]
}

Booking {
  _id, customerName, email, phone, travelPackageId?, photographyPackageId?,
  travelers, startDate, message, createdAt
}
```

## Integrasi MongoDB
1. Variabel env `MONGODB_URI` + optional `MONGODB_DB`.
2. Utility `getDb()` menjaga koneksi tunggal (globalThis cache).
3. Fungsi `seedCollections()` memeriksa koleksi dan mengisi data awal jika masih kosong.
4. API route memakai fungsi service + validasi Zod:
   - `GET /api/packages` → `getTravelPackages({ featuredOnly? })`
   - `GET /api/photography`
   - `POST /api/bookings` dengan body valid.

## Roadmap Teknis
1. **Foundation**: konfigurasi Tailwind globals, setting font, komponen UI dasar.
2. **Data Layer**: koneksi MongoDB, tipe, data seed, service.
3. **Halaman Landing**: hero, highlight, CTA form, testimoni.
4. **Halaman Katalog**: packages & photography + filter sederhana (client).
5. **API & Booking Form**: integrasi form (client) → API route → Mongo.
6. **Polish**: animasi ringan, SEO metadata, metadata dynamic, error states.

## Catatan
- Testing manual via `npm run dev` + Postman/curl untuk API.
- Sertakan `env.example` berisi `MONGODB_URI=` agar mudah dikonfigurasi.
- Pertimbangkan penambahan autentikasi admin (NextAuth) pada fase berikutnya.


