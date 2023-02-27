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
        jiggle: 'jiggle 0.2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
  darkMode: "class",
};
