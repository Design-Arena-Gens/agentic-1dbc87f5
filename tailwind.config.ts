import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843"
        }
      },
      boxShadow: {
        panel: "0 20px 50px -20px rgba(148, 63, 176, 0.4)"
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 0px rgba(236, 72, 153, 0)"
          },
          "50%": {
            boxShadow: "0 0 20px rgba(236, 72, 153, 0.45)"
          }
        }
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
