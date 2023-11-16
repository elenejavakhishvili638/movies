/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      boxShadow: {
        btnShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      },
    },
  },
  plugins: [],
};
