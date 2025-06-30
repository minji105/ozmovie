/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      screens: {
        'xs': '460px'
      },
      colors: {
        red: { primary: "#df0000", hover: "#bd0101" },
      },
      backgroundImage: {
        auth: "url(src/assets/bg.png)",
      },
      spacing: {
        spacingSm: '20px',
        spacingMd: '32px',
        spacingLg: '50px',
      }
    },
  },
  plugins: [],
}

