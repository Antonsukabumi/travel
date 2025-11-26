import Link from "next/link";
import { PhotographyPackageCard } from "@/components/cards";
import { getPhotographyPackages } from "@/lib/data-service";

export const metadata = {
  title: "Layanan Fotografi | WanderLens Studio",
  description:
    "Paket fotografi editorial, brand storytelling, dan dokumentasi keluarga yang dikurasi khusus.",
};

export default async function PhotographyPage() {
  const packages = await getPhotographyPackages();

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 text-white">
      <div className="rounded-[40px] border border-white/10 bg-white/5 p-10">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">
          Photography atelier
        </p>
        <h1 className="mt-3 text-4xl font-semibold">
          Produksi visual sinematik di destinasi impian
        </h1>
        <p className="mt-4 text-white/80">
          Tim creative director, fotografer, dan producer menangani pra-produksi,
          pengambilan gambar, hingga penyerahan deliverables berbasis cloud.
        </p>
        <Link
          href="/#booking"
          className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-slate-900"
        >
          Hubungi creative director
        </Link>
      </div>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        {packages.map((pkg) => (
          <PhotographyPackageCard key={pkg.slug} pkg={pkg} />
        ))}
      </section>
    </main>
  );
}

