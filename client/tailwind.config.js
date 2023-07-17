/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "netflix-home": "url('/src/assets/images/netflixbg.png')",
      },
      backgroundColor: {
        "netflix-blue": "#00081D",
        "netflix-black": "#141414",
      },
      colors: {
        "netflix-blue": "#00081D",
        "netflix-black": "#141414",
      },
    },
  },
  plugins: [],
};
