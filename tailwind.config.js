/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./*.html"], // Add the root folder for HTML
  theme: {
    extend: {
      colors: {
        "bg-orange-50": "#fff7ed",
        "bg-orange-100": "#fffaf0",
        "bg-orange-200": "#feebc8",
        "bg-orange-300": "#fbd38d",
        "bg-orange-400": "#f6ad55",
        "bg-orange-500": "#ed8936",
        "bg-orange-600": "#dd6b20",
        "bg-orange-700": "#c05621",
        "bg-very-light-grey": "#f8f8f8",
      },
    },
  },
  plugins: [],
};
