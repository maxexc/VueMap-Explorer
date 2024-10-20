/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F3743D',
        secondary: '#FFA279',
        grey: '#939393',
        border: '#2C2C2C',
      }
    },
  },
  plugins: [],
}

