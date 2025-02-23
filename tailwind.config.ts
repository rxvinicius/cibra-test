import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "light-1": "var(--light-1)",
        "light-2": "var(--light-2)",
        "dark-1": "var(--dark-1)",
        blue: "var(--blue)",
        red: "var(--red)",
        green: "var(--green)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
} satisfies Config;
