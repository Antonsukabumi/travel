import clsx from "clsx";
import type {
  InsightMetric,
  PhotographyPackage,
  Story,
  Testimonial,
  TravelPackage,
} from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function TravelPackageCard({
  pkg,
  variant = "default",
}: {
  pkg: TravelPackage;
  variant?: "default" | "featured";
}) {
  return (
    <article
      className={clsx(
        "flex h-full flex-col justify-between rounded-3xl border border-white/10 p-5 transition hover:border-emerald-200/50",
        variant === "featured"
          ? "bg-gradient-to-br from-white/10 via-white/5 to-transparent"
          : "bg-white/5",
      )}
    >
      <div>
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60">
          <span>{pkg.category}</span>
          <span>{pkg.duration}</span>
        </div>
        <h3 className="mt-3 text-2xl font-semibold text-white">{pkg.title}</h3>
        <p className="mt-2 text-sm text-teal-100">{pkg.destination}</p>
        <div
          className="mt-4 h-40 rounded-2xl border border-white/10 bg-cover bg-center"
          style={{ backgroundImage: `url(${pkg.heroImage})` }}
          aria-hidden="true"
        />
        <p className="mt-4 text-sm leading-relaxed text-white/80">
          {pkg.summary}
        </p>
        <ul className="mt-4 space-y-2 text-sm text-white/70">
          {pkg.highlights.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Mulai
          </p>
          <p className="text-xl font-semibold text-emerald-300">
            {formatCurrency(pkg.price)}
          </p>
        </div>
        <div className="rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
          Spots {pkg.spotsLeft}
        </div>
      </div>
    </article>
  );
}

export function PhotographyPackageCard({
  pkg,
}: {
  pkg: PhotographyPackage;
}) {
  return (
    <article className="space-y-4 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/40 via-slate-900/30 to-slate-900/10 p-5">
      <div className="text-xs uppercase tracking-[0.3em] text-white/60">
        {pkg.style}
      </div>
      <h3 className="text-xl font-semibold text-white">{pkg.title}</h3>
      <p className="text-sm text-white/80">{pkg.description}</p>
      <ul className="space-y-2 text-sm text-white/70">
        {pkg.deliverables.map((deliverable) => (
          <li key={deliverable} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
            {deliverable}
          </li>
        ))}
      </ul>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Investasi
        </p>
        <p className="text-lg font-semibold text-emerald-300">
          {formatCurrency(pkg.price)}
        </p>
      </div>
    </article>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
      <p className="text-sm text-white/80">“{testimonial.quote}”</p>
      <div className="mt-4">
        <p className="text-base font-semibold">{testimonial.name}</p>
        <p className="text-sm text-white/60">{testimonial.role}</p>
      </div>
    </article>
  );
}

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="rounded-2xl bg-gradient-to-br from-emerald-200/40 to-transparent p-3 text-xs uppercase tracking-[0.3em] text-white/60">
        {story.readingTime}
      </div>
      <h3 className="text-xl font-semibold text-white">{story.title}</h3>
      <p className="text-sm text-white/70">{story.excerpt}</p>
      <button className="text-sm font-semibold text-emerald-300">
        Baca cerita →
      </button>
    </article>
  );
}

export function MetricCard({ metric }: { metric: InsightMetric }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
      <p className="text-sm uppercase tracking-[0.3em] text-white/50">
        {metric.label}
      </p>
      <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
      <p className="mt-2 text-sm text-white/70">{metric.caption}</p>
    </div>
  );
}

