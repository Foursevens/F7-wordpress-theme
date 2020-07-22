import classNames from 'classnames';
import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

export function Button({ children, className, to }) {
  return (
    <Link
      className={classNames(
        'inline-block px-8 py-3 font-800 rounded bg-f7500 text-f7100 uppercase',
        className,
      )}
      to={to}
    >
      {children}
    </Link>
  );
}

Button.defaultProps = {
  className: undefined,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
};
