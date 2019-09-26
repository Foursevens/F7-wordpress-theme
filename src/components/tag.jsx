import PropTypes from 'prop-types';
import React from 'react';

export default function Tag({ children }) {
  return <span className="font-700 font-title text-f7500">{children}</span>;
}

Tag.propTypes = {
  children: PropTypes.string.isRequired,
};
