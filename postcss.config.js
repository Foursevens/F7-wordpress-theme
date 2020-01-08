'use strict';

const nesting = require('postcss-nesting');
const presetEnv = require('postcss-preset-env');
const tailwind = require('tailwindcss');

module.exports = function configurePostCss() {
  return {
    plugins: [nesting(), tailwind, presetEnv({ stage: 3 })],
  };
};
