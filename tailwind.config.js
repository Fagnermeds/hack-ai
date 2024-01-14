/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      borderRadius: {
        32: "32px",
      },
      colors: {
        // generate colors
        "yellow-100": "#FAA831",
        "purple-100": "#934CB0",
        "purple-200": "#8E44AD",
        "gray-100": "#BDC3C7",
        "gray-200": "#B3B3B3",
        "gray-300": "#585861",
        "gray-400": "#575759",
      },
      height: {},
    },
  },
  plugins: [],
};
