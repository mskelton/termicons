/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.hbs"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}
