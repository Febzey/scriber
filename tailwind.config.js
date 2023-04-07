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
        'lightning': 'url("/images/lightning.png")',
        'sprinkle': 'url("/images/sprinkle.svg")',
        'wave1': 'url("/images/wave.png")',
      },
      fontFamily: {
        //   'bakbak': ['Bakbak One', 'cursive'],
        'inter': ['Inter', 'sans-serif'],

        poppins: "'Poppins', 'sans-serif'",
        fredoka: "'Fredoka', sans-serif;",
        'bakbak': ['Bakbak One', 'cursive'],
        'Minecraft': "'Minecraftia', sans-serif;"
      },
      backgroundColor: {
        // 'card': "#535886",
        // 'main': "#262745",
        // 'main-second': "#626385",
        // 'indigo-main': "#6464FB",
        // 'blue-accent': "#8E94EE",

        'main-dark': "#1D1D2D",
        'second-dark': "#1B1D28",
        'main-card-dark': "#222533",
        'main-highlight-dark': "#555559",
        'main-purple': "#7132C1",
        'main-accent-dark': "#555559",
      },
      borderColor: {
        'main-dark': "#1D1D2D",
        'second-dark': "#1B1D28",
        'main-card-dark': "#222533",
        'main-purple': "#7132C1",
        'main-accent-dark': "#555559",
      },
      textColor: {
        // 'card': "#535886",
        'main-purple': "#7132C1",
        'main-dark': "#C3C2C7"
      },
      ringColor: {
        'main-dark': "#1D1D2D",
        'second-dark': "#1B1D28",
        'main-card-dark': "#222533",
        'main-highlight-dark': "#555559",
        'main-purple': "#7132C1",
        'main-accent-dark': "#555559",
      },
      placeholderColor: {
        'main-dark': '#C3C2C7'
      },
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar'),
  ],
}
