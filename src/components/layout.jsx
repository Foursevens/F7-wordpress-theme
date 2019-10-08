import PropTypes from 'prop-types';
import React from 'react';

import NavigationBar from './navigation-bar';

import './layout.css';

export default function Layout({ children }) {
  return (
    <>
      <header>
        <NavigationBar />
      </header>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed right-0 bottom-0">
          <div className="bg-red-200 sm:bg-red-300 md:bg-red-400 lg:bg-red-500 xl:bg-red-600 font-900 font-title p-1 text-red-900">
            <span className="sm:hidden">XS</span>
            <span className="hidden sm:inline md:hidden">SM</span>
            <span className="hidden md:inline lg:hidden">MD</span>
            <span className="hidden lg:inline xl:hidden">LG</span>
            <span className="hidden xl:inline">XL</span>
          </div>
        </div>
      )}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
