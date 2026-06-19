"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealVariant = "fade" | "mask" | "img";

/**
 * Scroll-reveal driven by IntersectionObserver toggling the `.is-in` class —
 * the actual movement is a pure CSS transition (see app/globals.css). This is
 * deliberately NOT Framer's whileInView: the Claude_Preview dev server throttles
 * requestAnimationFrame when idle, which freezes JS-driven tweens at their
 * hidden state. CSS transitions run on the compositor and reveal correctly.
 *
 *   <Reveal>…</Reveal>                fade + rise
 *   <Reveal variant="mask"><h1/>…    line-mask (clip + slide a single child)
 *   <Reveal variant="img"><img/>…    slow clip-path image reveal
 */
export default function Reveal({
  children,
  variant = "fade",
  delay = 0,
  className = "",
  threshold = 0.15,
}: {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const base =
    variant === "mask"
      ? "reveal-mask"
      : variant === "img"
        ? "reveal-img"
        : "reveal";

  const style: CSSProperties & Record<string, string> = {
    "--reveal-delay": `${delay}s`,
  };

  return (
    <div
      ref={ref}
      className={`${base}${shown ? " is-in" : ""}${className ? " " + className : ""}`}
      style={delay ? style : undefined}
    >
      {children}
    </div>
  );
}
