import PropTypes from 'prop-types';
import React from 'react';

export function Container({ children }) {
  return (
    <div className="container mx-auto">
      <main className="mx-6">{children}</main>
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
