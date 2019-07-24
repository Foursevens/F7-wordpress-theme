/* eslint import/prefer-default-export: "off" */

export function byLanguage(lang) {
  return ({ language }) => language === lang;
}
