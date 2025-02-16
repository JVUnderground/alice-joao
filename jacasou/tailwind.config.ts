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
        casamento: '#52784f',
        glass: 'rgba(255, 255, 255, 0.7)',
      },
      fontFamily: {
        'geist-sans': ['var(--font-geist-sans)', 'sans-serif'],
        'geist-mono': ['var(--font-geist-mono)', 'monospace'],
        'motterdam': ['var(--font-motterdam)', 'sans-serif'],
        'heybrights': ['var(--font-heybrights)', 'sans-serif'],	
      },
    },
  },
  plugins: [],
};
export default config;
