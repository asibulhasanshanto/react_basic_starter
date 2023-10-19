/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#ffffff",
        bg_secondary: "#eff0f2",
        bg_dark: "#111827",
        bg_dark_secondary: "#1f2937",
        primary: "#3abe49",
        secondary: "#6b7280",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
