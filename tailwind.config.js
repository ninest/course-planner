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
    },
  },
  plugins: [],
  darkMode: "class",
};
