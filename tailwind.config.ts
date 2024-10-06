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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        // 'roboto': ['Roboto', 'sans-serif'],
        'montserrat': ['var(--font-montserrat)'],
        'roboto': ['var(--font-roboto)'],
      },
    },
  },
  plugins: [],
};
export default config;
