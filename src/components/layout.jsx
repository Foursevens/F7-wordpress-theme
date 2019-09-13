import React from 'react';
import PropTypes from 'prop-types';

import Header from './header';

import './layout.css';

export default function Layout({ children, showHero }) {
  return (
    <>
      <Header showHero={showHero} />
      <div className="container mx-auto">
        <main className="m-6">{children}</main>
      </div>
    </>
  );
}

Layout.defaultProps = {
  showHero: false,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showHero: PropTypes.bool,
};
