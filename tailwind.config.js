/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        "home": "url('/src/assets/bg.png')"
      }
    },
  },
  plugins: [],
}

