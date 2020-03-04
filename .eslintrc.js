'use strict';

module.exports = {
  extends: ['noise', 'noise-node'],
  root: true,
  rules: {
    'import/no-internal-modules': ['error', { allow: ['tailwindcss/*'] }],
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
