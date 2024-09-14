import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "#EDEAE8",
      },
      screens: {
        xs: { min: "320px", max: "399px" },
        sm: "400px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      animation: {
        fall: "fall 2s ease",
        down: "down 2s ease",
      },
      keyframes: {
        fall: {
          "0%": { transform: " translate3d(0,40px,0)" },
          "50%": { transform: "translate3d(0,0,0)" },
        },
        down: {
          "0%": { transform: " translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,40px,0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
