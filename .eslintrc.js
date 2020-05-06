'use strict';

const { pluginImport } = require('eslint-config-noise/rules');
const { extendRule } = require('eslint-noise-utils');

module.exports = {
  extends: ['noise', 'noise-node'],
  root: true,
  rules: {
    'import/no-internal-modules': extendRule(
      pluginImport.rules['import/no-internal-modules'],
      { allow: ['tailwindcss/*'] },
    ),
  },
  overrides: [
    {
      files: ['gatsby-*.js'],
      rules: {
        'require-atomic-updates': 'off',
      },
    },
    {
      files: ['*.js', 'scripts/*.js'],
      extends: ['noise-node/script'],
    },
    {
      files: ['src/**/*'],
      extends: ['noise-browser', 'noise-react'],
      parserOptions: { sourceType: 'module' },
      rules: {
        'import/no-internal-modules': 'off',
        'react/prop-types': ['error', { ignore: ['data'] }],
      },
    },
  ],
};
