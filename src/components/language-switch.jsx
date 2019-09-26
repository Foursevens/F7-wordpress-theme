import classNames from 'classnames';
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl';
import React from 'react';

const LANGUAGE_NAME = {
  en: 'English',
  fr: 'Français',
  nl: 'Nederlands',
};

export default function LanguageSwitch() {
  return (
    <ul className="text-sm leading-tight sm:leading-normal sm:-mx-3 lg:mx-0">
      <IntlContextConsumer>
        {({ languages, language: currentLocale }) =>
          languages.map((language) => {
            const isActiveLanguage = language === currentLocale;
            const handleChangeLanguage = () => {
              if (!isActiveLanguage) {
                changeLocale(language);
              }
            };
            return (
              <li
                className="text-right sm:inline-block lg:block sm:mx-3 lg:mx-0"
                key={language}
              >
                <span
                  className={classNames('text-f7800', {
                    'cursor-pointer font-300': !isActiveLanguage,
                  })}
                  onClick={handleChangeLanguage}
                  onKeyPress={(event) => {
                    if (event.charCode === 13) {
                      event.preventDefault();
                      handleChangeLanguage();
                    }
                  }}
                  role="link"
                  tabIndex="0"
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
