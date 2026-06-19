import type { Variants } from "framer-motion";

/**
 * ═══════════════════════════════════════════════════════════════════════
 *  MOTION LIBRARY — reusable Framer Motion variants + timing tokens.
 * ═══════════════════════════════════════════════════════════════════════
 *  One easing curve everywhere = a signature. Import these instead of
 *  hand-rolling transitions in each section, so motion stays consistent
 *  across templates. Pair with <Reveal>, <Parallax>, and Lenis (SmoothScroll).
 */

/** Expo-out — confident, decelerating, "designed" feel. */
export const EASE = [0.22, 1, 0.36, 1] as const;
/** Soft spring for hovers / interactive nudges. */
export const SPRING = { type: "spring", stiffness: 400, damping: 32 } as const;

export const DUR = { fast: 0.2, base: 0.45, slow: 0.85 } as const;

/** Default in-view trigger: fire once, a little before fully on screen. */
export const VIEWPORT = { once: true, margin: "-12% 0px -12% 0px" } as const;

/** Fade + rise. Use as {...fadeUp()} on a motion element. */
export const fadeUp = (delay = 0, distance = 24) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: DUR.slow, ease: EASE, delay },
});

/** Fade only — for backgrounds / large imagery where motion should be subtle. */
export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: VIEWPORT,
  transition: { duration: DUR.slow, ease: EASE, delay },
});

/** Parent that staggers its children. Use with `staggerChild` on each item. */
export const staggerParent = (stagger = 0.08, delay = 0.05) => ({
  initial: "hidden",
  whileInView: "show",
  viewport: VIEWPORT,
  variants: {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  } as Variants,
});

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
};

/** Editorial line-mask reveal: wrap text in an overflow-hidden span and apply
 *  this to the inner element. */
export const maskReveal = (delay = 0): Variants => ({
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: DUR.slow, ease: EASE, delay } },
});

export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: VIEWPORT,
  transition: { duration: DUR.base, ease: EASE, delay },
});
