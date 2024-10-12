/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["winter", "nord", "lemonade", "light", ],
  },
  plugins: [
    require('daisyui'),
  ],

}

