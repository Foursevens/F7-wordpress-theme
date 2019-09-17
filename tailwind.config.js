const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        f7100: '#F0FBFB',
        f7200: '#D4F4DD',
        f7300: '#BCE784',
        f7400: '#5DD39E',
        f7500: '#17BEBB',
        f7600: '#348AA7',
        f7700: '#028280',
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        title: ['Roboto Condensed', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    backgroundColor: ['focus'],
  },
  plugins: [],
};
