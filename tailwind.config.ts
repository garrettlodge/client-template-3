import type { Config } from "tailwindcss";
import { join } from "path";

// Resolve content globs from the config's own location so the build picks up
// classes no matter what cwd Next/Netlify runs from.
const root = __dirname;

const config: Config = {
  content: [
    join(root, "app/**/*.{ts,tsx}"),
    join(root, "components/**/*.{ts,tsx}"),
  ],
  theme: {
    extend: {
      colors: {
        // Fixed editorial palette
        paper: { 50: "#faf9f6", 100: "#f3f1ec", 200: "#e8e5dd" },
        ink: {
          950: "#141413",
          900: "#1f1e1c",
          800: "#2e2c28",
          700: "#46443e",
          500: "#6f6c64",
          400: "#9a968c",
        },
        // Accent is driven by CSS vars so it's swappable from site.config.ts
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
        },
      },
      fontFamily: {
        // Wired to next/font CSS variables set in app/layout.tsx
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        shell: "1320px",
      },
    },
  },
  plugins: [],
};

export default config;
