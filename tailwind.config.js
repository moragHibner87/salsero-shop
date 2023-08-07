/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#353145'
      },
      fontFamily: {
        nunito: 'Nunito Sans'
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
}

