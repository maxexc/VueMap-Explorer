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
        buttonPrimary: '#FF8E5D',
        secondary: '#FFA279',
        textSecondary: '#333333',
        backgroundMain: '#FFE4C4',
        grey: '#939393',
        border: '#2C2C2C',
        borderDivider: 'rgba(44, 44, 44, 0.1)',
        borderInput: 'rgba(44, 44, 44, 0.27)',
        accent: '#2C3E50',
      },
      screens: {
        'sx': '550px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        'h-440': { 'raw': '(min-height: 440px)' },
      }
    },
  },
  plugins: [],
}

