/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/pages/**/*.{js,jsx,ts,tsx}'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      blue: {
        light: '#D2E3FC',
        DEFAULT: '#4285F4',
        dark: '#174EA6',
      },
      red: {
        light: '#FAD2CF',
        DEFAULT: '#EA4335',
        dark: '#A50E0E',
      },
      yellow: {
        light: '#FEEFC3',
        DEFAULT: '#FBBC04',
        dark: '#E37400',
      },
      green: {
        light: '#CEEAD6',
        DEFAULT: '#34A853',
        dark: '#0D652D',
      },
      gray: {
        light: '#F1F3F4',
        DEFAULT: '#9AA0A6',
        dark: '#202124',
      }
    },
    extend: {},
  },
  plugins: [],
}