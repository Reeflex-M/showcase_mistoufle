/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          lightest: "#FFFFFF",
          light: "#EEFCFC",
          light2: "E6F4F1",
          DEFAULT: "#00AAAF",
          dark: "#188687",
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
