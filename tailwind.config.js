/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/*.html", "./views/*.ejs", "./public/images/*.svg"],
  theme: {
    extend: {
        fontFamily: {
          'montserrat': ['Montserrat', 'sans-serif']
        },
        dropShadow: {
        'lg': '-1px -1px 1px #6b7280',
      },
    },
  },
  plugins: [],
}
