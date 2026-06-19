"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * Reusable section scaffold: massive vertical rhythm (u-section), a centered or
 * left-aligned container, and an optional revealed header (eyebrow / title /
 * intro). Sections compose this so spacing + reveal motion stay consistent.
 */
export default function Section({
  id,
  eyebrow,
  index,
  title,
  intro,
  align = "left",
  narrow = false,
  className = "",
  containerClassName = "",
  children,
}: {
  id?: string;
  eyebrow?: string;
  index?: string;
  title?: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  narrow?: boolean;
  className?: string;
  containerClassName?: string;
  children?: ReactNode;
}) {
  const hasHeader = eyebrow || title || intro;
  return (
    <section id={id} className={`u-section ${className}`}>
      <div
        className={`u-container ${narrow ? "u-narrow" : ""} ${containerClassName}`}
      >
        {hasHeader && (
          <Reveal
            className={
              align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
            }
          >
            {eyebrow && (
              <Eyebrow
                index={index}
                className={align === "center" ? "justify-center" : ""}
              >
                {eyebrow}
              </Eyebrow>
            )}
            {title && <h2 className="text-h2 mt-7">{title}</h2>}
            {intro && <p className="lead mt-6">{intro}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
