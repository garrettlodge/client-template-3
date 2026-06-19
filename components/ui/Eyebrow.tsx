import type { ReactNode } from "react";

/**
 * Small uppercase editorial label: optional index, a short bronze rule, then
 * the label text. 12px / 0.15em tracking (set by .text-eyebrow).
 */
export default function Eyebrow({
  index,
  children,
  className = "",
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`text-eyebrow inline-flex items-center gap-3 ${className}`}>
      {index && <span className="text-accent">{index}</span>}
      <span
        aria-hidden
        className="inline-block h-px w-8 shrink-0"
        style={{ background: "var(--accent)" }}
      />
      <span className="min-w-0">{children}</span>
    </span>
  );
}
