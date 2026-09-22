import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        text: "var(--text)",
        "text-dim": "var(--text-dim)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        live: "var(--live)",
        focus: "var(--focus)",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        sm: "0.5rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        full: "9999px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      transitionDuration: {
        160: "160ms",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("hover-ok", "@media (hover: hover) { &:hover }");
    }),
  ],
};

export default config;
