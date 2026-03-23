import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#1A4D2E", // Deep Forest Green
        secondary: "#D4A574", // Warm Gold
        accent: "#E07A5F", // Coral Red
        background: "#FAF9F6", // Cream/Off-white
        textPrimary: "#2D3436", // Charcoal
        textMuted: "#636E72", // Soft Gray
        success: "#88B04B", // Sage Green
        error: "#E76F51", // Soft Red
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        decorative: ["Dancing Script", "cursive"],
      },
      borderRadius: {
        card: "12px",
        button: "8px",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
        premium: "0 20px 40px rgba(26, 77, 46, 0.12)",
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
};
export default config;
