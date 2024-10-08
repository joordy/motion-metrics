import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      body: ["var(--font-body)", ...fontFamily.sans],
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionTimingFunction: {
        cubic: "cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
