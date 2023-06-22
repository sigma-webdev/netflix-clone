/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "netflix-home": "url('/src/assets/netflix-bg.png')",
      },
      backgroundColor: {
        "netflix-blue": "#00081D",
        "netflix-black": "#141414",
      },
      flexBasis: {
        "1/6": "16.6666666%",
        "2/6": "28.5714286%",
        "3/6": "42.8571429%",
        "4/6": "57.1428571%",
        "5/6": "71.4285714%",
      },
      colors: {
        "netflix-blue": "#00081D",
      },
    },
  },
  plugins: [],
};
