import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        background: '#000000',
        foreground: '#FFFFFF',
        card: 'transparent',
        'card-foreground': '#FFFFFF',
        primary: '#FFFFFF',
        'primary-foreground': '#000000',
        muted: {
          DEFAULT: "hsl(0 0% 15%)",
          foreground: "hsl(0 0% 60%)",
        },
        border: 'hsl(0 0% 30%)',
        input: 'hsl(0 0% 15%)',
        ring: 'hsl(0 0% 80%)',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"Courier New"', 'monospace'],
        serif: ['"Playfair Display"', 'serif'], // Added serif font
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