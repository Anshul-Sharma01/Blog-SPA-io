/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["light", "black", "lemonade", "winter", ],
  },
  plugins: [
    require('daisyui'),
  ],

}

