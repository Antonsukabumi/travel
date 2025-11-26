import Link from "next/link";
import { TravelPackageCard } from "@/components/cards";
import { getTravelPackages } from "@/lib/data-service";

export const metadata = {
  title: "Paket Travel Premium | WanderLens Studio",
  description:
    "Eksplorasi katalog ekspedisi privat dengan fotografer internal dan layanan concierge.",
};

export default async function PackagesPage() {
  const packages = await getTravelPackages();

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 text-white">
      <div className="rounded-[40px] border border-white/10 bg-white/5 p-10">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">
          Paket travel
        </p>
        <h1 className="mt-3 text-4xl font-semibold">
          Eksplorasi katalog ekspedisi tailor-made
        </h1>
        <p className="mt-4 text-white/80">
          Semua paket dapat dikustomisasi mulai dari durasi, moda transportasi,
          hingga kebutuhan dokumentasi kreatif.
        </p>
        <Link
          href="/#booking"
          className="mt-6 inline-flex rounded-full bg-emerald-300 px-6 py-3 font-semibold text-slate-900"
        >
          Konsultasi itinerary
        </Link>
      </div>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        {packages.map((pkg) => (
          <TravelPackageCard key={pkg.slug} pkg={pkg} variant="featured" />
        ))}
      </section>
    </main>
  );
}

