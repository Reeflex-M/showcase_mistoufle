/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          lightest: "#FEFFDE",
          light: "#D6EFD8",
          DEFAULT: "#80AF81",
          dark: "#508D4E",
          darkest: "#1A5319",
        },
        secondary: "#1E1E1E",
        "secondary-bg": "#1E1E1E",
      },
      fontFamily: {
        primary: ['"Poppins", serif;'],
      },
    },
  },
  plugins: [],
};
