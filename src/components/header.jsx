import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import LanguageSwitch from './language-switch';

export default function Header({ siteTitle }) {
  return (
    <header>
      <div className="container mx-auto p-6 flex justify-between">
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
        <div>
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};
