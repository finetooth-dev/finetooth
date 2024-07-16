import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        hd: { raw: "(min-resolution: 2dppx)" },
      },
    },
    keyframes: {
      appear: {
        "0%": { opacity: "0%" },
        "100%": { opacity: "100%" },
      },
      "move-in": {
        "0%": { opacity: "0%", transform: "translateX(-64px)" },
        "100%": { opacity: "100%", transform: "translateX(0px)" },
      },
    },
    animation: {
      appear: "appear 300ms ease-out forwards",
      "move-in": "move-in 600ms cubic-bezier(0, 0, 0, 1) forwards",
    },
  },
  plugins: [],
};
export default config;
