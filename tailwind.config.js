/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        'primary':'#E58411',
        'secondary':'#1E1E1E',
        'secondary-bg':'#1E1E1E',
      },
      fontFamily: {
        'primary': ['"Poppins", serif;'],
      }
    },
  },
  plugins: [],
}

