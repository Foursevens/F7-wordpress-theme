import PropTypes from 'prop-types';
import React from 'react';

import Container from './container';
import LanguageSwitch from './language-switch';
import Logo from './logo';
import Menu from './menu';

export default function NavigationBar({ showNavigation = true }) {
  return (
    <div className="bg-f7100 border-t-2 border-f7400 shadow-md relative z-10">
      <Container>
        <div className="flex flex-wrap items-center justify-between">
          <div className="md:w-1/2 lg:w-1/4">
            <div className="my-6">
              <Logo />
            </div>
          </div>
          {showNavigation && (
            <>
              <div className="w-full md:flex-1 md:w-1/2 lg:w-2/4 order-3 lg:order-2">
                <div className="mb-6 lg:mt-6">
                  <Menu />
                </div>
              </div>
              <div className="order-2 lg:order-3 lg:w-1/4">
                <div className="my-6">
                  <LanguageSwitch />
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

NavigationBar.defaultProps = { showNavigation: true };

NavigationBar.propTypes = { showNavigation: PropTypes.bool };
