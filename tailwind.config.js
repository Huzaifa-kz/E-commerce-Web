/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0 10px 20px rgba(255, 255, 255, 0.5)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
