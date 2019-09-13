import PropTypes from 'prop-types';
import React from 'react';

import Hero from './hero';
import NavigationBar from './navigation-bar';

export default function Header({ showHero }) {
  return (
    <header>
      <NavigationBar />
      {showHero && <Hero />}
    </header>
  );
}

Header.propTypes = {
  showHero: PropTypes.bool.isRequired,
};
