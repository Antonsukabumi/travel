## WanderLens Travel & Photography Studio

Website ini adalah platform travel premium & layanan fotografi profesional yang dibangun dengan **Next.js 16 (App Router), Tailwind CSS 4, dan MongoDB**. Fitur utama:

- Landing page komprehensif dengan hero interaktif, paket travel unggulan, layanan fotografi, testimoni, insight metriks, dan blog singkat.
- Halaman `/packages` dan `/photography` untuk memperdalam informasi layanan.
- Formulir booking yang mengirim data ke endpoint `POST /api/bookings` (validasi via Zod) dan menyimpan data ke MongoDB.
- API publik: `GET /api/packages`, `GET /api/photography`, `POST /api/bookings`.
- Layer data otomatis men-seed paket travel & fotografi ketika koleksi kosong.

## Persiapan Lingkungan

1. Duplikat file `env.example` menjadi `.env.local` kemudian isi kredensial MongoDB:

```
cp env.example .env.local
```

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/wanderlens
MONGODB_DB=wanderlens
```

2. Install dependensi (sudah dilakukan ketika bootstrap, jalankan ulang jika perlu):

```
npm install
```

3. Jalankan server pengembangan:

```
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat situs.

> Tanpa `MONGODB_URI`, website tetap menampilkan data dummy, namun penyimpanan booking akan berstatus simulasi (informasi ini tampil di UI agar mudah diketahui).

## Struktur Penting

- `src/app/page.tsx` – landing page utama lengkap dengan seluruh section.
- `src/app/api/*` – route handler untuk paket & booking.
- `src/lib/mongodb.ts` – utilitas koneksi MongoDB dengan caching global.
- `src/lib/data-service.ts` – fungsi data (fetch, seed, booking).
- `src/components/*` – kartu konten dan form booking.
- `PROJECT_PLAN.md` – ringkasan rencana implementasi & arsitektur.

## Testing & Quality

- `npm run lint` untuk menjalankan ESLint.
- Gunakan tool seperti Thunder Client/Postman untuk menembak endpoint booking.
- Pastikan variabel lingkungan terset sebelum menjalankan `npm run build`.

## Deployment

Aplikasi siap deploy di Vercel, Netlify, atau platform Node lainnya. Pastikan environment variable MongoDB diset di platform deployment pilihan Anda.
