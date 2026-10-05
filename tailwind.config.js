export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Poppins', 'sans-serif'] },
      colors: {
        brand: { DEFAULT: '#22943c', dark: '#1a7a30' }, // main green (buttons, links)
        lime: { active: '#b9ec7e' },                    // active sidebar item
      },
    },
  },
  plugins: [],
}
