import { fontFamily } from "tailwindcss/defaultTheme";
import baseConfig from "@motion-metrics/ui/tailwind.config";
import type { Config } from "tailwindcss";

const config: Config = {
  ...baseConfig,

  content: [
    ...(baseConfig.content || []),
    "./your-additional-content-paths/**/*.{ts,tsx}",
  ],

  theme: {
    ...(baseConfig.theme || {}),
    fontFamily: {
      body: ["var(--font-body)", ...fontFamily.sans],
    },
    extend: {
      ...(baseConfig.theme?.extend || {}),
      colors: {
        ...(baseConfig.theme?.extend?.colors || {}),
        ui: {
          error: "#E01447",
          warning: "#F48A1E",
          success: "#14AD48",
        },
      },
      keyframes: {
        "spin-custom": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-fast": "spin-custom 0.7s linear infinite",
      },
    },
  },

  plugins: [...(baseConfig.plugins || [])],
};

export default config;
