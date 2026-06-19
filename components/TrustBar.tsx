"use client";

import { useContent } from "@/components/ContentProvider";

/** Thin trust strip — a few stats between hairlines. No badges, no boxes. */
export default function TrustBar() {
  const { reviews, business } = useContent();
  const stats = (
    [
      reviews?.count
        ? { v: `${reviews.rating} ★`, l: `${reviews.count}+ ${reviews.source || ""} reviews`.trim() }
        : null,
      business?.foundedYear ? { v: `Est. ${business.foundedYear}`, l: "Years of craft" } : null,
      business?.license ? { v: "Licensed", l: business.license } : null,
    ].filter(Boolean) as { v: string; l: string }[]
  );
  if (!stats.length) return null;

  return (
    <section className="u-section-half">
      <div className="u-container grid gap-8 border-y hairline py-10 sm:grid-cols-3">
        {stats.map((s, i) => (
          <div key={i} className="min-w-0 text-center">
            <div className="text-display text-[clamp(1.5rem,2.5vw,2rem)]" style={{ fontWeight: 300 }}>
              {s.v}
            </div>
            <div className="text-eyebrow mt-2">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
