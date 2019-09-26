const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    fontWeight: {
      100: 100,
      200: 200,
      300: 300,
      400: 400,
      500: 500,
      600: 600,
      700: 700,
      800: 800,
      900: 900,
    },
    extend: {
      colors: {
        f7100: '#F0FBFB',
        f7200: '#D4F4DD',
        f7300: '#BCE784',
        f7400: '#5DD39E',
        f7500: '#17BEBB',
        f7600: '#348AA7',
        f7700: '#028280',
        f7800: '#234E52', // alias of teal-900
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        title: ['Roboto Condensed', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    boxShadow: ['hover'],
  },
  plugins: [],
};
