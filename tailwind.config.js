/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: '#6215E0', 
          2: '#68728C',
          3: '#C8D2E0',
          4: '#F8FAFA',
          5: '#FBFBFB',
          6: '#2C2C2C',
        }
      }
    },
    fontFamily: {
      'open':['Open Sans', 'sans-serif'],
      'headers': ['Unbounded', 'sans-serif'],
      'product' : ['Space Grotesk', 'sans-serif'],
    }
  },
  plugins: [],
}

