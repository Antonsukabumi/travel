import Image from "next/image";
import Link from "next/link";
import {
  getInsightMetrics,
  getPhotographyPackages,
  getRecentBookings,
  getStories,
  getTestimonials,
  getTravelPackages,
} from "@/lib/data-service";
import {
  MetricCard,
  PhotographyPackageCard,
  StoryCard,
  TestimonialCard,
  TravelPackageCard,
} from "@/components/cards";
import { BookingForm } from "@/components/booking-form";
import { formatDate } from "@/lib/utils";

const faqs = [
  {
    question: "Apakah itinerary bisa 100% kustom?",
    answer:
      "Ya. Setelah mengisi formulir, travel director kami akan melakukan discovery call untuk memadukan preferensi destinasi, gaya foto, hingga kebutuhan logistik.",
  },
  {
    question: "Apakah layanan fotografi terpisah dari paket travel?",
    answer:
      "Kami bisa menyediakan fotografer secara standalone, namun banyak klien memilih bundling agar logistik dan lisensi konten ditangani satu tim.",
  },
  {
    question: "Berapa DP yang dibutuhkan?",
    answer:
      "Untuk travel, DP 35% diperlukan saat konfirmasi. Untuk sesi fotografi saja, DP 50% menyesuaikan kompleksitas produksi.",
  },
];

export default async function Home() {
  const [
    featuredPackages,
    travelPackages,
    photographyPackages,
    testimonials,
    stories,
    metrics,
    recentBookings,
  ] = await Promise.all([
    getTravelPackages({ featuredOnly: true, limit: 3 }),
    getTravelPackages({ limit: 6 }),
    getPhotographyPackages(),
    Promise.resolve(getTestimonials()),
    Promise.resolve(getStories()),
    Promise.resolve(getInsightMetrics()),
    getRecentBookings(),
  ]);

  const categories = Array.from(
    new Set(travelPackages.map((pkg) => pkg.category)),
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-24">
      <header className="rounded-[40px] border border-white/10 bg-white/5 p-8 sm:p-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/manuk-dadali-logo.svg"
              alt="Logo Manuk Dadali Relawan Heri Gunawan"
              width={88}
              height={96}
              priority
              className="h-16 w-auto drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]"
            />
            <div>
              <span className="inline-block rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white/70">
                Dejavu Poto
              </span>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200/80">
                Dejavu Touur and Travel
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-[2fr,1fr]">
          <div>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Travel atelier & dokumentasi editorial untuk brand dan individu
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Kurasi perjalanan, koordinasi logistik, hingga fotografer internal
              dalam satu platform. Kami menangani detail sehingga Anda fokus
              menikmati pengalaman dan kontennya.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#packages"
                className="rounded-full bg-emerald-300 px-6 py-3 text-base font-semibold text-slate-900"
              >
                Kurasi paket travel
              </Link>
              <Link
                href="#photography"
                className="rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white"
              >
                Lihat layanan foto
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {metrics.map((metric) => (
                <MetricCard key={metric.label} metric={metric} />
              ))}
            </div>
          </div>
          <aside className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-white/50">
              Status booking
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Pipeline 30 hari terakhir
            </h3>
            <div className="mt-6 space-y-4">
              {recentBookings.length === 0 && (
                <p className="text-sm text-white/60">
                  Belum ada booking yang tersimpan. Lengkapi variabel
                  <code className="mx-1 rounded bg-white/10 px-1 text-xs text-white">
                    MONGODB_URI
                  </code>
                  untuk mengaktifkan basis data.
                </p>
              )}
              {recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-sm font-semibold text-white">
                    {booking.name}
                  </p>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    {formatDate(booking.createdAt)}
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    {booking.travelPackageSlug ?? "Fotografi"} ·{" "}
                    {booking.photographyPackageSlug ? "Foto" : "Travel"}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-white/60">
              Data realtime tersimpan di MongoDB secara terenkripsi.
            </p>
          </aside>
        </div>
      </header>

      <section id="packages" className="mt-16 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
              Featured expeditions
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              Paket travel unggulan
            </h2>
          </div>
          <Link
            href="/packages"
            className="text-sm font-semibold text-emerald-300"
          >
            Lihat semua paket →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredPackages.map((pkg) => (
            <TravelPackageCard key={pkg.slug} pkg={pkg} variant="featured" />
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[40px] border border-white/10 bg-white/5 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
              Kurasi tematik
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              Pilih gaya perjalanan Anda
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-white/70">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-white/20 px-4 py-1 capitalize"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {travelPackages.map((pkg) => (
            <TravelPackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </section>

      <section
        id="photography"
        className="mt-16 grid gap-8 lg:grid-cols-[1fr,1fr]"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Photography atelier
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            Tim kreatif internal untuk hasil visual sinematik
          </h2>
          <p className="mt-4 text-white/80">
            Kreatif director, fotografer editorial, dan producer kami siap
            mendampingi produksi di destinasi favorit Anda. Semua paket termasuk
            pre-production, moodboard, serta lisensi penggunaan konten.
          </p>
          <div className="mt-6 space-y-3 text-sm text-white/70">
            <p>• Creative direction & shotlist</p>
            <p>• Dokumen lisensi & usage rights</p>
            <p>• Workflow kolaboratif via portal klien</p>
          </div>
          <Link
            href="#booking"
            className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-slate-900"
          >
            Jadwalkan discovery call
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {photographyPackages.map((pkg) => (
            <PhotographyPackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </section>

      <section className="mt-16 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
              Field notes
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              Cerita terbaru dari lapangan
            </h2>
          </div>
          <Link href="#" className="text-sm font-semibold text-emerald-300">
            Baca arsip →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </section>

      <section
        id="booking"
        className="mt-16 grid gap-8 lg:grid-cols-[1.2fr,0.8fr]"
      >
        <BookingForm
          travelPackages={travelPackages}
          photographyPackages={photographyPackages}
        />
        <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.4em] text-white/60">
            FAQ
          </p>
          <h3 className="text-2xl font-semibold text-white">
            Pertanyaan yang sering diajukan
          </h3>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <summary className="cursor-pointer text-base font-semibold text-white">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm text-white/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 rounded-[40px] border border-white/10 bg-gradient-to-br from-white/20 to-transparent p-10 text-slate-900">
        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em]">
              Launch sebuah campaign?
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Satukan tim travel & fotografer profesional dalam satu orchestrator
            </h2>
            <p className="mt-4 text-base text-slate-800">
              Briefkan kami di hari yang sama, dapatkan proposal biaya, timeline,
              dan moodboard awal dalam 48 jam kerja.
            </p>
          </div>
          <div className="flex items-end">
            <Link
              href="mailto:hola@wanderlens.studio"
              className="w-full rounded-3xl bg-slate-900 px-6 py-4 text-center text-lg font-semibold text-white"
            >
              Kirim brief via email →
            </Link>
          </div>
        </div>
      </section>
      </main>
  );
}
