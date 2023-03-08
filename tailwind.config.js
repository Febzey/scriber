/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'lightning': 'url("/images/lightning.png")'
      },
      fontFamily: {
        //   'bakbak': ['Bakbak One', 'cursive'],
        'inter': ['Inter', 'sans-serif'],

        poppins: "'Poppins', 'sans-serif'",
        fredoka: "'Fredoka', sans-serif;",
        'bakbak': ['Bakbak One', 'cursive'],
        'Minecraft': "'Minecraftia', sans-serif;"
      }
    },
  },
  plugins: [],
}
