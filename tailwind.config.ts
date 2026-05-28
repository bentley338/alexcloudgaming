import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        foreground: "#fafafa",
        primary: {
          DEFAULT: "#3b82f6",
          glow: "#3b82f633",
        },
        purple: {
          DEFAULT: "#a855f7",
          glow: "#a855f733",
        }
      },
    },
  },
  plugins: [],
};
export default config;
