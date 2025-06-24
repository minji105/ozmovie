/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      colors: {
        red: { primary: "#df0000", hover: "#bd0101" },
      },
      backgroundImage: {
        auth: "url(src/assets/bg.png)",
      },
    },
  },
  plugins: [],
}

