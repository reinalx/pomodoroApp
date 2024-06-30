/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#09F',
        secondary: '#007AFF',
        tertiary: '#007AFF',
        quaternary: '#007AFF',
        quinary: '#007AFF'
      }
    }
  },
  plugins: []
}
