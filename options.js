'use strict';

// This is determined by Wordpress. Don't change.
module.exports.LOCALE_DEFAULT = 'nl';

module.exports.LOCALES = process.env.F7_LOCALES
  ? process.env.F7_LOCALES.split(',')
  : ['en', 'fr', 'nl'];
