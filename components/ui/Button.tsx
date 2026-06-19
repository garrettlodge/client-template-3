import type { AnchorHTMLAttributes, ReactNode } from "react";

/** Anchor styled as a button. Uses the token-driven .btn-* classes, so shape
 *  (pill vs squared) follows the active template automatically. */
export default function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "ghost";
  children: ReactNode;
}) {
  return (
    <a className={`btn-${variant} ${className}`} {...rest}>
      {children}
    </a>
  );
}
