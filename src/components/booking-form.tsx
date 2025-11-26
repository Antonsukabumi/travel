"use client";

import { useMemo, useState } from "react";
import type {
  PhotographyPackage,
  TravelPackage,
} from "@/lib/types";

type BookingFormProps = {
  travelPackages: TravelPackage[];
  photographyPackages: PhotographyPackage[];
};

type FormStatus = "idle" | "loading" | "success" | "error";

const defaultState = {
  name: "",
  email: "",
  phone: "",
  startDate: "",
  travelers: 2,
  message: "",
  travelPackageSlug: "",
  photographyPackageSlug: "",
};

export function BookingForm({
  travelPackages,
  photographyPackages,
}: BookingFormProps) {
  const [formValues, setFormValues] = useState(defaultState);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState<string>("");

  const canSubmit = useMemo(() => {
    return (
      formValues.name.trim().length >= 2 &&
      formValues.email.includes("@") &&
      formValues.startDate !== "" &&
      formValues.travelers > 0 &&
      (formValues.travelPackageSlug || formValues.photographyPackageSlug)
    );
  }, [formValues]);

  const updateValue = (
    key: keyof typeof defaultState,
    value: string | number,
  ) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formValues,
          travelers: Number(formValues.travelers),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const errorMessage =
          data?.error?.formErrors?.join(", ") ??
          data?.error ??
          "Gagal mengirimkan permintaan booking.";
        throw new Error(errorMessage);
      }

      setStatus("success");
      setFeedback("Permintaan Anda terkirim. Konsultan kami akan menghubungi dalam 24 jam.");
      setFormValues(defaultState);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengirim formulir.",
      );
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8"
    >
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-teal-200">
          Request itinerary
        </p>
        <h3 className="mt-1 text-2xl font-semibold text-white">
          Konsultasi dengan travel director kami
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-white/70">
          Nama lengkap
          <input
            type="text"
            value={formValues.name}
            onChange={(e) => updateValue("name", e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-base text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
            placeholder="Mis. Dinda Prameswari"
            required
          />
        </label>
        <label className="text-sm text-white/70">
          Email profesional
          <input
            type="email"
            value={formValues.email}
            onChange={(e) => updateValue("email", e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-base text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
            placeholder="halo@perusahaan.com"
            required
          />
        </label>
        <label className="text-sm text-white/70">
          Nomor WhatsApp
          <input
            type="tel"
            value={formValues.phone}
            onChange={(e) => updateValue("phone", e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-base text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
            placeholder="+62"
          />
        </label>
        <label className="text-sm text-white/70">
          Tanggal mulai perjalanan
          <input
            type="date"
            value={formValues.startDate}
            onChange={(e) => updateValue("startDate", e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-base text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
            required
          />
        </label>
        <label className="text-sm text-white/70">
          Jumlah tamu
          <input
            type="number"
            min={1}
            max={24}
            value={formValues.travelers}
            onChange={(e) => updateValue("travelers", Number(e.target.value))}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-base text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
            required
          />
        </label>
        <label className="text-sm text-white/70">
          Paket travel pilihan
          <select
            value={formValues.travelPackageSlug}
            onChange={(e) => updateValue("travelPackageSlug", e.target.value)}
            className="mt-2 w-full appearance-none rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-base text-white focus:border-white/40 focus:outline-none"
          >
            <option value="">Pilih paket (opsional)</option>
            {travelPackages.map((pkg) => (
              <option key={pkg.slug} value={pkg.slug} className="bg-slate-900">
                {pkg.title}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm text-white/70">
          Paket fotografi
          <select
            value={formValues.photographyPackageSlug}
            onChange={(e) =>
              updateValue("photographyPackageSlug", e.target.value)
            }
            className="mt-2 w-full appearance-none rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-base text-white focus:border-white/40 focus:outline-none"
          >
            <option value="">Pilih paket (opsional)</option>
            {photographyPackages.map((pkg) => (
              <option key={pkg.slug} value={pkg.slug} className="bg-slate-900">
                {pkg.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block text-sm text-white/70">
        Catatan tambahan
        <textarea
          value={formValues.message}
          onChange={(e) => updateValue("message", e.target.value)}
          rows={4}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-base text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
          placeholder="Ceritakan preferensi destinasi, gaya foto, atau kebutuhan khusus."
        />
      </label>

      {feedback && (
        <p
          className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
            status === "success"
              ? "bg-emerald-500/10 text-emerald-100"
              : "bg-red-500/10 text-red-200"
          }`}
        >
          {feedback}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit || status === "loading"}
        className="mt-6 w-full rounded-2xl bg-emerald-400/90 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Mengirim..." : "Kirim permintaan itinerary"}
      </button>
      <p className="mt-2 text-xs text-white/50">
        Dengan mengirimkan formulir ini Anda menyetujui ketentuan privasi WanderLens.
      </p>
    </form>
  );
}

