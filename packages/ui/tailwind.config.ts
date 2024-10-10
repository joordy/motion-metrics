import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontFamily: {
      body: ["var(--font-body)", ...fontFamily.sans],
    },
    fontSize: {
      "2xs": "0.625rem",
      sm: "0.75rem",
      md: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.75rem",
      "4xl": "2rem",
      "5xl": "2.25rem",
    },
    extend: {
      colors: {
        light: {
          "50": "#FAFAFA",
          "100": "#F5F5F5",
          "200": "#E5E5E5",
          "300": "#D4D4D4",
          "400": "#A3A3A3",
          "500": "#737373",
          "600": "#525252",
          "700": "#404040",
          "800": "#262626",
          "900": "#171717",
          "950": "#0A0A0A",
          DEFAULT: "#FFFFFF",
        },
        dark: {
          "50": "#0A0A0A",
          "100": "#171717",
          "200": "#262626",
          "300": "#373737",
          "400": "#525252",
          "500": "#8A8A8A",
          "600": "#A3A3A3",
          "700": "#D4D4D4",
          "800": "#E5E5E5",
          "900": "#F5F5F5",
          "950": "#FAFAFA",
          DEFAULT: "#000000",
        },
        brand: {
          lime: "#DDFE31",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionTimingFunction: {
        cubic: "cubic-bezier(0.87, 0, 0.13, 1)",
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
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
