/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "netflix-home": "url('/src/assets/netflixbg.png')",
        "netflix-signUp": "url('/src/assets/images/netflix-signup.jpg')"
      },
      backgroundColor: {
        "netflix-blue": "#00081D",
        "netflix-black": "#141414"
      }
    }
  },
  plugins: []
};
