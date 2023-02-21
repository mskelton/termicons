/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.hbs", "./dist/termicons.js"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}
