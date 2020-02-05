import PropTypes from 'prop-types';
import React from 'react';

export default function Grid({ children }) {
  return (
    <ul className="flex flex-wrap items-stretch -mx-3 -mt-3 mb-3">
      {children.map((child) => (
        <li key={child.key} className="p-3 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
          {child}
        </li>
      ))}
    </ul>
  );
}

Grid.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};
