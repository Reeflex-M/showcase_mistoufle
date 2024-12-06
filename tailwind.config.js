/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {

          red: "#e63946",
          lightest: "#FFFFFF",
          light: "#f8f9fa",
          DEFAULT: "#a8dadc",
          dark: "#457b9d",
          darkest: "#1d3557",
        },
        secondary: "#1E1E1E",
        "secondary-bg": "#1E1E1E",
      },
      fontFamily: {
        primary: ['"Poppins", serif;'],
      },
      transitionProperty: {
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
};
