/** @type {DefaultColors} */
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/pages/**/*.{js,jsx,ts,tsx}'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      blue: {
        light: '#D2E3FC',
        DEFAULT: '#4285F4',
        dark: '#174EA6',
      },
      red: {
        light: '#F6C3AE',
        DEFAULT: '#EA4335',
        dark: '#A50E0E',
      },
      yellow: {
        light: '#FEEFC3',
        DEFAULT: '#FDD848',
        dark: '#F0743E',
      },
      green: {
          light: '#AAD59E',
        DEFAULT: '#34A853',
        dark: '#0D652D',
      },
      gray: {
        light: '#F1F3F4',
        DEFAULT: '#9AB2D4',
        dark: '#202124',
      }
    },
    extend: {
      fontFamily: {
        'inconsolata': ['Inconsolata', 'monospace'],
      }
    },
  },
  plugins: [],
}