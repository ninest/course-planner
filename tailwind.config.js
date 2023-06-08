const defaultColors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: defaultColors.indigo,
        error: defaultColors.red,
      },
      fontSize: { xxs: "0.6rem" },
      gridTemplateColumns: {
        "week-view-mobile": "0.75rem repeat(5, minmax(0, 1fr))",
        "week-view": "4.5rem repeat(5, minmax(0, 1fr))",
      },
      keyframes: {
        jiggle: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
      },
      animation: {
        jiggle: "jiggle 0.2s ease-in-out infinite",
        // Default pulse is too slow and too light
        pulse: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        pulse: {
          "50%": {
            opacity: ".25",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
  darkMode: "class",
};
