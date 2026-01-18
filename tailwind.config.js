/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5', // indigo-600
          600: '#4f46e5',
        },
        secondary: {
          DEFAULT: '#9333ea', // purple-600
          600: '#9333ea',
        },
      },
    },
  },
  plugins: [],
}
