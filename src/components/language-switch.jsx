import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl';
import React from 'react';

const LANGUAGE_NAME = {
  en: 'English',
  fr: 'Francais',
  nl: 'Nederlands',
};

export default function LanguageSwitch() {
  return (
    <ul style={{ margin: 0 }}>
      <IntlContextConsumer>
        {({ languages, language: currentLocale }) =>
          languages.map((language) => {
            const handleChangeLanguage = () => {
              if (language !== currentLocale) {
                changeLocale(language);
              }
            };
            return (
              <li
                key={language}
                style={{
                  display: 'inline-block',
                  listStyleType: 'none',
                  marginLeft: '1em',
                  padding: 0,
                }}
              >
                <span
                  onClick={handleChangeLanguage}
                  onKeyPress={(event) => {
                    if (event.keyCode === 13) {
                      event.preventDefault();
                      handleChangeLanguage();
                    }
                  }}
                  role="link"
                  style={{ cursor: `pointer` }}
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
