import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export function Title({ as, children, className, ...props }) {
  return React.createElement(
    as,
    {
      className: classNames(
        'font-900 font-title my-6 text-3xl text-center uppercase',
        className,
      ),
      ...props,
    },
    children,
  );
}

Title.defaultProps = {
  as: 'h2',
  children: null,
  className: null,
};

Title.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};
