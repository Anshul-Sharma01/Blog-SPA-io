/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["light", "nord", "lemonade", "winter", ],
  },
  plugins: [
    require('daisyui'),
  ],

}

