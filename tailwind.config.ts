import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FCFAF6",
          100: "#F8F3EA",
          200: "#F1E9D8",
          300: "#E8DCC2",
        },
        terra: {
          400: "#D4926E",
          500: "#C77359",
          600: "#A85A42",
          700: "#7A3E2C",
        },
        sage: {
          50: "#F4F7EE",
          100: "#E6EED6",
          200: "#CCDDB0",
          400: "#7FA250",
          500: "#5B8A2A",
          600: "#476C20",
          700: "#3D5D1C",
          800: "#2A4112",
        },
        rose: {
          100: "#F6E6E2",
          300: "#E5B9AE",
          500: "#C77B6E",
        },
        ink: {
          900: "#2A1F18",
          700: "#4A3A2E",
          500: "#7A6757",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
      },
      backgroundImage: {
        "grain":
          "radial-gradient(circle at 1px 1px, rgba(122,98,77,0.08) 1px, transparent 0)",
        "warm-gradient":
          "linear-gradient(135deg, #FCFAF6 0%, #F8F3EA 50%, #F1E9D8 100%)",
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(122, 62, 44, 0.15)",
        card: "0 2px 12px -2px rgba(42, 31, 24, 0.08), 0 8px 32px -8px rgba(42, 31, 24, 0.08)",
        glow: "0 0 0 1px rgba(199, 115, 89, 0.15), 0 20px 60px -20px rgba(199, 115, 89, 0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out both",
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
