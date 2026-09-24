import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080a09",
        panel: "#101412",
        acid: "#b7ff3c",
        mist: "#a5aea7",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(183, 255, 60, 0.13)",
      },
    },
  },
  plugins: [],
};

export default config;
