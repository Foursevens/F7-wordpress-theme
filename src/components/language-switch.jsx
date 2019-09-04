import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl';
import React from 'react';

const LANGUAGE_NAME = {
  en: 'English',
  fr: 'Francais',
  nl: 'Nederlands',
};

export default function LanguageSwitch() {
  return (
    <ul className="-mx-6">
      <IntlContextConsumer>
        {({ languages, language: currentLocale }) =>
          languages.map((language) => {
            const handleChangeLanguage = () => {
              if (language !== currentLocale) {
                changeLocale(language);
              }
            };
            return (
              <li className="inline-block px-6" key={language}>
                <span
                  className="cursor-pointer"
                  onClick={handleChangeLanguage}
                  onKeyPress={(event) => {
                    if (event.keyCode === 13) {
                      event.preventDefault();
                      handleChangeLanguage();
                    }
                  }}
                  role="link"
                  tabIndex="-1"
                >
                  {LANGUAGE_NAME[language]}
                </span>
              </li>
            );
          })
        }
      </IntlContextConsumer>
    </ul>
  );
}
