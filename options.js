'use strict';

// This is determined by Wordpress. Don't change.
exports.LOCALE_DEFAULT = 'nl';

exports.LOCALES = process.env.F7_LOCALES
  ? process.env.F7_LOCALES.split(',')
  : ['en', 'fr', 'nl'];
