"use client";

import { Fragment } from "react";
import Reveal from "@/components/Reveal";
import { useContent, useEditable } from "@/components/ContentProvider";

/** Render the tagline, turning *asterisk-wrapped* words into italic serif
 *  accents in bronze. */
function renderTagline(tagline: string) {
  return tagline
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("*") && part.endsWith("*") ? (
        <em key={i} className="italic text-accent">
          {part.slice(1, -1)}
        </em>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      )
    );
}

/** Crafted dark backdrop for when a client has no video/poster — soft bronze
 *  light entering a dark room + faint architectural verticals. Always cinematic,
 *  never a flat ivory box. */
function DefaultBackdrop() {
  return (
    <div className="absolute inset-0" style={{ background: "var(--dark)" }} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 85% at 72% -10%, color-mix(in srgb, var(--accent) 24%, transparent), transparent 58%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 12% 110%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 55%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.05,
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 119px, #f5f2eb 119px 120px)",
        }}
      />
    </div>
  );
}

export default function Hero() {
  const { business, contact, hero } = useContent();
  const ed = useEditable();
  const video = hero?.video || null;
  const poster = hero?.poster || null;
  const overlay =
    typeof hero?.overlayOpacity === "number" ? hero.overlayOpacity : 0.15;
  const est = business.foundedYear ? `Est. ${business.foundedYear}` : "";
  const place = contact?.address?.city || "";
  const meta = [est, place].filter(Boolean).join(" — ");

  return (
    <section
      id="top"
      className="sec-tone-dark relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* media / backdrop */}
      <div className="absolute inset-0">
        {video ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={poster ?? undefined}
          >
            <source src={video} />
          </video>
        ) : poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" className="h-full w-full object-cover" />
        ) : (
          <DefaultBackdrop />
        )}
        <div
          className="absolute inset-0"
          style={{ background: `rgba(0,0,0,${overlay})` }}
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-0 h-44"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
          }}
          aria-hidden
        />
      </div>

      {/* content */}
      <div
        className="u-container relative z-10 flex flex-1 flex-col items-center justify-center text-center"
        style={{ paddingTop: 132, paddingBottom: 120 }}
      >
        {meta && (
          <Reveal delay={0.1} className="mb-9">
            <span className="text-eyebrow">{meta}</span>
          </Reveal>
        )}

        <Reveal variant="mask" className="w-full">
          <h1
            className="text-hero mx-auto"
            style={{
              maxWidth: "min(94vw, 64rem)",
              paddingTop: "0.06em",
              paddingBottom: "0.18em",
            }}
            {...ed("business.tagline")}
          >
            {renderTagline(business.tagline)}
          </h1>
        </Reveal>

        <Reveal delay={0.45}>
          <p
            className="lead mx-auto mt-8"
            style={{ maxWidth: "40rem" }}
            {...ed("business.description")}
          >
            {business.description}
          </p>
        </Reveal>

        <Reveal delay={0.6} className="mt-12">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#contact" className="btn-primary">
              Get in touch
            </a>
            <a href="#work" className="btn-ghost">
              View the work
            </a>
          </div>
        </Reveal>
      </div>

      {/* scroll cue */}
      <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <span
          className="text-eyebrow flex flex-col items-center gap-3"
          style={{ opacity: 0.65 }}
        >
          Scroll
          <span
            aria-hidden
            className="h-10 w-px"
            style={{ background: "linear-gradient(var(--accent), transparent)" }}
          />
        </span>
      </div>
    </section>
  );
}
