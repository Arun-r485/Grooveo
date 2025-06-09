import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
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
        // Primary brand color - a vibrant teal that represents eco-friendliness
        primary: {
          50: "#e6f7f5",
          100: "#ccefe9",
          200: "#99dfd3",
          300: "#66cfbd",
          400: "#33bfa7",
          500: "#00af91", // Main primary color
          600: "#008c74",
          700: "#006957",
          800: "#00463a",
          900: "#00231d",
        },
        // Secondary color - a warm coral that complements the primary teal
        secondary: {
          50: "#fef2f0",
          100: "#fde6e1",
          200: "#fbccc3",
          300: "#f8b3a5",
          400: "#f69987",
          500: "#f48069", // Main secondary color
          600: "#c36654",
          700: "#924d3f",
          800: "#62332a",
          900: "#311a15",
        },
        // Accent color - a vibrant purple for highlights and accents
        accent: {
          50: "#f5f0fe",
          100: "#ebe0fd",
          200: "#d7c2fb",
          300: "#c3a3f9",
          400: "#af85f7",
          500: "#9b66f5", // Main accent color
          600: "#7c52c4",
          700: "#5d3d93",
          800: "#3e2962",
          900: "#1f1431",
        },
        // Neutral colors - earthy tones that complement the eco-friendly theme
        neutral: {
          50: "#f8f9f8",
          100: "#f1f3f1",
          200: "#e3e7e3",
          300: "#d5dbd5",
          400: "#c7cfc7",
          500: "#b9c3b9", // Main neutral color
          600: "#949c94",
          700: "#6f756f",
          800: "#4a4e4a",
          900: "#252725",
        },
        // Keep the default border, background, etc.
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
